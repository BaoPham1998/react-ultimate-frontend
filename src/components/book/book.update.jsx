import { Input, InputNumber, Modal, Select, notification } from 'antd';
import { useEffect, useState } from 'react'
import { handleUploadFile, upDateBookAPI } from '../../services/api.services';

const BookUpdate = (props) => {
    const [bookId, setBookId] = useState()
    const [selectedBookPic, setSelectedBookPic] = useState(null)
    const [preview, setPreview] = useState(null)

    const [mainText, setMainText] = useState("")
    const [author, setAuthor] = useState("")
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [category, setCategory] = useState("")
    const { isUpdateModalOpen, setIsUpdateModalOpen, bookUpdateData, loadBookData, setBookUpdateData } = props;
    console.log(bookUpdateData)


    useEffect(() => {
        if (bookUpdateData && bookUpdateData._id) {
            setBookId(bookUpdateData._id)
            setMainText(bookUpdateData.mainText)
            setAuthor(bookUpdateData.author)
            setPrice(bookUpdateData.price)
            setQuantity(bookUpdateData.quantity)
            setCategory(bookUpdateData.category)
            setSelectedBookPic(bookUpdateData.bookPic)
            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${bookUpdateData.thumbnail}`)
        }
    }, [bookUpdateData])

    const uploadBookPic = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedBookPic(null);
            setPreview(null);
            return;
        }
        const newBookPic = event.target.files[0]
        if (newBookPic) {
            setSelectedBookPic(newBookPic)
            setPreview(URL.createObjectURL(newBookPic))
        }
    }
    const updateBook = async (NewThumbnail) => {
        const resBook = await upDateBookAPI(bookId, NewThumbnail, mainText, author, price, quantity, category)
        if (resBook.data) {
            notification.success({
                message: "Cập nhật book thành công",
            })
            resetAndCloseModalBook()
            await loadBookData();
        } else {
            notification.error({
                message: "Cập nhật book thất bại",
                description: JSON.stringify(resBook.message)
            })
        }

    }



    const handleUpDateBtn = async () => {
        if (!preview && !selectedBookPic) {
            notification.error({
                message: "Vui lòng chọn ảnh cho book",
            })
            return;
        }
        let newPic = "";
        if (preview && !selectedBookPic) {
            newPic = bookUpdateData.thumbnail;
        } else {
            const resUpload = await handleUploadFile(selectedBookPic, "book")
            if (resUpload.data) {
                newPic = resUpload.data.fileUploaded;
            } else {
                notification.error({
                    message: "Upload ảnh thất bại",
                    description: JSON.stringify(resUpload.message)
                })
                return;
            }

        }
        await updateBook(newPic)

    }
    const resetAndCloseModalBook = () => {
        setMainText("")
        setAuthor("")
        setPrice("")
        setQuantity("")
        setCategory("")
        setBookUpdateData(null)
        setPreview(null);
        setSelectedBookPic(null)
        setIsUpdateModalOpen(false);
    }

    return (
        <>

            <Modal title="Cập nhật Book"
                open={isUpdateModalOpen}
                onOk={() => handleUpDateBtn()}
                onCancel={() => resetAndCloseModalBook()}
                okText={"UPDATE"}>
                <span>Id</span>
                <Input
                    value={bookId}
                    disabled={true} />
                <span>Tiêu Đề</span>
                <Input placeholder="Nhập tiêu đề "
                    value={mainText}
                    onChange={(event) => { setMainText(event.target.value) }} />
                <span>Tác giả</span>
                <Input placeholder="Nhập tác giả"
                    value={author}
                    onChange={(event) => { setAuthor(event.target.value) }} />
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                }}>
                    <span>Giá tiền</span>
                    <InputNumber style={{ width: "100%" }}
                        placeholder="Nhập giá tiền"
                        addonAfter="đ"
                        value={price}
                        onChange={(event) => { setPrice(event) }} />
                    <span>Số lượng</span>
                    <InputNumber style={{ width: "100%" }}
                        placeholder="Nhập số lượng"
                        value={quantity}
                        onChange={(event) => { setQuantity(event) }} />
                    <span>Thể loại</span>
                    <Select
                        defaultValue=""
                        value={category}
                        onChange={(event) => { setCategory(event) }}
                        options={[
                            { value: 'Arts', label: 'Arts' },
                            { value: 'Business', label: 'Business' },
                            { value: 'Comics', label: 'Comics' },

                            { value: 'Cooking', label: 'Cooking' },
                            { value: 'Entertainment', label: 'Entertainment' },
                            { value: 'History', label: 'History' },

                            { value: 'Music', label: 'Music' },
                            { value: 'Sports', label: 'Sports' },
                            { value: 'Teen', label: 'Teen' },
                            { value: 'Travel', label: 'Travel' },

                        ]}
                    />
                    <span>Ảnh thumbnail</span>
                </div>
                <div style={{ marginTop: "18px" }}>
                    <label htmlFor='btnUpload' style={{
                        backgroundColor: "#E48262",
                        color: "white",
                        padding: "10px",
                        borderRadius: "10px",
                        cursor: "pointer"
                    }}>Upload</label>
                    <input type='file' hidden id='btnUpload'
                        onChange={(event) => { uploadBookPic(event) }
                        }
                        onClick={(event) => {
                            event.target.value = null
                        }}
                    />
                </div>
                {preview &&
                    <div>

                        <img src={preview}
                            style={{
                                height: "150px",
                                width: "150px",
                                objectFit: 'contain',
                                marginTop: "20px"
                            }}></img>
                    </div>
                }
            </Modal>
        </>
    );
};

export default BookUpdate
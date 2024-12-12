import { Button, Modal, InputNumber, Input, Select, notification } from 'antd';
import { createBook, handleUploadFile } from '../../services/api.services';
import { useState } from 'react';



const CreateBook = (props) => {
    const { isCreateOpen, setIsCreateOpen, loadBookData } = props;

    const [selectedBookPic, setSelectedBookPic] = useState(null)
    const [preview, setPreview] = useState(null)

    const [mainText, setMainText] = useState("")
    const [author, setAuthor] = useState("")
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [category, setCategory] = useState("")

    const showModal = () => {
        setIsCreateOpen(true);
    };
    const resetAndCloseModalBook = () => {
        setMainText("")
        setAuthor("")
        setPrice("")
        setQuantity("")
        setCategory("")
        setPreview(null);
        setSelectedBookPic(null)
        setIsCreateOpen(false);
    };

    const handleUploadBookPic = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedBookPic(null);
            setPreview(null);
            return;
        }
        const file = event.target.files[0]
        if (file) {
            setSelectedBookPic(file)
            setPreview(URL.createObjectURL(file))
        }
    }

    const handleCreateBookPic = async () => {
        if (!selectedBookPic) {
            notification.error({
                message: "Vui lòng chọn ảnh cho book",
            })
            return;
        }
        const resUpload = await handleUploadFile(selectedBookPic, "book")
        if (resUpload.data) {
            const newBook = resUpload.data.fileUploaded
            const resUpdateBook = await createBook(newBook, mainText, author, price, quantity, category)
            if (resUpdateBook.data) {

                notification.success({
                    message: "Thêm mới book thành công",
                })
                resetAndCloseModalBook()
                await loadBookData()
            } else {
                notification.error({
                    message: "Thêm mới book thất bại",
                    description: JSON.stringify(resUpdateBook.message)
                })
            }
        }
    }
    return (
        <div style={{ margin: "20px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Table Book</h3>
                <Button type="primary"
                    onClick={showModal}
                > Create Book</Button>
            </div>
            <Modal title="Create Book"
                open={isCreateOpen}
                onOk={handleCreateBookPic}
                onCancel={resetAndCloseModalBook}
                okText="CREATE"
                maskClosable={false}
            >
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
                        onChange={(event) => { handleUploadBookPic(event) }
                        }
                        onClick={(event) => {
                            event.target.value = null
                        }}
                    />
                </div>
                {preview &&
                    <div style={{
                        marginTop: "20px",
                    }}>
                        <img style={{
                            height: "100%",
                            width: "150px",
                            objectFit: 'contain'
                        }}
                            src={preview} />
                    </div>
                }

            </Modal>
        </div>
    );
}

export default CreateBook
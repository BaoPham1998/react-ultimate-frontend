import { Form, Input, InputNumber, Select, Modal, notification } from 'antd';
import { useEffect, useState } from 'react'
import { handleUploadFile, upDateBookAPI } from '../../services/api.services';

const BookUpdateUnControlled = (props) => {
    const { isUpdateModalOpen, setIsUpdateModalOpen, loadBookData, bookUpdateData, setBookUpdateData } = props;
    const [form] = Form.useForm();

    const [preview, setPreview] = useState(null)
    const [selectedBookPic, setSelectedBookPic] = useState(null)


    const closeModal = () => {
        setIsUpdateModalOpen(false);
    };
    const resetAndCloseModalBook = () => {
        form.resetFields()
        setSelectedBookPic(null)
        setPreview(null)
        setIsUpdateModalOpen(false);
    };
    useEffect(() => {

        if (bookUpdateData && bookUpdateData._id) {
            form.setFieldsValue({
                id: bookUpdateData._id,
                mainText: bookUpdateData.mainText,
                author: bookUpdateData.author,
                price: bookUpdateData.price,
                quantity: bookUpdateData.quantity,
                category: bookUpdateData.category,
            });
            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${bookUpdateData.thumbnail}`)

        }
    }, [bookUpdateData])




    const onCategoryChange = (value) => {
        switch (value) {
            case 'Arts':
                form.setFieldValue({
                    category: "Arts"
                });
                break;
            case 'Business':
                form.setFieldValue(
                    { category: 'Business' });
                break;
            case 'Comics':
                form.setFieldValue(
                    { category: "Comics" });
                break;
            case 'Cooking':
                form.setFieldValue(
                    { category: "Cooking" });
                break;
            case 'History':
                form.setFieldValue(
                    { category: "History" });
                break;
            case 'Entertainment':
                form.setFieldValue(
                    { category: "Entertainment" });
                break;
            case 'Sports':
                form.setFieldValue(
                    { category: "Sports" });
                break;
            case 'Music':
                form.setFieldValue(
                    { category: "Music" });
                break;
            case 'Teen':
                form.setFieldValue(
                    { category: "Teen" });
                break;
            case 'Travel':
                form.setFieldValue(
                    { category: "Travel" });
                break;
            default:
        }
    };
    const handleUploadBookPic = (event) => {
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
    const upDateBook = async (newPic, values) => {
        const { id, mainText, author, price, quantity, category } = values;
        const resBook = await upDateBookAPI(id, newPic, mainText, author, price, quantity, category)
        if (resBook.data) {
            notification.success({
                message: "Cập nhật book thành công",
            })
            resetAndCloseModalBook()
            await loadBookData();
        } else {
            notification.error({
                message: "Cập nhật Book thất bại",
                description: JSON.stringify(resBook.message)
            })
        }
    }



    const handleUpdateBtn = async (values) => {
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
                newPic = resUpload.data.fileUploaded
            } else {
                notification.error({
                    message: "hãy chọn đúng file ảnh",
                    description: JSON.stringify(resUpload.message)
                })
                return;
            }
        }
        await upDateBook(newPic, values)

    }

    return (
        <>
            <Modal title="Basic Modal"
                open={isUpdateModalOpen}
                onOk={() => form.submit()}
                onCancel={closeModal}>


                <Form
                    form={form}
                    onFinish={handleUpdateBtn}
                    layout="vertical"
                >
                    <Form.Item
                        name="id"
                    >
                        <Input
                            disabled={true} />
                    </Form.Item>
                    <Form.Item
                        name="mainText"
                        label="Tiêu Đề"
                        rules={[
                            {
                                required: true,
                                message: "Tiêu đề không được để trống"
                            },
                        ]}
                    >
                        <Input

                        />
                    </Form.Item>
                    <Form.Item
                        name="author"
                        label="Tác Giả"
                        rules={[
                            {
                                required: true,
                                message: "Tác giả không được để trống"
                            },
                        ]}
                    >
                        <Input

                        />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="Giá tiền"
                        rules={[
                            {
                                required: true,
                                message: "Giá tiền không được để trống"
                            },
                        ]}
                    >
                        <InputNumber style={{ width: "100%" }}
                            addonAfter="đ" />
                    </Form.Item>
                    <Form.Item
                        name="quantity"
                        label="Số lượng"
                        style={{ width: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: "Số lượng không được để trống"
                            },
                        ]}
                    >
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                        name="category"
                        label="Thể loại"
                        rules={[
                            {
                                required: true,
                                message: "Thể loại không được để trống"
                            },
                        ]}
                    >
                        <Select
                            onChange={onCategoryChange}
                            allowClear
                        >
                            <Select.Option value="Arts">Arts</Select.Option>
                            <Select.Option value="Business">Business</Select.Option>
                            <Select.Option value="Comics">Comics</Select.Option>
                            <Select.Option value="Cooking">Cooking</Select.Option>
                            <Select.Option value="Entertainment">Entertainment</Select.Option>
                            <Select.Option value="History">History</Select.Option>
                            <Select.Option value="Music">Music</Select.Option>
                            <Select.Option value="Sports">Sports</Select.Option>
                            <Select.Option value="Teen">Teen</Select.Option>
                            <Select.Option value="Travel">Travel</Select.Option>

                        </Select>
                    </Form.Item>
                    <span>Ảnh thumbnail</span>
                    <div style={{ marginTop: "18px" }}>
                        <label htmlFor='btnUpload' style={{
                            backgroundColor: "#E48262",
                            color: "white",
                            padding: "10px",
                            borderRadius: "10px",
                            cursor: "pointer"
                        }}>Upload</label>
                        <input type='file' hidden id='btnUpload'
                            style={{ display: "none" }}

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
                                height: "150px",
                                width: "150px",
                                objectFit: 'contain'
                            }}
                                src={preview} />
                        </div>
                    }
                </Form>
            </Modal>
        </>
    )
}

export default BookUpdateUnControlled
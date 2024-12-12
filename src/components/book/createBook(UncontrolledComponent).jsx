import { useState } from 'react'
import { Button, Form, Input, Select, Modal, InputNumber, notification } from 'antd';
import { createBook, handleUploadFile } from '../../services/api.services';



const CreateBookUncontrolledComponent = (props) => {
    const { isCreateOpen, setIsCreateOpen, loadBookData } = props;
    const [form] = Form.useForm();
    const [preview, setPreview] = useState(null)
    const [selectedBookPic, setSelectedBookPic] = useState(null)
    const [loadingCreateBook, setLoadingCreateBook] = useState(false)
    const showModal = () => {
        setIsCreateOpen(true)
    }
    const resetAndCloseModalBook = () => {
        form.resetFields()
        setSelectedBookPic(null)
        setPreview(null)
        setIsCreateOpen(false);
    };
    const handleSubmitBtn = async (value) => {
        setLoadingCreateBook(true)
        if (!selectedBookPic) {
            notification.error({
                message: "Vui lòng chọn ảnh cho book",
            })
            return;
        }
        const uploadBookPic = await handleUploadFile(selectedBookPic, "book")
        if (uploadBookPic.data) {
            const resCreateBook = await createBook(
                preview, value.mainText, value.author,
                value.price, value.quantity, value.category
            );
            if (resCreateBook.data) {
                notification.success({
                    message: "Thêm mới book thành công",
                })
                resetAndCloseModalBook()
                await loadBookData()
            } else {
                notification.error({
                    message: "Thêm mới book thất bại",
                    description: JSON.stringify(resCreateBook.message)
                })
            }

        }
        setLoadingCreateBook(false)
    }
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


    const onCategoryChange = (value) => {
        switch (value) {
            case 'Arts':
                form.setFieldValue("Arts");
                break;
            case 'Business':
                form.setFieldValue('Business');
                break;
            case 'Comics':
                form.setFieldValue("Comics");
                break;
            case 'Cooking':
                form.setFieldValue("Cooking");
                break;
            case 'History':
                form.setFieldValue("History");
                break;
            case 'Entertainment':
                form.setFieldValue("Entertainment");
                break;
            case 'Sports':
                form.setFieldValue("Sports");
                break;
            case 'Music':
                form.setFieldValue("Music");
                break;
            case 'Teen':
                form.setFieldValue("Teen");
                break;
            case 'Travel':
                form.setFieldValue("Travel");
                break;
            default:
        }
    };


    return (
        <div style={{ margin: "20px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Table Book</h3>
                <Button type="primary"
                    onClick={showModal}
                > Create Book </Button>
            </div>
            <Modal title="Create Book (Uncontrolled component)"
                open={isCreateOpen}
                onCancel={resetAndCloseModalBook}
                onOk={() => form.submit()}
                okButtonProps={{
                    loading: loadingCreateBook
                }}
                okText="CREATE"
                maskClosable={false}
            >
                <Form
                    form={form}
                    onFinish={handleSubmitBtn}
                    layout="vertical"
                >

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
                        <Input />
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
                        <Input />
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
                            <Option value="Arts">Arts</Option>
                            <Option value="Business">Business</Option>
                            <Option value="Comics">Comics</Option>
                            <Option value="Cooking">Cooking</Option>
                            <Option value="Entertainment">Entertainment</Option>
                            <Option value="History">History</Option>
                            <Option value="Music">Music</Option>
                            <Option value="Sports">Sports</Option>
                            <Option value="Teen">Teen</Option>
                            <Option value="Travel">Travel</Option>

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
        </div>
    )
}

export default CreateBookUncontrolledComponent


import { Drawer, Button, notification } from 'antd';
import { useState } from 'react';
import { handleUploadFile, updateUserAvatarAPI } from "../../services/api.services"
const UserInfo = (props) => {
    const { userInfo, setUserInfo, openInfo, setOpenInfo, loadUser } = props
    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)


    const onClose = () => {
        setOpenInfo(false);
        setUserInfo(null)
    };


    const handleUpdateAvatar = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
            return;
        }
        const file = event.target.files[0]
        if (file) {
            setSelectedFile(file)
            setPreview(URL.createObjectURL(file))
        }
    }

    const handleSaveAvatar = async () => {
        const resUpload = await handleUploadFile(selectedFile, "avatar")
        if (resUpload.data) {
            const newAvatar = resUpload.data.fileUploaded;
            const resUpdateAvatar = await updateUserAvatarAPI(newAvatar, userInfo._id, userInfo.fullName, userInfo.phone)
            if (resUpdateAvatar.data) {
                setOpenInfo(false);
                setSelectedFile(null);
                setPreview(null);
                loadUser();
                notification.success({
                    message: "Update user avatar",
                    description: "Update avatar thành công",
                })
            } else {
                notification.error({
                    message: "Error",
                    description: JSON.stringify(resUpdateAvatar.message)
                })
            }
            // notification.success()
        } else {
            notification.error({
                message: "Error",
                description: "Update avatar thất bại"
            })
        }

    }

    return (
        <>
            <Drawer title="Chi tiết User"
                width={"40vw"}
                onClose={onClose}
                open={openInfo}
                maskClosable={false}
            >
                {
                    userInfo ? <>
                        <p>Id: {userInfo._id}</p>
                        <br />
                        <p>Full name: {userInfo.fullName}</p>
                        <br />
                        <p>Email: {userInfo.email}</p>
                        <br />
                        <p>Phone number: {userInfo.phone}</p>
                        <br />
                        <p>Avatar:</p>
                        <br />
                        <div style={{
                            marginTop: "10px",
                            height: "100px", width: "150px",
                        }}>
                            <img src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${userInfo.avatar}`}
                                style={{
                                    height: "100%",
                                    width: "100%",
                                    objectFit: 'contain'
                                }}></img>
                        </div>
                        <div style={{ marginTop: "18px" }}>
                            <label htmlFor='btnUpload' style={{
                                backgroundColor: "#2877FF",
                                color: "white",
                                padding: "10px",
                                borderRadius: "10px",
                                cursor: "pointer"
                            }}>Upload Avatar</label>
                            <input type='file' hidden id='btnUpload'
                                onChange={(event) => handleUpdateAvatar(event)}
                            />
                        </div>
                        {preview &&
                            <>
                                <div style={{
                                    marginTop: "20px",
                                    height: "100px", width: "150px",
                                }}>
                                    <img src={preview}
                                        style={{
                                            height: "100%",
                                            width: "100%",
                                            objectFit: 'contain'
                                        }}></img>
                                </div>
                                <Button style={{
                                    marginTop: "20px",
                                }}
                                    type='primary'
                                    onClick={handleSaveAvatar}>SAVE</Button>

                            </>
                        }




                    </>
                        :
                        <>
                            <p>Không tìm thấy user</p>
                        </>
                }
            </Drawer >
        </>
    )
}

export default UserInfo
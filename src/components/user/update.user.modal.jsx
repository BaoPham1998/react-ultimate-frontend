import { useEffect } from 'react'
import { useState } from 'react';
import { Modal, Input, notification } from 'antd';
import { updateUserAPI } from '../../services/api.services';
const UpdateUserModal = (props) => {

    const [id, setId] = useState("")
    const [fullName, setFullName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, loadUser } = props

    useEffect(() => {
        if (dataUpdate) {
            setId(dataUpdate._id)
            setFullName(dataUpdate.fullName)
            setPhoneNumber(dataUpdate.phone)
        }
    }, [dataUpdate])

    const handleSubmitBtn = async () => {

        const res = await updateUserAPI(id, fullName, phoneNumber);


        if (res.data) {
            notification.success({
                message: "Update user",
                description: "cập nhật thành công"
            })
            resetAndCloseModal()
            await loadUser()
        } else {
            notification.error({
                message: "Error create user",
                description: JSON.stringify(res.message)
            })

        }
    }
    const resetAndCloseModal = () => {
        setIsModalUpdateOpen(false)
        setId("")
        setFullName("");
        setPhoneNumber("");
        setDataUpdate(null);
    }


    return (
        <Modal title="Update User"
            open={isModalUpdateOpen}
            onOk={() => handleSubmitBtn()}
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText="SAVE">
            <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                <div>
                    <span>Id</span>
                    <Input placeholder="Enter Email"
                        value={id}
                        disabled
                    />
                </div>
                <div>
                    <span>fullName</span>
                    <Input placeholder="Enter fullName"
                        value={fullName}
                        onChange={(event) => { setFullName(event.target.value) }}
                    />
                </div>

                <div>
                    <span>Phone number</span>
                    <Input placeholder="Enter Phone number"
                        value={phoneNumber}
                        onChange={(event) => { setPhoneNumber(event.target.value) }}
                    />
                </div>
            </div>
        </Modal>
    )
}

export default UpdateUserModal
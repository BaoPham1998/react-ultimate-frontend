import { useState } from 'react'
import { Button, Modal, Input, notification } from 'antd';
import { createUserAPI } from "../../services/api.services"

const UserForm = (props) => {
    const { loadUser } = props;
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)



    const handleSubmitBtn = async () => {
        const res = await createUserAPI(fullName, email, password, phoneNumber);
        if (res.data) {
            notification.success({
                message: "Create user",
                description: "tạo user thành công"
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
        setIsModalOpen(false)
        setFullName("");
        setEmail("");
        setPassword("");
        setPhoneNumber("");
        setIsModalOpen("");
    }

    return (
        <div style={{ margin: "20px 0" }}>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Table Users</h3>
                <Button type="primary"
                    onClick={() => setIsModalOpen(true)}
                > Create User</Button>
            </div>
            <Modal title="Create User"
                open={isModalOpen}
                onOk={() => handleSubmitBtn()}
                onCancel={() => resetAndCloseModal()}
                maskClosable={false}
                okText="CREATE">
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                    <div>
                        <span>fullName</span>
                        <Input placeholder="Enter fullName"
                            value={fullName}
                            onChange={(event) => { setFullName(event.target.value) }}
                        />
                    </div>
                    <div>
                        <span>Email</span>
                        <Input placeholder="Enter Email"
                            value={email}
                            onChange={(event) => { setEmail(event.target.value) }}
                        />
                    </div>
                    <div>
                        <span>Password</span>
                        <Input.Password placeholder="Enter Password"
                            value={password}
                            onChange={(event) => { setPassword(event.target.value) }}
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
        </div>
    )
}

export default UserForm
import { Button, Input, Form, notification, Row, Col, Divider } from 'antd';
import { registerUserAPI } from '../services/api.services';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const RegisterPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const onFinish = async (values) => {
        const res = await registerUserAPI(
            values.fullName,
            values.email,
            values.password,
            values.phone)
        if (res.data) {
            notification.success({
                message: "Register",
                description: "Register successfully"
            });
            navigate('/login')
        } else {
            notification.error({
                message: "Error",
                description: JSON.stringify(res.message)
            })

        }

    }
    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            style={{ margin: "10px" }}
        // onFinishFailed={onFinishFailed}

        >
            <h1 style={{
                textAlign: "center",
                marginBottom: "30px",
                marginTop: "30px",
            }}>Đăng Ký tài khoản</h1>
            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Full Name"
                        name="fullName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Email!',
                            },

                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Phone number"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                pattern: new RegExp(/\d+/g),
                                message: "Wrong format!"
                            }

                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <div >
                        <Button type="primary"
                            onClick={() => { form.submit() }}
                        > Register</Button>
                        <Divider />
                        <div style={{ marginTop: "30px" }}>
                            <div>Đã có tài khoản?<Link to={"/login"}> Đăng nhập tại đây</Link></div>

                        </div>
                    </div>
                </Col>
            </Row>

        </Form >
    )
}

export default RegisterPage
import { Button, Form, Input, Col, Row, notification, Divider, message } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom';
import { loginUserAPI } from '../services/api.services';
import { useContext, useState } from 'react';
import { AuthContext } from '../components/context/auth.context';
const loginPages = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContext)


  const onFinish = async (values) => {

    setLoading(true)
    const res = await loginUserAPI(values.email, values.password)
    if (res.data) {
      message.success("Đăng nhập thành công")
      setLoading(false)
      localStorage.setItem("access_token", res.data.access_token)
      setUser(res.data.user)
      navigate('/');
    } else {
      notification.error({
        message: "Error",
        description: JSON.stringify(res.message)
      })
    }

  }
    ;
  return (
    <Row justify={"center"} style={{ margin: "30px" }}>
      <Col xs={24} md={16} lg={8}>
        <fieldset style={{
          padding: "15px",
          margin: "5px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}>
          <legend>Đăng Nhập</legend>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
          >
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
              <Input.Password onKeyDown={(event) => { if (event.key === "Enter") form.submit() }} />
            </Form.Item>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }} >
              <Button type="primary"
                loading={loading}
                onClick={() => { form.submit() }}
              > Login</Button>
              <Link to="/">Go to homepage <ArrowRightOutlined /> </Link>
            </div>
            <Divider />
            <div style={{
              marginTop: "30px",
              textAlign: "center"
            }}>
              <div>chưa có tài khoản?<Link to={"/register"}> Đăng ký tại đây</Link></div>

            </div>

          </Form>
        </fieldset>
      </Col>

    </Row>
  )
}
export default loginPages

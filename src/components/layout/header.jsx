
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, message } from "antd"
import {
    UsergroupAddOutlined, HomeOutlined, BookOutlined,
    LoginOutlined, AliwangwangOutlined
} from '@ant-design/icons';
import { useState, useContext, useEffect } from "react"
import { AuthContext } from '../context/auth.context';
import { logoutAPI } from "../../services/api.services";


const header = () => {
    const [current, setCurrent] = useState('');
    const { user, setIsLoadingPage, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if (location && location.pathname) {
            const allRoutes = ["Users", "Books"];
            const currentRoute = allRoutes.find(item => `/${item}` === location.pathname);
            if (currentRoute) {
                setCurrent(currentRoute);
            } else {
                setCurrent("home");
            }
        }
    }, [location])

    const onClick = (e) => {
        setCurrent(e.key);
    };
    const handleLogout = async () => {
        const res = await logoutAPI()
        if (res.data) {
            message.success("Logout thành công");
            localStorage.removeItem("access_token")
            setUser({
                email: "",
                phone: "",
                fullName: "",
                role: "",
                avatar: "",
                id: ""
            })
            navigate("/");

        }
    }


    const items = [{
        label: <Link to={"/"}>Home</Link>,
        key: 'Home',
        icon: <HomeOutlined />,
    },
    {
        label: <Link to={"/Users"}>Users</Link>,
        key: 'Users',
        icon: <UsergroupAddOutlined />,
    },
    {
        label: <Link to={"/Book"}>Book</Link>,
        key: 'Book',
        icon: <BookOutlined />,
    },

    ...(!user.id ? [{
        label: <Link to={"/login"}>Đăng nhập</Link>,
        key: 'login',
        icon: <LoginOutlined />,
    }] : []),

    ...(user.id ? [{
        label: `welcome ${user.fullName}`,
        key: 'welcomeUser',
        icon: <AliwangwangOutlined />,
        children: [
            {
                label: <a onClick={() => handleLogout()}>Đăng xuất</a>,
                key: 'Logout',
            }
        ]
    }] : []),

    ]

    return (
        <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items} />
    )
}

export default header
import "./components/todo/todo.css";
import Header from './components/layout/header';
import "./components/layout/footer.css";
import Footer from './components/layout/footer';
import { Outlet } from "react-router-dom";
import { getUserInfo } from "./services/api.services";
import { useContext, useEffect } from "react";
import { AuthContext } from "./components/context/auth.context";
import { Spin } from 'antd';


const App = () => {
  const { setUser, setIsLoadingPage, isLoadingPage } = useContext(AuthContext)

  // const delay = (milSeconds) => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve();
  //     }, milSeconds);
  //   });
  // }

  useEffect(() => {
    userInfo();
  }, []);

  const userInfo = async () => {
    const res = await getUserInfo();
    setIsLoadingPage(true);
    // await delay(3000)
    if (res.data) {
      setUser(res.data.user);
    }
    setIsLoadingPage(false);
  }

  return (
    <>
      {isLoadingPage === true ?
        <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}>
          <Spin />
        </div> :
        <div className="todo-container">
          <Header />
          <Outlet />
          <Footer />
        </div>
      }

    </>
  )
}

export default App

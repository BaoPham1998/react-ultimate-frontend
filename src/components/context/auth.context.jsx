import { createContext, useState } from 'react';


export const AuthContext = createContext({
    email: "",
    phone: "",
    fullName: "",
    role: "",
    avatar: "",
    id: ""
});

export const AuthWrapper = (props) => {
    const [user, setUser] = useState({
        email: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: "",
        id: ""
    })
    const [isLoadingPage, setIsLoadingPage] = useState(true);

    return (
        <AuthContext.Provider value={{ user, setUser, isLoadingPage, setIsLoadingPage }}>
            {props.children}

            {/* <RouterProvider router={router} */}
        </AuthContext.Provider>
    )
}
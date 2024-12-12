import axios from './axios.customize';



const createUserAPI = (fullName, email, password, phoneNumber) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phoneNumber,
    }
    return axios.post(URL_BACKEND, data)
}


const updateUserAPI = (_id, fullName, phoneNumber) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        _id: _id,
        fullName: fullName,
        phone: phoneNumber,
    }
    return axios.put(URL_BACKEND, data)
}

const fetchAllUserAPI = (current, pageSize) => {
    const URL_BACKEND = `/api/v1/user?current=${current}&pageSize=${pageSize}`;

    return axios.get(URL_BACKEND)
}
const deleteUser = (_id) => {
    const URL_BACKEND = `/api/v1/user/${_id}`;
    return axios.delete(URL_BACKEND);
};
const handleUploadFile = (file, folder) => {
    const URL_BACKEND = "/api/v1/file/upload";
    let config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            "upload-type": folder,
        }
    }
    const bodyFormData = new FormData();
    bodyFormData.append('fileImg', file);

    return axios.post(URL_BACKEND, bodyFormData, config);


}

const updateUserAvatarAPI = (avatar, _id, fullName, phoneNumber) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        avatar: avatar,
        _id: _id,
        fullName: fullName,
        phone: phoneNumber,
    }
    return axios.put(URL_BACKEND, data)
}
const registerUserAPI = (fullName, email, password, phone) => {
    const URL_BACKEND = "/api/v1/user/register";
    const data = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phone,
    }
    return axios.post(URL_BACKEND, data)
}
const loginUserAPI = (username, password) => {
    const URL_BACKEND = "/api/v1/auth/login";
    const data = {
        username: username,
        password: password,
        delay: 2000,
    }
    return axios.post(URL_BACKEND, data)
}

const getUserInfo = () => {
    const URL_BACKEND = "/api/v1/auth/account";
    return axios.get(URL_BACKEND)
}

const logoutAPI = () => {
    const URL_BACKEND = "/api/v1/auth/logout";
    return axios.post(URL_BACKEND)
}
const getBook = (currentBook, pageSizeBook) => {
    const URL_BACKEND = `/api/v1/book?current=${currentBook}&pageSize=${pageSizeBook}`
    return axios.get(URL_BACKEND)
}

const createBook = (thumbnail, mainText, author, price, quantity, category) => {
    const URL_BACKEND = '/api/v1/book'
    const data = {
        thumbnail: thumbnail,
        mainText: mainText,
        author: author,
        price: price,
        quantity: quantity,
        category: category,

    }

    return axios.post(URL_BACKEND, data)
}

const upDateBookAPI = (_id, thumbnail, mainText, author, price, quantity, category) => {
    const URL_BACKEND = `/api/v1/book`
    const data = {
        _id: _id,
        thumbnail: thumbnail,
        mainText: mainText,
        author: author,
        price: price,
        quantity: quantity,
        category: category,
    }
    return axios.put(URL_BACKEND, data)
}
const deleteBookAPI = (id) => {
    const URL_BACKEND = `/api/v1/book/${id}`
    return axios.delete(URL_BACKEND)
}

export {
    createUserAPI, logoutAPI, getUserInfo,
    updateUserAPI, fetchAllUserAPI, deleteUser,
    handleUploadFile, updateUserAvatarAPI, registerUserAPI,
    loginUserAPI, getBook, createBook, upDateBookAPI, deleteBookAPI
}
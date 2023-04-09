import axios from "axios"
import {auth} from '../../config/firebase.config'


export function createRequest(upload) {
    const tenantId = localStorage.getItem("tenantId")
    const isUser = auth.onAuthStateChanged((user) => {
        if (user) {
            return auth.currentUser
        }
    });

    if (isUser) {
        // const user = auth.currentUser;
        // const idToken = user.getIdToken(true);
        return axios.create({
            baseURL: `${process.env.REACT_APP_BASE_API_URL}/${tenantId}/`,
            headers: {
                "Content-type": !upload ? "application/json" : "multipart/form-data",
                Authorization: `Bearer ${tenantId}`
            }
        })
    }
    return null
}

// eslint-disable-next-line require-yield
export function* createAuthRequest(upload) {
    return axios.create({
        baseURL: `${process.env.REACT_APP_BASE_API_URL}/`,
        headers: {
            "Content-type": !upload ? "application/json" : "multipart/form-data"
        }
    })
}



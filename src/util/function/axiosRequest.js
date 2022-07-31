import axios from "axios"
import {auth} from "../../config/firebase.config"


export function* createRequest(upload) {
    const user = yield auth.currentUser
    user.getIdToken = function (b) {
        return undefined;
    }
    if (user) {
        const tenantId = localStorage.getItem("tenantId")
        const idToken = yield user.getIdToken(true)
        return axios.create({
            baseURL: `${process.env.REACT_APP_BASE_API_URL}/${tenantId}/`,
            headers: {
                "Content-type": !upload ? "application/json" : "multipart/form-data",
                Authorization: `Bearer ${idToken}`
            }
        })
    }
    return null
}
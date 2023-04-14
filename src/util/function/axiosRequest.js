import axios from 'axios';
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


export function* createAxiosNewRequest(){
    return axios.create({
        baseURL: process.env.REACT_APP_BASE_API_URL,
        timeout: 5000,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        transformRequest: [
          function (data, headers) {
            // If the data is FormData, return it as-is
            if (data instanceof FormData) {
              return data;
            }
      
            // If the data is a plain object, convert it to JSON
            if (typeof data === 'object') {
              headers['Content-Type'] = 'application/json';
              return JSON.stringify(data);
            }
      
            // Otherwise, return the data as-is
            return data;
          },
        ],
      });

}

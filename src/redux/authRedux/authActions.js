import * as actionTypes from './authActionTypes'

export const registerActionCaller = (data, history) => {
    return {
        type: actionTypes.REGISTER_CALLER,
        data,
        history
    }
}

export const loginCallerActionCaller = (data, history, makeAuthenticated) => {
    return {
        type: actionTypes.LOGIN_CALLER,
        data,
        history,
        makeAuthenticated
    }
}

export function saveIdToken(token) {
    return {type: actionTypes.SAVE_ID_TOKEN, token};
}
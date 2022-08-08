import * as authActions from './authActionTypes'

const initialState = {
    loading: false,
    error: false,
    isAuth: false,
    userData: {}
}

export function authReducer(state = initialState, action) {
    switch (action.type) {
        case authActions.REGISTER_CALLER:
            return {
                ...state
            }
        case authActions.REGISTER_START:
            return {
                ...state,
                loading: true
            }
        case authActions.REGISTER_END:
            return {
                ...state,
                loading: false
            }
        case authActions.REGISTER_SUCCESS:
            return {
                ...state,
                error: false,
                loading: false
            }
        case authActions.REGISTER_FAILED:
            return {
                ...state,
                error: true,
                loading: true
            }
        case authActions.LOGIN_CALLER:
            return {
                ...state
            }
        case authActions.LOGIN_START:
            return {
                ...state,
                loading: true
            }
        case authActions.LOGIN_END:
            return {
                ...state,
                loading: false
            }
        case authActions.LOGIN_SUCCESS:
            return {
                ...state,
                error: false,
                loading: false,
                isAuth: true,
                userData: action.data
            }
        case authActions.LOGIN_FAILED:
            return {
                ...state,
                error: true,
                loading: true
            }
        default:
            return {
                ...state
            }
    }
}
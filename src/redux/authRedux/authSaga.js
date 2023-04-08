import {put, takeLatest} from "redux-saga/effects"
import * as actionType from './authActionTypes'
import {auth} from "../../config/firebase.config"
import {createAuthRequest} from "../../util/function/axiosRequest";
import {fireAlertRegister} from "../../util/error/errorMessage";
import {parseJwt} from "../../util/function/utilFuctions";

export function* registerCaller(action) {

    try {
        yield put({type: actionType.REGISTER_START});
        const Axios = yield createAuthRequest();
        const res = yield Axios.post("cms-user", action.data)
        if (res) {
            console.log(res)
            fireAlertRegister("You store has been created. Check your email...!😍")
            action.history.push("/login")
        }
    } catch (error) {
        console.log(error)
    } finally {
        yield put({type: actionType.REGISTER_END});
    }
}

export function* loginCaller(action) {
    console.log(action)
    const {email, password} = action.data
    let errorMessage = ""
    try {
        yield put({type: actionType.LOGIN_START});
        const authData = yield auth.signInWithEmailAndPassword(email, password)
        if (authData) {
            fireAlertRegister("Hi... Welcome...!")
            const user = yield auth.currentUser.getIdToken(true)
            const jwt = parseJwt(user)
            localStorage.setItem("tenantId", jwt.tenantId);
            localStorage.setItem("shopType", jwt.shopType);
            action.makeAuthenticated(true)
            action.history.push("/")
            yield put({
                type: actionType.LOGIN_SUCCESS,
                data: jwt,
            })
        }
    } catch (error) {
        switch (error.code) {
            case actionType.ERROR_INVALID_EMAIL:
                errorMessage = "Email or Password is incorrect, Try Again !"
                break
            case actionType.ERROR_INVALID_PASSWORD:
                errorMessage = "Email or Password is incorrect, Try Again !"
                break
            case actionType.ERROR_USER_DISABLED:
                errorMessage = "User with this email has been archived"
                break
            default:
                errorMessage = "Email or Password is incorrect, Try Again !"
                break
        }
        yield put({type: actionType.LOGIN_FAILED, error: errorMessage})
    } finally {
        yield put({type: actionType.LOGIN_END});
    }
}

function* watchRegisterSagas() {
    yield takeLatest(actionType.REGISTER_CALLER, registerCaller)
    yield takeLatest(actionType.LOGIN_CALLER, loginCaller)

}

const registerSaga = [watchRegisterSagas];
export default registerSaga;
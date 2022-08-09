import {put, takeLatest} from "redux-saga/effects";
import * as actionTypes from "../categoryRedux/categoryActionTypes";
import {createRequest} from "../../util/function/axiosRequest";
import {fireAlertMessage, fireAlertRegister} from "../../util/error/errorMessage";


export function* categoryCaller(action) {
    try {
        yield put({type: actionTypes.ADD_CATEGORY_START});
        const formData = new FormData();
        formData.append('title', action.data.title)
        formData.append('image', action.data.icon);
        formData.append('type', action.data.type);
        action.data.children.forEach(item => {
            formData.append(`children[]`, JSON.stringify(item));
        });
        const Axios = yield createRequest();
        const res = yield Axios.post("category", formData);
        if (res) {
            yield put({type: actionTypes.GET_ALL_CATEGORY_CALLER});
            fireAlertRegister("Category Created!");
            action.closeDrawer()
        }
    } catch (error) {
        fireAlertMessage("Something went wrong!");
        yield put({type: actionTypes.ADD_CATEGORY_FAILED});
    } finally {
        yield put({type: actionTypes.ADD_CATEGORY_END});
    }
}

export function* getCategoryCaller(action) {
    try {
        const Axios = yield createRequest();
        const res = yield Axios.get("category");
        if (res.status === 200) {
            yield put({
                type: actionTypes.GET_ALL_CATEGORY_SUCCESS,
                data: res.data
            })
        }
    } catch (error) {
        console.log(error)
        fireAlertMessage("Something went wrong!");
    }
}

function* watchCategorySagas() {
    yield takeLatest(actionTypes.ADD_CATEGORY_CALLER, categoryCaller)
    yield takeLatest(actionTypes.GET_ALL_CATEGORY_CALLER, getCategoryCaller)

}

const categorySaga = [watchCategorySagas];
export default categorySaga;
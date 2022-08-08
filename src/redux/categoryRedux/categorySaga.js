import {put, takeLatest} from "redux-saga/effects";
import * as actionTypes from "../categoryRedux/categoryActionTypes";
import {createRequest} from "../../util/function/axiosRequest";


export function* categoryCaller(action) {
    console.log(action)
    console.log(action.data)
    try {

        yield put({type: actionTypes.ADD_CATEGORY_START});
        const formData = new FormData();
        formData.append('title', action.data.title)
        formData.append('image', action.data.icon);
        action.data.children.forEach(item => {
            formData.append(`children[]`, JSON.stringify(item));
        });
        const Axios = yield createRequest();
        const res = yield Axios.post("category", formData);
        if (res) {
            console.log(res)
        }
    } catch (error) {

    }
}

function* watchCategorySagas() {
    yield takeLatest(actionTypes.ADD_CATEGORY_CALLER, categoryCaller)

}

const categorySaga = [watchCategorySagas];
export default categorySaga;
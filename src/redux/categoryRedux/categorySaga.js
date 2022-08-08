import {takeLatest} from "redux-saga/effects";
import * as actionTypes from "../categoryRedux/categoryActionTypes";

// eslint-disable-next-line require-yield
export function* categoryCaller(action) {
    console.log(action)
}

function* watchCategorySagas() {
    yield takeLatest(actionTypes.ADD_CATEGORY_CALLER, categoryCaller)

}

const categorySaga = [watchCategorySagas];
export default categorySaga;
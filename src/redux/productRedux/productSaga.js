import {takeLatest} from "redux-saga/effects"
import {ADD_PRODUCT_CALLER} from "./actionTypes";
// eslint-disable-next-line require-yield
export function* addProductCaller(action) {
    console.log(action)

}


function* watchProductSagas() {
    yield takeLatest(ADD_PRODUCT_CALLER, addProductCaller)

}



const productSagas = [watchProductSagas];

export default productSagas;
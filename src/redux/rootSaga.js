import {all, fork} from "redux-saga/effects"
import productSagas from "./productRedux/productSaga";

export default function* rootSaga() {
    console.log('rootSaga')
    yield all(productSagas.map(s => fork(s)))
}
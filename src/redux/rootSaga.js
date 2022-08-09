import {all, fork} from "redux-saga/effects"
import productSagas from "./productRedux/productSaga";
import categorySaga from "./categoryRedux/categorySaga";
import registerSaga from "./authRedux/authSaga";

export default function* rootSaga() {
    yield all(productSagas.map(s => fork(s)));
    yield all(categorySaga.map(s => fork(s)));
    yield all(registerSaga.map(s => fork(s)));
}
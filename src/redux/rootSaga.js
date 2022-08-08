import {all, fork} from "redux-saga/effects"
import productSagas from "./productRedux/productSaga";
import categorySaga from "./categoryRedux/categorySaga";
import registerSata from "./authRedux/authSaga";

export default function* rootSaga() {
    yield all(productSagas.map(s => fork(s)));
    yield all(categorySaga.map(s => fork(s)));
    yield all(registerSata.map(s => fork(s)));
}
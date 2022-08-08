import {combineReducers} from "redux"
import {productReducer} from "./productRedux/productReducer";
import {categoryReducer} from "./categoryRedux/categoryReducer";
import {authReducer} from "./authRedux/authReducer";


export default combineReducers({
    productReducer,
    categoryReducer,
    authReducer
})
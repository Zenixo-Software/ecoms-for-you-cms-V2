import * as actionTypes from "./actionTypes"

const initialState = {
    loading: false,
}

export function productReducer(state = initialState, actions) {
    switch (actions.type) {
        case actionTypes.ADD_PRODUCT_CALLER:
            console.log("Add Product")
            return{
                ...state,
                loading: false
            }
        case actionTypes.GET_ALL_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false
            }
        default:
            return {
                ...state
            }
    }
}

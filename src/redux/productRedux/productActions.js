import * as actionTypes from "./actionTypes"

export const addProductAction = (data) => {
    return {
        type: actionTypes.ADD_PRODUCT_CALLER,
        data
    }
}

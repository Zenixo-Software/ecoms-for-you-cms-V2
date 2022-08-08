import * as actionTypes from './categoryActionTypes'

export const categoryCallerAction = (data) => {
    return {
        type: actionTypes.ADD_CATEGORY_CALLER,
        data
    }
}
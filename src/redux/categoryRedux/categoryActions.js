import * as actionTypes from './categoryActionTypes'

export const categoryCallerAction = (data, closeDrawer) => {
    return {
        type: actionTypes.ADD_CATEGORY_CALLER,
        data,
        closeDrawer
    }
}
import * as actionTypes from './categoryActionTypes'

export const categoryCallerAction = (data, closeDrawer) => {
    return {
        type: actionTypes.ADD_CATEGORY_CALLER,
        data,
        closeDrawer
    }
}

export const getCategoryCallerAction = (data) => {
    return {
        type: actionTypes.GET_ALL_CATEGORY_CALLER,
        data
    }
}

export const editCategoryCallerAction = (data, closeDrawer) => {
    return {
        type: actionTypes.EDIT_CATEGORY_CALLER,
        data,
        closeDrawer
    }
}

export const deleteCategoryCallerAction = (data) => {
    return {
        type: actionTypes.CATEGORY_DELETE_CALLER,
        data,
    }
}

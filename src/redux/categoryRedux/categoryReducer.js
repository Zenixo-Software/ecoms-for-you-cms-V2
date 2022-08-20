import * as actionTypes from './categoryActionTypes'

const initialState = {
    title: '',
    icon: '',
    children: [],
    loading: false,
    error: false,
    categories: [],
    openModel : false,
    isAnswered : true
}

export function categoryReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.ADD_CATEGORY_CALLER:
            return {
                ...state
            }
        case actionTypes.ADD_CATEGORY_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.ADD_CATEGORY_END:
            return {
                ...state,
                loading: false
            }
        case actionTypes.ADD_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false
            }
        case actionTypes.ADD_CATEGORY_FAILED:
            return {
                ...state,
                loading: true,
                error: true
            }
        case actionTypes.GET_ALL_CATEGORY_CALLER:
            return {
                ...state,
                loading: true,
                error: false,
            }
        case actionTypes.GET_ALL_CATEGORY_SUCCESS:
            console.log(action.data)
            return {
                ...state,
                loading: false,
                categories: action.data,
            }
        case actionTypes.GET_ALL_CATEGORY_FAILED:
            return {
                ...state,
                loading: true
            }
        case actionTypes.EDIT_CATEGORY_CALLER:
            return {
                ...state
            }
        case actionTypes.EDIT_CATEGORY_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.EDIT_CATEGORY_END:
            return {
                ...state,
                loading: false,
            }
        case actionTypes.EDIt_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false
            }
        case actionTypes.EDIT_CATEGORY_FAILED:
            return {
                ...state,
                loading: true,
                error: true
            }
        case actionTypes.CATEGORY_REMOVE_MODEL_OPEN:
            return {
                ...state,
                openModel: true
            }
        case actionTypes.CATEGORY_REMOVE_MODEL_CLOSE:
            return {
                ...state,
                openModel: false
            }
        case actionTypes.IS_ANSWERED_SUCCESS:
            return {
                ...state,
                isAnswered: true,
                openModel: false
            }
        case actionTypes.IS_ANSWERED_FAILED:
            return {
                isAnswered: false,
                openModel: false
            }
        case actionTypes.CATEGORY_DELETE_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.CATEGORY_DELETE_END:
            return {
                ...state,
                loading: false
            }
        case actionTypes.CATEGORY_DELETE_CALLER:
            return {
                ...state,
            }
        case actionTypes.CATEGORY_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false
            }
        case actionTypes.CATEGORY_DELETE_FAILED:
            return {
                ...state,
                loading: true,
                error: true
            }
        default:
            return {
                ...state
            }
    }
}
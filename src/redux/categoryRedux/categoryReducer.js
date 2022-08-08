import * as actionTypes from './categoryActionTypes'

const initialState = {
    title: '',
    icon: '',
    children: [],
    loading: false,
    error: false,
    category: []
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
            return {
                ...state,
                category: action.data,
                loading: false
            }
        case actionTypes.GET_ALL_CATEGORY_FAILED:
            return {
                ...state,
                loading: true
            }
        default:
            return {
                ...state
            }
    }
}
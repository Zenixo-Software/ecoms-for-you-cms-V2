import * as actionTypes from './categoryActionTypes'
const initialState = {
    title: '',
    icon: '',
    children:[],
    loading: false,
    error: false
}

export function categoryReducer(state=initialState,action){
    switch (action.type) {
        case actionTypes.ADD_CATEGORY_CALLER:
            return{
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
        default:
            return {
                ...state
            }
    }
}
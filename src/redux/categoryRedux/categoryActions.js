import * as actionTypes from './categoryActionTypes'

export const categoryCallerAction = (date) => {
  return{
      type: actionTypes.ADD_CATEGORY_CALLER,
      date
  }
}
import { put, takeLatest } from "redux-saga/effects";
import * as actionTypes from "../categoryRedux/categoryActionTypes";
import { createAxiosNewRequest,createRequest } from "../../util/function/axiosRequest";
import {
  fireAlertMessage,
  fireAlertRegister,
} from "../../util/error/errorMessage";
import axiosInstance from "../../util/function/axiosInstance";

export function* addCategoryCaller(action) {
  try {
    console.log("CategorySaga", action);
    yield put({ type: actionTypes.ADD_CATEGORY_START });
    const formData = new FormData();
    formData.append("title", action.data.title);
    formData.append("image", action.data.icon);
    formData.append("type", action.data.type);
    formData.append("tenantId", localStorage.getItem("cmsUserId"));
    action.data.children.forEach((e, index) => {
      formData.append(`children[${index}][title]`, e["title"]);
      formData.append(`children[${index}][type]`, e["type"]);
    });
    axiosInstance
      .post("category", formData)
      .then((response) => {
        fireAlertRegister("Category Created!");
        action.closeDrawer();
      })
      .catch((error) => {
        console.log(error);
        fireAlertMessage("Something went wrong!");
      });
  } catch (error) {
    fireAlertMessage("Something went wrong!");
    yield put({ type: actionTypes.ADD_CATEGORY_FAILED });
  } finally {
    yield put({ type: actionTypes.ADD_CATEGORY_END });
  }
}

export function* editCategoryCaller(action) {
  try {
    yield put({ type: actionTypes.EDIT_CATEGORY_START });
    const formData = new FormData();
    formData.append("title", action.data.title);
    formData.append("image", action.data.icon);
    formData.append("type", action.data.type);
    action.data.children.forEach((e, index) => {
      formData.append(`children[${index}][title]`, e["title"]);
      formData.append(`children[${index}][type]`, e["type"]);
    });
    const Axios = yield createRequest();

    const res = yield Axios.patch(`category/${action.data.id}`, formData);
    if (res) {
      yield put({ type: actionTypes.GET_ALL_CATEGORY_CALLER });
      fireAlertRegister("Category Edited!");
      action.closeDrawer();
    }
  } catch (error) {
    fireAlertMessage("Something went wrong!");
    yield put({ type: actionTypes.EDIT_CATEGORY_FAILED });
  } finally {
    yield put({ type: actionTypes.EDIT_CATEGORY_END });
  }
}

export function* getCategoryCaller(action) {
  console.log(action);
  try {
    const Axios = yield createAxiosNewRequest();
    const res = yield Axios.get(`category/${localStorage.getItem('cmsUserId')}`)
    if (res.status === 200) {
      yield put({
        type: actionTypes.GET_ALL_CATEGORY_SUCCESS,
        data: res.data,
      });
    }
  } catch (error) {
    console.log(error);
    fireAlertMessage("Something went wrong!");
  }
}

export function* deleteCategoryCaller(action) {
  try {
    const id = action.data;
    yield put({ type: actionTypes.CATEGORY_DELETE_START });
    const Axios = yield createRequest();
    const res = yield Axios.delete(`category/${id}`);
    if (res.status === 200) {
      yield put({ type: actionTypes.GET_ALL_CATEGORY_CALLER });
      fireAlertRegister("Category Deleted!");
    }
  } catch (error) {
    fireAlertMessage("Something went wrong!");
    yield put({ type: actionTypes.CATEGORY_DELETE_FAILED });
  } finally {
    yield put({ type: actionTypes.CATEGORY_DELETE_END });
    yield put({ type: actionTypes.CATEGORY_REMOVE_MODEL_CLOSE });
  }
}

function* watchCategorySagas() {
  yield takeLatest(actionTypes.ADD_CATEGORY_CALLER, addCategoryCaller);
  yield takeLatest(actionTypes.GET_ALL_CATEGORY_CALLER, getCategoryCaller);
  yield takeLatest(actionTypes.EDIT_CATEGORY_CALLER, editCategoryCaller);
  yield takeLatest(actionTypes.CATEGORY_DELETE_CALLER, deleteCategoryCaller);
}

const categorySaga = [watchCategorySagas];
export default categorySaga;

import { put, call, takeLatest, select } from "redux-saga/effects";
// import {delay} from "redux-saga";
import {
  LOAD_SAVED,
  LOAD_SAVED_FULFILLED,
  LOAD_SAVED_FAILED,
  LOADING_SAVED
} from "../actions/saved.action";
import SavedApi from "../api/saved.api";

function* loadList() {
  yield put({ type: LOADING_SAVED });
  try {
    const { currentUser } = yield select(state => state.userInfo);
    const { switchUserID } = yield select(state => state.userInfo);
    const data = yield call(SavedApi.getList, (switchUserID == null) ? currentUser.customerID : switchUserID);
    yield put({ type: LOAD_SAVED_FULFILLED, savedList: data });
  } catch (error) {
    console.log(error);
    yield put({ type: LOAD_SAVED_FAILED, savedError: "Error" });
  }
}

export function* watchSavedSagasAsync() {
  yield [takeLatest(LOAD_SAVED, loadList)];
}

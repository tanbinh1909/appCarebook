import { put, call, takeLatest, select } from "redux-saga/effects";
import {
  SEARCH_REQUESTED,
  SEARCH_FULFILLED,
  SEARCH_MORE_REQUESTED
} from "../actions/search.action";
import Api from "../api/api";

getPaginationParams = state => {
  return {
    firstResult: state.search.firstResult,
    maxResult: state.search.maxResult,
    totalRecord: state.search.totalRecord
  };
};

function* searchMore(action) {
  let { params } = action;
  const paginationParams = yield select(getPaginationParams);
  const firstResult = paginationParams.maxResult;
  const maxResult = firstResult + 10;
  params = { ...params, firstResult, maxResult };
  try {
    const res = yield call(Api.search, params);
    yield put({
      type: SEARCH_FULFILLED,
      elements: res.hospitalAndDoctorConfic || [],
      totalRecord: res.totalRecord,
      firstResult,
      maxResult
    });
  } catch (error) {}
}

function* search(action) {
  let { params } = action;
  const firstResult = 0;
  const maxResult = 10;
  params = { ...params, firstResult, maxResult };
  try {
    const res = yield call(Api.search, params);
    yield put({
      type: SEARCH_FULFILLED,
      elements: res.hospitalAndDoctorConfic || [],
      totalRecord: res.totalRecord,
      firstResult,
      maxResult
    });
  } catch (error) {}
}

export function* watchSearchSagasAsync() {
  yield [
    takeLatest(SEARCH_REQUESTED, search),
    takeLatest(SEARCH_MORE_REQUESTED, searchMore)
  ];
}

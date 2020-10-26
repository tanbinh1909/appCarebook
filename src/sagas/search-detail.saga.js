import { put, call, takeLatest, select } from "redux-saga/effects";
import { delay } from "redux-saga";
import {
  // LOADING_DETAIL,
  // LOAD_DETAIL_FAILED,
  // LOAD_DETAIL_FULFILLED,
  // LOAD_DETAIL,
  // BOOKMARKING,
  // TOGGLE_BOOKMARK,
  // TOGGLE_BOOKMARK_FULFILLED,
  // TOGGLE_BOOKMARK_FAILED,
  // RELOAD_COMMENTS,
  // RELOAD_COMMENTS_FULFILLED,
  // RELOAD_COMMENTS_FAILED,
  LOADING_SEARCH_DETAIL,
  LOAD_SEARCH_DETAIL_FULFILLED,
  LOAD_SEARCH_DETAIL_FAILED,
  LOAD_SEARCH_DETAIL,
  SEARCH_DETAIL_TOGGLE_BOOKMARKING,
  SEARCH_DETAIL_TOGGLE_BOOKMARK,
  SEARCH_DETAIL_TOGGLE_BOOKMARK_FULFILLED,
  SEARCH_DETAIL_TOGGLE_BOOKMARK_FAILED
} from "../actions/search-detail.action";
import Api from "../api/api";
import FeedsApi from "../api/feeds.api";

function* loadSearchDetail({ detailID }) {
  yield put({ type: LOADING_SEARCH_DETAIL });
  try {
    const { currentUser } = yield select(state => state.userInfo);
    const data = yield call(
      Api.fetchDetails,
      detailID,
      currentUser.customerID
    );
    if (data.bookmarked) {
      yield put({ type: SEARCH_DETAIL_TOGGLE_BOOKMARKING });
    } else {
      yield put({ type: SEARCH_DETAIL_TOGGLE_BOOKMARK_FULFILLED });
    }

    const comments = yield call(Api.fetchShopComments, detailID);
    yield put({
      type: LOAD_SEARCH_DETAIL_FULFILLED,
      details: data,
      comments
    });
  } catch (error) {
    yield put({ type: LOAD_SEARCH_DETAIL_FAILED, detailError: "Error" });
  }
}

function* toggleBookmark({ detailID, bookmarked }) {
  yield put({ type: SEARCH_DETAIL_TOGGLE_BOOKMARKING });
  try {
    const { currentUser } = yield select(state => state.userInfo);
    if (bookmarked) {
      yield call(FeedsApi.unbookmark, currentUser.customerID, detailID);
      yield put({ type: SEARCH_DETAIL_TOGGLE_BOOKMARK_FULFILLED });
    } else {
      yield call(FeedsApi.bookmark, currentUser.customerID, detailID);
      yield put({ type: SEARCH_DETAIL_TOGGLE_BOOKMARKING });
    }
  } catch (error) {
    yield put({ type: SEARCH_DETAIL_TOGGLE_BOOKMARK_FAILED });
  }
}

export function* watchSearchDetailsSagasAsync() {
  yield [
    takeLatest(LOAD_SEARCH_DETAIL, loadSearchDetail),
    takeLatest(SEARCH_DETAIL_TOGGLE_BOOKMARK, toggleBookmark),
  ];
}

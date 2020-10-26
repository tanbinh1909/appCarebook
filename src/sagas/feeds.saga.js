import { put, call, takeLatest, select } from "redux-saga/effects";
import { delay } from "redux-saga";
import {
  LOADING_NEXTFEED,
  LOAD_NEXTFEED_FULFILLED,
  LOAD_NEXTFEED_FAILED,
  LOAD_NEXTFEED,
  LOADING_DETAIL,
  LOAD_DETAIL_FAILED,
  LOAD_DETAIL_FULFILLED,
  LOAD_DETAIL,
  BOOKMARKING,
  TOGGLE_BOOKMARK,
  TOGGLE_BOOKMARK_FULFILLED,
  TOGGLE_BOOKMARK_FAILED,
  RELOAD_COMMENTS,
  RELOAD_COMMENTS_FULFILLED,
  RELOAD_COMMENTS_FAILED
} from "../actions/feeds.action";
import {
  // LOAD_ARTICLES, 
  LOAD_ARTICLES_FULFILLED
} from "../actions/home.action";
import FeedsApi from "../api/feeds.api";

function* loadNextFeedDetail({ feedId }) {
  yield put({ type: LOADING_NEXTFEED });
  try {
    const { currentUser } = yield select(state => state.userInfo);
    const data = yield call(
      FeedsApi.getNextFeed,
      currentUser.customerID,
      feedId
    );
    yield put({
      type: LOAD_NEXTFEED_FULFILLED,
      nextFeed: data || {}
    });
  } catch (error) {
    yield put({ type: LOAD_NEXTFEED_FAILED, nextFeedError: "Error" });
  }
}

function* loadfeedDetail({ feedId }) {
  yield put({ type: LOADING_DETAIL });
  try {
    const { currentUser } = yield select(state => state.userInfo);
    const data = yield call(
      FeedsApi.getFeedDetail,
      currentUser.customerID,
      feedId
    );
    if (data.bookmarked) {
      yield put({ type: BOOKMARKING });
    } else {
      yield put({ type: TOGGLE_BOOKMARK_FULFILLED });
    }

    const comments = yield call(FeedsApi.getFeedComments, feedId);
    yield put({
      type: LOAD_DETAIL_FULFILLED,
      feed: data,
      comments
    });
  } catch (error) {
    yield put({ type: LOAD_DETAIL_FAILED, feedError: "Error" });
  }
}

function* reloadComments({ feedId }) {
  try {
    const comments = yield call(FeedsApi.getFeedComments, feedId);
    yield put({
      type: RELOAD_COMMENTS_FULFILLED,
      comments
    });
  } catch (error) {
    yield put({ type: RELOAD_COMMENTS_FAILED, feedError: "Error" });
  }
}

function* toggleBookmark({ feedId, bookmarked }) {
  yield put({ type: BOOKMARKING });
  try {
    const { currentUser } = yield select(state => state.userInfo);
    const { currentCategoryID } = yield select(state => state.home);
    const { articles } = yield select(state => state.home);

    // if (bookmarked) {
    //   yield call(FeedsApi.unbookmark, currentUser.customerID, feedId);
    //   yield put({ type: TOGGLE_BOOKMARK_FULFILLED });
    // } else {
    //   yield call(FeedsApi.bookmark, currentUser.customerID, feedId);
    //   yield put({ type: BOOKMARKING });
    // }
    // yield call(loadfeedDetail, { feedId }); // reload feed detail with bookmark updated
    // if (currentCategoryID) {
    //   yield put({ type: LOAD_ARTICLES, categoryId: currentCategoryID });
    // }
    yield call(FeedsApi.bookmark, currentUser.customerID, feedId);
    yield put({ type: BOOKMARKING });

    if (articles) {
      yield put({
        type: LOAD_ARTICLES_FULFILLED,
        articles: articles.map(item => {
          if (item.id === feedId) {
            item.bookmarked = !item.bookmarked;
          }
          return item;
        })
      });
    }
  } catch (error) {
    yield put({ type: TOGGLE_BOOKMARK_FAILED });
  }
}

export function* watchFeedsSagasAsync() {
  yield [
    takeLatest(LOAD_NEXTFEED, loadNextFeedDetail),
    takeLatest(LOAD_DETAIL, loadfeedDetail),
    takeLatest(TOGGLE_BOOKMARK, toggleBookmark),
    takeLatest(RELOAD_COMMENTS, reloadComments)
  ];
}

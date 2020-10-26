import { put, call, takeLatest, select } from "redux-saga/effects";
import {
  LOADING_CATEGORIES,
  LOAD_CATEGORIES_FULFILLED,
  LOAD_CATEGORIES_FAILED,
  LOAD_CATEGORIES,
  LOADING_ARTICLES,
  LOAD_ARTICLES_FULFILLED,
  LOAD_ARTICLES_FAILED,
  LOAD_ARTICLES,
  TOGGLE_BOOKMARK
} from "../actions/home.action";
import {
  BOOKMARKING,
  TOGGLE_BOOKMARK_FULFILLED,
  TOGGLE_BOOKMARK_FAILED
} from "../actions/feeds.action";

import HomeApi from "../api/home.api";
import FeedsApi from "../api/feeds.api";

function* loadCategories() {
  yield put({ type: LOADING_CATEGORIES });
  try {
    const data = yield call(HomeApi.getCategories, {});
    const _categories = data;
    yield put({ type: LOAD_CATEGORIES_FULFILLED, categories: _categories });
    if (_categories && _categories.length > 0) {
      yield call(loadArticles, {
        categoryId: _categories[0].id
      });
    }
  } catch (error) {
    console.log(error);
    yield put({ type: LOAD_CATEGORIES_FAILED, categoriesError: "Error" });
  }
}
function* loadArticles({ categoryId }) {
  yield put({ type: LOADING_ARTICLES });
  try {
    const { currentUser } = yield select(state => state.userInfo);
    const data = yield call(HomeApi.getArticles, currentUser.customerID, {
      categoryId,
      firstResource: 0
    });
    const articles = data.listPostContent.filter(item => item.accept);
    yield put({
      type: LOAD_ARTICLES_FULFILLED,
      articles: articles,
      currentCategoryID: categoryId
    });
  } catch (error) {
    yield put({ type: LOAD_ARTICLES_FAILED, articlesError: "Error" });
  }
}

function* toggleBookmark({ feedId, bookmarked }) {
  yield put({ type: BOOKMARKING });
  try {
    const { currentUser } = yield select(state => state.userInfo);
    const { articles } = yield select(state => state.home);
    if (bookmarked) {
      yield call(FeedsApi.unbookmark, currentUser.customerID, feedId);
    } else {
      yield call(FeedsApi.bookmark, currentUser.customerID, feedId);
    }
    yield put({ type: TOGGLE_BOOKMARK_FULFILLED });

    // update the bookmarked/unbookmarked feed on reducer (not call api to reload)

    yield put({
      type: LOAD_ARTICLES_FULFILLED,
      articles: articles.map(item => {
        if (item.id === feedId) {
          item.bookmarked = !item.bookmarked;
        }
        return item;
      })
    });
  } catch (error) {
    yield put({ type: TOGGLE_BOOKMARK_FAILED });
  }
}

export function* watchHomeSagasAsync() {
  yield [
    takeLatest(LOAD_CATEGORIES, loadCategories),
    takeLatest(LOAD_ARTICLES, loadArticles),
    takeLatest(TOGGLE_BOOKMARK, toggleBookmark)
  ];
}

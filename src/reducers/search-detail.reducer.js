import {
  LOADING_SEARCH_DETAIL,
  LOAD_SEARCH_DETAIL_FULFILLED,
  LOAD_SEARCH_DETAIL_FAILED,
  SEARCH_DETAIL_TOGGLE_BOOKMARKING,
  SEARCH_DETAIL_TOGGLE_BOOKMARK_FULFILLED,
  SEARCH_DETAIL_TOGGLE_BOOKMARK_FAILED,
} from "../actions/search-detail.action";

const initState = {
  details: {},
  loading: false,
  detailError: null,
  bookmarking: false,
  comments: []
};

export default function searchDetailReducer(state = initState, action) {
  switch (action.type) {
    case LOADING_SEARCH_DETAIL:
      return Object.assign({}, state, {
        details: {},
        loading: true,
        loaded: false,
        detailError: null
      });
    case LOAD_SEARCH_DETAIL_FULFILLED:
      return Object.assign({}, state, {
        details: action.details,
        loading: false,
        loaded: true,
        detailError: null,
        comments: action.comments
      });
    case LOAD_SEARCH_DETAIL_FAILED:
      return Object.assign({}, state, {
        details: {},
        loading: false,
        loaded: true,
        detailError: action.detailError
      });
    case SEARCH_DETAIL_TOGGLE_BOOKMARKING:
      return Object.assign({}, state, {
        bookmarking: true
      });
    case SEARCH_DETAIL_TOGGLE_BOOKMARK_FULFILLED:
      return Object.assign({}, state, {
        bookmarking: false
      });
    case SEARCH_DETAIL_TOGGLE_BOOKMARK_FAILED:
      return Object.assign({}, state, {
        bookmarking: false
      });
    default:
      return state;
  }
}

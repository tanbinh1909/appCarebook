import {
  LOADING_NEXTFEED,
  LOAD_NEXTFEED_FULFILLED,
  LOAD_NEXTFEED_FAILED,
  LOADING_DETAIL,
  LOAD_DETAIL_FULFILLED,
  LOAD_DETAIL_FAILED,
  BOOKMARKING,
  TOGGLE_BOOKMARK_FULFILLED,
  TOGGLE_BOOKMARK_FAILED,
  RELOAD_COMMENTS_FULFILLED
} from "../actions/feeds.action";

const initState = {
  nextFeed: {},
  nextFeedLoading: false,
  nextFeedLoaded: false,
  nextFeedError: null,
  feed: {},
  feedLoading: false,
  feedLoaded: false,
  feedError: null,
  bookmarking: false,
  comments: []
};

export default function feedsReducer(state = initState, action) {
  switch (action.type) {
    case LOADING_NEXTFEED:
      return Object.assign({}, state, {
        nextFeed: {},
        nextFeedLoading: true,
        nextFeedLoaded: false,
        nextFeedError: null
      });
    case LOAD_NEXTFEED_FULFILLED:
      return Object.assign({}, state, {
        nextFeed: action.nextFeed,
        nextFeedLoading: false,
        nextFeedLoaded: true,
        nextFeedError: null
      });
    case LOAD_NEXTFEED_FAILED:
      return Object.assign({}, state, {
        nextFeed: {},
        nextFeedLoading: false,
        nextFeedLoaded: true,
        nextFeedError: action.nextFeedError
      });
    case LOADING_DETAIL:
      return Object.assign({}, state, {
        feed: {},
        feedLoading: true,
        feedLoaded: false,
        feedError: null
      });
    case LOAD_DETAIL_FULFILLED:
      return Object.assign({}, state, {
        feed: action.feed,
        feedLoading: false,
        feedLoaded: true,
        feedError: null,
        comments: action.comments
      });
    case LOAD_DETAIL_FAILED:
      return Object.assign({}, state, {
        feed: {},
        feedLoading: false,
        feedLoaded: true,
        feedError: action.feedError
      });
    case BOOKMARKING:
      return Object.assign({}, state, {
        bookmarking: true
      });
    case TOGGLE_BOOKMARK_FULFILLED:
      return Object.assign({}, state, {
        bookmarking: false
      });
    case TOGGLE_BOOKMARK_FAILED:
      return Object.assign({}, state, {
        bookmarking: false
      });
    case RELOAD_COMMENTS_FULFILLED:
      return Object.assign({}, state, {
        comments: action.comments
      });
    default:
      return state;
  }
}

import {
  SEARCH_REQUESTED,
  SEARCH_FULFILLED,
  SEARCH_FAILED,
  SEARCH_TYPE_CHANGED,
  SEARCH_MORE_REQUESTED
} from "../actions/search.action";

const initState = {
  elements: [],
  totalRecord: 0,
  loading: false,
  loadFailed: false,
  refreshing: false,
  loadingMore: false,
  firstResult: 0,
  maxResult: 0
};

export default function searchReducer(state = initState, action) {
  switch (action.type) {
    case SEARCH_REQUESTED:
      return {
        ...state,
        elements: [],
        loading: true,
        loadFailed: false,
        refreshing: false
      };
    case SEARCH_MORE_REQUESTED:
      return {
        ...state,
        loadingMore: true,
        loading: false,
        loadFailed: false,
        refreshing: false
      };
    case SEARCH_FULFILLED:
      return {
        ...state,
        elements: [...state.elements, ...action.elements],
        totalRecord: action.totalRecord,
        firstResult: action.firstResult,
        maxResult: action.maxResult,
        loading: false,
        loadingMore: false,
        loadFailed: false,
        refreshing: false
      };
    case SEARCH_FAILED:
      return {
        ...state,
        loading: false,
        loadingMore: false,
        loadFailed: true,
        refreshing: false
      };
    case SEARCH_TYPE_CHANGED:
      return {
        ...state,
        elements: [],
        totalRecord: 0,
        firstResult: 0,
        maxResult: 0,
        loadingMore: false,
        loading: false,
        loadFailed: false,
        refreshing: false
      };
    default:
      return state;
  }
}

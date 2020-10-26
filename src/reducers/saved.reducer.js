import {
  LOAD_SAVED_FULFILLED,
  LOAD_SAVED_FAILED,
  LOADING_SAVED
} from "../actions/saved.action";

const initState = {
  savedList: [],
  loading: false,
  loaded: false,
  savedError: null
};

export default function savedReducer(state = initState, action) {
  switch (action.type) {
    case LOADING_SAVED:
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        savedError: null
      });
    case LOAD_SAVED_FULFILLED:
      return Object.assign({}, state, {
        savedList: action.savedList,
        loading: false,
        loaded: true,
        savedError: null
      });
    case LOAD_SAVED_FAILED:
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        savedError: action.savedError
      });
    default:
      return state;
  }
}

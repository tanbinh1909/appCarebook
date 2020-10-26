import { put, call, takeLatest, select } from "redux-saga/effects";
import {
  LOAD_CURRENT_USER,
  SET_CURRENT_USER,
  LOADING_CURRENT_USER,
  ADD_RELATIONSHIP,
  ADDING_RELATIONSHIP,
  ADD_RELATIONSHIP_SUCCESS,
  ADD_RELATIONSHIP_FAILED,
  CHANGE_ACCOUNT,
  REMOVE_SWITCH_ACCOUNT,
  REMOVE_ACCOUNT,
  ADD_SWITCH_ACCOUNT
} from "../actions/user-info.action";
import {
  resetPage
} from "../actions/nav.action";
import UserApi from "../api/user.api";
import { strings } from "../locate/I18n";

function* loadUserDetail({userID}) {
  try {
    yield put({ type: LOADING_CURRENT_USER, loadingCurrentUser: true });
    // const { currentUser } = yield select(state => state.userInfo);
    const data = yield call(UserApi.getUserDetail, userID);
    yield put({ type: SET_CURRENT_USER, currentUser: data });
  } catch (error) {
    // TODO
    yield put({ type: LOADING_CURRENT_USER, loadingCurrentUser: false });
  }
}

function* changeAccount ({customerID, privilege}) {
  try {
    yield put({ type: ADD_SWITCH_ACCOUNT, switchUserID: customerID, privilege: privilege});
  } catch (e) {
    console.log(e);
  }
}
function* removeChangeAccount ({customerID, privilege}) {
  try {
    yield put({ type: REMOVE_SWITCH_ACCOUNT, switchUserID: customerID, privilege: privilege});
  } catch (e) {
    console.log(e);
  }
}
function* addRelationship ({member}) {
  yield put({ type: ADDING_RELATIONSHIP });
  try {
    const { currentUser } = yield select(state => state.userInfo);
    const data = yield call(UserApi.addMember, currentUser.customerID, member);
    if ("Fail" === data) {
      yield put({ type: ADD_RELATIONSHIP_FAILED, addingError: strings('login.msg_username_pw_incorrect') });
    }
    else {
      yield put({ type: ADD_RELATIONSHIP_SUCCESS });
      yield call(loadUserDetail, {
        userID: currentUser.customerID
      });
    }
  } catch (error) {
    console.log(error);
    yield put({ type: ADD_RELATIONSHIP_FAILED });
  }
}

export function* watchUserSagasAsync() {
  yield [
    takeLatest(LOAD_CURRENT_USER, loadUserDetail),
    takeLatest(ADD_RELATIONSHIP, addRelationship),
    takeLatest(CHANGE_ACCOUNT, changeAccount),
    takeLatest(REMOVE_ACCOUNT, removeChangeAccount)
  ];
}

import { put, call, takeLatest, select } from "redux-saga/effects";
import {
  LOADING_FAMILYILLNESSLIST,
  LOAD_FAMILYILLNESSLIST,
  LOAD_FAMILYILLNESSLIST_FAILED,
  LOAD_FAMILYILLNESSLIST_FULFILLED,
  ADDING,
  ADD,
  ADD_SUCCESS,
  ADD_FAILED
} from "../actions/family-illness-list.action";
import MenuProfileApi from "../api/menu-profile.api";
import { navigateBack } from "../actions/nav.action";

function* loadFamilyIllnessList() {
  yield put({ type: LOADING_FAMILYILLNESSLIST });
  try {
    const { currentUser } = yield select(state => state.userInfo);
    const { switchUserID } = yield select(state => state.userInfo);
    const data = yield call(
      MenuProfileApi.getFamilyIllness,
      (switchUserID == null) ? currentUser.customerID : switchUserID
    );
    yield put({
      type: LOAD_FAMILYILLNESSLIST_FULFILLED,
      familyIllnessList: data
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: LOAD_FAMILYILLNESSLIST_FAILED,
      familyIllnessListError: "Error"
    });
  }
}

function* addFamilyIllness({ quanHe, tenBenh, tenBenhNhan, trangThai, namBiBenh }) {
  yield put({ type: ADDING });
  try {
    const { currentUser } = yield select(state => state.userInfo);
    const { switchUserID } = yield select(state => state.userInfo);
    const userID = (switchUserID == null) ? currentUser.customerID : switchUserID;
    yield call(MenuProfileApi.addFamilyIllness, userID, {
      quanHe,
      tenBenh,
      tenBenhNhan,
      trangThai,
      namBiBenh,
      customerId: userID
    });
    yield put({ type: ADD_SUCCESS });
    yield put(navigateBack());
    yield put({ type: LOAD_FAMILYILLNESSLIST });
  } catch (error) {
    console.log(error);
    yield put({ type: ADD_FAILED, addError: "Error" });
  }
}

export function* watchLoadFamilyIllnessListSagasAsync() {
  yield [
    takeLatest(LOAD_FAMILYILLNESSLIST, loadFamilyIllnessList),
    takeLatest(ADD, addFamilyIllness)
  ];
}

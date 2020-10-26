import { put, call, takeLatest, select } from "redux-saga/effects";
import {
  LOAD_ALLERGIES,
  LOADING_ALLERGIES,
  LOAD_ALLERGIES_FAILED,
  LOAD_ALLERGIES_FULFILLED,
  ADDING_ALLERGY,
  ADD_ALLERGY_SUCCESS,
  ADD_ALLERGY_FAILED,
  ADD_ALLERGY
} from "../actions/allergy.action";
import MenuProfileApi from "../api/menu-profile.api";
import { navigateBack } from "../actions/nav.action";

function* loadAllergies() {
  yield put({ type: LOADING_ALLERGIES });
  try {
    const { currentUser, switchUserID } = yield select(state => state.userInfo);
    const userID = (switchUserID == null) ? currentUser.customerID : switchUserID;
    const data = yield call( MenuProfileApi.getAllergies, userID );
    yield put({ type: LOAD_ALLERGIES_FULFILLED, allergies: data });
  } catch (error) {
    yield put({ type: LOAD_ALLERGIES_FAILED, allergiesError: "Error" });
  }
}

function* addAllergy({ selectedType, allergyName, cause, symptom, trangthai }) {
  yield put({ type: LOADING_ALLERGIES });
  try {
    const { currentUser } = yield select(state => state.userInfo);
    const { switchUserID } = yield select(state => state.userInfo);
    const benhNhanId = (switchUserID == null) ? currentUser.customerID : switchUserID;
    const body = {
      customerId: benhNhanId,
      tenDiUng: allergyName,
      loai: selectedType.name,
      nguyenNhan: cause,
      trieuchung: symptom,
      trangthai: trangthai
    };

    yield call(MenuProfileApi.addAllergy, benhNhanId, body);
    yield put({ type: ADD_ALLERGY_SUCCESS });
    yield put(navigateBack());
    yield put({ type: LOAD_ALLERGIES });
  } catch (error) {
    yield put({ type: ADD_ALLERGY_FAILED, addError: "Error" });
  }
}

export function* watchAllergiesSagasAsync() {
  yield [
    takeLatest(LOAD_ALLERGIES, loadAllergies),
    takeLatest(ADD_ALLERGY, addAllergy)
  ];
}

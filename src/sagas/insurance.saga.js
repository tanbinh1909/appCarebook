import { put, call, takeLatest, select } from "redux-saga/effects";
import {
  LOADING_INSURANCES,
  LOAD_INSURANCES,
  LOAD_INSURANCES_FAILED,
  LOAD_INSURANCES_FULFILLED
} from "../actions/insurance.action";
import MenuProfileApi from "../api/menu-profile.api";

function* loadInsurances() {
  yield put({ type: LOADING_INSURANCES });
  try {
    const { currentUser } = yield select(state => state.userInfo);
    const { switchUserID } = yield select(state => state.userInfo);
    const data = yield call(
      MenuProfileApi.getInsurances,
      (switchUserID == null) ? currentUser.customerID : switchUserID
    );
    yield put({ type: LOAD_INSURANCES_FULFILLED, insurances: data });
  } catch (error) {
    console.log(error);
    yield put({ type: LOAD_INSURANCES_FAILED, insurancesError: "Error" });
  }
}

export function* watchInsurancesSagasAsync() {
  yield [takeLatest(LOAD_INSURANCES, loadInsurances)];
}

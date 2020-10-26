import { put, call, takeLatest, select } from "redux-saga/effects";
import {
  LOADING_VACCINATIONHISTORIES,
  LOAD_VACCINATIONHISTORIES,
  LOAD_VACCINATIONHISTORIES_FAILED,
  LOAD_VACCINATIONHISTORIES_FULFILLED,
  ADDING_VACCINATION,
  ADD_VACCINATION_SUCCESS,
  ADD_VACCINATION_FAILED,
  ADD_VACCINATION
} from "../actions/vaccination-history.action";
import MenuProfileApi from "../api/menu-profile.api";
import {navigateBack} from "../actions/nav.action";

function* loadVaccinationHistories() {
  yield put({ type: LOADING_VACCINATIONHISTORIES });
  try {
    const { currentUser, switchUserID } = yield select(state => state.userInfo);
    const data = yield call(
      MenuProfileApi.getVaccinationHistories,
      (switchUserID == null) ? currentUser.customerID : switchUserID
    );
    yield put({
      type: LOAD_VACCINATIONHISTORIES_FULFILLED,
      vaccinationHistories: data
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: LOAD_VACCINATIONHISTORIES_FAILED,
      vaccinationHistoriesError: "Error"
    });
  }
}

function* addVaccination({ tenTiemChung, lieuLuong, ngaytiem, ngaytiemlai }) {
  yield put({ type: ADDING_VACCINATION });
  try {
    const { currentUser } = yield select(state => state.userInfo);
    const { switchUserID } = yield select(state => state.userInfo);
    const benhNhanId = (switchUserID == null) ? currentUser.customerID : switchUserID;
    const data = {
      tenTiemChung,
      lieuLuong,
      ngaytiem,
      ngaytiemlai,
      customerId : benhNhanId
    };

    yield call(MenuProfileApi.addVaccination, benhNhanId, data);
    yield put({ type: ADD_VACCINATION_SUCCESS });
    yield put(navigateBack());
    yield put({ type: LOAD_VACCINATIONHISTORIES });
  } catch (error) {
    console.log(error);
    yield put({ type: ADD_VACCINATION_FAILED, addError: "Error" });
  }
}

export function* watchVaccinationHistoriesSagasAsync() {
  yield [
      takeLatest(LOAD_VACCINATIONHISTORIES, loadVaccinationHistories),
      takeLatest(ADD_VACCINATION, addVaccination)
    ];
}

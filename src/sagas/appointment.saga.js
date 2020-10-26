import { put, call, takeLatest, select } from "redux-saga/effects";
import {
  LOAD_APPOINTMENTS,
  LOADING_APPOINTMENTS,
  LOAD_APPOINTMENTS_FAILED,
  LOAD_APPOINTMENTS_FULFILLED,
  REFRESH_APPOINTMENTS,
  UPDATING_APPOINTMENT,
  UPDATE_APPOINTMENT,
  UPDATE_APPOINTMENT_SUCCESS,
  UPDATE_APPOINTMENT_FAILED,
  CANCEL_APPOINTMENT_FAILED,
  CANCEL_APPOINTMENT_SUCCESS,
  CANCELING_APPOINTMENT,
  CANCEL_APPOINTMENT
} from "../actions/appointment.action";
import AppointmentApi from "../api/appointment.api";
import {navigateBack} from "../actions/nav.action";
import FormatHelper from "../helpers/format.helper";
import {
  getUser
} from "../helpers/storage.helper";

async function getUserId() {
  const user = await getUser();
  return user && user.userID;
}
function* loadAppointments() {
  yield put({ type: LOADING_APPOINTMENTS });
  const { currentUser, switchUserID } = yield select(state => state.userInfo);
  const userID = yield call(getUserId);

  const customerID = currentUser.customerID ? currentUser.customerID : userID;
  try {
    const listData = [];
    const data = yield call(AppointmentApi.getAppointments, switchUserID || customerID);
    listData = data.sort(function (a, b) {
      return FormatHelper.formatStringAsISO(b.dateStart).localeCompare(FormatHelper.formatStringAsISO(a.dateStart));
    });
    yield put({
      type: LOAD_APPOINTMENTS_FULFILLED,
      appointments: listData || []
    });
  } catch (error) {
    yield put({ type: LOAD_APPOINTMENTS_FAILED, appointmentError: "Error" });
  }
}

function* refreshAppointments() {
  const { currentUser, switchUserID } = yield select(state => state.userInfo);
  const customerID = (switchUserID == null) ? currentUser.customerID : switchUserID;
  try {
    const listData = [];
    const data = yield call(AppointmentApi.getAppointments, customerID);
    listData = data.sort(function (a, b) {
      return FormatHelper.formatStringAsISO(b.dateStart).localeCompare(FormatHelper.formatStringAsISO(a.dateStart));
    });
    yield put({
      type: LOAD_APPOINTMENTS_FULFILLED,
      appointments: listData || []
    });
  } catch (error) {
    yield put({ type: LOAD_APPOINTMENTS_FAILED, appointmentError: "Error" });
  }
}

function* updateAppointments({userId, dataUpdate}) {
  yield put({ type: UPDATING_APPOINTMENT });
  try {
    const { currentUser, switchUserID } = yield select(state => state.userInfo);
    dataUpdate["appointmentUpdate"]["customerId"] = (switchUserID == null) ? currentUser.customerID : switchUserID;
    const userID =  (switchUserID == null) ? currentUser.customerID : switchUserID;
    const result = yield call(AppointmentApi.updateAppointment, userID, dataUpdate);
    yield put({ type: UPDATE_APPOINTMENT_SUCCESS });
    yield put(navigateBack());
    yield put({ type: REFRESH_APPOINTMENTS });
  } catch (error) {
    console.log(error);
    yield put({ type: UPDATE_APPOINTMENT_FAILED, updateError: "Error" });
  }
}


function* cancelAppointments({idEvent}) {
  yield put({ type: CANCELING_APPOINTMENT });
  try {
    const { currentUser, switchUserID } = yield select(state => state.userInfo);
    const result = yield call(AppointmentApi.cancelAppointment, (switchUserID == null) ? currentUser.customerID : switchUserID, idEvent);
    yield put({ type: CANCEL_APPOINTMENT_SUCCESS });
    yield put(navigateBack());
    yield put({ type: REFRESH_APPOINTMENTS });
  } catch (error) {
    console.log(error);
    yield put({ type: CANCEL_APPOINTMENT_FAILED, updateError: "Error" });
  }
}


export function* watchAppointmentSagasAsync() {
  yield [
    takeLatest(LOAD_APPOINTMENTS, loadAppointments),
    takeLatest(REFRESH_APPOINTMENTS, refreshAppointments),
    takeLatest(UPDATE_APPOINTMENT, updateAppointments),
    takeLatest(CANCEL_APPOINTMENT, cancelAppointments)
  ];
}

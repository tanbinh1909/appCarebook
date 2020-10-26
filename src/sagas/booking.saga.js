import { put, call, takeLatest, select } from "redux-saga/effects";
import {
  BOOK_APPOINTMENT,
  BOOKING_APPOINTMENT,
  BOOK_APPOINTMENT_SUCCESS,
  BOOK_APPOINTMENT_FAILED,
  LOADING_BOOK_APPOINTMENT,
  LOAD_BOOK_APPOINTMENT,
  LOAD_BOOK_APPOINTMENT_FAILED,
  LOAD_BOOK_APPOINTMENT_FULFILLED
} from "../actions/booking-modal.action";
import {
  LOAD_APPOINTMENTS
} from "../actions/appointment.action";
import AppointmentApi from "../api/appointment.api";
import Toast from "@remobile/react-native-toast";
import { strings } from '../locate/I18n';
import { navigateBack } from "../actions/nav.action";

function* loadBookAppointment(){
  yield put({ type: LOADING_BOOK_APPOINTMENT });
  try {
    const { currentUser, switchUserID } = yield select(state => state.userInfo);
    const userID = (switchUserID == null) ? currentUser.customerID : switchUserID;
    const data = yield call( AppointmentApi.getAllShop, null);
    yield put({ type: LOAD_BOOK_APPOINTMENT_FULFILLED, bookDataAppointment: data });
  } catch (error) {
    yield put({ type: LOAD_BOOK_APPOINTMENT_FAILED, bookAppointmentError: "Error" });
  }
}

function* bookAppointment({ dataBookAppointment }) {
  yield put({ type: BOOKING_APPOINTMENT });
  try {
    const { currentUser, switchUserID } = yield select(state => state.userInfo);
    const customerId = (switchUserID == null) ? currentUser.customerID : switchUserID;
    const data = yield call(AppointmentApi.bookAppointment, customerId, dataBookAppointment);
    if (data === "Fail") {
      yield put({ type: BOOK_APPOINTMENT_FAILED, addError: "Error" });
    } else {
      Toast.show(strings('booking_modal.msg2'));
      yield put({ type: BOOK_APPOINTMENT_SUCCESS });
      yield put(navigateBack());
      yield put({ type: LOAD_APPOINTMENTS });
    }
  } catch (error) {
    console.log(error);
    yield put({ type: BOOK_APPOINTMENT_FAILED, addError: "Error" });
  }
}

export function* watchBookingSagasAsync() {
  yield [
    takeLatest(LOAD_BOOK_APPOINTMENT, loadBookAppointment),
    takeLatest(BOOK_APPOINTMENT, bookAppointment)
  ];
}

import {
  LOAD_APPOINTMENTS_FAILED,
  LOAD_APPOINTMENTS_FULFILLED,
  LOADING_APPOINTMENTS,
  REFRESH_APPOINTMENTS,
  UPDATING_APPOINTMENT,
  UPDATE_APPOINTMENT_SUCCESS,
  UPDATE_APPOINTMENT_FAILED,
  CANCEL_APPOINTMENT_FAILED,
  CANCEL_APPOINTMENT_SUCCESS,
  CANCELING_APPOINTMENT
} from "../actions/appointment.action";

const initState = {
  appointments: [],
  appointmentsLoading: false,
  appointmentsLoaded: false,
  appointmentsError: null,
  appointmentsRefreshing: false,
  updating: false,
  updated: false,
  updateError: null,
  canceling: false,
  canceled: false,
  cancelError: null
};

export default function appointmentReducer(state = initState, action) {
  switch (action.type) {
    case LOADING_APPOINTMENTS:
      return Object.assign({}, state, {
        appointmentsLoading: true,
        appointmentsLoaded: false,
        appointmentsRefreshing: false,
        appointmentsError: null
      });
    case REFRESH_APPOINTMENTS:
      return Object.assign({}, state, {
        appointmentsLoading: false,
        appointmentsLoaded: false,
        appointmentsRefreshing: true,
        appointmentsError: null
      });
    case LOAD_APPOINTMENTS_FULFILLED:
      return Object.assign({}, state, {
        appointments: action.appointments,
        appointmentsLoading: false,
        appointmentsLoaded: true,
        appointmentsRefreshing: false,
        appointmentsError: null
      });
    case LOAD_APPOINTMENTS_FAILED:
      return Object.assign({}, state, {
        appointmentsLoading: false,
        appointmentsRefreshing: false,
        appointmentsLoaded: true,
        appointmentsError: action.appointmentsError
      });
    case UPDATING_APPOINTMENT:
      return Object.assign({}, state, {
          updating: true,
          updated: false,
          updateError: null
      });
    case UPDATE_APPOINTMENT_SUCCESS:
      return Object.assign({}, state, {
        updating: false,
        updated: true,
        updateError: null
      });
    case UPDATE_APPOINTMENT_FAILED:
      return Object.assign({}, state, {
        updating: false,
        updated: true,
        updateError: action.updateError
      });
    case CANCELING_APPOINTMENT:
      return Object.assign({}, state, {
          canceling: true,
          canceled: false,
          cancelError: null
      });
    case CANCEL_APPOINTMENT_SUCCESS:
      return Object.assign({}, state, {
        canceling: false,
        canceled: true,
        updateError: null
      });
    case CANCEL_APPOINTMENT_FAILED:
      return Object.assign({}, state, {
        canceling: false,
        canceled: true,
        cancelError: action.cancelError
      });
    default:
      return state;
  }
}

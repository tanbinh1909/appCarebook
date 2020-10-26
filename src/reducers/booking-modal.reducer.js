import {
  TOGGLE_MODAL,
  CLOSE_MODAL,
  BOOKING_APPOINTMENT,
  BOOK_APPOINTMENT_SUCCESS,
  BOOK_APPOINTMENT_FAILED,
  LOADING_BOOK_APPOINTMENT,
  LOAD_BOOK_APPOINTMENT_FULFILLED,
  LOAD_BOOK_APPOINTMENT_FAILED,
} from "../actions/booking-modal.action";

const initState = {
  isToggle: false,
  forDoctor: false,
  booking: false,
  booked: false,
  bookError: null,
  toID: null,
  bookDataAppointment: [],
  bookAppointmentLoading: false,
  bookAppointmentLoaded: false,
  bookAppointmentError: null
};

export default function bookingModalReducer(state = initState, action) {
  switch (action.type) {
    case TOGGLE_MODAL:
      return Object.assign({}, state, {
        isToggle: !state.isToggle,
        forDoctor: action.forDoctor,
        toID: action.toID
      });
    case CLOSE_MODAL:
    return Object.assign({}, state, {
      isToggle: !state.isToggle,
      forDoctor: action.forDoctor,
    });
    case LOADING_BOOK_APPOINTMENT:
        return Object.assign({}, state, {
          bookAppointmentLoading: true,
          bookAppointmentLoaded: false,
          bookAppointmentError: null
        });
    case LOAD_BOOK_APPOINTMENT_FULFILLED:
        return Object.assign({}, state, {
          bookDataAppointment: action.bookDataAppointment,
          bookAppointmentLoading: false,
          bookAppointmentLoaded: true,
          bookAppointmentError: null
        });
    case LOAD_BOOK_APPOINTMENT_FAILED:
        return Object.assign({}, state, {
          bookAppointmentLoading: false,
          bookAppointmentLoaded: true,
          bookDataAppointment: [],
          bookAppointmentError: action.bookAppointmentError
        });
    case BOOKING_APPOINTMENT:
      return Object.assign({}, state, {
        booking: true,
        booked: false
      });
    case BOOK_APPOINTMENT_SUCCESS:
      return Object.assign({}, state, {
        booking: false,
        booked: true,
        isToggle: false
      });
    case BOOK_APPOINTMENT_FAILED:
      return Object.assign({}, state, {
        booking: false,
        booked: false,
        bookError: action.bookError
      });
    default:
      return state;
  }
}

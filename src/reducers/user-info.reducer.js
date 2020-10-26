import {
  SET_CURRENT_USER,
  ADD_RELATIONSHIP_SUCCESS,
  ADDING_RELATIONSHIP,
  ADD_RELATIONSHIP_FAILED,
  TOGGLE_ADD_RELATIONSHIP_MODAL,
  LOADING_CURRENT_USER,
  TOGGLE_OTP_MODAL,
  ADD_SWITCH_ACCOUNT,
  REMOVE_SWITCH_ACCOUNT,
  SET_PIN_CODE,
  UPDATE_LOCATION,
} from "../actions/user-info.action";

const initState = {
  loadingCurrentUser: false,
  currentUser: {},
  addingMember: false,
  switchUserID: null,
  privilege: null,
  addingError: null,
  openingAddMemberModal: false,
  openingOTPModal:false,
  pinCode: null,
  location: null,
};

export default function userInfoReducer(state = initState, action) {
  switch (action.type) {
    case LOADING_CURRENT_USER:
      return Object.assign({}, state, {
        loadingCurrentUser: action.loadingCurrentUser
      });
    case SET_CURRENT_USER:
      return Object.assign({}, state, {
        currentUser: action.currentUser,
        loadingCurrentUser: false
      });
    case SET_PIN_CODE:
      return {
        ...state,
        pinCode: action.pinCode
      };
    case ADDING_RELATIONSHIP:
      return Object.assign({}, state, {
        addingMember: true
      });
    case ADD_RELATIONSHIP_SUCCESS:
      return Object.assign({}, state, {
        addingMember: false,
        addingError: null,
        openingAddMemberModal: false
      });
    case ADD_RELATIONSHIP_FAILED:
      return Object.assign({}, state, {
        addingMember: false,
        addingError: action.addingError
      });
    case TOGGLE_ADD_RELATIONSHIP_MODAL:
      return Object.assign({}, state, {
        openingAddMemberModal: !state.openingAddMemberModal,
        addingError: null
      });
    case TOGGLE_OTP_MODAL:
      return Object.assign({}, state, {
        openingOTPModal: !state.openingOTPModal,
        addingError: null
      });
    case ADD_SWITCH_ACCOUNT:
    return Object.assign({}, state, {
      switchUserID: action.switchUserID,
      privilege: action.privilege
    });
    case REMOVE_SWITCH_ACCOUNT:
      return Object.assign({}, state, {
        switchUserID: null,
        privilege: null
      });
    case UPDATE_LOCATION: 
      return {
        ...state,
        location: action.location
      };
    default:
      return state;
  }
}

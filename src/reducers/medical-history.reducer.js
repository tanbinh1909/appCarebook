import {
  LOADING_MEDICAL,
  LOAD_MEDICAL_FAILED,
  LOAD_MEDICAL_FULFILLED,
  SAVING_MEDICAL,
  SAVE_MEDICAL_SUCCESS,
  SAVE_MEDICAL_FAILED,
  SAVE_MEDICAL_TEMP,
  LOADING_MEDICAL_DETAIL,
  LOAD_MEDICAL_DETAIL_SUCCESS,
  LOAD_IMAGE_SUCCESS,
  RESET_MEDICAL_DETAIL
} from "../actions/medical-history.action";

const initState = {
  // pinCode: pinCode,
  medicals: [],
  medicalsLoading: false,
  medicalsLoaded: false,
  medicalsError: null,
  newMedical: null,
  newTests: [],
  newPrescription: null,
  newPayment: null,
  medicalSaving: false,
  medicalSaved: false,
  savingError: null,
  medicalDetail: null,
  medicalDetailLoading: false,
  medicalDetailLoaded: false,
  imageMedicalDetails: [],
  imagePresDetails: [],
  imageTestDetails: [],
  imagePaymentDetails: [],
};

export default function medicalHistoryReducer(state = initState, action) {
  switch (action.type) {
    case LOADING_MEDICAL:
      return Object.assign({}, state, {
        medicalsLoading: true,
        medicalsLoaded: false,
        medicalsError: null
      });
    case LOAD_MEDICAL_FULFILLED:
      return Object.assign({}, state, {
        medicals: action.medicals,
        medicalsLoading: false,
        medicalsLoaded: true,
        medicalsError: null
      });
    case LOAD_MEDICAL_FAILED:
      return Object.assign({}, state, {
        medicalsLoading: false,
        medicalsLoaded: true,
        medicalsError: action.medicalsError
      });
    case SAVING_MEDICAL:
      return Object.assign({}, state, {
        medicalSaving: true,
        medicalSaved: false,
        savingError: null
      });
    case SAVE_MEDICAL_SUCCESS:
      return Object.assign({}, state, {
        medicalSaving: false,
        medicalSaved: true
      });
    case SAVE_MEDICAL_FAILED:
      return Object.assign({}, state, {
        medicalSaving: false,
        medicalSaved: true,
        savingError: action.savingError
      });
    case SAVE_MEDICAL_TEMP:
      return Object.assign({}, state, {
        newMedical: action.newMedical || state.newMedical,
        newTests: action.newTests || state.newTests,
        newPrescription: action.newPrescription || state.newPrescription,
        newPayment: action.newPayment
      });
    case LOADING_MEDICAL_DETAIL:
      return {
        ...state,
        medicalDetail: null,
        medicalDetailLoading: true,
        medicalDetailLoaded: false,
        imageMedicalDetails: [],
        imagePresDetails: [],
        imageTestDetails: [],
        imagePaymentDetails: []
      };
    case LOAD_MEDICAL_DETAIL_SUCCESS:
      return Object.assign({}, state, {
        medicalDetailLoading: false,
        medicalDetailLoaded: true,
        medicalDetail: action.medicalDetail
      });
    case LOAD_IMAGE_SUCCESS:
      return {
        ...state,
        imageMedicalDetails: [
          ...state.imageMedicalDetails,
          action.image
        ],
        imagePresDetails: [
          ...state.imagePresDetails,
          action.imagePres
        ],
        imageTestDetails: [
          ...state.imageTestDetails,
          action.imageTest
        ],
        imagePaymentDetails: [
          ...state.imagePaymentDetails,
          action.imagePayment
        ]
      };
    case RESET_MEDICAL_DETAIL:
      return {
        ...state,
        medicalDetail: null
      }

    default:
      return state;
  }
}

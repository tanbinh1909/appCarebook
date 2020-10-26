import {
  LOAD_INSURANCES_FAILED,
  LOAD_INSURANCES_FULFILLED,
  LOADING_INSURANCES
} from "../actions/insurance.action";

const initState = {
  insurances: [],
  insurancesLoading: false,
  insurancesLoaded: false,
  insurancesError: null
};

export default function insuranceReducer(state = initState, action) {
  switch (action.type) {
    case LOADING_INSURANCES:
      return Object.assign({}, state, {
        insurancesLoading: true,
        insurancesLoaded: false,
        insurancesError: null
      });
    case LOAD_INSURANCES_FULFILLED:
      return Object.assign({}, state, {
        insurances: action.insurances,
        insurancesLoading: false,
        insurancesLoaded: true,
        insurancesError: null
      });
    case LOAD_INSURANCES_FAILED:
      return Object.assign({}, state, {
        insurancesLoading: false,
        insurancesLoaded: true,
        insurancesError: action.insurancesError
      });
    default:
      return state;
  }
}

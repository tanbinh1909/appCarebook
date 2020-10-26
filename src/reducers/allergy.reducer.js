import {
    LOAD_ALLERGIES_FAILED,
    LOAD_ALLERGIES_FULFILLED,
    LOADING_ALLERGIES,
    ADDING_ALLERGY,
    ADD_ALLERGY_SUCCESS,
    ADD_ALLERGY_FAILED
} from "../actions/allergy.action";

const initState = {
    allergies: [],
    allergiesLoading: false,
    allergiesLoaded: false,
    allergiesError: null,
    adding: false,
    added: false,
    addError: null
};

export default function allergyReducer(state = initState, action) {
    switch (action.type) {
        case LOADING_ALLERGIES:
            return Object.assign({}, state, {
                allergiesLoading: true,
                allergiesLoaded: false,
                allergiesError: null
            });
        case LOAD_ALLERGIES_FULFILLED:
            return Object.assign({}, state, {
                allergies: action.allergies,
                allergiesLoading: false,
                allergiesLoaded: true,
                allergiesError: null
            });
        case LOAD_ALLERGIES_FAILED:
            return Object.assign({}, state, {
                allergiesLoading: false,
                allergiesLoaded: true,
                allergies: [],
                allergiesError: action.allergiesError
            });
        case ADDING_ALLERGY:
            return Object.assign({}, state, {
                adding: true,
                added: false,
                addError: null
            });
        case ADD_ALLERGY_SUCCESS:
            return Object.assign({}, state, {
                adding: false,
                added: true,
                addError: null
            });
        case ADD_ALLERGY_FAILED:
            return Object.assign({}, state, {
                adding: false,
                added: true,
                addError: action.addError
            });
        default:
            return state;
    }
}

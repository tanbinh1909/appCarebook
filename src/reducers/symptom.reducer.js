import {
    LOAD_SYMPTOM,
    LOADING_SYMPTOM,
    LOAD_SYMPTOM_FULFILLED,
    LOAD_SYMPTOM_FAILED
} from "../actions/symptom.action";

const initState = {
    data: {},
    loading: false,
    error: null,
};

export default function symptomReducer(state = initState, action) {
    switch (action.type) {
        case LOADING_SYMPTOM:
            return Object.assign({}, state, {
                loading: true,
                error: null
            });
        case LOAD_SYMPTOM_FULFILLED:
            return Object.assign({}, state, {
                data: action.symptom,
                loading: false,
                error: null
            });
        case LOAD_SYMPTOM_FAILED:
            return Object.assign({}, state, {
                data: {},
                loading: false,
                error: action.error
            });
        default:
            return state;
    }
}

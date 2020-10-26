import {
    LOAD_VACCINATIONHISTORIES_FAILED,
    LOAD_VACCINATIONHISTORIES_FULFILLED,
    LOADING_VACCINATIONHISTORIES,
    ADD_VACCINATION_SUCCESS,
    ADD_VACCINATION_FAILED,
    ADDING_VACCINATION
} from "../actions/vaccination-history.action";
import Toast from "@remobile/react-native-toast";
import { strings } from '../locate/I18n';

const initState = {
    vaccinationHistories: [],
    vaccinationHistoriesLoading: false,
    vaccinationHistoriesLoaded: false,
    vaccinationHistoriesError: null,
    adding: false,
    added: false,
    addError: null
};

export default function vaccinationHistoryReducer(state = initState, action) {
    switch (action.type) {
        case LOADING_VACCINATIONHISTORIES:
            return Object.assign({}, state, {
                vaccinationHistoriesLoading: true,
                vaccinationHistoriesLoaded: false,
                vaccinationHistoriesError: null
            });
        case LOAD_VACCINATIONHISTORIES_FULFILLED:
            return Object.assign({}, state, {
                vaccinationHistories: action.vaccinationHistories,
                vaccinationHistoriesLoading: false,
                vaccinationHistoriesLoaded: true,
                vaccinationHistoriesError: null
            });
        case LOAD_VACCINATIONHISTORIES_FAILED:
            return Object.assign({}, state, {
                vaccinationHistoriesLoading: false,
                vaccinationHistoriesLoaded: true,
                vaccinationHistories: [],
                vaccinationHistoriesError: action.vaccinationHistoriesError
            });
        case ADDING_VACCINATION:
            return Object.assign({}, state, {
                adding: true,
                added: false,
                addError: null
            });
        case ADD_VACCINATION_SUCCESS:
            Toast.show(strings('add_vaccination.msg_add_success'));
            return Object.assign({}, state, {
                adding: false,
                added: true,
                addError: null
            });
        case ADD_VACCINATION_FAILED:
            return Object.assign({}, state, {
                adding: false,
                added: true,
                addError: action.addError
            });
        default:
            return state;
    }
}

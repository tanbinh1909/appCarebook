import {
    LOAD_FAMILYILLNESSLIST_FAILED,
    LOAD_FAMILYILLNESSLIST_FULFILLED,
    LOADING_FAMILYILLNESSLIST,
    ADD_SUCCESS,
    ADD_FAILED,
    ADDING
} from "../actions/family-illness-list.action";

const initState = {
    familyIllnessList: [],
    familyIllnessListLoading: false,
    familyIllnessListLoaded: false,
    familyIllnessListError: null,
    adding: false,
    added: false,
    addError: null
};

export default function familyIllnessReducer(state = initState, action) {
    switch (action.type) {
        case LOADING_FAMILYILLNESSLIST:
            return Object.assign({}, state, {
                familyIllnessListLoading: true,
                familyIllnessListLoaded: false,
                familyIllnessListError: null
            });
        case LOAD_FAMILYILLNESSLIST_FULFILLED:
            return Object.assign({}, state, {
                familyIllnessList: action.familyIllnessList,
                familyIllnessListLoading: false,
                familyIllnessListLoaded: true,
                familyIllnessListError: null
            });
        case LOAD_FAMILYILLNESSLIST_FAILED:
            return Object.assign({}, state, {
                familyIllnessListLoading: false,
                familyIllnessListLoaded: true,
                familyIllnessList: [],
                familyIllnessListError: action.familyIllnessListError
            });
        case ADDING:
            return Object.assign({}, state, {
                adding: true,
                added: false,
                addError: null
            });
        case ADD_SUCCESS:
            return Object.assign({}, state, {
                adding: false,
                added: true,
                addError: null
            });
        case ADD_FAILED:
            return Object.assign({}, state, {
                adding: false,
                added: true,
                addError: action.addError
            });
        default:
            return state;
    }
}

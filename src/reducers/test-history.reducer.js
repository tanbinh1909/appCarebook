import {
    LOAD_TESTHISTORIES_FAILED,
    LOAD_TESTHISTORIES_FULFILLED,
    LOADING_TESTHISTORIES
} from "../actions/test-history.action";

const initState = {
    testHistories: [],
    testHistoriesLoading: false,
    testHistoriesLoaded: false,
    testHistoriesError: null,
};

export default function testHistoryReducer(state = initState, action) {
    switch (action.type) {
        case LOADING_TESTHISTORIES:
            return Object.assign({}, state, {
                testHistoriesLoading: true,
                testHistoriesLoaded: false,
                testHistoriesError: null
            });
        case LOAD_TESTHISTORIES_FULFILLED:
            return Object.assign({}, state, {
                testHistories: action.testHistories,
                testHistoriesLoading: false,
                testHistoriesLoaded: true,
                testHistoriesError: null
            });
        case LOAD_TESTHISTORIES_FAILED:
            return Object.assign({}, state, {
                testHistoriesLoading: false,
                testHistoriesLoaded: true,
                testHistoriesError: action.testHistoriesError
            });
        default:
            return state;
    }
}

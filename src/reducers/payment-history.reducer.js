import {
    LOAD_PAYMENTHISTORIES_FAILED,
    LOAD_PAYMENTHISTORIES_FULFILLED,
    LOADING_PAYMENTTHISTORIES
} from "../actions/payment-history.action";

const initState = {
    paymentHistories: [],
    paymentHistoriesLoading: false,
    paymentHistoriesLoaded: false,
    paymentHistoriesError: null,
};

export default function paymentHistoryReducer(state = initState, action) {
    switch (action.type) {
        case LOADING_PAYMENTTHISTORIES:
            return Object.assign({}, state, {
                paymentHistoriesLoading: true,
                paymentHistoriesLoaded: false,
                paymentHistoriesError: null
            });
        case LOAD_PAYMENTHISTORIES_FULFILLED:
            return Object.assign({}, state, {
                paymentHistories: action.paymentHistories,
                paymentHistoriesLoading: false,
                paymentHistoriesLoaded: true,
                paymentHistoriesError: null
            });
        case LOAD_PAYMENTHISTORIES_FAILED:
            return Object.assign({}, state, {
                paymentHistoriesLoading: false,
                paymentHistoriesLoaded: true,
                paymentHistoriesError: action.paymentHistoriesError
            });
        default:
            return state;
    }
}

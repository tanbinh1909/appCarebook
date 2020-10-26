import {
    LOAD_PRESCRIPTIONHISTORIES_FAILED,
    LOAD_PRESCRIPTIONHISTORIES_FULFILLED,
    LOADING_PRESCRIPTIONHISTORIES,
    LOADING_RECENTDRUGSTORE,
    LOAD_RECENTDRUGSTORE_SUCCESS,
    LOAD_RECENTDRUGSTORE_FAILED,
    BUYING_PRESCRIPTION,
    BUY_PRESCRIPTION_SUCCESS,
    BUY_PRESCRIPTION_FAILED,
    TOOGLE_BUY_PRESCRIPTION_MODAL,
    FIND_LIST_DRUGSRORE,
    FINDING_LIST_DRUGSRORE,
    FIND_LIST_DRUGSRORE_SUCCESS,
    FIND_LIST_DRUGSRORE_FAILED
} from "../actions/prescription-history.action";

const initState = {
    prescriptionHistories: [],
    prescriptionHistoriesLoading: false,
    prescriptionHistoriesLoaded: false,
    prescriptionHistoriesError: null,
    recentDrugstore: [],
    recentDrugstoreLoading: false,
    recentDrugstoreLoaded: false,
    recentDrugstoreError: null,
    buying: false,
    buySuccess: false,
    buyError: null,
    openingModal: false,
    listDrugstore: [],
    finding: false,
    findSuccess: false,
    finderror: null
};

export default function prescriptionHistoryReducer(state = initState, action) {
    switch (action.type) {
        case LOADING_PRESCRIPTIONHISTORIES:
            return Object.assign({}, state, {
                prescriptionHistoriesLoading: true,
                prescriptionHistoriesLoaded: false,
                prescriptionHistoriesError: null
            });
        case LOAD_PRESCRIPTIONHISTORIES_FULFILLED:
            return Object.assign({}, state, {
                prescriptionHistories: action.prescriptionHistories,
                prescriptionHistoriesLoading: false,
                prescriptionHistoriesLoaded: true,
                prescriptionHistoriesError: null
            });
        case LOAD_PRESCRIPTIONHISTORIES_FAILED:
            return Object.assign({}, state, {
                prescriptionHistoriesLoading: false,
                prescriptionHistoriesLoaded: true,
                prescriptionHistoriesError: action.prescriptionHistoriesError
            });
        case LOADING_RECENTDRUGSTORE:
            return Object.assign({}, state, {
              recentDrugstoreLoading: true,
              recentDrugstoreLoaded: false,
              recentDrugstoreError: null
            });
        case LOAD_RECENTDRUGSTORE_SUCCESS:
            return Object.assign({}, state, {
              recentDrugstore: action.recentDrugstore,
              recentDrugstoreLoading: false,
              recentDrugstoreLoaded: true,
              recentDrugstoreError: null
            });
        case LOAD_RECENTDRUGSTORE_FAILED:
            return Object.assign({}, state, {
              recentDrugstoreLoading: false,
              recentDrugstoreLoaded: false,
              recentDrugstoreError: action.recentDrugstoreError
            });
        case BUYING_PRESCRIPTION:
            return Object.assign({}, state, {
                buying: true,
                buySuccess: false,
                buyError: null
            });
        case BUY_PRESCRIPTION_SUCCESS:
            return Object.assign({}, state, {
                buying: false,
                buySuccess: true,
                buyError: null
            });
        case BUY_PRESCRIPTION_FAILED:
            return Object.assign({}, state, {
                buying: false,
                buySuccess: true,
                buyError: action.buyError
            });
        case TOOGLE_BUY_PRESCRIPTION_MODAL:
          return Object.assign({}, state, {
            openingModal: !state.openingModal
          });
        case FINDING_LIST_DRUGSRORE:
            return Object.assign({}, state, {
              finding: true,
              findSuccess: false,
              finderror: null
            });
        case FIND_LIST_DRUGSRORE_SUCCESS:
            return Object.assign({}, state, {
              listDrugstore: action.listDrugstore,
              finding: false,
              findSuccess: true,
              finderror: null
            });
        case FIND_LIST_DRUGSRORE_FAILED:
            return Object.assign({}, state, {
              finding: false,
              findSuccess: false,
              finderror: action.findError
            });
        default:
            return state;
    }
}

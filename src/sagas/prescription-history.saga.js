import { put, call, takeLatest, select } from 'redux-saga/effects'
import {
    LOADING_PRESCRIPTIONHISTORIES,
    LOAD_PRESCRIPTIONHISTORIES,
    LOAD_PRESCRIPTIONHISTORIES_FAILED,
    LOAD_PRESCRIPTIONHISTORIES_FULFILLED,
    LOADING_RECENTDRUGSTORE,
    LOAD_RECENTDRUGSTORE,
    LOAD_RECENTDRUGSTORE_SUCCESS,
    LOAD_RECENTDRUGSTORE_FAILED,
    BUYING_PRESCRIPTION,
    BUY_PRESCRIPTION,
    BUY_PRESCRIPTION_SUCCESS,
    BUY_PRESCRIPTION_FAILED,
    TOOGLE_BUY_PRESCRIPTION_MODAL,
    FIND_LIST_DRUGSRORE,
    FINDING_LIST_DRUGSRORE,
    FIND_LIST_DRUGSRORE_SUCCESS,
    FIND_LIST_DRUGSRORE_FAILED
} from '../actions/prescription-history.action'
import {navigateBack} from "../actions/nav.action";
import MenuProfileApi from "../api/menu-profile.api"
import {
  getLanguage
} from "../helpers/storage.helper";
import { strings } from '../locate/I18n';

function getLang() {
return new Promise(function (resolve) {
  getLanguage().then(lang => {
    resolve(lang);
  });
});
}
function* loadPrescriptionHistories() {
    yield put({type: LOADING_PRESCRIPTIONHISTORIES});
    try {
        const { currentUser } = yield select(state => state.userInfo);
        const { switchUserID } = yield select(state => state.userInfo);
        const data = yield call(MenuProfileApi.getPrescriptionHistories, (switchUserID == null) ? currentUser.customerID : switchUserID);
        yield put({type: LOAD_PRESCRIPTIONHISTORIES_FULFILLED, prescriptionHistories: data});
    } catch (error) {
        console.log(error);
        yield put({type: LOAD_PRESCRIPTIONHISTORIES_FAILED, prescriptionHistoriesError: "Error"});
    }
}

function* loadRecentDrugstore() {
    yield put({type: LOADING_RECENTDRUGSTORE});
    try {
      const { currentUser } = yield select(state => state.userInfo);
      const { switchUserID } = yield select(state => state.userInfo);
      const data = yield call(MenuProfileApi.loadRecentDrugstore,(switchUserID == null) ? currentUser.customerID : switchUserID);
      yield put({type: LOAD_RECENTDRUGSTORE_SUCCESS, recentDrugstore: data});
    } catch (error) {
      console.log(error);
      yield put({type: LOAD_RECENTDRUGSTORE_FAILED, recentDrugstoreError: "error"});
    }
}

function* buyPrescription({shopName,shopId,prescriptionId,shopMail,benhAnId,dienBienBenhId,toaThuocId}) {
  yield put({type: TOOGLE_BUY_PRESCRIPTION_MODAL });
    yield put({type: BUYING_PRESCRIPTION});
    try {
      const lang = yield call(getLang);
      const { currentUser } = yield select(state => state.userInfo);
      const { switchUserID } = yield select(state => state.userInfo);
      const patientId = (switchUserID == null) ? currentUser.customerID : switchUserID;
      const datas = {patientId,shopId,prescriptionId,shopName,shopMail,benhAnId,dienBienBenhId};
      const data = yield call(MenuProfileApi.movePrescription, patientId, toaThuocId, (lang=="vi") ? "vi_VN" : "en", datas);
      yield put({ type: BUY_PRESCRIPTION_SUCCESS });
      alert(strings('saga.msg1'));
    } catch (error) {
      console.log(error);
      yield put({ type: BUY_PRESCRIPTION_FAILED, buyError: "Error" });
      alert(strings('saga.msg2'));
    }
}

function* findDrugStore({query}) {
  yield put({type: FINDING_LIST_DRUGSRORE});
  try {
    const data = {
      	"address": "",
      	"keyword": query
      };
    const result = yield call(MenuProfileApi.findDrugStore, data);
    yield put({type: FIND_LIST_DRUGSRORE_SUCCESS, listDrugstore: result})
  } catch (error) {
    console.log(error);
    yield put({type: FIND_LIST_DRUGSRORE_FAILED, findError: "error"});
  }
}
export function* watchPrescriptionHistoriesSagasAsync() {
    yield [
        takeLatest(LOAD_PRESCRIPTIONHISTORIES, loadPrescriptionHistories),
        takeLatest(LOAD_RECENTDRUGSTORE, loadRecentDrugstore),
        takeLatest(BUY_PRESCRIPTION, buyPrescription),
        takeLatest(FIND_LIST_DRUGSRORE, findDrugStore),

    ]
}

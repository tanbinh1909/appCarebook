import { put, call, takeLatest, select } from 'redux-saga/effects'
import {
    LOADING_PAYMENTTHISTORIES,
    LOAD_PAYMENTHISTORIES,
    LOAD_PAYMENTHISTORIES_FAILED,
    LOAD_PAYMENTHISTORIES_FULFILLED
} from '../actions/payment-history.action'
import MenuProfileApi from "../api/menu-profile.api"

function* loadPaymentHistories() {
    yield put({type: LOADING_PAYMENTTHISTORIES});
    try {
        const { currentUser } = yield select(state => state.userInfo);
        const { switchUserID } = yield select(state => state.userInfo);
        const data = yield call(MenuProfileApi.getPaymentHistories, (switchUserID == null) ? currentUser.customerID : switchUserID );
        yield put({type: LOAD_PAYMENTHISTORIES_FULFILLED, paymentHistories: data});
    } catch (error) {
        console.log(error);
        yield put({type: LOAD_PAYMENTHISTORIES_FAILED, paymentHistoriesError: "Error"});
    }
}


export function* watchPaymentHistoriesSagasAsync() {
    yield [
        takeLatest(LOAD_PAYMENTHISTORIES, loadPaymentHistories)
    ]
}

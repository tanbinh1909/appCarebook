import { put, call, takeLatest, select } from 'redux-saga/effects'
import {
    LOADING_TESTHISTORIES,
    LOAD_TESTHISTORIES,
    LOAD_TESTHISTORIES_FAILED,
    LOAD_TESTHISTORIES_FULFILLED,
} from '../actions/test-history.action'
import MenuProfileApi from "../api/menu-profile.api"

function* loadTestHistories() {
    yield put({type: LOADING_TESTHISTORIES});
    try {
        const { currentUser } = yield select(state => state.userInfo);
        const { switchUserID } = yield select(state => state.userInfo);
        const data = yield call(MenuProfileApi.getTestHistories, (switchUserID == null) ? currentUser.customerID : switchUserID);
        if(data.length > 0){
            for(var i = 0; i < data.length; i++){
                data[i]['userID'] = currentUser.customerID;
            }
            yield put({type: LOAD_TESTHISTORIES_FULFILLED, testHistories: data});
        } 
    } catch (error) {
        console.log(error);
        yield put({type: LOAD_TESTHISTORIES_FAILED, testHistoryError: "Error"});
    }
}

export function* watchTestHistoriesSagasAsync() {
    yield [
        takeLatest(LOAD_TESTHISTORIES, loadTestHistories),
    ]
}

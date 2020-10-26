import { put, call, takeLatest, select } from 'redux-saga/effects'
import {
  LOAD_SYMPTOM,
  LOADING_SYMPTOM,
  LOAD_SYMPTOM_FULFILLED,
  LOAD_SYMPTOM_FAILED
} from '../actions/symptom.action'
import SymptomApi from "../api/symptom.api"
import {
  getLanguage
} from "../helpers/storage.helper";

function getLang() {
  return new Promise(function (resolve) {
    getLanguage().then(lang => {
      resolve(lang);
    });
  });
}

function* loadSymptom({ data }) {
    try {
        yield put({type: LOADING_SYMPTOM});
        const lang = yield call(getLang);
        const response = yield call(SymptomApi.getSymptom, data, lang);
        yield put({type: LOAD_SYMPTOM_FULFILLED, symptom: response});
    } catch (error) {
        console.log(error);
        yield put({type: LOAD_SYMPTOM_FAILED, error: "Error"});
    }
}

export function* watchSymptomSagasAsync() {
    yield [
      takeLatest(LOAD_SYMPTOM, loadSymptom),
    ]
}

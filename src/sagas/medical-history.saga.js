import {NativeModules} from 'react-native';
import { put, call, takeLatest, select } from "redux-saga/effects";
import { delay } from "redux-saga";
import {
  SAG_SET_PIN_CODE,
  SET_PIN_CODE,
  LOADING_MEDICAL,
  LOAD_MEDICAL_FAILED,
  LOAD_MEDICAL_FULFILLED,
  LOAD_MEDICAL,
  SAVE_MEDICAL,
  SAVING_MEDICAL,
  SAVE_MEDICAL_SUCCESS,
  SAVE_MEDICAL_FAILED,
  SAVE_MEDICAL_TEMP,
  LOAD_MEDICAL_DETAIL,
  LOADING_MEDICAL_DETAIL,
  LOAD_MEDICAL_DETAIL_SUCCESS,
  LOAD_MEDICAL_DETAIL_FAILED,
  LOAD_IMAGE_SUCCESS
} from "../actions/medical-history.action";
import MenuProfileApi from "../api/menu-profile.api";
import { navigateToPage } from "../actions/nav.action";
import Api from "../api/api";

function* loadMedicals() {
  yield put({ type: LOADING_MEDICAL });
  try {
    const { currentUser } = yield select(state => state.userInfo);
    const { switchUserID } = yield select(state => state.userInfo);
    const data = yield call(
      MenuProfileApi.getMedicals,
      (switchUserID == null) ? currentUser.customerID : switchUserID,
      {
        customerID: (switchUserID == null) ? currentUser.customerID : switchUserID,
        firstresult: 0,
        keyword: "",
        maxresult: 0
      }
    );
    yield put({
      type: LOAD_MEDICAL_FULFILLED,
      medicals: data
    });
  } catch (error) {
    yield put({
      type: LOAD_MEDICAL_FAILED,
      medicalsError: "Error"
    });
  }
}

function* saveMedical({medicals}) {
  yield put({ type: SAVING_MEDICAL });
  var _imageUpload = [];
  try {
    const { currentUser } = yield select(state => state.userInfo);
    const { switchUserID } = yield select(state => state.userInfo);
    const userID = (switchUserID == null) ? currentUser.customerID : switchUserID;
    let index = 0;
    for(key of Object.keys(medicals)) {
      const medical = medicals[key];
      if(medical && medical.hinhanh) {
        let _hinhanh = [];
        for (img of medical.hinhanh) {
          const fileName = `image${index}`;
          _imageUpload.push({
            name: fileName,
            value: img.data,
          });
          _hinhanh.push(fileName);

          index++;
        }
        medical.hinhanh = _hinhanh;
      }
    }
   
    const data = {
      customerID: userID,
      ...medicals
    }
    const response = yield call(MenuProfileApi.saveMedical, userID, data);
    if(response) {
      const benhAnId = response;
      const imageUploads = {
        customerID: userID,
        imageDTO: _imageUpload
      }
      yield call(Api.uploadImages, userID, benhAnId, imageUploads);
    }

    yield put({ type: SAVE_MEDICAL_SUCCESS });
    const navigation = yield select(state => state.nav);
    yield put(navigateToPage("MedicalHistory"));
    yield put({ type: LOAD_MEDICAL });
    
  } catch (error) {
    yield put({ type: SAVE_MEDICAL_FAILED, savingError: "Error" });
  }
}

function* loadMedicalDetail({ medicalID }) {
  yield put({ type: LOADING_MEDICAL_DETAIL });
  try {
    const { currentUser, switchUserID, pinCode  } = yield select(state => state.userInfo);
    // const { switchUserID } = yield select(state => state.userInfo);
    // const { pinCode } = yield select(state => state.medicalHistory);
    const userID = (switchUserID == null) ? currentUser.customerID : switchUserID;
    const response = yield call( MenuProfileApi.getMedicalDetail, userID, medicalID);
    yield put({ type: LOAD_MEDICAL_DETAIL_SUCCESS, medicalDetail: response });
    yield call(loadImageDetail, response, userID, medicalID, pinCode)
  } catch (error) {
    yield put({ type: LOAD_MEDICAL_DETAIL_FAILED });
  }
}

function* loadImageDetail(medicalDetail, userID, medicalID, pinCode) {
  if(!medicalDetail) return;
  try {
    const response = "";
    const imagesMedical = medicalDetail.hinhanh;
    for(img of imagesMedical) {
      response = yield call(Api.getImages, userID, medicalID, img);
      yield put({ type: LOAD_IMAGE_SUCCESS, image: {uri: 'data:image/jpeg;base64,' + response} });
    }

    const imagesPrescription = medicalDetail.toaThuoc.hinhanh;
    for(img of imagesPrescription) {
      response = yield call(Api.getImages, userID, medicalID, img);
      yield put({ type: LOAD_IMAGE_SUCCESS, imagePres: {uri: 'data:image/jpeg;base64,' + response} });
    }

    const imagesTest = medicalDetail.xetNghiem.hinhanh;
    for(img of imagesTest) {
      response = yield call(Api.getImages, userID, medicalID, img);
      yield put({ type: LOAD_IMAGE_SUCCESS, imageTest: {uri: 'data:image/jpeg;base64,' + response} });
    }

    const imagesPayment = medicalDetail.thanhToan.hinhanh;
    for(img of imagesPayment) {
      response = yield call(Api.getImages, userID, medicalID, img);
      yield put({ type: LOAD_IMAGE_SUCCESS, imagePayment: {uri: 'data:image/jpeg;base64,' + response} });
    }
  } catch (error) {
      yield put({ type: LOAD_MEDICAL_DETAIL_FAILED });
      console.log(error);
  }
}



export function* watchMedicalHistoriesSagasAsync() {
  yield [
    takeLatest(LOAD_MEDICAL, loadMedicals),
    takeLatest(SAVE_MEDICAL, saveMedical),
    takeLatest(LOAD_MEDICAL_DETAIL, loadMedicalDetail)
  ];
}

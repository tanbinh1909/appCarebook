import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/root.saga";

import bookingModalReducer from "../reducers/booking-modal.reducer";
import chatReducer from "../reducers/chat.reducer";
import feedbackModalReducer from "../reducers/feedback-modal.reducer";
import homeReducer from "../reducers/home.reducer";
import feedsReducer from "../reducers/feeds.reducer";
import searchReducer from "../reducers/search.reducer";
import appointmentReducer from "../reducers/appointment.reducer";
import userInfoReducer from "../reducers/user-info.reducer";
import prescriptionHistoryReducer from "../reducers/prescription-history.reducer";
import testHistoryReducer from "../reducers/test-history.reducer";
import familyIllnessReducer from "../reducers/family-illness-list.reducer";
import allergyReducer from "../reducers/allergy.reducer";
import vaccinationHistoryReducer from "../reducers/vaccination-history.reducer";
import paymentHistoryReducer from "../reducers/payment-history.reducer";
import insuranceReducer from "../reducers/insurance.reducer";
import medicalHistoryReducer from "../reducers/medical-history.reducer";
import savedReducer from "../reducers/saved.reducer";
import searchDetailReducer from "../reducers/search-detail.reducer";
import symptomReducer from '../reducers/symptom.reducer';

const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(loggerMiddleware, sagaMiddleware)
);

const configureStore = (navReducer, preloadedState = {}) => {
  const appReducers = combineReducers({
    nav: navReducer,
    chat: chatReducer,
    bookingModal: bookingModalReducer,
    feedbackModal: feedbackModalReducer,
    home: homeReducer,
    feeds: feedsReducer,
    search: searchReducer,
    appointment: appointmentReducer,
    userInfo: userInfoReducer,
    prescriptionHistory: prescriptionHistoryReducer,
    testHistory: testHistoryReducer,
    familyIllness: familyIllnessReducer,
    allergy: allergyReducer,
    vaccinationHistory: vaccinationHistoryReducer,
    paymentHistory: paymentHistoryReducer,
    insurance: insuranceReducer,
    medicalHistory: medicalHistoryReducer,
    saved: savedReducer,
    searchDetail: searchDetailReducer,
    symptom: symptomReducer
  });
  const store = createStore(appReducers, preloadedState, enhancer);

  sagaMiddleware.run(rootSaga);

  return { store };
};

export default configureStore;

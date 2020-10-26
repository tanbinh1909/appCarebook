import { fork } from "redux-saga/effects";
import { watchHomeSagasAsync } from "./home.saga";
import { watchChatSagasAsync } from "./chat.saga";
import { watchFeedsSagasAsync } from "./feeds.saga";
import { watchSearchSagasAsync } from "./search.saga";
import { watchAppointmentSagasAsync } from "./appointment.saga";
import { watchPrescriptionHistoriesSagasAsync } from "./prescription-history.saga";
import { watchTestHistoriesSagasAsync } from "./test-history.saga";
import { watchLoadFamilyIllnessListSagasAsync } from "./family-illness-list.saga";
import { watchAllergiesSagasAsync } from "./allergy.saga";
import { watchUserSagasAsync } from "./user.saga";
import { watchVaccinationHistoriesSagasAsync } from "./vaccination-history.saga";
import { watchPaymentHistoriesSagasAsync } from "./payment-history.saga";
import { watchInsurancesSagasAsync } from "./insurance.saga";
import { watchMedicalHistoriesSagasAsync } from "./medical-history.saga";
import { watchSavedSagasAsync } from "./saved.saga";
import { watchBookingSagasAsync } from "./booking.saga";
import { watchSearchDetailsSagasAsync } from "./search-detail.saga";
import { watchSymptomSagasAsync } from './symptom.saga';


// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield [
    fork(watchHomeSagasAsync),
    fork(watchChatSagasAsync),
    fork(watchFeedsSagasAsync),
    fork(watchSearchSagasAsync),
    fork(watchAppointmentSagasAsync),
    fork(watchPrescriptionHistoriesSagasAsync),
    fork(watchTestHistoriesSagasAsync),
    fork(watchLoadFamilyIllnessListSagasAsync),
    fork(watchAllergiesSagasAsync),
    fork(watchUserSagasAsync),
    fork(watchVaccinationHistoriesSagasAsync),
    fork(watchPaymentHistoriesSagasAsync),
    fork(watchInsurancesSagasAsync),
    fork(watchMedicalHistoriesSagasAsync),
    fork(watchSavedSagasAsync),
    fork(watchBookingSagasAsync),
    fork(watchSearchDetailsSagasAsync),
    fork(watchSymptomSagasAsync),
  ];
}

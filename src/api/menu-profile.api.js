import RequestHelper from "../helpers/request.helper";

export default class MenuProfileApi {
  // get info Prescription History
  static getPrescriptionHistories(_id) {
    return RequestHelper.get(`customers/${_id}/prescription`, null, true);
  }

  static getTestHistories(_id) {
    return RequestHelper.get(`customers/${_id}/clinical`, null, true);
  }

  static getFamilyIllness(_id) {
    return RequestHelper.get(`customers/${_id}/medicalrecord/diseasefamily/show`, null, true);
  }

  static getAllergies(_id) {
    return RequestHelper.get(`customers/${_id}/medicalrecord/allergic/show`, null, true);
  }

  static addAllergy(_id, data) {
    return RequestHelper.post(`customers/${_id}/medicalrecord/allergic/create`, data);
  }

  static getVaccinationHistories(_id) {
    return RequestHelper.get(`customers/${_id}/medicalrecord/vaccination/show`, null, true);
  }

  static getPaymentHistories(_id) {
    return RequestHelper.get(`customers/${_id}/bill`, null, true);
  }

  static getInsurances(_id) {
    return RequestHelper.get(`customers/${_id}/insurrances`, null, true);
  }

  static getMedicals(_id, data) {
    return RequestHelper.post(`customers/${_id}/medicalrecord/show`, data);
  }

  static getMedicalDetail(_id, _medicalId) {
    return RequestHelper.get(`customers/${_id}/medicalrecord/${_medicalId}`, null, true);
  }

  static saveMedical(_id, data) {
    return RequestHelper.post(`customers/${_id}/medicalrecord/create`, data);
  }
  static addTest(_id, data) {
    return RequestHelper.post(`customers/${_id}/medicalrecord/xetnghiem/create`, data);
  }
  static addPrescription(_id, data) {
    return RequestHelper.post(`customers/${_id}/medicalrecord/prescription/create`, data);
  }
  static addPayment(_id, data) {
    return RequestHelper.post(`customers/${_id}/medicalrecord/totalcost/create`, data);
  }
  static addVaccination (_id, data) {
    return RequestHelper.post(`customers/${_id}/medicalrecord/vaccination/create`, data)
  }
  static addFamilyIllness (_id, data) {
    return RequestHelper.post(`customers/${_id}/medicalrecord/diseaseFamily/create`, data)
  }
  static loadRecentDrugstore(_id) {
    return RequestHelper.get(`customers/${_id}/prescription/getLimit`);
  }
  static movePrescription(_customerId,_toathuocId,lang,data) {
    return RequestHelper.post(`customers/${_customerId}/prescription/${_toathuocId}/move?language=${lang}`, data);
  }
  static findDrugStore(data) {
    return RequestHelper.postSearchDrugStore(`shop/searchListDrugStore`, data);
  }
}

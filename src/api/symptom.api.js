import RequestHelper from "../helpers/request.helper";

export default class SymptomApi {
  static getSymptom (data, lang) {
    return RequestHelper.post(`search?language=${lang}`, data);
  }
}

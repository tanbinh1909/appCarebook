import RequestHelper from "../helpers/request.helper";
import qs from "qs";

export default class SavedApi {
  static getList(userId) {
    return RequestHelper.get(`customers/${userId}/bookmark/show`);
  }
}

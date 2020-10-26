import RequestHelper from "../helpers/request.helper";
import qs from "qs";

export default class HomeApi {
  static getCategories(params) {
    return RequestHelper.get("categories", params, false);
  }
  static getArticles(_userId, data) {
    return RequestHelper.getArticles(`posts/${_userId}/category`, data);
  }
}
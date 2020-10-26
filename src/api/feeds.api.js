import RequestHelper from "../helpers/request.helper";
import qs from "qs";

export default class FeedsApi {
  static getNextFeed(_userId, _id) {
    return RequestHelper.get(`posts/${_userId}/show/${_id}/next`);
  }
  static getFeedDetail(_userId, _id) {
    return RequestHelper.get(`posts/${_userId}/show/${_id}`);
  }
  static bookmark(_userId, _feedId) {
    return RequestHelper.post(`customers/${_userId}/posts/${_feedId}/bookmark`);
  }
  static unbookmark(_userId, _feedId) {
    return RequestHelper.post(
      `customers/${_userId}/posts/${_feedId}/bookmark/remove`
    );
  }

  static getFeedComments(_id) {
    return RequestHelper.get(`commentuser/${_id}/show`);
  }
}

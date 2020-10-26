import RequestHelper from "../helpers/request.helper";
//import qs from "qs";

export default class UserApi {
  static login(dataLogin) {
    return RequestHelper.postLogin(dataLogin);
  }

  static register(data) {
    return RequestHelper.post("customers/registry", data, false, false);
  }

  static checkUserName(username){
    return RequestHelper.post(`registry/checkusername`, username, false, false);
  }
  
  static getUserDetail(userId) {
    return RequestHelper.get(`customers/${userId}/show`);
  }
  static addMember (userId, data) {
    return RequestHelper.post(`customers/${userId}/family/create`, data);
  }
  static addTokenDevice(userId, data) {
    return RequestHelper.post(`customers/${userId}/updateTokendevice`, data);
  }
  
  static createOTP (data) {
    return RequestHelper.post("customers/generateOTP", data, false, false);
  }

  static checkOTP (data) {
    return RequestHelper.post("customers/checkOTP", data, false, false);
  }

  static activeAccount (data) {
    return RequestHelper.post("customers/activateCustomer", data, false, false);
  }
  
}
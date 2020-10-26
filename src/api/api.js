import RequestHelper from "../helpers/request.helper";
import qs from "qs";

export default class Api {
  static fetchBookings(vehicleNumber) {
    return RequestHelper.post("booking", { bookingDTO: {} });
  }

  static search(params) {
    return RequestHelper.post("search", params);
  }

  static fetchDetails(_detailId, _userId) {
    // fsoftfsgss2: doctorID, currently hardcode while waiting team api to handle dynamically
    return RequestHelper.get(`search/${_detailId}/show/${_userId}/bookmarked`);
  }

  static fetchShopComments(shopId) {
    return RequestHelper.get("listcommentuser/" + shopId + "/show");
  }

  static sendComment(data) {
    return RequestHelper.post("add/commentuser/", data);
  }

  static fetchShareContent(postId) {
    return RequestHelper.get("post/" + postId + "/share");
  }

  static fetchShareDoctorShop(shopId){
    return RequestHelper.get("hospital/" + shopId + "/share");
  }

  static uploadImage(userID, image){
    let body = new FormData();
    body.append("file", {
      uri: image.uri,
      name: image.fileName,
      type: image.type
    });

    return RequestHelper.postUploadFile(`customers/${userID}/upload/file/read`, body);
  };

  static uploadImages(userID, benhAnId, images){
    return RequestHelper.post(`customers/${userID}/medicalrecord/${benhAnId}/uploadImage`, images, null, true);
  };
  
  static uploadAvatar(userID, image) {
    let body = new FormData();
    body.append("file", {
      uri: image.uri,
      name: image.fileName,
      type: image.type
    });
    return RequestHelper.post("customers/" + userID + "/update", body);
  }

  static getImages(userID, benhAnId, imgName){
    return RequestHelper.get(`customers/${userID}/medicalrecord/${benhAnId}/image/${imgName}`, null, true);
  };

  static removeAccount(userID, relationId) {
    return RequestHelper.post(`customers/${userID}/family/${relationId}/delete`);
  }
}

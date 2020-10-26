import RequestHelper from "../helpers/request.helper";
import qs from "qs";

export default class AppointmentApi {
  static getAppointments (_userId) {
    return RequestHelper.get(`customers/${_userId}/calendar`);
  }

  static bookAppointment (_userId,data) {
    return RequestHelper.post(`customers/${_userId}/calendar/booking`, data)
  }

  static updateAppointment(_userId,data) {
    return RequestHelper.post(`customers/${_userId}/calendar/update/${data["idEvent"]}/booking`, data["appointmentUpdate"])
  }

  static cancelAppointment(_userId,idEvent) {
    return RequestHelper.get(`customers/${_userId}/calendar/delete/${idEvent}/booking`)
  }

  static getAllShop(){
    return RequestHelper.get(`getAllShop`);
  }

  static getAllDoctorAndService(_shopId){
    return RequestHelper.get(`customers/search/${_shopId}`);
  }
}

import { sizeFont, sizeHeight } from "../helpers/size.helper";
import { strings } from '../locate/I18n';
import Images from '../constants/image';

export const date_format = {
  ddmmyyyy: "DDMMYYYY",
  dd_mm_yyyy: "DD/MM/YYYY",
  yyyy_mm_dd: "YYYY/MM/DD",
  dd_mm_yyyy_hh_mm: "DD/MM/YYYY HH:mm",
  dd_mm_yyyy_hh_mm_ss: "DD/MM/YYYY HH:mm:ss",
  hh_mm_ss: "HH:mm:ss"
};
export const getDateNowWithOutTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();
  return new Date(year, month, day);
}

export const getDateNow = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();
  return new Date(year, month, day, hour, minute, second);
}
export const text = {
  empty_string: ""
};

export const users = {
  listposition: "Bệnh nhân",
  remember_me: "on"
};

export const month_names = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

export const tab_font_size = sizeFont((8 / 375) * 100);
export const tab_height = sizeHeight((60 / 400) * 100);

export const primary_color = "#000";
export const secondary_color = "#FFF";
export const primary_bg_color = "#FFF";
export const secondary_bg_color = "#3AAF00";
export const actived_tab_color = "#3AAF00";
export const border_color = "#CCC";

export const gender = {
  male: "MALE",
  female: "FEMALE"
};

export const TEXT_APP_DEFAULT = 'CAREBOOK';

export const LOCAL_IMAGES = [
  {
    id: "icon_user",
    localUrl: Images.ic_person
  },
  {
    id: "icon_tim_kiem",
    localUrl: Images.ic_detective
  },
  {
    id: "icon8_calendar",
    localUrl: Images.ic_view_schedule
  },
  {
    id: "icon_toa_thuoc",
    localUrl: Images.ic_health_book
  },
  {
    id: "icon_di_ung",
    localUrl: Images.ic_sneeze
  },
  {
    id: "icon_benh_gia_dinh",
    localUrl: Images.ic_hospital
  },
  {
    id: "icon_lS_tiem_chung",
    localUrl: Images.ic_syringe
  },
  {
    id: "icon_bao_hiem",
    localUrl: Images.ic_doctors_bag
  },
  {
    id: "icon_setting",
    localUrl: Images.ic_setting
  },
  {
    id:"icon8_logout",
    localUrl: Images.ic_shutdown
  },
  {
    id:"icon8_save",
    localUrl: Images.ic_save_all
  },
  {
    id:"icon8_payment",
    localUrl: Images.ic_exchange
  },
  {
    id:"icon8_medical",
    localUrl: Images.ic_treatment
  },
  {
    id:"icon8_test",
    localUrl: Images.ic_health_checkup
  },
  {
    id:"icon8_news",
    localUrl: Images.ic_news
  },
];

export const ClassifyNotify = {
  Appointment : "Appointment"
}

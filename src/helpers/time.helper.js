import moment from "moment";
import FormatHelper from "./format.helper";
export default class TimeHelper {
  static dateToString(date: Date, format: string) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return format
      .replace("YYYY", FormatHelper.fourIntegerDigits(year))
      .replace("MM", FormatHelper.twoIntegerDigits(month))
      .replace("DD", FormatHelper.twoIntegerDigits(day))
      .replace("hh", FormatHelper.twoIntegerDigits(hour))
      .replace("mm", FormatHelper.twoIntegerDigits(minute))
      .replace("ss", FormatHelper.twoIntegerDigits(second));
  }

  static relativeTime(date) {
    return moment(date).fromNow();
  }

  static stringToDate(text: string, format: string) {
    const year = text.substr(format.indexOf("YYYY"), 4);
    const month = text.substr(format.indexOf("MM"), 2);
    const day = text.substr(format.indexOf("DD"), 2);
    const hours = text.substr(format.indexOf("hh"), 2);
    const minutes = text.substr(format.indexOf("mm"), 2);
    const seconds = text.substr(format.indexOf("ss"), 2);
    const date = new Date(
      year,
      parseInt(month) - 1,
      day,
      hours,
      minutes,
      seconds
    );
    return date;
  }
}

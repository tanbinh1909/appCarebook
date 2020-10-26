const DATE_DELIMIZE = '/';
const TIME_DELIMIZE = ':';

class DateUtil {
    constructor(pattern, delimize) {
        this.init(pattern, delimize);
    }

    init(pattern, delimize) {
        let datePattern = pattern;
        let timePattern = pattern;
        if(delimize) {
            const [dPattern, tPattern] = datePattern.split(delimize);
            datePattern = dPattern;
            timePattern = tPattern;
        }
        this.datePattern = datePattern;
        this.timePattern = timePattern;
    }

    splitDate() {
        return this.datePattern.split(DATE_DELIMIZE);
    }

    splitTime() {
        return this.timePattern.split(TIME_DELIMIZE);
    }

    getDate() {
        const [date, month, year] = this.splitDate();
        return new Date(year, month - 1, date);
    }

    getTime() {
        const [hour, minute, second] = this.splitTime();
        return new Date(0, 0, 0, hour, minute, second, 0);
    }

    getDateTime() {
        const [date, month, year] = this.splitDate();
        const [hour, minute, second] = this.splitTime();
        return new Date(year, month - 1, date, hour, minute, second);
    }
    
    static compare(util, util2) {
        return util.getDateTime().getTime() - util2.getDateTime().getTime();
    }

}

export default DateUtil;

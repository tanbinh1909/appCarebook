export default class FormatHelper {
  static twoIntegerDigits(value: number) {
    return ("0" + value).slice(-2);
  }

  static fourIntegerDigits(value: number) {
    return ("000" + value).slice(-4);
  }

  static formatNumberCurrency(val: number) {
    let v = Number(val);
    if (isNaN(v)) {
      return val;
    }
    let sign = v < 0 ? "-" : "";
    let res = Math.abs(v)
      .toString()
      .split("")
      .reverse()
      .join("")
      .replace(/(\d{3}(?!$))/g, "$1.")
      .split("")
      .reverse()
      .join("");
    return sign + res;
  }

  // Reformat DD/MM/YYYY HH:mm as YYYY-MM-DDTHH-mm
  static formatStringAsISO(s) {
    var b = s.split(/\D/);
    return b[2] + '-' + b[1] + '-' + b[0] + b[3] + ':' + b[4];
  }
  
  static addCommas(nStr) {
    nStr += '';
    c = nStr.split(',');
    nStr = c.join('');
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
  }

  static formatMoney(val: number) {
    let v = Number(val);
    if (isNaN(v)) {
      return val;
    }
    let sign = v < 0 ? "-" : "";
    let res = Math.abs(v)
      .toString()
      .split("")
      .reverse()
      .join("")
      .replace(/(\d{3}(?!$))/g, "$1,")
      .split("")
      .reverse()
      .join("");
    return sign + res;
  }
  static text_truncate = function(str, length, ending) {
    if(str == null) {
      return str;
    }
    if (length == null) {
      length = 100;
    }
    if (ending == null) {
      ending = '...';
    }
    if (str.length > length) {
      return str.substring(0, length - ending.length) + ending;
    } else {
      return str;
    }
  };

  static formatNumberCurrency1(val) {
    let v = Number(val);
    if (isNaN(v)) {
      return val;
    }
    return v.toLocaleString("it-IT", { style: "currency", currency: "VNĐ" });
  }

  static numberMoneyToString(number) {
    let arrayNumber = number.split(".");
    var stringMoney = "";
    for(let i=0; i< arrayNumber.length; i++) {
      stringMoney += defineUnit(arrayNumber[i], arrayNumber.length, i);
    }

    return stringMoney;
  }
}

function defineUnit(unit, length, index) {
  const HUNDRED = "Trăm";
  const TEN = "Mười";
  const TEN_2 = "Mươi";
  const TEN_3 = "Lẻ";
  const ZERO = "Không";
  const ONE = "Mốt";
  const SPACE = " ";
  const COMMA = ",";
  var stringMoney = "";
  
  if (unit.length == 1 ) {
    stringMoney += (unit[0] != 0) ? defineString(unit[0]) : "";
    stringMoney += (unit[0] != 0) ? SPACE: "";
    stringMoney += (unit[0] != 0) ? defineCurencyUnit(length, index) : "";
    stringMoney += (unit[0] != 0) ? COMMA + SPACE : "";
  } else if (unit.length == 2 ) {
    if (unit[0] == 1) {
      stringMoney += TEN;
      stringMoney += SPACE;
    } else {
      stringMoney += (unit[0] != 0) ? defineString(unit[0]): "";
      stringMoney += (unit[0] != 0) ? SPACE: "";
      stringMoney += (unit[0] != 0) ? TEN_2: "";
      stringMoney += (unit[0] != 0) ? SPACE: "";
    }
    stringMoney += (unit[1] != 0) ? defineString(unit[1]) : "";
    stringMoney += (unit[1] != 0) ? SPACE: "";
    stringMoney += (unit[0] != 0 || unit[1] != 0) ? defineCurencyUnit(length, index) : "";
    stringMoney += COMMA + SPACE;
  } else if (unit.length == 3 ) {
      if (unit[0] == 0 && unit[1] == 0 && unit[2] == 0) {
      
      } else { 
        stringMoney += (unit[0] != 0) ? defineString(unit[0]) : "";
        stringMoney += (unit[0] != 0) ? SPACE : "";
        stringMoney += (unit[0] != 0) ? HUNDRED : "";
        stringMoney += (unit[0] != 0) ? SPACE : "";
        if ((unit[1] == 0 && unit[0] != 0) || (index == (length - 1) && unit[0] == 0)) {
          stringMoney += TEN_3;
          stringMoney += SPACE;
        } 
        if (unit[1] == 1) {
          stringMoney += TEN;
          stringMoney += SPACE;
        } else {
          stringMoney += defineString(unit[1]);
          stringMoney += (unit[1] != 0) ? SPACE : "";
          stringMoney += (unit[1] != 0) ? TEN_2 : "";
          stringMoney += (unit[1] != 0) ? SPACE : "";
        }
        stringMoney += (unit[1] != 0 && unit[1] != 1 && unit[2] == 1) ? ONE : defineString(unit[2]);
        stringMoney += SPACE;
        stringMoney += defineCurencyUnit(length, index);
        stringMoney += (index == (length - 1)) ? SPACE : COMMA + SPACE;
      }
  }

  return stringMoney;
}

function defineCurencyUnit(length, index) {
    var stringCurencyUnit = "";
    if (length == 2) {
        if (index == 0) {
            stringCurencyUnit = "Nghìn";
        } 
    } else if (length == 3) {
        if (index == 0) {
          stringCurencyUnit = "Triệu";
        } else if (index == 1) {
            stringCurencyUnit = "Nghìn";
        }
    } else if (length == 4) {
        if (index == 0) {
          stringCurencyUnit = "Tỉ";
        } else if (index == 1) {
            stringCurencyUnit = "Triệu";
        } else if (index == 2) {
            stringCurencyUnit = "Nghìn";
        } 
    } else if (length == 5) {
         if (index == 0) {
          stringCurencyUnit = "Nghìn";
        } else if (index == 1) {
            stringCurencyUnit = "Tỉ";
        } else if (index == 2) {
            stringCurencyUnit = "Triệu";
        } else if (index == 3) {
            stringCurencyUnit = "Nghìn";
        } 
    } 
    
    return stringCurencyUnit;
}

function defineString(number) {
    var stringNumber = "";
    if (number == 1) {
      stringNumber = "Một";
    } else if (number == 2) {
        stringNumber = "Hai";
    } else if (number == 3) {
        stringNumber = "Ba";
    } else if (number == 4) {
        stringNumber = "Bốn";
    } else if (number == 5) {
        stringNumber = "Năm";
    } else if (number == 6) {
        stringNumber = "Sáu";
    } else if (number == 7) {
        stringNumber = "Bảy";
    } else if (number == 8) {
        stringNumber = "Tám";
    } else if (number == 9) {
        stringNumber = "Chín";
    }

    return stringNumber;
}

export const isValidName = (name) => {
  var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  return !name.match(format);
}

// use - , . ( )
export const isValidNameMedical = (name) => {
  var format = /[!@#$%^&*_+\=\[\]{};':"\\|<>\/?]/;
  return !name.match(format);
}

export const isInteger = (number) => {
  var format = /^-?[0-9]+$/;
  return format.test(number);
}
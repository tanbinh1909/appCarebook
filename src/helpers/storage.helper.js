import { AsyncStorage } from "react-native";

const FCM_TOKEN = "fcm_token";
const KEY_TOKEN = "access_token";
const KEY_USER = "user_info";
const USERID_LOGIN = "userid_login";
const LANGUAGE = "lang";
const KEY_PIN_CODE = 'KEY_PIN_CODE';
const KEY_REGISTER = "REGISTER";

export const saveFCMToken = fCMToken =>
  AsyncStorage.setItem(FCM_TOKEN, fCMToken);

export const getFCMToken = () => {
  return AsyncStorage.getItem(FCM_TOKEN);
};

export const saveToken = token => AsyncStorage.setItem(KEY_TOKEN, token);

export const getToken = () => {
  return AsyncStorage.getItem(KEY_TOKEN);
};

export const removeToken = () => AsyncStorage.removeItem(KEY_TOKEN);


export const saveUser = async user => {
  const _stringifyUser = JSON.stringify(user);
  await AsyncStorage.setItem(KEY_USER, _stringifyUser);
};

export const getUser = async () => {
  const _stringifyUser = await AsyncStorage.getItem(KEY_USER);
  return JSON.parse(_stringifyUser);
};

export const removeUser = () => AsyncStorage.removeItem(KEY_USER);


export const saveRegister = async register => AsyncStorage.setItem(KEY_REGISTER, register);

export const getRegister = () => { return AsyncStorage.getItem(KEY_REGISTER) }

export const removeRegister = () => AsyncStorage.removeItem(KEY_REGISTER);


export const clearAll = () => AsyncStorage.clear();

export const saveUserID = userID => {
  AsyncStorage.setItem(USERID_LOGIN, userID);
};

export const getOldUser = () => {
  return AsyncStorage.getItem(USERID_LOGIN);
};
export const saveLanguage = lang => {
  const _stringifyUser = JSON.stringify(lang);
  AsyncStorage.setItem(LANGUAGE, _stringifyUser);
};

export const getLanguage = () => {
  return AsyncStorage.getItem(LANGUAGE).then(lang => {
    return JSON.parse(lang);
  });
};

export const setPINCode = async value => {
  await AsyncStorage.setItem(KEY_PIN_CODE, value);
};

export const getPINCode = async () => {
  try {
    const pinCode = await AsyncStorage.getItem(KEY_PIN_CODE);
    return pinCode;
  } catch (error) {}

  return null;
};

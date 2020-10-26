import axios from "axios";
import qs from "qs";
import { getToken, getPINCode } from "./storage.helper";
import Toast from "@remobile/react-native-toast";
import { connect } from "react-redux";
import { appConfig } from "../config/app.config";
import { navigateToPage } from "../actions/nav.action";
import { strings } from '../locate/I18n';

axios.defaults.baseURL = appConfig.devApiUrl;
const baseApiUrl = appConfig.devApiUrl;
const loginUrl = appConfig.loginUrl;
const handleError = (error) => {
  console.log('Request error: ');
  console.log(error);
  // if (error.request) {
  //   if(error.request.status == 500) {
  //     // Toast.show("Please login to continue!");
  //     // this.props.navigateToPage('Login');
  //   }
  //   else {
  //     Toast.show("Please check network connection and try again!");
  //   }
  // } else if (error.response) {
  //   Toast.show("Server error occurred. Please contact CareBook website developers via 0905060513!");
  // } else {
  //   Toast.show("An unknown error occurred!");
  // }
};

class RequestHelper {
  static async postLogin(body) {
    try {
      const response = await axios.post(loginUrl, body)
      return response;
    } catch (error) {
      // handleError(error);
      throw error;
    }
  }

  static async postRegister(url, body) {
    try {
      const { data } = await axios.post(baseApiUrl + url, body);
      return data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  static async postCheckUserName(url, body) {
    try {
      const { data } = await axios.post(baseApiUrl + url, body);
      return data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  static defineHeader(config={}) {
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...config,
    };
  }
  
  static async get(url, params, isNeedPin) {
    try {
      let options = {
        baseURL: baseApiUrl,
        timeout: 100000,
      }
      const token = await getToken();
      options.headers = this.defineHeader({Authorization: `Bearer ${token}`});
      if (isNeedPin) {
        const pinCode = await getPINCode();
        Object.assign(options.headers, {Pin: pinCode});
      }
      const { data } = await axios.create(options).get(url, {
        params: params,
        paramsSerializer: params => {
          return qs.stringify(params, { arrayFormat: "repeat" });
        }
      });
      if(data && data.success === true) {
        return data.jsonData;
      }
      else if(data && data.success === false) {
        return Toast.show(data.messageNotify);
      }
      return data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  static async post(url, body, fullResponse, isNeedToken) {
    try {
      let options = {
        baseURL: baseApiUrl,
        timeout: 100000,
      }
      if (isNeedToken) {
        const token = await getToken();
        options.headers = this.defineHeader({ Authorization: `Bearer ${token}`});
      }
      const { data } = await axios.create(options).post(url, body);
      if(fullResponse) {
        return data;
      }
      if(data && data.success === true) {
        return data.jsonData;
      }
      else if(data && data.success === false) {
        return Toast.show(data.messageNotify);
      }
      return data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  // static async postImages(url, body, fullResponse) {
  //   try {
  //     const token = await getToken();
  //     options.headers = this.defineHeader({ Authorization: `Bearer ${token}`});
  //     const { data } = await axios.create(options).post(url, body);
  //   } catch (error) {
  //     handleError(error);
  //     throw error;
  //   }
  // }

  static async getArticles(url, body) {
    try {
      const { data } = await axios.post(url, body);
      if(data && data.success === true) {
        return data.jsonData;
      }
      else if(data && data.success === false) {
        return Toast.show(data.messageNotify);
      }
      return data;
    } catch (error) {
      handleError(error, url);
      throw error;
    }
  }

  static async postSearchDrug(url, body) {
    try {
      const response = await axios.post(baseApiUrl + url, body)
      return response;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  static async put(url, body) {
    try {
      const { data } = await axios.create(options).put(url, body);
      return data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  static async putUploadFile(url, file) {
    let body = new FormData();
    body.append("user[profile_picture]", file);

    try {
      const { data } = await axios.create(options).put(url, body);
      return data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  static async postUploadFile(url, body) {
    try {
      const { data } = await axios.create(options).post(url, body);
      return data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  static async delete(url, body) {
    try {
      const { data } = await axios.create(options).delete(url, body);
      return data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    navigateToPage: (route, data) => dispatch(navigateToPage(route, data))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(RequestHelper);

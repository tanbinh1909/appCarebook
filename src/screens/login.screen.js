import React, { Component } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  AsyncStorage,
  ActivityIndicator,
  Keyboard
} from "react-native";
import Text from "../components/common/text";
import { sizeFont, sizeWidth } from "../helpers/size.helper";
import { navigateBack, navigateToPage, resetPage } from "../actions/nav.action";
import { connect } from "react-redux";
import UserApi from "../api/user.api";
import {
  getUser,
  saveUser,
  saveToken,
  saveUserID
} from "../helpers/storage.helper";
import _ from "lodash";
import { LOAD_CURRENT_USER } from "../actions/user-info.action";
import { LOAD_APPOINTMENTS } from "../actions/appointment.action";
import { strings } from '../locate/I18n';

import firebase from 'react-native-firebase';
const WINDOW_WIDTH = Dimensions.get("window").width;
const UserTypes = {
  CUSTOMER: "CUSTOMER",
  DOCTOR: "DOCTOR"
};

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // username: "",
      // password: "",
      username: "0988722165",
      password: "123456",
      isLoading: false,
      message: "",
      renderLogin: false
    };
  }

  render() {
    return <KeyboardAvoidingView behavior="padding" style={styles.container} keyboardVerticalOffset ={-350}>
      <View style={styles.loginContainer}>
        <Text style={styles.appName}>{strings('login.appname')}</Text>
        <View style={styles.imputContainer}>
          <View style={styles.subInputContainer}>
            <TextInput autoCapitalize="none" autoCorrect={false} autoFocus={false} keyboardType="default" underlineColorAndroid="transparent" placeholder={strings('login.username')} placeholderTextColor="grey" style={styles.inputText} onChangeText={text => this.setState(
                  {
                    username: text
                  }
                )} onFocus={() => this.setState(
                  {
                    message: ""
                  })}
              value={this.state.username} />
          </View>
          <View style={styles.inputBackground} />
        </View>

        <View style={styles.imputContainer}>
          <View style={styles.subInputContainer}>
            <TextInput ref={input => (this.passwordInput = input)} autoCapitalize="none" autoCorrect={false} value={this.state.password} autoFocus={false} keyboardType="default" underlineColorAndroid="transparent" placeholder={strings('login.password')} placeholderTextColor="grey" style={styles.inputText} secureTextEntry={true} onChangeText={text => this.setState(
                  {
                    password: text
                  }
                )}
              onFocus={() => this.setState(
                  {
                    message: ""
                  })}
               value={this.state.password} />
          </View>
          <View style={styles.inputBackground} />
        </View>
        <TouchableOpacity style={styles.buttonLogin} activeOpacity={0.6} onPress={() => this.login()}>
          <Text style={styles.buttonText}>{strings('login.login')}</Text>
        </TouchableOpacity>
        {this.renderLoading()}
        <Text style={styles.message}>{this.state.message}</Text>
        <View style={styles.footerContainer}>
          <TouchableOpacity onPress={() => this.props.navigateToPage("Register")}>
            <Text style={styles.textFooter}>
              {strings('login.register')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>;
  }

  renderLoading = () => {
    return <View style={styles.loading}>
        <ActivityIndicator animating={this.state.isLoading}  size="large" color="white" />
      </View>;
  }

  // componentDidMount() {
  //   const user = getUser();
  //   if (user) {
  //     this.props.loadCurrentUser(user.userID);
  //   } else {
  //     this.setState({
  //       renderLogin: true
  //     });
  //   }
  // }

  login() {
    Keyboard.dismiss();
    this.setState({
      message: ''
    });

    var { username, password } = this.state;
    username = username.trim();
    password = password.trim();
    if(username === '' && password === '') {
      alert(strings('login.msg_enter_username_pw'));
      return;
    }

    if(username === '') {
      alert(strings('login.msg_enter_username'));
      return;
    }

    if(password === '') {
      alert(strings('login.msg_enter_password'));
      return;
    }

    if(password.length < 6) {
      alert(strings('register.msg_enter_least_6_chars'));
      return;
    }

    if ("doctor" === username) {
      this.props.resetPage("DoctorInit");
    }

    const dataLogin = {
      username,
      password
    }

    this.setState({
      isLoading: true
    });

    UserApi.login(dataLogin).then( async (res) => {
      this.setState({isLoading: false});

      if(!res) {
        alert(strings('login.login_failure'));
        return;
      }

      const data = res.data;
      if(!data) {
        alert(strings('login.login_failure'));
        return;
      }
      // const status = data.status;
      const isActive = !data.errorOtp;
      const token = data.token;

      if (token) {
        // alert('Login succeed: ' + token);
        UserApi.setHeader(token);
        if(isActive){
          let userID = data.customerID;
          this.props.loadCurrentUser(userID);

          const _authenUser = {
            userID: userID,
            phoneNumber: this.state.username,
            password: this.state.password,
            token: token,
            type: UserTypes.CUSTOMER
          }

          saveUserID(userID);
          saveUser(_authenUser);
          saveToken(token);

          const tokenDevice = this.getToken();
          const dataTokenDevice = {
            "tokenID": tokenDevice
          }
          
          // UserApi.addTokenDevice(userID, dataTokenDevice);
          
          this.props.navigation.goBack();
          this.props.loadAppointments();
        }else{
          this.props.navigateToPage("Activate", { username })
        }
      } else {
        alert(strings('login.login_failure'));
        this.setState({
          message: strings('register.msg_info_incorrect')
        });
      }
    }).catch((err) => {
      this.setState({
        isLoading: false
      })
    });
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
    }
    return fcmToken;
  }
}

const mapStateToProps = state => {
  return state.userInfo;
};

const mapDispatchToProps = dispatch => {
  return {
    navigateToPage: (pageName, data) =>
      dispatch(navigateToPage(pageName, data)),
    resetPage: route => dispatch(resetPage(route)),
    loadCurrentUser: userID => {
      dispatch({ type: LOAD_CURRENT_USER, userID });
    },
    loadAppointments: () => {
      dispatch({ type: LOAD_APPOINTMENTS });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(77, 179, 78)"
  },
  appName: {
    fontSize: sizeFont(15),
    color: "white",
    marginVertical: sizeWidth(3),
    alignSelf: "center",
    fontWeight: "bold"
  },
  loginContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center"
  },
  textTitle: {
    fontSize: 55,
    color: "#fff"
  },
  imputContainer: {
    width: (WINDOW_WIDTH / 10) * 9,
    height: sizeWidth(11.3),
    marginVertical: sizeWidth(3)
  },
  subInputContainer: {
    zIndex: 1
  },
  inputText: {
    height: "100%",
    width: "100%",
    fontSize: 16,
    color: "#000",
    padding: sizeWidth(3)
  },
  inputBackground: {
    position: "absolute",
    backgroundColor: "white",
    height: "100%",
    width: "100%",
    zIndex: 0,
    opacity: 1,
    borderRadius: 10,
    borderColor: "#fff",
    borderWidth: 0.7
  },
  buttonLogin: {
    backgroundColor: "green",
    borderRadius: 10,
    width: (WINDOW_WIDTH / 10) * 9,
    padding: sizeWidth(4),
    alignItems: "center",
    marginVertical: sizeWidth(3)
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: sizeFont(4)
  },
  footerContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: sizeWidth(5)
  },
  textFooter: {
    color: "white",
    fontSize: sizeFont(4.5)
  },
  message: {
    color: "red",
    fontStyle: "italic"
  },
  loading: {
    alignSelf: "center"
  },
});

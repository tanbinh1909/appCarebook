import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  AsyncStorage,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView ,
  TextInput,
} from "react-native";
import { connect } from "react-redux";
import AppHeader from "../components/app-header";
import { sizeWidth, sizeFont } from "../helpers/size.helper";
import { navigateToPage, resetPage } from "../actions/nav.action";
import Text from "../components/common/text";
import { strings } from '../locate/I18n';
import Images from '../constants/image';
import Toast from "@remobile/react-native-toast";
import firebase from 'react-native-firebase';
import UserApi from "../api/user.api";
import {
  saveUser,
  saveToken,
  saveUserID,
  clearAll,
} from "../helpers/storage.helper";
import _ from "lodash";
import { LOAD_CURRENT_USER, SET_CURRENT_USER } from "../actions/user-info.action";
import { LOAD_APPOINTMENTS } from "../actions/appointment.action";
import {
  LOCAL_IMAGES
} from "../constants/app.constant";

const dataFamilyInformation = [0, 1, 2, 3];

const iconLogout = LOCAL_IMAGES.find(item => item.id === 'icon8_logout');
const iconSetting = LOCAL_IMAGES.find(item => item.id === 'icon_setting');

const dataMedical = [
  {
    screen: 'MedicalHistory',
    src: Images.img_medical_record,
    text: 'side_menu.medical_record',
    requestLogin: true,
  },
  {
    screen: 'PrescriptionHistory',
    src: Images.img_prescription_history,
    text: 'side_menu.prescription_history',
    requestLogin: true,
  },
  {
    screen: 'TestHistory',
    src: Images.img_test_history,
    text: 'side_menu.test_history',
    requestLogin: true,
  },
  {
    screen: 'Allergy',
    src: Images.img_allergy,
    text: 'side_menu.allergy',
    requestLogin: true,
    needPin: true,
  },
  {
    screen: 'FamilyIllnessList',
    src: Images.img_family_illness,
    text: 'side_menu.family_illness',
    requestLogin: true,
    needPin: true,
  },
  {
    screen: 'VaccinationHistory',
    src: Images.img_vaccination_history,
    text: 'side_menu.vaccination_history',
    requestLogin: true,
    needPin: true,
  },
  {
    screen: 'Insurance',
    src: Images.img_insurance,
    text: 'side_menu.insurance',
    requestLogin: true,
  },
  {
    screen: 'PaymentHistory',
    src: Images.img_payment_history,
    text: 'side_menu.payment_history',
    requestLogin: true,
  },
  {
    screen: 'BloodBank',
    src: Images.img_blood_bank,
    text: 'side_menu.blood_bank',
    requestLogin: true,
  },
  {
    screen: 'Saved',
    src: Images.img_save,
    text: 'side_menu.saved',
    requestLogin: true,
  },
  {
    screen: 'Profile',
    src: Images.img_account,
    text: 'side_menu.account',
    requestLogin: true,
  },
  {
    screen: 'Setting',
    src: iconSetting.localUrl,
    text: 'side_menu.setting',
    requestLogin: false,
  },
  {
    screen: '',
    src: iconLogout.localUrl,
    text: 'side_menu.log_out',
    requestLogin: true,
  }
]
const WINDOW_WIDTH = Dimensions.get("window").width;

class DocumentScreen extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      isLoading: false,
      message: '',
      dataMedical,
    };
  }

  handleClickFamilyInformation = () => {

  }

  handleClickMedical = (screen, requestLogin, needPin) => {
    if (screen !== '') {
      const check = this.validateNavigation(requestLogin, needPin);
      if (check.navigate) {
        this.props.navigateToPage(screen);
      } else {
        Toast.show(check.msgError);
      }
    } else {
      this.handleLogout();
    }
  }

  validateNavigation = (requestLogin, needPin) => {
    let navigate = false;
    let msgError = '';
    const { currentUser, pinCode } = this.props;
    const isLogon = currentUser && currentUser.customerID;
    if (requestLogin) {
      if (isLogon) {
        if (needPin) {
          if (pinCode) {
            navigate = true;
          } else {
            msgError = strings('login.msg_request_pin');
            return {navigate, msgError};
          }
        } else {
          navigate = true;
        }
      } else {
        msgError = strings('login.msg_request_login');
        return {navigate, msgError};
      }
    } else {
      navigate = true;
    }

    return {navigate, msgError};
  };

  renderLogin = () => {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.containerViewLogin} keyboardVerticalOffset ={-350}>
        <View style={styles.loginContainer}>
          <View style={styles.inputContainer}>
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
          <View style={styles.inputContainer}>
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
          <TouchableOpacity style={styles.buttonLogin} activeOpacity={0.6} onPress={() => this.handleLogin()}>
            <Text style={styles.buttonText}>{strings('login.login')}</Text>
          </TouchableOpacity>
          <Text style={styles.message}>{this.state.message}</Text>
          <View style={styles.footerContainer}>
            <TouchableOpacity onPress={() => this.props.navigateToPage("Register")}>
              <Text style={styles.textFooter}>
                {strings('login.register')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  };

  renderAccount = () => {
    const { currentUser } = this.props;
    const customerName = currentUser.customerName;
    const img = currentUser.image;

    return (
      <View style={styles.accountContainer}>
        {
          img ? (
            <Image
              style={styles.img_avatar}
              source={{uri: img}}
            />
          ) : (
            <Image
              style={styles.img_avatar}
              source={Images.ic_user}
            />
          )
        }
        
        <Text style={styles.name}>{customerName}</Text>
      </View>
    );
  };

  renderInformation = () => {
    return (
      <View>
        <View style={styles.rowInformation}>
          <View style={styles.itemInformation} >
            <Image
              style={styles.img_icon}
              source={Images.img_cardiovascular}
            />
            <View>
              <Text style={styles.textItemInformation}>56</Text>
              <Text style={styles.text}>{strings('document.heart_beat')}</Text>
            </View>
          </View>
          <View style={styles.itemInformation} >
            <Image
              style={styles.img_icon}
              source={Images.img_cardiovascular}
            />
            <View>
              <Text style={styles.textItemInformation}>120/80</Text>
              <Text style={styles.text}>{strings('document.blood_pressure')}</Text>
            </View>
          </View>
        </View>
        <View style={styles.rowInformation}>
          <View style={styles.itemInformation} >
            <Image
              style={styles.img_icon}
              source={Images.img_cardiovascular}
            />
            <View>
              <Text style={styles.textItemInformation}>165 cm</Text>
              <Text style={styles.text}>{strings('document.height')}</Text>
            </View>
          </View>
          <View style={styles.itemInformation} >
            <Image
              style={styles.img_icon}
              source={Images.img_cardiovascular}
            />
            <View>
              <Text style={styles.textItemInformation}>135</Text>
              <Text style={styles.text}>{strings('document.weight')}</Text>
            </View>
          </View>
        </View>
        <View style={styles.rowInformation}>
          <View style={styles.itemInformation} >
            <Image
              style={styles.img_icon}
              source={Images.img_cardiovascular}
            />
            <View>
              <Text style={styles.textItemInformation}>135</Text>
              <Text style={styles.text}>{strings('document.vessel')}</Text>
            </View>
          </View>
          <View style={styles.itemInformation} >
            <Image
              style={styles.img_icon}
              source={Images.img_cardiovascular}
            />
            <View>
              <Text style={styles.textItemInformation}>135</Text>
              <Text style={styles.text}>{strings('document.calo')}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  renderFamilyInformation = () => {
    return (
      <View>
        <FlatList
          data={dataFamilyInformation}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={this.handleClickFamilyInformation}>
              {this.renderRowFamilyInformation(item)}
            </TouchableOpacity>
          )}
          //Setting the number of column
          numColumns={1}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }

  renderRowFamilyInformation = (item) => {
    return (
      <View style={styles.rowFamilyInformation}>
        <View style={styles.itemAvatar} >
          <Image
            style={styles.img_avatar_family}
            source={Images.avatar}
          />
          <Text style={styles.text}>Nguyễn Thị Huyền Trang</Text>
          <Text style={styles.text}>Mẹ</Text>
        </View>
        <View style={styles.containerHealth}>
          <View style={styles.rowHealth}>
            <View style={styles.itemHealth} >
              <Image
                style={styles.img_icon_family}
                source={Images.img_cardiovascular}
              />
             <View style={styles.textItemHealthContain}>
              <Text style={styles.textItemHealth}>56</Text>
              <Text style={styles.textHealth}>{strings('document.heart_beat')}</Text>
            </View>
            </View>
            <View style={styles.itemHealth} >
              <Image
                style={styles.img_icon_family}
                source={Images.img_cardiovascular}
              />
              <View style={styles.textItemHealthContain}>
                <Text style={styles.textItemHealth}>120/80</Text>
                <Text style={styles.textHealth}>{strings('document.blood_pressure')}</Text>
              </View>
            </View>
            <View style={styles.itemHealth} >
              <Image
                style={styles.img_icon_family}
                source={Images.img_cardiovascular}
              />
              <View style={styles.textItemHealthContain}>
                <Text style={styles.textItemHealth}>165 cm</Text>
                <Text style={styles.textHealth}>{strings('document.height')}</Text>
              </View>
            </View>
          </View>
          <View style={styles.rowHealth}>
            <View style={styles.itemHealth} >
              <Image
                style={styles.img_icon_family}
                source={Images.img_cardiovascular}
              />
              <View style={styles.textItemHealthContain}>
                <Text style={styles.textItemHealth}>135</Text>
                <Text style={styles.textHealth}>{strings('document.weight')}</Text>
              </View>
            </View>
            <View style={styles.itemHealth} >
              <Image
                style={styles.img_icon_family}
                source={Images.img_cardiovascular}
              />
              <View style={styles.textItemHealthContain}>
                <Text style={styles.textItemHealth}>135</Text>
                <Text style={styles.textHealth}>{strings('document.vessel')}</Text>
              </View>
            </View>
            <View style={styles.itemHealth} >
              <Image
                style={styles.img_icon_family}
                source={Images.img_cardiovascular}
              />
              <View style={styles.textItemHealthContain}>
                <Text style={styles.textItemHealth}>135</Text>
                <Text style={styles.textHealth}>{strings('document.calo')}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  renderMedicalRecord = (dataMedicalRender) => {
    return(
      <View>
        <Text style={styles.titleMedical}>{strings('document.title_list_document')}</Text>
        <FlatList
          data={dataMedicalRender}
          renderItem={({ item }) => this.renderItemMedicalRecord(item)}
          //Setting the number of column
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }

  renderItemMedicalRecord = (item) => {
    return (
      <TouchableOpacity onPress={() => this.handleClickMedical(item.screen, item.requestLogin, item.needPin)}>
        <View style={styles.rowMedical}>
          <Image style={styles.imageThumbnail} source={item.src} />
          <Text style={styles.text}>{strings(item.text)}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { currentUser } = this.props;
    const isLogon = currentUser && currentUser.customerID;
    const { dataMedical } = this.state;
    const dataMedicalRender = isLogon ? dataMedical : dataMedical.filter(item => item.screen !== '');
    const { isLoading } = this.state;
    
    return (
      <View style={styles.container} >
        <AppHeader isMain={true} />
        <ScrollView>
          <View style={styles.mainContainer}>
            {!isLogon && this.renderLogin()}
            {isLoading && <ActivityIndicator size="large" color="red" style={styles.activityIndicator} /> }
            {isLogon && this.renderAccount()}
            {/* {isLogon && this.renderInformation()} */}
            {/* {isLogon && this.renderFamilyInformation()} */}
            {this.renderMedicalRecord(dataMedicalRender)}
          </View> 
        </ScrollView>
      </View>
    );
  }

  handleLogin = () => {
    Keyboard.dismiss();
    this.setState({
      message: ''
    });

    var { username, password } = this.state;
    username = username.trim();
    password = password.trim();
    if(username === '' && password === '') {
      this.setState({
        message: strings('login.msg_enter_username_pw')
      });
      return;
    }

    if(username === '') {
      this.setState({
        message: strings('login.msg_enter_username')
      });
      return;
    }

    if(password === '') {
      this.setState({
        message: strings('login.msg_enter_password')
      });
      return;
    }

    if(password.length < 6) {
      this.setState({
        message: strings('register.msg_enter_least_6_chars')
      });
      return;
    }

    const dataLogin = {
      username,
      password
    }

    this.setState({
      isLoading: true
    });

    UserApi.login(dataLogin).then( async (res) => {
      if(!res) {
        Toast.show(strings('login.login_failure'));
        return;
      }
      const data = res.data;
      if(!data) {
        Toast.show(strings('login.login_failure'));
        return;
      }
      const isActive = !data.errorOtp;
      const token = data.token;

      if (token) {
        if(isActive){
          let userID = data.customerID;
          const _authenUser = {
            userID: userID,
            phoneNumber: this.state.username,
            password: this.state.password,
            // token: token,
          }

          saveToken(token);
          this.props.loadCurrentUser(userID);
          saveUserID(userID);
          saveUser(_authenUser);

          const tokenDevice = await this.getToken();
          const dataTokenDevice = {
            "tokenID": tokenDevice
          }
          
          // UserApi.addTokenDevice(userID, dataTokenDevice);
          // this.props.navigation.goBack();
          this.props.loadCurrentUser(userID);
          this.props.loadAppointments();
          this.setState({isLoading: false});
        }else{
          this.props.navigateToPage("Activate", { phone : username })
        }
      } else {
        this.setState({
          isLoading: false,
          message: strings('register.msg_info_incorrect')
        });
      }
    }).catch((error) => {
      this.setState({isLoading: false});
    });
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
    }
    return fcmToken;
  }

  handleLogout = () => {
    clearAll(); // clear local storage
    this.props.clearCurrentUser(); // clear current user in reducer
  };
}

const mapStateToProps = state => {
  return {...state.userInfo};
};

const mapDispatchToProps = dispatch => {
  return {
    navigateToPage: (route, data) => dispatch(navigateToPage(route, data)),
    loadCurrentUser: userID => {
      dispatch({ type: LOAD_CURRENT_USER, userID });
    },
    loadAppointments: () => {
      dispatch({ type: LOAD_APPOINTMENTS });
    },
    clearCurrentUser: () => dispatch({ type: SET_CURRENT_USER, currentUser: {} }),
    resetPage: route => dispatch(resetPage(route)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    justifyContent: 'center',
    flex: 1,
    padding: sizeWidth(2),
  },
  accountContainer: {
    backgroundColor: '#3AAF00',
    flex: 1,
    justifyContent: 'center',
    padding: sizeWidth(4),
    alignItems: 'center',
  },
  img_avatar: {
    height: sizeWidth(30),
    width: sizeWidth(30),
    borderRadius: sizeWidth(30)/2,
    borderWidth: sizeWidth(1),
    borderColor: "white",
  },
  name: {
    marginTop: 4,
    fontSize: sizeFont(6),
    fontWeight: 'bold',
    color: 'white'
  },
  rowInformation: {
    flex: 1,
    flexDirection: 'row',
    padding: sizeWidth(2),
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemInformation: {
    width: '50%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: "flex-start",
    alignItems: "center",
  },
  textItemInformation: {
    fontSize: sizeFont(4),
    fontWeight: 'bold',
    color: '#f5791b',
  },
  rowFamilyInformation: {
    flex: 1,
    flexDirection: 'row',
    padding: sizeWidth(2),
    alignItems: "center",
    backgroundColor: '#edeceb',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  containerHealth: {
    flex: 1,
    flexDirection: 'column',
  },
  rowHealth: {
    flex: 1,
    flexDirection: 'row',
  },
  itemAvatar: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemHealth: {
    width: '22%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: "flex-start",
    alignItems: "center",
  },
  img_avatar_family: {
    height: sizeWidth(17),
    width: sizeWidth(17),
    borderRadius: sizeWidth(17)/2
  },
  img_icon_family: {
    height: sizeWidth(8),
    width: sizeWidth(8),
  },
  textItemHealthContain: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  textItemHealth: {
    fontSize: sizeFont(3),
    fontWeight: 'bold',
    color: '#f5791b',
    marginLeft: 2
  },
  textHealth: {
    fontSize: sizeFont(2),
    fontWeight: 'bold',
    marginLeft: 2
  },
  rowMedical: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: sizeWidth(2),
    alignItems: "center",
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: sizeWidth(27),
    width: sizeWidth(27),
  },
  text: {
    fontSize: sizeFont(2.8),
    fontWeight: 'bold',
  },
  img_icon: {
    height: sizeWidth(17),
    width: sizeWidth(17),
  },
  titleMedical: {
    backgroundColor: '#3AAF00',
    marginTop: 20,
    textAlign: "center",
    padding: sizeWidth(2),
    fontSize: sizeFont(6),
    fontWeight: 'bold',
    color: 'white'
  },
  containerViewLogin: {
    flex: 1,
    backgroundColor: "rgb(77, 179, 78)"
  },
  appName: {
    fontSize: sizeFont(10),
    color: "white",
    marginVertical: sizeWidth(3),
    alignSelf: "center",
    fontWeight: "bold"
  },
  loginContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 50
  },
  textTitle: {
    fontSize: 55,
    color: "#fff"
  },
  inputContainer: {
    width: (WINDOW_WIDTH / 10) * 8.5,
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
    width: (WINDOW_WIDTH / 10) * 8.5,
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
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
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
  activityIndicator: {
    marginTop: 10
  }
});

import React, { Component } from "react";
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Keyboard, ActivityIndicator, TouchableOpacity, AsyncStorage } from "react-native";
import PropTypes from "prop-types";
import { Icon } from "react-native-elements";
import Button from "../components/common/button";
import Text from "../components/common/text";
import { sizeFont, sizeWidth, sizeHeight } from "../helpers/size.helper";
import Input from "../components/common/input";
import {
  secondary_bg_color,
  text,
  gender,
  primary_color,
  primary_bg_color,
  getDateNowWithOutTime
} from "../constants/app.constant";
import { CheckBox } from "react-native-elements";
import ReactNativeDatePicker from "react-native-datepicker";
import { navigateBack, navigateToPage } from "../actions/nav.action";
import { connect } from "react-redux";
import { date_format } from "../constants/app.constant";
import Moment from "moment";
import UserApi from "../api/user.api";
import { strings } from '../locate/I18n';
import { isValidName, isInteger } from "../helpers/validator.helper";
import {getRegister , removeRegister} from '../helpers/storage.helper';
import DateUtil from "../constants/date.util";
import Toast from "@remobile/react-native-toast";

class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerName: text.empty_string,
      phone: text.empty_string,
      password: text.empty_string,
      retypePassword: text.empty_string,
      birthday: getDateNowWithOutTime(),
      id: text.empty_string,
      email: text.empty_string,
      userGender: gender.male,
      message: text.empty_string,
      isLoading: false
    };
  }

  handleDateInputChange = (dateStr) => {
    const birthday = new DateUtil(dateStr).getDate();
    this.setState({birthday});
  }
  render() {
    const {
      customerName,
      phone,
      password,
      retypePassword,
      birthday,
      id,
      email,
      userGender,
      message
    } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container} keyboardVerticalOffset={-250}>
        <View style={styles.registerContainer}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.containerHeader}>
              <TouchableOpacity
                style={styles.iconWrap}
                onPress={() => {this.props.navigateBack()}}
              >
                <Icon
                  style={styles.iconBack}
                  name="chevron-left"
                  type="material-community"
                  size={sizeFont(7)}
                  color="white"
                />
              </TouchableOpacity>
              <Text style={styles.appName}>{strings('register.appname')}</Text>
            </View>
            <Input
              textStyle={styles.textInput}
              style={styles.input}
              value={customerName}
              onChangeText={(customerName) => this.setState({ customerName })}
              placeholder={strings('register.fullname')}
              onFocus={() => this.setState({message: text.empty_string})}
            />
            <Input
              textStyle={styles.textInput}
              keyboardType="numeric"
              style={styles.input}
              value={phone}
              maxLength={10}
              onChangeText={(phone) => this.setState({ phone })}
              placeholder={strings('register.phone')}
              onFocus={() => this.setState({message: text.empty_string})}
            />
            <Input
              textStyle={styles.textInput}
              style={styles.input}
              value={password}
              onChangeText={(password) => this.setState({ password })}
              secureTextEntry={true}
              placeholder={strings('register.pass')}
              onFocus={() => this.setState({message: text.empty_string})}
            />
            <Input
              textStyle={styles.textInput}
              style={styles.input}
              secureTextEntry={true}
              value={retypePassword}
              onChangeText={(retypePassword) => this.setState({ retypePassword })}
              placeholder={strings('register.confirm_pass')}
              onFocus={() => this.setState({message: text.empty_string})}
            />
            <ReactNativeDatePicker
              mode="date"
              date={birthday}
              format={date_format.dd_mm_yyyy}
              confirmBtnText={strings('register.choose')}
              cancelBtnText={strings('cancel')}
              showIcon={false}
              onDateChange={ this.handleDateInputChange }
              placeholder={strings('register.birthday')}
              customStyles={{
                dateInput: {
                  alignItems: "flex-start",
                  justifyContent: "center",
                  backgroundColor: "white",
                  paddingHorizontal: sizeWidth(2.13),
                  height: sizeWidth(12),
                  borderRadius: 10,
                  borderColor: "#fff",
                  borderWidth: 0.7
                },
                dateTouchBody: {
                  height: sizeWidth(12)
                },
                dateText: {
                  fontSize: sizeWidth(3),
                  textAlign: "left",
                  color: "black",
                  fontWeight: "bold"
                },
                placeholderText: {
                  fontSize: sizeWidth(3),
                  textAlign: "left",
                  color: "#888888",
                  fontWeight: "bold"
                }
              }}
              style={styles.input}
            />
            <Input
              textStyle={styles.textInput}
              style={styles.input}
              value={id}
              // keyboardType="numeric"
              onChangeText={(id) => this.setState({ id })}
              placeholder={strings('register.id_card')}
              onFocus={() => this.setState({message: text.empty_string})}
            />
            <Input
              textStyle={styles.textInput}
              style={styles.input}
              value={email}
              onChangeText={(email) => this.setState({ email })}
              placeholder="Email"
              onFocus={() => this.setState({message: text.empty_string})}
            />
            <View style={styles.checkboxWrap}>
              <CheckBox
                center
                title={strings('register.male')}
                checked={userGender === gender.male}
                containerStyle={styles.checkbox}
                uncheckedColor={primary_bg_color}
                textStyle={styles.textCheckbox}
                onPress={() =>
                  this.setState({
                    userGender: gender.male
                  })
                }
              />
              <CheckBox
                center
                title={strings('register.female')}
                uncheckedColor={primary_bg_color}
                checked={userGender === gender.female}
                containerStyle={styles.checkbox}
                textStyle={styles.textCheckbox}
                onPress={() =>
                  this.setState({
                    userGender: gender.female
                  })
                }
              />
            </View>
            <Button
              onPress={() => this.registerAccount()}
              style={styles.button}
              textStyle={styles.textButton}
              text={strings('register.register')}
            />
            <Text style={styles.message}>{message}</Text>
            { this.state.isLoading && this.renderLoading()}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    );
  }

  registerAccount = async() =>{
    Keyboard.dismiss();
    const {
      customerName,
      phone,
      password,
      birthday,
      id,
      email,
      userGender,
    } = this.state;
    this.setState({isLoading: true});
    const isError = this.validateInput();
    if (!isError) {
      const data = {
        "fullName": customerName,
        "userPhone": phone,
        "userPass": password,
        "birthday": Moment(birthday).format(date_format.dd_mm_yyyy),
        "indentityNo": id,
        "userEmail": email,
        "gender": userGender
      }

      const data1 = {
        "userName": phone
      }
      
      
      UserApi.checkUserName(data1).then(async (res) => {
        if (res === true) {
          UserApi.register(data).then(async (response) => {
            this.setState({isLoading: false});
            if (response.success === "true") {
              UserApi.createOTP(data1)
              this.props.navigateToPage("Activate",{
                phone
              })
            } else {
              this.setState({isLoading: false});
              this.setState({message: response.message});
            }
          });
        } else {
          this.setState({ isLoading: false });
          const checkRegister = await getRegister();
          if(checkRegister === null) {
            Toast.show(strings('register.msg_check_otp'));
            setTimeout(() => {
              UserApi.createOTP(data1);
              this.props.navigateToPage("Activate", { phone });
            }, 1000);
            
          }else {
            removeRegister('REGISTER');
            this.setState({
              message: strings('register.phone_is_exist')
            })
          }
        }
      }).catch((error) => {
        this.setState({isLoading: false});
      });      
    } else {
      this.setState({isLoading: false});
    }
  }

  gotoRegisterSuccess(userName) {
    this.props.navigateToPage("RegisterSuccess", {
      userName
    });
  }

  
  validateInput =() => {
    const {
      customerName,
      phone,
      password,
      retypePassword,
      id,
      email, 
      birthday
    } = this.state;
    if (customerName == text.empty_string || phone == text.empty_string || password == text.empty_string || retypePassword == text.empty_string || id == text.empty_string) {
      this.setState({message: strings('register.msg_enter_full_registration')});
      return true;
    }

    if (!isValidName(customerName)) {
      this.setState({message: strings('register.msg_enter_customerName')});
      return true;
    }

    if (isInteger(customerName)) {
      this.setState({message: strings('register.msg_enter_notInteger_customerName')});
      return true;
    }

    if (phone.length < 10) {
      this.setState({message: strings('register.msg_enter_phone_number')});
      return true;
    }

    if (password.length < 6) {
      this.setState({message: strings('register.msg_enter_least_6_chars')});
      return true;
    }

    if (/[^0-9a-zA-Z]/.test(id)) {
      this.setState({message: strings('register.msg_enter_identity_passport')});
      return true;
    }

    if (password !== retypePassword) {
      this.setState({message: strings('register.msg_confirm_pw_incorrect')});
      return true;
    }
    if (birthday.getTime() > getDateNowWithOutTime().getTime()) {
      this.setState({message: strings('register.msg_enter_birthday')});
      return true;
    }

    if (email !== text.empty_string && !this.validateEmail(email)) {
      this.setState({message: strings('register.msg_enter_email_format')});
      return true;
    }
    return false;
  }

  renderLoading = () => {
    return <View style={styles.loading}>
        <ActivityIndicator size="large" color="white" />
      </View>;
  }

  validateEmail = (email) => {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regex.test(String(email).toLowerCase());
  }
}

const mapDispatchToProps = dispatch => {
  return {
    navigateToPage: (route, data) => dispatch(navigateToPage(route, data)),
    navigateBack: () => dispatch(navigateBack())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(RegisterScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(77, 179, 78)",
  },
  registerContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flex: 1,
    paddingHorizontal: sizeWidth(5),
    marginBottom:10
  },
  containerHeader: {
    flexDirection: "row",
    paddingVertical: sizeWidth(2.2),
    alignItems: "center",
    // justifyContent: "space-around",
    // alignSelf: "center",
    height: sizeHeight(10)
  },
  appName: {
    fontSize: sizeFont(12),
    color: "white",
    marginVertical: sizeWidth(3),
    alignSelf: "center",
    fontWeight: "bold",
    alignItems: "center",
    marginLeft: 40
  },
  button: {
    marginVertical: sizeWidth(3),
    marginHorizontal: sizeWidth(5),
    paddingVertical: sizeWidth(4),
    backgroundColor: "rgb(40, 136, 23)",
    borderRadius: 10
  },
  textButton: {},
  input: {
    borderWidth: 0,
    width: "100%",
    height: sizeWidth(12),
    backgroundColor: "white",
    marginVertical: sizeWidth(2.13),
    borderRadius: 10,
    borderColor: "#fff",
    borderWidth: 0.7
  },
  textInput: {
    height: sizeWidth(12),
    borderRadius: 10
  },
  checkbox: {
    padding: 0,
    margin: 0,
    borderWidth: 0,
    backgroundColor: secondary_bg_color
  },
  checkboxWrap: {
    flexDirection: "row",
    marginTop: sizeWidth(2),
    marginBottom: sizeWidth(2),
    justifyContent: "center",
    alignItems: "center"
  },
  textCheckbox: {
    color: "white"
  },
  message: {
    color: "red",
    fontStyle: "italic",
    textAlign: "center"
  },
  iconWrap: {
    paddingHorizontal: sizeWidth(1)
  }
});

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image , Dimensions, TouchableOpacity} from 'react-native';
import UserApi from "../api/user.api";
import { navigateBack, navigateToPage } from "../actions/nav.action";
import { connect } from "react-redux";
import { strings } from '../locate/I18n';
import {saveRegister} from '../helpers/storage.helper';
const WINDOW_WIDTH = Dimensions.get("window").width;
import Images from '../constants/image';



class ActivateScreen extends Component {



  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      phoneNumber: '',
      validate: '',
      message: '',
    }
  }

  componentDidMount(){
    this.receivePhone();
  }

  render() {
    return (
      <View style={{ backgroundColor: '#57d38c', flex: 1, justifyContent: 'center', flexDirection: 'column', alignItems: 'center', padding: 20}}>
        <View style={{ backgroundColor: 'white', width: 300, height: 300, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: 'black', fontSize: 18 }}>{strings('active_account.active_account')}</Text>
          <Text style={{color: 'grey', textAlign: 'center'}}>{strings('active_account.title_verification_code_sent')}</Text>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderWidth: .5,
            borderColor: '#000',
            height: 40,
            borderRadius: 5,
            margin: 10,
            width: (WINDOW_WIDTH / 10) * 6,
      
          }}>
            <Image
              style={{
                padding: 10,
                margin: 5,
                height: 25,
                width: 25,
                resizeMode: 'stretch',
                alignItems: 'center'
              }}
              source={Images.ic_smartphone}
              fontSize={10}
            />
            <Text style={{flex: 1}}>{this.state.phoneNumber}</Text>
          </View>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderWidth: .5,
            borderColor: '#000',
            height: 40,
            borderRadius: 5,
            margin: 10,
            width: (WINDOW_WIDTH / 10) * 6,
            
          }}>
            <Image
              style={{
                padding: 10,
                margin: 5,
                height: 25,
                width: 25,
                resizeMode: 'stretch',
                alignItems: 'center'
              }}
              source={Images.ic_fingerprint}
              fontSize={10}
            />
            <TextInput
              style={{flex: 1}}
              autoCapitalize='none'
              autoCorrect={false}
              keyboardType='default'
              placeholder={strings('active_account.code_verify')}
              placeholderTextColor="grey"
              onChangeText={text => this.setState(
                {
                  validate: text
                }
              )}
              value={this.state.validate}
            />
          </View>

          <View>
            <TouchableOpacity style={styles.buttonLogin} onPress={() => this.checkAccount()}>
               <Text style={{color: 'white'}}>{strings('active_account.confirm')}</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity style={styles.buttonSend} onPress={() => this.sendOTP()}>
               <Text style={{color: 'white'}}>{strings('active_account.resend')}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.message}>{this.state.message}</Text>
       
            
        </View>
      </View>

    );
  }

  checkAccount = () => {
    const { validate} = this.state
    const {phone} = this.props.navigation.state.params;
    const {username} = this.props.navigation.state.params;

    const data = {
      "userName": phone,
      "otp": validate
    }

    const data1 = {
      "userName" : phone
    }

    const data2 = {
      "userName": username,
      "otp": validate
    }

    const data3 = {
      "userName" : username
    }

    this.setState({ 
      message: '',
    })
    // phone
    UserApi.checkOTP(data)
    .then((res) => {
      if(res.activateId != null) {
        UserApi.activeAccount(data1)
          .then((response) => {
            if(response.userName != null) {
              saveRegister("REGISTER");
              this.gotoRegisterSuccess(phone);
            }
          })
      }else {
        this.setState({ message : strings('active_account.code_verify_fail') })
      }  
    })
    
      // username
      // UserApi.checkOTP(data2)
      // .then((res) => {
      //   if(res.activateId != null) {
      //     UserApi.activeAccount(data3)
      //       .then((response) => {
      //         if(response.userName != null) {
      //           this.gotoRegisterSuccess(username)
      //         }
      //       })
      //   }else {
      //     this.setState({ message : strings('active_account.code_verify_fail') })
      //   }  
      // })
     
  }

  sendOTP = () => {
    // const { phone } = this.state;
    const {phone} = this.props.navigation.state.params;
    const {username} = this.props.navigation.state.params;

    const data = {
      "userName": phone
    }

    const data1 = {
      "userName": username
    }
    // phone
    UserApi.createOTP(data)
      .then (() => {
        console.log("Send OTP Success")
      })
    // username
    // UserApi.createOTP(data1)
    // .then (() => {
    //   console.log("Send OTP Success")
    // })

  }

  receivePhone(){
    const {phone} = this.props.navigation.state.params;
    const {username} = this.props.navigation.state.params;
    const hidden = "*******"

    if ( phone != null){
      const num1 = phone.substr(-3,3);
      const number = hidden + num1;
      this.setState({ phoneNumber: number })
    }else if ( username != null){
      const num1 = username.substr(-3,3);
      const number = hidden + num1;
      this.setState({ phoneNumber: number })
    }
  }

  gotoRegisterSuccess(userName) {
    this.props.navigateToPage("RegisterSuccess", {
      userName
    });
  }



}

const mapDispatchToProps = dispatch => {
  return {
    navigateToPage: (route, data) => dispatch(navigateToPage(route, data)),
  };
};

export default connect(null,mapDispatchToProps) (ActivateScreen);

const styles = StyleSheet.create({

  buttonLogin: {
    backgroundColor: "#00a951",
    borderRadius: 10,
    width: (WINDOW_WIDTH / 10) * 6,
    padding: (WINDOW_WIDTH / 100) * 1,
    alignItems: "center",
  },

  buttonSend: {
    margin: 10,
    backgroundColor: "#fd674a",
    borderRadius: 10,
    width: (WINDOW_WIDTH / 10) * 6,
    padding: (WINDOW_WIDTH / 100) * 1,
    alignItems: "center",
  },

  message: {
    color: "red",
    fontStyle: "italic",
    textAlign: "center"
  },
  
})


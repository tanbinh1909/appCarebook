import React, {Component} from "react";
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  Modal,
} from "react-native";
import { connect } from "react-redux";
import { strings } from '../locate/I18n';
import {secondary_bg_color} from '../constants/app.constant';
import Input from "./common/input";
import validator from 'validator';
import { SET_PIN_CODE } from "../actions/user-info.action";
import {setPINCode} from '../helpers/storage.helper';
import Toast from "@remobile/react-native-toast";

class DialogPinCode extends Component {
  state = {
    pinCode: "",
    visible: false,
    msg: null,
  }

  _onRequestClose = () => {}

  render() {
    return (
      <Modal
        transparent={true}
        visible={true}
        onRequestClose={this._onRequestClose} >
        <View style={styles.container}>
          <View style={styles.panel}>
            <View style={styles.containerTitle}>
              <Text style={styles.titleDialog}>{strings("enter_pin_code")}</Text>
            </View>
            <View style={styles.containerTextTerms}>
              <Input
                // value={this.state.pinCode}
                textStyle={{fontSize: 14, textAlign: 'center'}}
                maxLength={4}
                keyboardType="numeric"
                // secureTextEntry={true}
                onChangeText={pinCode => this.setState({ pinCode })}
              />
              {this.state.msg &&
              <Text style={{marginTop: 10}}>{strings("enter_pin_code")}</Text>
              }
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableHighlight style={styles.btnCancel} underlayColor="#E8EAF6" onPress={this.onCancel}>
                <Text style={styles.textButton}>{strings("cancel")}</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.btnAgree} underlayColor="#E8EAF6" onPress={this.onAgree}>
                <Text style={styles.textButton}>{strings("agree")}</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  onCancel = () => {
    this.props.onClosed();
  }

  onAgree = () => {
    if (validator.isEmpty(this.state.pinCode)) {
      Toast.show(strings('msg_pls_enter_field', {field: strings('dialog_pin_code.pin_code')}));
      return false;
    }
    if(validator.isInt(this.state.pinCode)) {
      setPINCode(this.state.pinCode);
      this.props.savePinCode(this.state.pinCode);
      this.props.onClosed();
    }
  }
}

const mapStateToProps = state => {
  return {...state.medicalHistory,...state.userInfo};
};

const mapDispatchToProps = dispatch => {
  return {
    savePinCode: pinCode => dispatch({ type: SET_PIN_CODE, pinCode }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogPinCode);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3D3D3DDF'
  },
  panel: {
    width: '90%',
    overflow: 'hidden',
    backgroundColor: 'white',
    margin: 20,
    // borderRadius: 20
  },
  containerTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    backgroundColor: secondary_bg_color
  },
  titleDialog: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  line: {
    height: 2,
    backgroundColor: "#FFD600"
  },
  containerTextTerms: {
    // flexDirection: 'row',
    margin: 15
  },
  underLine: {
    borderBottomWidth: 2,
    borderColor: "#FFC107",
    paddingBottom: 3
  },
  containerTextPrivacy: {
    flexDirection: 'row',
    marginLeft: 20,
    marginBottom: 20,
  },
  privacy: {
    margin: 20,
    marginTop: 0
  },
  btnCancel: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderColor: "#E8EAF6",
  },
  btnAgree: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: "#E8EAF6",
  },
  textButton: {
    fontSize: 16
  },
  checkbox: {
    padding: 0,
    margin: 0,
    borderWidth: 0,
    backgroundColor: 'white'
  },
})
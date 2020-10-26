import React, { Component } from "react";

import { View, StyleSheet, Text, TouchableOpacity, Alert, Platform, NavigatorIOS } from "react-native";
import { navigateBack, navigateToPage } from "../actions/nav.action";
import { connect } from "react-redux";
import { LOAD_INSURANCES_FULFILLED } from "../actions/insurance.action";
import { strings } from '../locate/I18n';
import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera, FaceDetector } from 'react-native-camera';

class QRCodeScannerScreen extends Component {
  constructor() {
    super();
    this.state = {
      reactivate: true
    };
  }
  onSuccess(e) {
    const { insurances } = this.props;
    const insuranceCode = e.data;
    if (insuranceCode) {
      let _foundInsurances = insurances.filter(
        item => item.insuranceCode == insuranceCode
      );
      if (_foundInsurances && _foundInsurances.length > 0) {
        this.props.updateInsurances(_foundInsurances);
        this.props.navigateBack();
      } else {
        Alert.alert(
          strings('qrcode_scanner.noti'),
          strings('qrcode_scanner.msg'),
          [
            {
              text: strings('qrcode_scanner.scan_again'),
              style: "cancel",
              onPress: () => this.scanner.reactivate()
            }
          ],
          { cancelable: true }
        );
      }
    }
  }

  _renderAndroid() {
    return (
      <QRCodeScanner
        ref={node => {
          this.scanner = node;
        }}
        reactivate={false}
        reactivateTimeout={3000}
        onRead={this.onSuccess.bind(this)}
        topViewStyle={{ padding: 0, margin: 0 }}
        topContent={
          <Text style={styles.centerText}>
            {strings('qrcode_scanner.msg2')}
          </Text>
        }
        bottomContent={
          <TouchableOpacity
            style={styles.buttonTouchable}
            onPress={() => this.props.navigateBack()}
          >
            <Text style={styles.buttonText}>{strings('qrcode_scanner.back')}</Text>
          </TouchableOpacity>
        }
        bottomViewStyle={{ height: 20 }}
        showMarker={true}
        markerStyle={{
          borderColor: "#FFF"
        }}
        // cameraStyle={{
        //     height: "80%"
        // }}
      />
    );
  }

  _renderIOS() {
    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        faceDetectionLandmarks={
          RNCamera.Constants.FaceDetection.Landmarks
            ? RNCamera.Constants.FaceDetection.Landmarks.all
            : undefined
        }
      />
    );
  }

  render() {
    if(Platform.OS === 'ios') {
      return this._renderIOS();
    }
    else {
      return this._renderAndroid();
    }
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: "#777",
    textAlign: "center"
  },
  textBold: {
    fontWeight: "500",
    color: "#000"
  },
  buttonText: {
    fontSize: 21,
    color: "rgb(0,122,255)"
  },
  buttonTouchable: {
    padding: 16
  }
});

const mapStateToProps = state => {
  return state.insurance;
};

const mapDispatchToProps = dispatch => {
  return {
    navigateBack: () => dispatch(navigateBack()),
    navigateToPage: pageName => dispatch(navigateToPage(pageName)),
    updateInsurances: insurances =>
      dispatch({ type: LOAD_INSURANCES_FULFILLED, insurances })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QRCodeScannerScreen);

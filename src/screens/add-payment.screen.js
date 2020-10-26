import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import AppHeader from "../components/app-header";
import Toolbar from "../components/common/toolbar";
import Label from "../components/common/label";
import Input from "../components/common/input";
import { sizeWidth,sizeHeight } from "../helpers/size.helper";
import { isValidName, isInteger } from "../helpers/validator.helper";
import { Icon } from "react-native-elements";
import { SAVE_MEDICAL } from "../actions/medical-history.action";
import LoadingPopup from "../components/common/loading-popup";
import { navigateBack, navigateToPage } from "../actions/nav.action";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ImageSelector from "../components/common/image-selector";
import validator from "validator";
import Toast from "@remobile/react-native-toast";
import { Button} from 'native-base';
import Text from "../components/common/text";
import FormatHelper from "../helpers/format.helper";
import { strings } from '../locate/I18n';
import { secondary_bg_color } from "../constants/app.constant";
class AddPaymentScreen extends Component {
  constructor() {
    super();
    this.state = {
      hinhanh: [],
      noidung: "",
      tieude: "",
      tongtien: ""
    };
  }

  onChangeMoney = (number) => {
    this.setState({tongtien: number})
  }

  render() {
    return (
      <View style={styles.container}>
      <AppHeader />
      <Toolbar title={strings('add_payment.add_new_payment')}/>
      <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={100}>
        <LoadingPopup loading={this.props.medicalSaving} />
          <ScrollView
            contentContainerStyle={styles.body}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <Label text={strings('add_payment.title')}/>
            <Input
              placeholder={strings('add_payment.title_input')}
              onChangeText={tieude => this.setState({ tieude })}
            />
            <Label text={strings('add_payment.content')} />
            <Input
              multiline={true}
              textStyle={styles.textContent}
              style={styles.content}
              placeholder={strings('add_payment.content_input')}
              onChangeText={noidung => this.setState({ noidung })}
            />
            <Label text={strings('add_payment.total_money')} />
            <Input
              placeholder={strings('add_payment.money_input')}
              keyboardType="numeric"
              onChangeText={tongtien => this.onChangeMoney(tongtien)}
              value = {FormatHelper.addCommas(this.state.tongtien)}
            />
            <ImageSelector ref={ref => (this.imageSelector = ref)} />

            <View style={styles.action}>
              <Button
                style={[styles.buttonFull, { backgroundColor: "grey" }]}
                onPress={() => this.props.navigateBack()}
              >
                <Icon
                  style={styles.icon}
                  size={sizeWidth(5)}
                  name="chevron-left"
                  type="material-community"
                  color="white"
                />
                <Text style = {{color:"white"}}>{strings('add_payment.back')}</Text>
              </Button>
              <Button success
                style={styles.button}
                onPress={this.onSaveMedical}
              >
                <Icon
                  style={styles.icon}
                  size={sizeWidth(5)}
                  name="check"
                  type="material-community"
                  color="white"
                />
                <Text style = {{color:"white"}}>{strings('add_payment.complete')}</Text>
              </Button>
            </View>
          </ScrollView>
      </KeyboardAwareScrollView>
      </View>
    );
  }

  isValidForm() {
    const {tieude, noidung, tongtien} = this.state;
    if (validator.isEmpty(tieude)) {
      Toast.show(strings('msg_pls_enter_field', {field: strings('add_payment.title')}));
      return false;
    }
    if(!isValidName(tieude)) {
      Toast.show(strings('msg_name_cannot_special_char', {name: strings('add_payment.title')}));
      return false;
    }
    if (validator.isEmpty(noidung)) {
      Toast.show(strings('msg_pls_enter_field', {field: strings('add_payment.content')}));
      return false;
    }
    if(!isValidName(noidung)) {
      Toast.show(strings('msg_name_cannot_special_char', {name: strings('add_payment.content')}));
      return false;
    }
    if (validator.isEmpty(tongtien)) {
      Toast.show(strings('msg_pls_enter_field', {field: strings('add_payment.total_money')}))
      return false;
    }
    if(isInteger(tongtien) || parseInt(tongtien) <= 0) {
      Toast.show(strings('add_payment.msg2'));
      return false;
    }
    
    return true;
  }

  onSaveMedical = () => {
    if (this.isValidForm()) {
      const hinhanh = this.imageSelector.getSelectedImages();
      const newPayment = {
        hinhanh: hinhanh,
        noidung: this.state.noidung,
        tieude: this.state.tieude,
        tongtien: this.state.tongtien
      };

      const data = {
        benhAn: this.props.newMedical,
        xetNghiem: this.props.newTests,
        prescription: this.props.newPrescription,
        payment: newPayment
      };

      this.props.addMedical(data);
    }
  }
}

const mapStateToProps = state => {
  return state.medicalHistory;
};

const mapDispatchToProps = dispatch => {
  return {
    navigateBack: () => dispatch(navigateBack()),
    navigateToPage: (route, data) => dispatch(navigateToPage(route, data)),
    addMedical: medicals => {
      dispatch({ type: SAVE_MEDICAL, medicals})
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPaymentScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    height: sizeWidth(35)
  },
  textContent: {
    height: sizeWidth(35),
    textAlignVertical: "top",
    paddingTop: 5
  },
  button: {
    paddingHorizontal: sizeWidth(10),
    height: sizeHeight(5),
    justifyContent:"center",
    alignItems: "center",
    borderRadius:sizeWidth(1),
    backgroundColor: secondary_bg_color
  },
  icon: {
    marginLeft: sizeWidth(1)
  },
  action: {
    marginTop: sizeWidth(5),
    flexDirection: "row",
    justifyContent: "space-between"
  },
  body: {
    padding: sizeWidth(5)
  },
  image: {
    marginTop: sizeWidth(4),
    alignSelf: "center",
    width: sizeWidth(75),
    height: sizeWidth(50),
    borderWidth: 1,
    borderColor: "#888888"
  },
  delete: {
    position: "absolute",
    right: sizeWidth(2),
    top: sizeWidth(2),
    width: sizeWidth(5),
    justifyContent: "center",
    alignItems: "center",
    height: sizeWidth(5),
    borderRadius: sizeWidth(2.5),
    backgroundColor: "rgb(226, 79, 111)"
  },
  containerButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: sizeWidth(1)
  },
  buttonFull: {
    width: sizeWidth(32),
    height: sizeHeight(5),
    justifyContent:"center",
    alignItems: "center",
    borderRadius:sizeWidth(1)
  },
});

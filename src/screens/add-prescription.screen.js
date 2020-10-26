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
import { sizeWidth, sizeHeight } from "../helpers/size.helper";
import { isValidName } from "../helpers/validator.helper";
import { Icon } from "react-native-elements";
import DatePicker from "../components/common/date-picker";
import { navigateBack, navigateToPage } from "../actions/nav.action";
import { connect } from "react-redux";
import Moment from "moment";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { date_format } from "../constants/app.constant";
import {
  SAVE_MEDICAL,
  SAVE_MEDICAL_TEMP
} from "../actions/medical-history.action";
import LoadingPopup from "../components/common/loading-popup";
import validator from "validator";
import Toast from "@remobile/react-native-toast";
import ImageSelector from "../components/common/image-selector";
import { Button} from 'native-base';
import Text from "../components/common/text";
import { strings } from '../locate/I18n';

class AddPrescriptionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUri: null,
      hinhanh: [],
      ngaykham: Moment(new Date()).format(date_format.dd_mm_yyyy),
      noidung: "",
      tentoathuoc: ""
    };
  }

  _renderContainerButtonFull() {
    return (
      <View style={styles.actionFull}>
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
         <Text style = {{color:"white"}}>{strings('add_prescription.back')}</Text>
        </Button>
        {/* <Button success
          style={styles.buttonFull}
          onPress={this.onSaveMedical} >
          <Text style = {{color:"white"}}>{strings('save')}</Text>
          <Icon
            style={styles.icon}
            size={sizeWidth(5)}
            name="content-save"
            type="material-community"
            color="white"
          />
        </Button> */}
        <Button success
          style={styles.buttonFull}
          text={strings('add_prescription.next')}
          onPress={this.onSaveMedicalTemp}
         >
        <Text style = {{color:"white"}}>{strings('add_prescription.next')}</Text>
        <Icon
          style={styles.icon}
          size={sizeWidth(5)}
          name="chevron-right"
          type="material-community"
          color="white"
        />
        </Button>
      </View>
    );
  }

  _renderContainerButton() {
    return (
      <View style={styles.action}>
        <Button style={styles.button} text={strings('save')}/>
        <Button
          style={styles.button}
          text={strings('add_prescription.download_file')}
          icon={
            <Icon
              style={styles.icon}
              size={sizeWidth(5)}
              name="plus"
              type="entypo"
              color="white"
            />
          }
        />
      </View>
    );
  }

  render() {
    let forAddMedical = this.props.navigation.state.params;
    if (forAddMedical == undefined) {
      forAddMedical = false;
    }
    return (
      <View style={styles.container}>
      <AppHeader />
      <Toolbar title={strings('add_prescription.add_pres')} />
      <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={100}>
        <LoadingPopup loading={this.props.medicalSaving} />
          <ScrollView
            contentContainerStyle={styles.body}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <Label text={strings('medical_detail.prescription_name')} />
            <Input
              placeholder={strings('medical_detail.prescription_name')}
              onChangeText={tentoathuoc => this.setState({ tentoathuoc })}
            />
            <Label text={strings('add_prescription.day_receive_pres')} />
            <DatePicker
              date={this.state.ngaykham}
              onDateChange={ngaykham => this.setState({ ngaykham })}
            />
            <Label text={strings('add_prescription.content')}/>
            <Input
              multiline={true}
              textStyle={styles.textContent}
              style={styles.content}
              placeholder={strings('add_prescription.content_input')}
              onChangeText={noidung => this.setState({ noidung })}
            />
            <ImageSelector ref={ref => (this.imageSelector = ref)} />
            {forAddMedical
              ? this._renderContainerButtonFull()
              : this._renderContainerButton()}
          </ScrollView>
      </KeyboardAwareScrollView>
      </View>
    );
  }

  isValidForm() {
    const {noidung, tentoathuoc} = this.state;
    if (validator.isEmpty(tentoathuoc)) {
      Toast.show(strings('msg_pls_enter_field', {field: strings('medical_detail.prescription_name')}));
      return false;
    }
    if(!isValidName(tentoathuoc)) {
      Toast.show(strings('msg_name_cannot_special_char', {name: strings('medical_detail.prescription_name')}));
      return false;
    }
    if (validator.isEmpty(noidung)) {
      Toast.show(strings('msg_pls_enter_field', {field: strings('add_medical.content')}));
      return false;
    }
    if(!isValidName(noidung)) {
      Toast.show(strings('msg_name_cannot_special_char', {name: strings('add_medical.content')}));
      return false;
    }
    
    return true;
  }

  onSaveMedicalTemp = () => {
    if (this.isValidForm()) {
      const hinhanh = this.imageSelector.getSelectedImages();
      const newPrescription = {
        hinhanh: hinhanh,
        ngaykham: this.state.ngaykham,
        noidung: this.state.noidung,
        tentoathuoc: this.state.tentoathuoc
      };
      this.props.saveMedicalTemp(newPrescription);

      this.props.navigateToPage("AddPayment", (forAddMedical = true));
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
    addMedical: (medical, tests, prescription) =>
      dispatch({ type: SAVE_MEDICAL, medical, tests, prescription }),
    saveMedicalTemp: newPrescription =>
      dispatch({ type: SAVE_MEDICAL_TEMP, newPrescription })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPrescriptionScreen);

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
    paddingHorizontal: sizeWidth(10)
  },
  buttonFull: {
    width: sizeWidth(28),
    height: sizeHeight(5),
    justifyContent:"center",
    alignItems: "center",
    borderRadius:sizeWidth(1)
  },
  icon: {
    marginLeft: sizeWidth(1)
  },
  action: {
    marginTop: sizeWidth(4),
    flexDirection: "row",
    justifyContent: "space-between"
  },
  actionFull: {
    marginTop: sizeWidth(5),
    flexDirection: "row",
    justifyContent: "space-between",
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
  }
});

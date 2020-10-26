import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AppHeader from "../components/app-header";
import Toolbar from "../components/common/toolbar";
import Label from "../components/common/label";
import Input from "../components/common/input";
import { Button} from 'native-base';
import Text from "../components/common/text";
import { sizeWidth, sizeHeight } from "../helpers/size.helper";
import { isValidName } from "../helpers/validator.helper";
import { Icon } from "react-native-elements";
import DatePicker from "../components/common/date-picker";
import {
  SAVE_MEDICAL,
  SAVE_MEDICAL_TEMP
} from "../actions/medical-history.action";
import {
  navigateBack,
  navigateToPage,
  backToSpecificRoute
} from "../actions/nav.action";
import { connect } from "react-redux";
import Moment from "moment";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { date_format } from "../constants/app.constant";
import LoadingPopup from "../components/common/loading-popup";
import validator from "validator";
import Toast from "@remobile/react-native-toast";
import ImageSelector from "../components/common/image-selector";
import { strings } from '../locate/I18n';

class AddTestScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUri: null,
      hinhanh: [],
      ngaykham: Moment(new Date()).format(date_format.dd_mm_yyyy),
      noidung: "",
      tenxetnghiem: ""
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
         <Text style = {{color:"white"}}>{strings('add_test.back')}</Text>
        </Button>
        {/* <Button success
          style={styles.buttonFull}
          onPress={() => this.onSaveMedical()}
        >
          <Text style = {{color:"white"}}>{strings('save')} </Text>
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
          onPress={() => this.onSaveMedicalTemp()}
        >
        <Text style = {{color:"white"}}>{strings('add_test.next')} </Text>
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
        <Button style={styles.button} text="Lưu" />
        <Button
          style={styles.button}
          text={strings('add_test.up_file')}
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

  _renderButtonAdd() {
    return (
      <View style={styles.containerButtonAdd}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigateToPage("AddTest", (forAddMedical = true));
          }}
          style={styles.rounded}
        >
          <Icon
            size={sizeWidth(5)}
            name="plus"
            type="entypo"
            color="white"
          />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    let forAddMedical = this.props.navigation.state.params;
    if (forAddMedical == undefined) {
      forAddMedical = false;
    }

    return (
      <View  style={styles.container}>
        <AppHeader />
        <Toolbar title={strings('add_test.add_test')} />
        <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={100}>
          <LoadingPopup loading={this.props.medicalSaving} />
            <ScrollView
              contentContainerStyle={styles.body}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              {forAddMedical === true && this._renderButtonAdd()}
              <Label text={strings('add_test.title')}/>
              <Input
                placeholder={strings('add_test.enter_title')}
                onChangeText={tenxetnghiem => this.setState({ tenxetnghiem })}
              />
              <Label text={strings('add_test.test_date')} />
              <DatePicker
                date={this.state.ngaykham}
                onDateChange={ngaykham => this.setState({ ngaykham })}
              />
              <Label text={strings('add_test.content')} />
              <Input
                multiline={true}
                textStyle={styles.textContent}
                style={styles.content}
                placeholder={strings('add_test.enter_content')}
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
    const {tenxetnghiem, ngaykham, noidung} = this.state;
    if (validator.isEmpty(tenxetnghiem)) {
      Toast.show(strings('msg_pls_enter_field', {field: strings('add_test.title')}));
      return false;
    }
    if(!isValidName(tenxetnghiem)) {
      Toast.show(strings('msg_name_cannot_special_char', {name: strings('add_test.title')}));
      return false;
    }
    if (validator.isEmpty(noidung)) {
      Toast.show(strings('msg_pls_enter_field', {field: strings('add_test.content')}));
      return false;
    }
    if(!isValidName(noidung)) {
      Toast.show(strings('msg_name_cannot_special_char', {name: strings('add_test.content')}));
      return false;
    }

    return true;
  }

  // onSaveMedical() {
  //   const hinhanh = this.imageSelector.getSelectedImages();
  //   const newTest = {
  //     hinhanh: hinhanh,
  //     ngaykham: this.state.ngaykham,
  //     noidung: this.state.noidung,
  //     tenxetnghiem: this.state.tenxetnghiem
  //   };
  //   this.props.addMedical(this.props.newMedical, newTest);
  // }

  onSaveMedicalTemp =()=> {
    if (this.isValidForm()) {
      const hinhanh = this.imageSelector.getSelectedImages();
      const newTest = {
        hinhanh: hinhanh,
        ngaykham: this.state.ngaykham,
        noidung: this.state.noidung,
        tenxetnghiem: this.state.tenxetnghiem
      };
      this.props.saveMedicalTemp(newTest);
      this.props.navigateToPage(
        "AddPrescription",
        (forAddMedical = true)
      );
    }
  }
}

const mapStateToProps = state => {
  return { ...state.medicalHistory, nav: state.nav };
};

const mapDispatchToProps = dispatch => {
  return {
    navigateBack: () => dispatch(navigateBack()),
    navigateToPage: (route, data) => dispatch(navigateToPage(route, data)),
    addMedical: (medical, tests) =>
      dispatch({ type: SAVE_MEDICAL, medical, tests }),
    saveMedicalTemp: newTests =>
      dispatch({ type: SAVE_MEDICAL_TEMP, newTests }),
    backToSpecificRoute: (nav, routeName) => {
      dispatch(backToSpecificRoute(nav, routeName));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTestScreen);

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
    justifyContent: "space-around"
  },
  actionFull: {
    marginTop: sizeWidth(5),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  body: {
    padding: sizeWidth(5),
    paddingTop: sizeWidth(1)
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
  containerButtonAdd: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  rounded: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: "rgb(77, 179, 78)",
    justifyContent: "center",
    alignItems: "center"
  },
  containerButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: sizeWidth(1)
  }
});

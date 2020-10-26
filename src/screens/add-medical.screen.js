import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import AppHeader from "../components/app-header";
import Toolbar from "../components/common/toolbar";
import Label from "../components/common/label";
import Input from "../components/common/input";
import Text from "../components/common/text";
import { Button} from 'native-base';
import { sizeWidth, sizeFont, sizeHeight } from "../helpers/size.helper";
import { isValidName, isValidNameMedical, isInteger } from "../helpers/validator.helper";
import { Icon } from "react-native-elements";
import DatePicker from "../components/common/date-picker";
import { navigateBack, navigateToPage } from "../actions/nav.action";
import { connect } from "react-redux";
import {
  SAVE_MEDICAL,
  SAVE_MEDICAL_TEMP
} from "../actions/medical-history.action";
import Moment from "moment";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { date_format } from "../constants/app.constant";
import LoadingPopup from "../components/common/loading-popup";
import validator from "validator";
import Toast from "@remobile/react-native-toast";
import ImageSelector from "../components/common/image-selector";
import { strings } from '../locate/I18n';
import ModalDropdown from "react-native-modal-dropdown";

class AddMedicalScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tenbenhan: "",
      donvikham: "",
      hinhanh: [],
      ngayketthuc: Moment(new Date()).format(date_format.dd_mm_yyyy),
      ngaykham: Moment(new Date()).format(date_format.dd_mm_yyyy),
      noidung: "",
      validateDate: "",
      trangThai: 1,
      trangThaiValue: strings('add_medical.completed')
    };
  }
  render() {
    const { medicalSaving } = this.props;
    return (
      <View  style={styles.container}>
        <AppHeader />
        <Toolbar title={strings('add_medical.add_medical')} />
        <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={100}>
          <LoadingPopup loading={medicalSaving} />
          <View>
            <ScrollView
              contentContainerStyle={styles.body}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              <Label text={strings('add_medical.medical_name')}/>
              <Input
                placeholder={strings('add_medical.medical_name_pla')}
                onChangeText={tenbenhan => this.setState({ tenbenhan })}
              />
              <Label text={strings('add_medical.exa_unit')} />
              <Input
                placeholder={strings('add_medical.exa_unit_pla')}
                onChangeText={donvikham => this.setState({ donvikham })}
              />
              <Label text={strings('add_medical.dayStart')} />
              <DatePicker
                date={this.state.ngaykham}
                onDateChange={ngaykham => {
                  this.setState({ ngaykham });
                }}
              />
              <Label text={strings('add_medical.dayEnd')}/>
              <DatePicker
                date={this.state.ngayketthuc}
                onDateChange={ngayketthuc => {
                  this.setState({ ngayketthuc });
                }}
              />
              <Label text={strings('add_medical.status')} />
              <ModalDropdown
                style={styles.filterType}
                dropdownStyle={{ height: (sizeHeight(5) * 2) }}
                onSelect={this.onSelectFilterType}
                renderRow={this.renderFilterRow}
                options={[
                  {key: 1, value: strings('add_medical.completed')},
                  {key: 2, value: strings('add_medical.incomplete')},
                ]}
              >
                <View style={styles.filterWrap}>
                  <Text style={styles.typeText}>{this.state.trangThaiValue}</Text>
                  <Icon
                    iconStyle={styles.icon}
                    name={"triangle-down"}
                    type="octicon"
                    color="#888888"
                    size={sizeFont(4.46)}
                  />
                </View>
              </ModalDropdown>
              <Label text={strings('add_medical.content')}/>
              <Input
                multiline={true}
                textStyle={styles.textContent}
                style={styles.content}
                placeholder={strings('add_medical.content_input')}
                onChangeText={noidung => this.setState({ noidung })}
              />
              <ImageSelector ref={ref => (this.imageSelector = ref)}/>

              <View style={styles.action}>
                {/* <Button success
                  style={styles.button}
                  onPress={this.onSaveMedical}
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
                  style={styles.button}
                  onPress={this.onNextStep}
                >
                  <Text style = {{color:"white"}}>{strings('add_medical.next')}</Text>
                  <Icon
                    style={styles.icon}
                    size={sizeWidth(5)}
                    name="chevron-right"
                    type="material-community"
                    color="white"
                  />
                </Button>
              </View>
            </ScrollView>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }

  isValidForm() {
    const {tenbenhan, donvikham, noidung, ngaykham, ngayketthuc} = this.state;
    if (validator.isEmpty(tenbenhan)) {
      Toast.show(strings('add_medical.msg2'))
      return false;
    }

    if(isInteger(tenbenhan)) {
      Toast.show(strings('add_medical.medical_name_not_number'));
      return false;
    }

    if(!isValidName(tenbenhan)) {
      Toast.show(strings('msg_name_cannot_special_char', {name: strings('add_medical.medical_name')}));
      return false;
    }
    if (validator.isEmpty(donvikham)) {
      Toast.show(strings('msg_pls_enter_field', {field: strings('add_medical.exa_unit')}));
      return false;
    }
    if(!isValidNameMedical(donvikham)) {
      Toast.show(strings('msg_name_cannot_special_char', {name: strings('add_medical.exa_unit')}));
      return false;
    }
    if(ngaykham > ngayketthuc){
      Toast.show(strings('add_medical.msg3'));
      return false;
    }
    if (validator.isEmpty(noidung)) {
      Toast.show(strings('msg_pls_enter_field', {field: strings('add_medical.content')}));
      return false;
    }

    return true;
  }

  renderFilterRow = (rowData, index, isSelected) => {
    const {key, value} = rowData;
    return (
      <TouchableOpacity>
        <Text style={styles.filterText}>{value}</Text>
      </TouchableOpacity>
    );
  };

  onSelectFilterType = (index, rowData) => {
    const {key, value} = rowData;
    this.setState({
      trangThai: key,
      trangThaiValue: value
    });
  };

  // onSaveMedical = async () => {
  //   if(this.isValidForm()) {
  //     const hinhanh = this.imageSelector.getSelectedImages();
  //     const newMedical = {
  //       tenbenhan: this.state.tenbenhan,
  //       donvikham: this.state.donvikham,
  //       hinhanh: hinhanh,
  //       ngayketthuc: this.state.ngayketthuc,
  //       ngaykham: this.state.ngaykham,
  //       noidung: this.state.noidung
  //     };
  //     this.props.addMedical(newMedical);
  //   }
  // };

  onNextStep = () => {
    if(this.isValidForm()) {
      const images = this.imageSelector.getSelectedImages();

      const newMedical = {
        tenbenhan: this.state.tenbenhan,
        donvikham: this.state.donvikham,
        hinhanh: images,
        ngayketthuc: this.state.ngayketthuc,
        ngaykham: this.state.ngaykham,
        noidung: this.state.noidung,
        trangThai: this.state.trangThai
      };
      this.props.saveMedicalTemp(newMedical);
      this.props.navigateToPage("AddTest", (forAddMedical = true));
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
    addMedical: medical => dispatch({ type: SAVE_MEDICAL, medical }),
    saveMedicalTemp: newMedical =>
      dispatch({ type: SAVE_MEDICAL_TEMP, newMedical })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMedicalScreen);

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
    // width: sizeWidth(37.06),
    height: sizeHeight(5),
    borderRadius:sizeWidth(1)
  },
  icon: {
    marginLeft: sizeWidth(1)
  },
  action: {
    marginTop: sizeWidth(5),
    flexDirection: "row",
    paddingHorizontal: sizeWidth(3),
    justifyContent: "space-around"
  },
  body: {
    padding: sizeWidth(5)
  },
  filterType: {
    width: "100%",
    borderColor: "#888888",
    borderRadius: sizeWidth(1),
    borderWidth: 1,
    height: sizeWidth(9),
    justifyContent: "center",
  },
  typeText: {
    fontSize: sizeFont(3.4),
    color: "black",
    width: sizeWidth(45)
  },
  filterWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: sizeWidth(2.13)
  },
  filterText: {
    fontSize: sizeFont(3.1),
    color: "black",
    width: sizeWidth(80),
    padding: sizeWidth(2.13)
  }
});

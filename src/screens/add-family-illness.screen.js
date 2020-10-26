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
import { sizeWidth, sizeFont, sizeHeight } from "../helpers/size.helper";
import { isValidName } from "../helpers/validator.helper";
import { Icon } from "react-native-elements";
import DatePicker from "../components/common/date-picker";
import { navigateBack, navigateToPage } from "../actions/nav.action";
import { connect } from "react-redux";
import Moment from "moment";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { date_format } from "../constants/app.constant";
import LoadingPopup from "../components/common/loading-popup";
import { ADD } from "../actions/family-illness-list.action";
import validator from "validator";
import Toast from "@remobile/react-native-toast";
import ModalDropdown from "react-native-modal-dropdown";
import Text from "../components/common/text";
import { Button} from 'native-base';
import { strings } from '../locate/I18n';
import { secondary_bg_color } from "../constants/app.constant";

class AddFamilyIllnessScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      namBiBenh: Moment(new Date()).format(date_format.dd_mm_yyyy),
      quanHe: "",
      tenBenh: "",
      tenBenhNhan: "",
      trangThai: 1,
      trangThaiValue: strings('add_family_illness.normal')
    };
  }
  render() {
    return (
      <KeyboardAwareScrollView
        style={styles.container}
        enableOnAndroid={true}
        extraHeight={20}
      >
        <LoadingPopup loading={this.props.adding} />
        <AppHeader />
        <Toolbar title={strings('add_family_illness.add_family_illness')}/>
        <ScrollView
          contentContainerStyle={styles.body}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <Label text={strings('add_family_illness.fullname')}/>
          <Input
            placeholder={strings('add_family_illness.fullname')}
            onChangeText={tenBenhNhan => this.setState({ tenBenhNhan })}
          />
          <Label text={strings('add_family_illness.relationships')} />
          <Input
            placeholder={strings('add_family_illness.relationships')}
            onChangeText={quanHe => this.setState({ quanHe })}
          />
          <Label text={strings('add_family_illness.status')} />
          <ModalDropdown
            style={styles.filterType}
            onSelect={this.onSelectFilterType}
            dropdownStyle={{ height: (sizeHeight(5) * 2) }}
            renderRow={this.renderFilterRow}
            options={[
              {"key":1,"value":strings('add_family_illness.normal')},
              {"key":2,"value":strings('add_family_illness.dangerous')}
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
          <Label text={strings('add_family_illness.illness_name')} />
          <Input
            placeholder={strings('add_family_illness.illness_name')}
            onChangeText={tenBenh => this.setState({ tenBenh })}
          />
          <Label text={strings('add_family_illness.illness_year')}/>
          <DatePicker
            date={this.state.namBiBenh}
            onDateChange={namBiBenh => this.setState({ namBiBenh })}
          />
          <View style={styles.action}>
            <Button
              style={styles.cancel}
              onPress={this.props.navigateBack}
            >
              <Icon
                style={styles.icon}
                size={sizeWidth(5)}
                name="x"
                type="feather"
                color="white"
              />
              <Text style={{color: "white", marginLeft: 10}}>{strings('cancel')}</Text>
            </Button>

            <Button success
              style={styles.button}
              onPress={this.onSave}
            >
                <Icon
                  style={styles.icon}
                  size={sizeWidth(5)}
                  name="save"
                  type="feather"
                  color="white"
                />
            <Text style={{color: "white"}}>{strings('save')}</Text>
            </Button>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    );
  }

  onSave = () => {
    const { quanHe, tenBenh, tenBenhNhan, trangThai } = this.state;
    if (validator.isEmpty(tenBenhNhan)) {
      return Toast.show(strings('add_family_illness.msg1'));
    }
    if(!isValidName(tenBenhNhan)) {
      return Toast.show(strings('msg_name_cannot_special_char', {name: strings('add_family_illness.fullname')}));
    }
    if (validator.isEmpty(quanHe)) {
      return Toast.show(strings('add_family_illness.msg2'));
    }
    if(!isValidName(quanHe)) {
      return Toast.show(strings('msg_name_cannot_special_char', {name: strings('add_family_illness.relationships')}));
    }
    if (trangThai == 0) {
      return Toast.show(strings('add_family_illness.msg3'));
    }
    if (validator.isEmpty(tenBenh)) {
      return Toast.show(strings('add_family_illness.msg4'));
    }
    if(!isValidName(tenBenh)) {
      return Toast.show(strings('msg_name_cannot_special_char', {name: strings('add_family_illness.illness_name')}));
    }

    const data = {
      quanHe,
      tenBenh,
      tenBenhNhan,
      trangThai,
      namBiBenh: Moment(new Date()).format(date_format.dd_mm_yyyy)
    }
    this.props.addFamilyIllness(data);
  };

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
}

const mapStateToProps = state => {
  return state.familyIllness;
};

const mapDispatchToProps = dispatch => {
  return {
    navigateBack: () => dispatch(navigateBack()),
    navigateToPage: (route, data) => dispatch(navigateToPage(route, data)),
    addFamilyIllness: ({ ...newFamilyIllness }) => {
      dispatch({ type: ADD, ...newFamilyIllness });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddFamilyIllnessScreen);

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
    justifyContent: "center",
    alignContent: "center",
    height: sizeHeight(5),
    borderRadius:sizeWidth(1),
    backgroundColor: secondary_bg_color
  },
  icon: {
    marginRight: sizeWidth(1)
  },
  action: {
    marginTop: sizeWidth(8),
    flexDirection: "row",
    // paddingHorizontal: sizeWidth(3),
    justifyContent: "space-between",
  },
  cancel: {
    paddingHorizontal: sizeWidth(10),
    backgroundColor: "#CCCCCC",
    marginRight: sizeWidth(2.13),
    height: sizeHeight(5),
    borderRadius:sizeWidth(1)
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
  filterText: {
    fontSize: sizeFont(3.4),
    color: "black",
    width: sizeWidth(45),
    padding: sizeWidth(2.13)
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
  }
});

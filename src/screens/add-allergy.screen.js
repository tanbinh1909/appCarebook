import React, { Component } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import AppHeader from "../components/app-header";
import Toolbar from "../components/common/toolbar";
import Label from "../components/common/label";
import Input from "../components/common/input";
import { Icon } from "react-native-elements";
import { navigateBack, navigateToPage } from "../actions/nav.action";
import { connect } from "react-redux";
import { sizeWidth, sizeFont, sizeHeight } from "../helpers/size.helper";
import { isValidName } from "../helpers/validator.helper";
import LoadingPopup from "../components/common/loading-popup";
import { ADD_ALLERGY } from "../actions/allergy.action";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import validator from "validator";
import Toast from "@remobile/react-native-toast";
import Text from "../components/common/text";
import ModalDropdown from "react-native-modal-dropdown";
import {Button} from "native-base";
import { strings } from '../locate/I18n';
import { secondary_bg_color } from "../constants/app.constant";

class AddAllergyScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedType: null,
      trangthai: {
        id: 1,
        name: strings('add_allergy.normal')
      },
      allergyName: "",
      cause: "",
      symptom: "",
      loading: false,
      alleryTypes: [
        {
          id: 1,
          name: strings('add_allergy.environment')
        },
        {
          id: 2,
          name: strings('add_allergy.drug')
        },
        {
          id: 3,
          name: strings('add_allergy.other')
        },
        {
          id: 4,
          name: strings('add_allergy.normal')
        }
      ]
    };
  }

  renderFilterRow = (option, index, isSelected) => {
    return (
      <TouchableOpacity>
        <Text style={styles.filterText}>{option.name}</Text>
      </TouchableOpacity>
    );
  };

  onSelectFilterType = (index, value) => {
    this.setState({
      selectedType: Object.assign({}, value)
    });
  };

  renderStatusRow = (option, index, isSelected) => {
    return (
      <TouchableOpacity>
        <Text style={styles.filterText}>{option.name}</Text>
      </TouchableOpacity>
    );
  };

  onSelectStatus = (index, value) => {
    this.setState({
      trangthai: value
    });
  };

  render() {
    const { selectedType } = this.state;
    const { adding, added, addError } = this.props;
    return (
      <KeyboardAwareScrollView
        style={styles.container}
        enableOnAndroid={true}
        extraHeight={20}
      >
        <LoadingPopup loading={this.state.loading} />
        <AppHeader />
        <Toolbar title={strings('add_allergy.add_allergy')} />
        <ScrollView
          contentContainerStyle={styles.body}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <Label text={strings('add_allergy.allergy_name')}/>
          <Input
            placeholder={strings('add_allergy.allergy_name')}
            onChangeText={allergyName => this.setState({ allergyName })}
          />
          <Label text={strings('add_allergy.allergy_type')} />
          <ModalDropdown
            style={styles.filterType}
            onSelect={this.onSelectFilterType}
            dropdownStyle={{ height: 34 * this.state.alleryTypes.length }}
            renderRow={this.renderFilterRow}
            options={this.state.alleryTypes}
          >
            <View style={styles.filterWrap}>
              <Text style={styles.typeText}>
                {selectedType ? selectedType.name : strings('add_allergy.choose_allergy')}
              </Text>
              <Icon
                  size={sizeWidth(4.46)}
                  name="caret-down"
                  type="font-awesome"
                  color="#CCC"
                />
            </View>
          </ModalDropdown>

          <Label text={strings('add_allergy.cause')} />
          <Input
            multiline={true}
            textStyle={styles.textContent}
            style={styles.content}
            placeholder={strings('add_allergy.cause')}
            onChangeText={cause => this.setState({ cause })}
          />

          <Label text={strings('add_allergy.symptom')} />
          <Input
            multiline={true}
            textStyle={styles.textContent}
            style={styles.content}
            placeholder={strings('add_allergy.symptom')}
            onChangeText={symptom => this.setState({ symptom })}
          />

          <Label text={strings('add_allergy.danger_level')} />
          <ModalDropdown
            style={styles.filterType}
            dropdownStyle={{ height: (34 + StyleSheet.hairlineWidth) * 2 }}
            onSelect={this.onSelectStatus}
            renderRow={this.renderStatusRow}
            options={[
              {id: 1, name: strings('add_allergy.normal')},
              {id: 2, name: strings('add_allergy.danger')},
              {id: 3, name: strings('add_allergy.following')}
            ]}
          >
            <View style={styles.filterWrap}>
              <Text style={styles.typeText}>{this.state.trangthai.name}</Text>
              <Icon
                name="caret-down"
                type="font-awesome"
                color="#CCC"
                size={sizeWidth(4.46)}
              />
            </View>
          </ModalDropdown>

          <View style={styles.actionFull}>
            <Button
              style={[
                styles.buttonFull,
                { backgroundColor: "#CCCCCC"}
              ]}
              onPress={() => {
                this.props.navigateBack();
              }}
            >
              <Icon
                style={styles.icon}
                size={sizeWidth(5)}
                name="arrow-left"
                type="feather"
                color="white"
              />
              <Text style = {styles.label}>{strings('cancel')}</Text>
            </Button>
            <Button success
              style={styles.buttonFull}
              onPress={this.onSubmit.bind(this)}
            >
            <Icon
              style={styles.icon}
              size={sizeWidth(5)}
              name="save"
              type="feather"
              color="white"
            />
            <Text style = {styles.label}>{strings('save')}</Text>
            </Button>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    );
  }

  onSubmit() {
    const { selectedType, allergyName, cause, symptom } = this.state;
    if (validator.isEmpty(allergyName)) {
      return Toast.show(strings('add_allergy.msg1'));
    }
    if(!isValidName(allergyName)) {
      return Toast.show(strings('msg_name_cannot_special_char', {name: strings('add_allergy.allergy_name')}));
    }
    if (!selectedType) {
      return Toast.show(strings('add_allergy.msg2'));
    }
    if (validator.isEmpty(cause)) {
      return Toast.show(strings('add_allergy.msg3'));
    }
    if (validator.isEmpty(symptom)) {
      return Toast.show(strings('add_allergy.msg4'));
    }

    this.setState({
      loading: true
    });
    this.props.addAllergy({
      selectedType: this.state.selectedType,
      allergyName: this.state.allergyName,
      cause: this.state.cause,
      symptom: this.state.symptom,
      trangthai: this.state.trangthai.id
     });
  }
}

const mapStateToProps = state => {
  return state.allergy;
};

const mapDispatchToProps = dispatch => {
  return {
    navigateBack: () => dispatch(navigateBack()),
    navigateToPage: (route, data) => dispatch(navigateToPage(route, data)),
    addAllergy: ({ ...newAllergy }) => {
      dispatch({ type: ADD_ALLERGY, ...newAllergy });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddAllergyScreen);

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
  buttonFull: {
    width: sizeWidth(28),
    justifyContent:"center",
    alignContent:"center",
    height: sizeHeight(5),
    borderRadius:sizeWidth(1),
    backgroundColor:secondary_bg_color
  },
  icon: {
    marginLeft: sizeWidth(1)
  },
  actionFull: {
    marginTop: sizeWidth(4),
    flexDirection: "row",
    justifyContent: "space-between"
  },
  body: {
    padding: sizeWidth(5),
    paddingTop: sizeWidth(1)
  },
  containerButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: sizeWidth(1)
  },
  filterType: {
    borderColor: "#888888",
    borderRadius: sizeWidth(1),
    borderWidth: 1,
    height: sizeWidth(9),
    justifyContent: "center",
    paddingHorizontal: 7
  },
  filterWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  filterText: {
    fontSize: sizeFont(3.1),
    color: "black",
    width: sizeWidth(80),
    padding: sizeWidth(2.13)
  },
  typeText: {
    fontSize: sizeFont(3.1),
    color: "black"
  },
  label: {
    color:"white",
    marginLeft: 10
  }
});

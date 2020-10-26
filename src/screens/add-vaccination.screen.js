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
import { Button } from 'native-base';
import { sizeWidth, sizeHeight } from "../helpers/size.helper";
import { isValidName } from "../helpers/validator.helper";
import { Icon } from "react-native-elements";
import DatePicker from "../components/common/date-picker";
import { navigateBack, navigateToPage } from "../actions/nav.action";
import { connect } from "react-redux";
import { ADD_VACCINATION } from "../actions/vaccination-history.action";
import moment from "moment";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { date_format } from "../constants/app.constant";
import LoadingPopup from "../components/common/loading-popup";
import validator from "validator";
import Toast from "@remobile/react-native-toast";
import Text from "../components/common/text";
import { strings } from '../locate/I18n';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import { secondary_bg_color } from "../constants/app.constant";

class AddVaccinationScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      injectionName: "",
      injectionAmount: "",
      injectionDate: moment().set({hour:0,minute:0,second:0,millisecond:0}),
      injectAgainDate: moment().set({hour:0,minute:0,second:0,millisecond:0}),
    };
  }

  onChangeInjectionDate = (date) => {
    this.setState({ injectionDate: moment(date, "DDMMYYYY") });
  }

  onChangeInjectionAgainDate = (date) => {
    this.setState({ injectAgainDate: moment(date, "DDMMYYYY") });
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
        <Toolbar title={strings('add_vaccination.add_vaccination')}/>
        <ScrollView
          contentContainerStyle={styles.body}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <Label text={strings('add_vaccination.vaccination_name')} />
          <Input
            placeholder={strings('add_vaccination.vaccination_name')}
            onChangeText={injectionName => this.setState({ injectionName })}
          />
          <Label text={strings('add_vaccination.amount')}/>
          <Input
            placeholder={strings('add_vaccination.amount')}
            keyboardType='numeric'
            onChangeText={injectionAmount => this.setState({ injectionAmount })}
          />
          <Label text={strings('add_vaccination.day_vac')} />
          <DatePicker
            date={this.state.injectionDate}
            onDateChange={this.onChangeInjectionDate}
          />
          <Label text={strings('add_vaccination.day_vac_again')}/>
          <View style={styles.reinject}>
            <DatePicker
              style={styles.reinjectDate}
              date={this.state.injectAgainDate}
              onDateChange={this.onChangeInjectionAgainDate}
            />
            <Button success
              style={styles.btnRemind}
              onPress={this.onRemind}
            >
              <Icon
                style={styles.icon}
                size={sizeWidth(5)}
                name="bell"
                type="feather"
                color="white"
              />
              <Text style = {{color: "white"}}>{strings('add_vaccination.remind_calendar')}</Text>
            </Button>
          </View>
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
              <Text style={{color: "white", marginLeft: 10}}>{strings('save')}</Text>
            </Button>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    );
  }

  onSave = () => {
    const { injectionName, injectionAmount,injectAgainDate,injectionDate } = this.state;

    if (validator.isEmpty(injectionName)) {
      return Toast.show(strings('add_vaccination.msg1'));
    }
    if(!isValidName(injectionName)) {
      return Toast.show(strings('msg_name_cannot_special_char', {name: strings('add_vaccination.vaccination_name')}));
    }
    if (validator.isEmpty(injectionAmount)) {
      return Toast.show(strings('add_vaccination.msg2'));
    }
    if(injectAgainDate < injectionDate){
      return Toast.show(strings('add_vaccination.msg3'));
    }

    const data = {
      tenTiemChung: injectionName,
      lieuLuong: injectionAmount,
      ngaytiem: moment(injectionDate).format(date_format.dd_mm_yyyy),
      ngaytiemlai: moment(injectAgainDate).format(date_format.dd_mm_yyyy),
    };

    this.props.addVaccination(data);
  };

  onRemind = () => {
    if(!isValidName(this.state.injectionName)) {
      return Toast.show(strings('msg_name_cannot_special_char', {name: strings('add_vaccination.vaccination_name')}));
    }

    const format_date = "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]";
    var eventConfig = {
      title: this.state.injectionName,
      startDate: moment(this.state.injectionDate).format(format_date),
      endDate: moment(this.state.injectAgainDate).format(format_date),
      allDay: true
    };

    AddCalendarEvent.presentEventCreatingDialog(eventConfig)
    .then(eventInfo => {
      if(eventInfo.action === 'SAVED') {
        Toast.show(strings('msg_added_calendar_event'));
      }
    })
    .catch((error) => {
    });
  }
}

const mapStateToProps = state => {
  return state.vaccinationHistory;
};

const mapDispatchToProps = dispatch => {
  return {
    navigateBack: () => dispatch(navigateBack()),
    navigateToPage: (route, data) => dispatch(navigateToPage(route, data)),
    addVaccination: ({ ...newVaccination }) => {
      dispatch({ type: ADD_VACCINATION, ...newVaccination });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddVaccinationScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    height: sizeWidth(35)
  },
  reinject: {
    flexDirection: "row",
    alignItems: "center"
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
    marginRight: sizeWidth(5)
  },
  btnRemind: {
    marginLeft: sizeWidth(2.13),
    height: sizeHeight(5),
    paddingHorizontal: 10,
    justifyContent:"center",
    alignContent:"center",
    marginVertical: sizeWidth(1),
    backgroundColor: secondary_bg_color
  },
  action: {
    marginTop: sizeWidth(8),
    flexDirection: "row",
    justifyContent: "space-between"
  },
  reinjectDate: {
    flex: 1
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
  }
});

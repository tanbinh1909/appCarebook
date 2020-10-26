import React, { Component } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import Toolbar from "../components/common/toolbar";
import AppHeader from "../components/app-header";
import { sizeWidth, sizeFont, sizeHeight } from "../helpers/size.helper";
import DatePicker from "../components/common/date-picker";
import DatePickerEditAppointment from "../components/appointment/date-picker-edit-appointment";
import TimePicker from "../components/common/time-picker";
import { date_format } from "../constants/app.constant";
import Input from "../components/common/input";
import { navigateBack } from "../actions/nav.action";
import {
  UPDATE_APPOINTMENT,
  CANCEL_APPOINTMENT
} from "../actions/appointment.action";
import {Button} from "native-base";
import Text from "../components/common/text";
import { Icon } from "react-native-elements";
import FormatHelper from "../helpers/format.helper";
import { strings } from '../locate/I18n';

class AppointmentEditScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateStart: "",
      timeStart: "",
      description: "",
      updating: false
    }
  }

  componentWillMount = ()=> {
    const {appointmentDetail} = this.props.navigation.state.params;
    this.setState({dateStart: this.props.navigation.state.params.dateStart})
    this.setState({timeStart: this.props.navigation.state.params.dateStart.substring(11)})
    this.setState({description: appointmentDetail.description})
  }

  render() {
    const {appointmentDetail} = this.props.navigation.state.params;
    return (
      <ScrollView style={[styles.container, {backgroundColor: "rgb(249, 250, 254)"}]}>
        <AppHeader />
        <Toolbar title={strings('appointment_edit.appo_detail')} />
        <View style={{
          flex: 1,
          paddingLeft: sizeWidth(4),
          paddingRight: sizeWidth(4),
          paddingTop: sizeWidth(5),
        }}
        >
          <View style={[styles.groupItem, {marginTop: 0}]}>
            <View style={styles.flex_1}>
              <Text style={[styles.text, {fontSize: sizeFont(3)}]}>{strings('appointment_edit.title_appo')}</Text>
            </View>
            <View style={styles.flex_2}>
              <Text style={[styles.text, {fontSize: sizeFont(3)}]}>{appointmentDetail.title}</Text>
            </View>
          </View>
          <View style={styles.groupItem}>
              <View style={styles.picker}>
                  <Text style={[styles.text, {}]}>{strings('appointment_edit.day_appo')}</Text>
              </View>
              {appointmentDetail.status === "CANCEL" || appointmentDetail.status ==="ACCEPT" ? (
                <View style={[styles.picker, styles.flex_2]}>
                <DatePicker
                  mode="datetime"
                  date={appointmentDetail.dateStart}
                  format={date_format.dd_mm_yyyy_hh_mm_ss}
                  disabled={true}
                />
              </View>
              ):(
                <View style={[styles.picker, styles.flex_2, styles.datepicker]}>
                  <DatePickerEditAppointment
                    mode="datetime"
                    date={appointmentDetail.dateStart}
                    format={date_format.dd_mm_yyyy}
                    disabled={true}
                  />
                  <TimePicker
                    mode="time"
                    animationType={"fade"}
                    androidMode={"spinner"}
                    date={this.state.timeStart}
                    onDateChange={ (timeStart) => {
                      this.setState({ timeStart });
                    }}
                    format={date_format.hh_mm_ss}
                  />
                </View>
              )}
          </View>
          <View style={styles.groupItem}>
            <View style={styles.flex_1}>
              <Text style={[styles.text, {fontSize: sizeFont(3)}]}>{strings('appointment_edit.doctor_name')}</Text>
            </View>
            <View style={styles.flex_2}>
              <Text style={[styles.text, {fontSize: sizeFont(3)}]}>{appointmentDetail.doctorName}</Text>
            </View>
          </View>
          <View style={styles.groupItem}>
            <View style={styles.flex_1}>
              <Text style={[styles.text, {fontSize: sizeFont(3)}]}>{strings('appointment_edit.clinic')}</Text>
            </View>
            <View style={styles.flex_2}>
              <Text style={[styles.text, {fontSize: sizeFont(3)}]}>{appointmentDetail.shopName}</Text>
            </View>
          </View>
          <View style={styles.groupItem}>
            <View style={styles.flex_1}>
              <Text style={[styles.text, {fontSize: sizeFont(3)}]}>{strings('appointment_edit.serviceName')}</Text>
            </View>
            <View style={styles.flex_2}>
              <Text style={[styles.text, {fontSize: sizeFont(3)}]}>{appointmentDetail.serviceName}</Text>
            </View>
          </View>
          {appointmentDetail.salePrice === null ? (
            <View style={styles.groupItem}>
             <View style={styles.flex_1}>
               <Text style={[styles.text]}>{strings('appointment_edit.service_price')}</Text>
             </View>
             <View style={styles.flex_2}>
             <Text style={[styles.text, {fontSize: sizeFont(3), color: 'grey'}]}>{strings('appointment_edit.no_service_price')}</Text>
             </View>
         </View>
          ) : (
            <View style={styles.groupItem}>
            <View style={styles.flex_1}>
              <Text style={[styles.text]}>{strings('appointment_edit.service_price')}</Text>
            </View>
            <View style={styles.flex_2}>
            <Text style={[styles.text, {fontSize: sizeFont(3)}]}>{FormatHelper.formatMoney(appointmentDetail.salePrice)} VNĐ</Text>
            </View>
        </View>
          )}
         {appointmentDetail.rootPrice === null ? (
             <View style={styles.groupItem}>
             <View style={styles.flex_1}>
                 <Text style={[styles.text]}>{strings('appointment_edit.insurance_price')}</Text>
             </View>
             <View style={styles.flex_2}>
             <Text style={[styles.text, {fontSize: sizeFont(3), color: 'grey'}]}>{strings('appointment_edit.no_insurance_price')}</Text>
             </View>
         </View>
          ) : (
            <View style={styles.groupItem}>
            <View style={styles.flex_1}>
                <Text style={[styles.text]}>{strings('appointment_edit.insurance_price')}</Text>
            </View>
            <View style={styles.flex_2}>
            <Text style={[styles.text, {fontSize: sizeFont(3), color: 'grey'}]}>{FormatHelper.formatMoney(appointmentDetail.rootPrice)} VNĐ</Text>
            </View>
        </View>
          )}
          <View style={styles.groupItem}>
              <View style={[styles.flex_1, {marginTop: sizeHeight(2)}]}>
                  <Text style={[styles.text]}>{strings('booking_modal.note_symptom')}:</Text>
              </View>
              {appointmentDetail.status === "CANCEL" || appointmentDetail.status ==="ACCEPT" ? (
                 <View style={styles.flex_2}>
                 <Input
                   multiline={true}
                   textStyle={styles.textContent}
                   style={styles.content}
                   value={appointmentDetail.description}
                   editable = {false}
                 />
               </View>
              ):(
              <View style={styles.flex_2}>
                <Input
                  multiline={true}
                  textStyle={styles.textContent}
                  style={styles.content}
                  value={this.state.description}
                  onChangeText={(description) => {
                    this.setState({ description});
                  }}
                />
              </View>
              )}
          </View>
          <View style={styles.groupItem}>
              <View style={styles.flex_1}>
                  <Text style={[styles.text]}>{strings('appointment_edit.status')}</Text>
              </View>
              <View style={styles.flex_2}>
                  <Text style={[styles.text, {color: this.setColorStatus(appointmentDetail.status)}]}>{strings(`appointment_status.${appointmentDetail.status}`)}</Text>
              </View>
          </View>
          { appointmentDetail.status === "CANCEL" || appointmentDetail.status ==="ACCEPT" ? (
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop:sizeWidth(7)}}></View>
          ):(
            <View style={styles.groupBtn}>
              <Button  danger
                style={[styles.button1]}
                onPress={() =>this.cancelAppointment(appointmentDetail.idevent)}
              >
                <Icon
                  style={styles.icon}
                  size={sizeWidth(5)}
                  name="close-circle"
                  type="material-community"
                  color="white"
                />
                <Text style = {{color:"white"}}>{strings('cancel')}</Text>
              </Button>
              <Button  success
                style={[styles.button1]}
                onPress={() =>this.onSave(appointmentDetail)}
              >
                <Icon
                style={styles.icon}
                size={sizeWidth(5)}
                name="content-save"
                type="material-community"
                color="white"
              />
              <Text style = {{color:"white"}}>{strings('update')}</Text>
              </Button>
            </View>
            )
          }
          {this.state.updating == true && <ActivityIndicator size="large" color="#000" /> }
      </View>
      </ScrollView>
    );
  }

  onSave = (appointmentDetail) => {
    const { description, dateStart, timeStart} = this.state;
    const dataUpdate = {
      appointmentUpdate: {
        "bookingDate": dateStart.substring(0, dateStart.indexOf(" ")) + " " + timeStart,
        "customerId": "",
        "description": description,
      }, "idEvent": appointmentDetail.idevent
    }

    Alert.alert(
      strings('appointment_edit.confirm'),
      strings('appointment_edit.msg1'),
      [
        {text: strings('cancel'), onPress: () => null },
        {text: strings('accept'), onPress: () => {
          this.props.updateAppontment(dataUpdate);
          this.setState({updating: true});
        }}
      ],
      { cancelable: false }
    )

  }

  cancelAppointment = (idEvent) => {
    Alert.alert(
      strings('appointment_edit.confirm'),
      strings('appointment_edit.msg2'),
      [
        {text: strings('cancel'), onPress: () => null },
        {text: strings('accept'), onPress: () => this.props.cancelAppointment(idEvent) }
      ],
      { cancelable: false }
    )
  }

  setColorStatus = statusName => {
    switch (statusName) {
      case "PENDING":
        return "orange";
      case "CANCEL":
        return "red";
      default:
        return "green";
    }
  };
}

const mapStateToProps = state => {
  return { ...state.appointment, ...state.home };
};

const mapDispatchToProps = dispatch => {
  return {
    navigateBack: () => dispatch(navigateBack(null)),
    updateAppontment: (dataUpdate) => {
      dispatch({ type: UPDATE_APPOINTMENT, dataUpdate});
    },
    cancelAppointment: (idEvent) => {
      dispatch({ type: CANCEL_APPOINTMENT, idEvent });
    },
  }
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppointmentEditScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
      fontWeight: 'bold',
      fontSize: sizeFont(3)
  },
  groupItem: {
      flex: 1,
      flexDirection: 'row',
      marginTop: sizeWidth(6)
  },
  btn: {
      margin: sizeWidth(1),
      width: sizeWidth(25)
  },
  picker: {
    width: sizeWidth(25),
    flex: 1,
    justifyContent: 'center',
    width: sizeWidth(30)
  },
  content: {
    height: sizeWidth(25)
  },
  datepicker: {
    // flex: 1,
    flexDirection: 'row',
    // justifyContent: "space-between",
  },
  textContent: {
    height: sizeWidth(25),
    textAlignVertical: "top",
    paddingTop: 3
  },
  flex_1: {
      flex:1
  },
  flex_2: {
      flex:2
  },
  label: {
    color: "white"
  },
  button: {
    paddingHorizontal: sizeWidth(2)
  },
  button1: {
    paddingHorizontal: sizeWidth(9),
    // width:sizeWidth(35),
    height: sizeHeight(6),
    borderRadius: sizeWidth(1)
  },
  button2: {
    paddingHorizontal: sizeWidth(11)
  },
  groupBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-between",
    marginTop: sizeWidth(6)
  },
});

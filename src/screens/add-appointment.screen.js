import React, { Component } from "react";
import {
  findNodeHandle,
  Text,
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  ReactNative,
  TouchableOpacity
} from "react-native";
import Modal from "react-native-modal";
import AppHeader from "../components/app-header";
import { connect } from "react-redux";
import { TOGGLE_MODAL } from "../actions/booking-modal.action";
import { sizeWidth, sizeHeight, sizeFont } from "../helpers/size.helper";
import { secondary_bg_color } from "../constants/app.constant";
import Label from "../components/common/label";
import Input from "../components/common/input";
import Button from "../components/common/button";
import DatePickerAddAppointment from "../components/appointment/date-picker-add-appointment";
import TimePicker from "../components/common/time-picker";
import { date_format, getDateNow } from "../constants/app.constant";
import Moment from "moment";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LoadingPopup from "../components/common/loading-popup";
import { LOAD_BOOK_APPOINTMENT, BOOK_APPOINTMENT } from "../actions/booking-modal.action";
import { strings } from '../locate/I18n';
import { navigateBack } from "../actions/nav.action";
import { Icon } from "react-native-elements";
import { CheckBox } from "react-native-elements";
import AppointmentApi from "../api/appointment.api"
import Dropdown from "../components/common/modal-dropdown.js";
import Toast from "@remobile/react-native-toast";
import validator from 'validator';
import Toolbar from "../components/common/toolbar";
import DateUtil from "../constants/date.util";
class AddAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingDate: "",
      dateStart: getDateNow(),
      timeStart: getDateNow(),
      title: "",
      description: "",
      doctorName: "",
      serviceName: "",
      priceSale: "",
      toClinic: "",
      nameRelative: "",
      ageRelative: "",
      appointmenFor: "me",
      examServiceList: [],
      doctorList: [],
      hosId: null,
      hosValue: null,
      examId: null,
      examValue: null,
      doctorId: null,
      doctorValue: null,
      selectHospital: null,
      selectExam: null,
      selectDoctor: null, 
      addingError:"",
      nameService: "",
      indentityNo: ""
    };
  }
  handleDateInputChangeForStartDate = (dateStr) => {
    const dateStart = new DateUtil(dateStr).getDate();
    this.setState({dateStart});
  }
  handleDateInputChangeForStartTime = (timeStr) => {
    const timeStart = new DateUtil(timeStr).getTime();
    this.setState({timeStart});
  }
  render() {
    const {title, description, nameRelative, ageRelative, selectHospital, selectExam, selectDoctor, addingError, appointmenFor, examServiceList, doctorList} = this.state;
    const { bookDataAppointment, booking } = this.props;
    var hospitalList = [];
    if(bookDataAppointment !== null || bookDataAppointment.length > 0){
      for (var i = 0; i < bookDataAppointment.length; i ++) {
        hospitalList.push({
          key: bookDataAppointment[i].shopid,
          value: bookDataAppointment[i].shopname
        });
      }
    }
    
    return (
        <View style={styles.modalContainer}>
          <AppHeader isMain={true} />
          <Toolbar
            title={strings('appointment.add_appointment').toUpperCase()}
            navigation={this.props.navigation}
          />
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAwareScrollView innerRef={ref => {this.scroll = ref}}>
              <View style={styles.body}>
                <Label text={strings('appointment.title')} />
                <Input
                  placeholder={strings('appointment.title_pla')}
                  onChangeText={title => this.setState({ title })}
                  onFocus={event => {
                    // `bind` the function if you're using ES6 classes
                    this._scrollToInput(findNodeHandle(event.target))
                  }}
                />
                <Label text={strings('appointment.hospital_clinic')} />
                <Dropdown
                  style={styles.filterTypes}
                  onSelect={this.onSelectHospital}
                  dropdownStyle={{ height: (sizeHeight(5) * hospitalList.length), width: sizeWidth("90") }}
                  options={hospitalList} />
                <Label text={strings('appointment.exam_services')} />
                <Dropdown
                  style={styles.filterTypes}
                  onSelect={this.onSelectExamService}
                  dropdownStyle={{ height: (examServiceList.length > 0 ? sizeHeight(5) * examServiceList.length : sizeHeight(5) * 1), width: sizeWidth("90") }}
                  options={examServiceList} />
                <Label text={strings('appointment.doctor_name')} />
                <Dropdown
                  style={styles.filterTypes}
                  onSelect={this.onSelectDoctorName}
                  dropdownStyle={{ height: (doctorList.length > 0 ? sizeHeight(5) * doctorList.length : sizeHeight(5) * 1), width: sizeWidth("90") }}
                  options={doctorList}
                >
                </Dropdown>
                <View style={{flexDirection: 'row'}}>
                  <Label text={strings('appointment.date_of_appointment')} />
                  <Label style={{marginLeft: sizeWidth(52)}} text={strings('appointment.hour_of_appointment')} />
                </View>
                <View style={[styles.picker, styles.datepicker]}>
                  <DatePickerAddAppointment
                    mode="date"
                    date={this.state.dateStart}
                    format={date_format.dd_mm_yyyy}
                    onDateChange={ this.handleDateInputChangeForStartDate}
                  />
                  <TimePicker
                    mode="time"
                    animationType={"fade"}
                    androidMode={"spinner"}
                    date={this.state.timeStart}
                    onDateChange={ this.handleDateInputChangeForStartTime}
                    format={date_format.hh_mm_ss}
                  />
                </View>
                <Label text={strings('appointment.appointment_for')} />
                <View style={styles.checkboxWrap}>
                  <CheckBox
                    title={strings('appointment.me')}
                    // uncheckedColor={primary_bg_color}
                    checked={appointmenFor === "me"}
                    containerStyle={styles.checkbox}
                    textStyle={styles.textCheckbox}
                    onPress={() =>
                      this.setState({
                        appointmenFor: "me"
                      })
                    }
                  />
                  <CheckBox
                    title={strings('appointment.relatives')}
                    // uncheckedColor={primary_bg_color}
                    checked={appointmenFor === "relatives"}
                    containerStyle={styles.checkbox}
                    textStyle={styles.textCheckbox}
                    onPress={() =>
                      this.setState({
                        appointmenFor: "relatives"
                      })
                    }
                  />        
                </View>
                {(appointmenFor === "relatives") ? (
                  <View>
                  <Label text={strings('appointment.nameRelative')} />
                  <Input
                    placeholder={strings('appointment.nameRelative_pla')}
                    onChangeText={nameRelative => this.setState({ nameRelative })}
                    onFocus={event => {
                      // `bind` the function if you're using ES6 classes
                      this._scrollToInput(findNodeHandle(event.target))
                    }}
                  />
                  <Label text={strings('appointment.ageRelative')} />
                  <Input
                    keyboardType="numeric"
                    placeholder={strings('appointment.ageRelative_pla')}
                    onChangeText={ageRelative => this.setState({ ageRelative })}
                    onFocus={event => {
                      // `bind` the function if you're using ES6 classes
                      this._scrollToInput(findNodeHandle(event.target))
                    }}
                  />
                  <Label text={strings('appointment.indentityNoRelative')} />
                  <Input
                    placeholder={strings('appointment.indentityNoRelative_pla')}
                    onChangeText={indentityNo => this.setState({ indentityNo })}
                    onFocus={event => {
                      // `bind` the function if you're using ES6 classes
                      this._scrollToInput(findNodeHandle(event.target))
                    }}
                  />
                </View>
                ) : (
                  <View></View>
                )}
                <Label text={strings('appointment.note')} />
                <Input
                  multiline={true}
                  textStyle={styles.textContent}
                  style={styles.content}
                  placeholder={strings('appointment.note_pla')}
                  onChangeText={description => this.setState({ description })}
                  onFocus={(event) => {
                    // `bind` the function if you're using ES6 classes
                    this._scrollToInput(findNodeHandle(event.target))
                  }}
                />
                <View style={styles.action}>
                  {/* <Button
                    style={[styles.button, styles.backButton]}
                    text={strings('booking_modal.back')}
                    onPress={() => {
                      this.props.navigateBack();
                    }}
                  /> */}
                  <Button
                    style={styles.button}
                    text={strings('booking_modal.booking')}
                    onPress={() => this.onSubmitBooking()}
                  />
                </View>
                <Text style={styles.message}>{addingError}</Text>
              </View>
              <LoadingPopup loading={booking} />
            </KeyboardAwareScrollView>
          </TouchableWithoutFeedback>
        </View>
    );
  }

  _scrollToInput (reactNode) {
    // Add a 'scroll' ref to your ScrollView
    this.scroll.props.scrollToFocusedInput(reactNode)
  }

  onSelectHospital = (index, rowData) => {
    const {key, value} = rowData;
    this.setState({
      hosId: key,
      hosValue: value
    });
    this.getExamServiceAndDoctor(key);
  };

  onSelectExamService = (index, rowData) => {
    const {key, value} = rowData;
    this.setState({
      examId: key,
      examValue: value
    });
  }; 
  onSelectDoctorName = (index, rowData) => {
    const {key, value} = rowData;
    this.setState({
      doctorId: key,
      doctorValue: value 
    });
  };

  getExamServiceAndDoctor = (shopId) => {
    const examServiceList = [];
    const doctorList = [];
    AppointmentApi.getAllDoctorAndService(shopId).then(async (res) => {
      if(res.serviceShop !== null && res.serviceShop.length > 0) {
        for(index in res.serviceShop){
          var service = res.serviceShop[index];
          this.setState({
            priceSale: service.salePrice,
            nameService: service.productName
          });
          examServiceList.push({
            key: service.productId,
            value: service.productName + "(" + service.salePrice + " VNĐ)"
          });
        }
      }
      if(res.employeeShop !== null && res.employeeShop.length > 0) {
        for(index in res.employeeShop) {
          var doctor = res.employeeShop[index];
          doctorList.push({
            key: doctor.employeeID,
            value: doctor.employeeName
          });
        }
      }

      this.setState({examServiceList, doctorList})
    });
  }

  onSubmitBooking() {
    
    const { appointmenFor ,title, description, dateStart, timeStart, doctorId, doctorValue, hosId, examId, priceSale, examValue, nameRelative, ageRelative, nameService, indentityNo } = this.state;
    const { currentUser } = this.props;
    if (title.trim() == '') {
      Toast.show(strings('appointment.title_empty'));
      return;
    }
    
    const now = new Date();
    const timeNow = new Date(0, 0, 0, now.getHours(), now.getMinutes(), now.getSeconds());
    const dateNow = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if (dateStart.getTime() < dateNow.getTime()) {
      Toast.show(strings('appointment.dateStart_less_than'));
      return;
    }
    if(timeStart.getTime() < timeNow.getTime()){
      Toast.show(strings('appointment.timeStart_less_than'));
      return;
    }
    if (hosId == null) {
      Toast.show(strings('appointment.hos_empty'));
      return;
    }

    if (examId == null){
      Toast.show(strings('appointment.exam_empty'));
      return;
    }

    if (doctorId == null) {
      Toast.show(strings('appointment.doctor_empty'));
      return;
    }

    var descriptionAppointment = ""; 
    if (appointmenFor == "relatives") {
      if (nameRelative.trim() == '') {
        Toast.show(strings('appointment.nameRelative_msg'));
        return;
      }
      if (ageRelative.trim() == '') {
        Toast.show(strings('appointment.ageRelative_msg'));
        return;
      }
      if(indentityNo.trim() == ''){
        Toast.show(strings('appointment.indentityNoRelative_msg'));
        return;
      }
      descriptionAppointment = strings('appointment.description_for_relative') + nameRelative + " " + ageRelative + " "
                             + strings('appointment.ageRelative') + " " + indentityNo + strings('appointment.indentityNoRelative')+ " " + strings('appointment.with_description') + description;
    } else {
      descriptionAppointment = description;
    }

    const dataBookAppointment = {
      toClinic: hosId,
      customerId: currentUser.customerID,
      title: title,
      bookingDate: Moment(dateStart).format(date_format.dd_mm_yyyy) + " " + Moment(timeStart).format(date_format.hh_mm_ss), // api requires format DD/MM/YYYY hh:mm:ss,
      description: descriptionAppointment,
      doctorId: doctorId,
      doctorName: doctorValue,
      serviceName: nameService,
      serviceId: examId,
      priceSale: priceSale.toString()
    }
    this.props.bookAppointment(dataBookAppointment);
  }

  componentDidMount = async () => {
    this.props.loadBookAppointment();
  };
}

const mapStateToProps = state => {
  return {
    ...state.bookingModal,
    ...state.userInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeBookingModal: () => dispatch({ type: TOGGLE_MODAL }),
    navigateBack: () => dispatch(navigateBack()),
    bookAppointment: (dataBookAppointment) =>
      dispatch({ type: BOOK_APPOINTMENT, dataBookAppointment }),
      loadBookAppointment: () => {
      dispatch({type: LOAD_BOOK_APPOINTMENT})
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddAppointment);

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#FFF',
    justifyContent: 'center',
    flex:1
  },
  header: {
    backgroundColor: secondary_bg_color,
    paddingVertical: sizeWidth(2.2),
    alignItems: "center"
  },
  title: {
    color: "#FFF",
    fontWeight: "bold"
  },
  body: {
    flex:1,
    padding: 10
  },
  action: {
    marginTop: sizeWidth(4),
    justifyContent: "center"
  },
  button: {
    // paddingHorizontal: sizeWidth(10),
    // width: sizeWidth(40)
    height: sizeHeight(5.5)
  },
  backButton: {
    backgroundColor: "#CCC"
  },
  textContent: {
    height: sizeWidth(20),
    textAlignVertical: "top",
    paddingTop: 5
  },
  content: {
    height: sizeWidth(20)
  },
  filterWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: sizeWidth(2.13)
  },
  typeText: {
    fontSize: sizeFont(3.4),
    color: "black",
    width: sizeWidth(45)
  },
  filterText: {
    fontSize: sizeFont(3.1),
    color: "black",
    width: sizeWidth(80),
    padding: sizeWidth(2.13),
  },
  filterTypes: {
    width: "100%",
    borderColor: "#888888",
    borderRadius: sizeWidth(1),
    borderWidth: 1,
    height: sizeWidth(9),
    justifyContent: "center",
  },
  checkboxWrap: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  picker: {
    justifyContent: 'flex-start',
    width: sizeWidth(80)
  },
  datepicker: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: sizeWidth(1)
  },
  message: {
    color: "red",
    fontStyle: "italic",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  checkbox: {
    padding: 0,
    margin: 0,
    borderWidth: 0,
    backgroundColor: null
  }
});

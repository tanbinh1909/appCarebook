import React, { Component } from "react";
import {
  findNodeHandle,
  Text,
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  ReactNative
} from "react-native";
import Modal from "react-native-modal";
import { connect } from "react-redux";
import { TOGGLE_MODAL, CLOSE_MODAL, BOOK_APPOINTMENT, LOAD_BOOK_APPOINTMENT } from "../actions/booking-modal.action";
import { sizeWidth, sizeHeight, sizeFont } from "../helpers/size.helper";
import { secondary_bg_color } from "../constants/app.constant";
import Label from "../components/common/label";
import Input from "../components/common/input";
import Button from "../components/common/button";
import DatePicker from "../components/common/date-picker";
import Moment from "moment";
import { CheckBox } from "react-native-elements";
import AppointmentApi from "../api/appointment.api"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { date_format , getDateNow} from "../constants/app.constant";
import LoadingPopup from "../components/common/loading-popup";
import Toast from "@remobile/react-native-toast";
import validator from "validator";
import { Icon } from "react-native-elements";
import { isValidName } from "../helpers/validator.helper";
import { strings } from '../locate/I18n';
import Dropdown from "../components/common/modal-dropdown.js";
import DateUtil from "../constants/date.util";
import DatePickerAddAppointment from "../components/appointment/date-picker-add-appointment";
import ReactNativeDatePicker from "react-native-datepicker";
import TimePicker from "../components/common/time-picker";
import { navigateBack } from "../actions/nav.action";
const styleDate = {
  dateInput: {
    borderWidth: 0,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: sizeWidth(2.13),
    height: sizeWidth(9.06),
    width: sizeWidth(5)
  },
  dateTouchBody: {
    height: sizeWidth(9.06)
  },
  dateText: {
    fontSize: sizeWidth(3),
    textAlign: "left",
    color: "black",
    fontWeight: "bold"
  },
  placeholderText: {
    fontSize: sizeWidth(3),
    textAlign: "left",
    color: "#888888",
    fontWeight: "bold"
  }
}
class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSpecialist: null,
      selectedDoctor: null,
      bookingDate: Moment(new Date()).format(date_format.dd_mm_yyyy_hh_mm),
      dateStart: getDateNow(),
      timeStart: getDateNow(),
      description: "",
      services: "",
      appointmenFor: "me",
      examServiceList: [],
      doctorList: [],
      doctorName: "",
      serviceName: "",
      priceSale: "",
      nameRelative: "",
      ageRelative: "",
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
  componentWillReceiveProps(nextProps) {
    if(nextProps.isToggle) {
      this.setState({bookingDate: Moment(new Date()).format(date_format.dd_mm_yyyy_hh_mm)});
    }
    if(nextProps.toID !== this.props.toID){
      this.getExamServiceAndDoctor(nextProps.toID);
    }
    return true;
  }
  render() {
    const { forDoctor, isToggle, currentUser, booking, } = this.props;
    const {examServiceList, doctorList, appointmenFor} = this.state;
    
    return (
      <Modal
        isVisible={isToggle}
        transparent={true}
        onBackdropPress={() => booking || this.props.closeBookingModal()}
        backdropOpacity={0.5}
        avoidingview = {true}
        moveAboveKeyboard = {true}
      >
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAwareScrollView innerRef={ref => {this.scroll = ref}}>
              <View style={styles.header}>
                <Text style={styles.title}>{strings('booking_modal.book_medical').toUpperCase()}</Text>
              </View>
              <View style={styles.body}>
                <Label text={strings('booking_modal.title')} />
                <Input
                  placeholder={strings('booking_modal.title_pla')}
                  onChangeText={services => this.setState({ services })}
                  onFocus={event => {
                    // `bind` the function if you're using ES6 classes
                    this._scrollToInput(findNodeHandle(event.target))
                  }}
                />
                <Label text={strings('appointment.exam_services')} />
                <Dropdown
                  style={styles.filterTypes}
                  onSelect={this.onSelectExamService}
                  dropdownStyle={{ height: (sizeHeight(5) * examServiceList.length), width: sizeWidth("84") }}
                  options={examServiceList} />
                <Label text={strings('appointment.doctor_name')} />
                <Dropdown
                  style={styles.filterTypes}
                  onSelect={this.onSelectDoctorName}
                  dropdownStyle={{ height: (sizeHeight(5) * doctorList.length), width: sizeWidth("84") }}
                  options={doctorList}
                />
                <Label text={strings('booking_modal.date_time')} />
                <View style={[styles.picker, styles.datepicker]}>
                  <View style={[styles.containerDate]}>
                    <ReactNativeDatePicker
                      style={styles.date}
                      date={this.state.dateStart}
                      mode={"date"}
                      showIcon={false}
                      placeholder={strings('component_common.choose_date')}
                      format={date_format.dd_mm_yyyy}
                      confirmBtnText={strings('component_common.choose')}
                      cancelBtnText={strings('cancel')}
                      customStyles={styleDate}
                      onDateChange={ this.handleDateInputChangeForStartDate }
                    />
                    <Icon
                      size={sizeWidth(4)}
                      name="calendar"
                      type="entypo"
                      color="#888888"
                    />
                  </View>
                  <TimePicker
                    mode="time"
                    animationType={"fade"}
                    androidMode={"spinner"}
                    date={this.state.timeStart}
                    onDateChange={ this.handleDateInputChangeForStartTime}
                    format={date_format.hh_mm_ss}
                  />
                </View>
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
                </View>
                ) : (
                  <View></View>
                )}
                <Label text={strings('booking_modal.note_symptom')} />
                <Input
                  multiline={true}
                  textStyle={styles.textContent}
                  style={styles.content}
                  placeholder={strings('booking_modal.note_symptom_pla')}
                  onChangeText={note => this.setState({ note })}
                  onFocus={(event) => {
                    // `bind` the function if you're using ES6 classes
                    this._scrollToInput(findNodeHandle(event.target))
                  }}
                />
                <View style={styles.action}>
                  <Button
                    style={[styles.button, styles.backButton]}
                    text={strings('booking_modal.back')}
                    onPress={() => this.props.closeBookingModal()}
                  />
                  <Button
                    style={styles.button}
                    text={strings('booking_modal.booking')}
                    onPress={() => this.onSubmitBooking()}
                  />
                </View>
              </View>
              <LoadingPopup loading={booking} />
            </KeyboardAwareScrollView>
          </TouchableWithoutFeedback>
        </View>
      </Modal>
    );
  }

  _scrollToInput (reactNode) {
    // Add a 'scroll' ref to your ScrollView
    this.scroll.props.scrollToFocusedInput(reactNode)
  }

  onSelectDoctorName = (index, rowData) => {
    const {key, value} = rowData;
    this.setState({
      doctorId: key,
      doctorValue: value
    });
  };
  onSelectExamService = (index, rowData) => {
    const {key, value} = rowData;
    this.setState({
      examId: key,
      examValue: value
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
            priceSale: service.salePrice
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
    const { services, hosId, description, doctorId, doctorValue,
       examValue, examId, priceSale, appointmenFor,
        nameRelative, ageRelative , dateStart, timeStart} = this.state;
    const { currentUser, toID } = this.props;
    if (validator.isEmpty(services)) {
      return Toast.show(strings('msg_pls_enter_field', {field: strings('booking_modal.title')}));
    }

    if(!isValidName(services)) {
      return Toast.show(strings('msg_name_cannot_special_char', {name: strings('booking_modal.title')}));
    }
    const now = new Date();
    const timeNow = new Date(0, 0, 0, now.getHours(), now.getMinutes(), now.getSeconds());
    const dateNow = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if (dateStart.getTime() < dateNow.getTime()) {
      Toast.show(strings('appointment.dateStart_less_than'));
      return;
    }
    
    if(dateNow.getTime() == dateStart.getTime()){
      if(timeStart.getTime() < timeNow.getTime()){
        Toast.show(strings('appointment.timeStart_less_than'));
        return;
      }
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
        this.setState({addingError: strings('appointment.nameRelative_pla')});
        return;
      }
      if (ageRelative.trim() == '') {
        this.setState({addingError: strings('appointment.ageRelative_pla')});
        return;
      }
      descriptionAppointment = strings('appointment.description_for_relative') + nameRelative + " " + ageRelative + " "
                             + strings('appointment.ageRelative') + strings('appointment.with_description') + description;
    } else {
      descriptionAppointment = description;
    }
    const dataBookAppointment = {
      toClinic: toID,
      customerId: currentUser.customerID,
      title: services,
      bookingDate: Moment(dateStart).format(date_format.dd_mm_yyyy) + " " + Moment(timeStart).format(date_format.hh_mm_ss), // api requires format DD/MM/YYYY hh:mm:ss,
      description: descriptionAppointment,
      doctorId: doctorId,
      doctorName: doctorValue,
      serviceName: examValue,
      serviceId: examId,
      priceSale: priceSale.toString()
    }

    this.props.bookAppointment(dataBookAppointment);
  }
  componentDidMount(){
    this.props.loadBookAppointment();
  }
}

const mapStateToProps = state => {
  return {
    ...state.bookingModal,
    ...state.userInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeBookingModal: () => dispatch({ type: CLOSE_MODAL}),
    bookAppointment: (dataBookAppointment) => dispatch({ type: BOOK_APPOINTMENT, dataBookAppointment }),
    loadBookAppointment: () => { dispatch({type: LOAD_BOOK_APPOINTMENT})},
    navigateBack: () => dispatch(navigateBack()),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookingModal);

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#FFF',
    justifyContent: 'center'
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
    padding: 10,
  },
  action: {
    marginTop: sizeWidth(4),
    flexDirection: "row",
    justifyContent: "space-between"
  },
  button: {
    paddingHorizontal: sizeWidth(10),
    width: sizeWidth(40)
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
  filterType: {
    borderColor: "#888888",
    borderRadius: sizeWidth(1),
    borderWidth: 1,
    height: sizeWidth(9),
    justifyContent: "center"
  },
  filterWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: sizeWidth(2.13)
  },
  typeText: {
    fontSize: sizeFont(3),
    color: "#000",
    fontWeight: "bold"
  },
  filterText: {
    width: sizeWidth(50),
    fontSize: sizeFont(3),
    color: "#000",
    paddingLeft: sizeWidth(2),
    marginVertical: 5
  },
  filterTypes: {
    height: sizeWidth(9),
  },
  checkboxWrap: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  picker: {
    justifyContent: 'flex-start',
    width: sizeWidth(40)
  },
  datepicker: {
    flexDirection: 'row',
  },
  containerDate: {
    marginVertical: sizeWidth(1),
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#888888",
    alignItems: "center",
    paddingRight: 5,
    borderRadius: sizeWidth(1),
    width: sizeWidth(56)
  },
  date: {
    flex: 1,
    height: sizeWidth(9.06),
    marginRight: sizeWidth(2)
  }
});

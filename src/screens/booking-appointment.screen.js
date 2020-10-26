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
import { TOGGLE_MODAL } from "../actions/booking-modal.action";
import { sizeWidth, sizeHeight, sizeFont } from "../helpers/size.helper";
import { secondary_bg_color } from "../constants/app.constant";
import Label from "../components/common/label";
import Input from "../components/common/input";
import Button from "../components/common/button";
import DatePicker from "../components/common/date-picker";
import Moment from "moment";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { date_format } from "../constants/app.constant";
import LoadingPopup from "../components/common/loading-popup";
import { BOOK_APPOINTMENT } from "../actions/booking-modal.action";
import Toast from "@remobile/react-native-toast";
import validator from "validator";
import { isValidName } from "../helpers/validator.helper";
import { strings } from '../locate/I18n';

class BookingAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSpecialist: null,
      selectedDoctor: null,
      bookingDate: Moment(new Date()).format(date_format.dd_mm_yyyy_hh_mm),
      note: "",
      services: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.isToggle) {
      this.setState({bookingDate: Moment(new Date()).format(date_format.dd_mm_yyyy_hh_mm)});
    }
    return true;
  }

  render() {
    const { forDoctor, visible, currentUser, booking } = this.props;
    return (
      <Modal
        isVisible={visible}
        transparent={true}
        onBackdropPress={() => booking || this.props.closeBookingModal()}
        backdropOpacity={0.5}
        avoidingview = {true}
        moveAboveKeyboard = {true}
        onRequestClose={{}}
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

                <Label text={strings('booking_modal.fullname')} />
                <Input
                  placeholder={strings('booking_modal.fullname_pla')}
                  value={currentUser.customerName}
                  editable={false}
                  selectTextOnFocus={false}
                />

                <Label text={strings('booking_modal.date_time')} />
                <DatePicker
                  mode="datetime"
                  date={this.state.bookingDate}
                  onDateChange={bookingDate => {
                    this.setState({ bookingDate });
                  }}
                  format={date_format.dd_mm_yyyy_hh_mm}
                />
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
                    onPress={this.props.onClosed}
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

  renderFilterRow = (option, index, isSelected) => {
    return <Text style={styles.filterText}>{option}</Text>;
  };

  onSelectSpecialist = (index, value) => {
    this.setState({
      selectedSpecialist: value
    });
  };
  onSelectDoctor = (index, value) => {
    this.setState({
      selectedDoctor: value
    });
  };

  onSubmitBooking() {
    const { services, note } = this.state;
    if (validator.isEmpty(services)) {
      return Toast.show(strings('msg_pls_enter_field', {field: strings('booking_modal.title')}));
    }

    if(!isValidName(services)) {
      return Toast.show(strings('msg_name_cannot_special_char', {name: strings('booking_modal.title')}));
    }

    if (validator.isEmpty(note)) {
      return Toast.show(strings('msg_pls_enter_field', {field: strings('booking_modal.note_symptom')}));
    }

    if(!isValidName(note)) {
      return Toast.show(strings('msg_name_cannot_special_char', {name: strings('booking_modal.note_symptom')}));
    }

    this.props.bookAppointment({
      bookingDate: this.state.bookingDate.concat(":00"), // api requires format DD/MM/YYYY hh:mm:ss
      note: this.state.note,
      services: this.state.services,
      toID: this.props.toID
    });
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
    closeBookingModal: () => dispatch({ type: TOGGLE_MODAL }),
    bookAppointment: appointment =>
      dispatch({ type: BOOK_APPOINTMENT, ...appointment })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookingAppointment);

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
    padding: 10
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
  }
});

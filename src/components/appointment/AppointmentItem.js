import React, { Component } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Text from "../../components/common/text";
import { sizeWidth, sizeFont,sizeHeight } from "../../helpers/size.helper";
import ViewOverflow from "react-native-view-overflow";
import {
  secondary_bg_color,
} from "../../constants/app.constant";
import { navigateToPage } from "../../actions/nav.action";
import { connect } from "react-redux";
import FormatHelper from "../../helpers/format.helper";
import { strings } from '../../locate/I18n';
import Images from '../../constants/image';

class AppointmentItem extends Component {
  constructor() {
    super();
  }

  render() {
    const { appointment } = this.props;
    const indexDate = appointment.dateStart.indexOf(" ");
    const dateStr = appointment.dateStart.substr(0, indexDate);
    const timeStr = appointment.dateStart.substr(indexDate + 1, 5);
    return (
      <ViewOverflow>
        <TouchableOpacity onPress = {() =>{this.props.navigateToPage("AppointmentEdit", {appointmentDetail: appointment,dateStart:appointment.dateStart, note:appointment.note})}}>
        <View style={styles.container}>
          <View style={styles.left}>
            <Text style={styles.time}>{timeStr}</Text>
            <Text style={styles.day}>{dateStr}</Text>
            {
              <Image source={Images.ic_treatment} style={styles.icon}/>
            }
            <Text numberOfLines={1} style={styles.noteLabel}>{appointment.shopName}</Text>
          </View>
          <View style={styles.right}>
          {
             appointment.title !==null && (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.noteLabel}>{strings('title')}: </Text>
                <Text style={styles.name}>{FormatHelper.text_truncate(appointment.title,20)}</Text>
              </View>
             )
          }

            <View style={styles.line} />
            {
              appointment.doctorName !==null && (
                <View style= {{justifyContent:"flex-start"}}>
                  <Text style={styles.doctor}>
                      <Text style={styles.noteLabel}>{strings('appointment_item.doctor')} {FormatHelper.text_truncate(appointment.doctorName,20)}</Text>
                  </Text>
                </View>
              )
            }
             {
              appointment.facultyName && (
                <View style= {{justifyContent:"flex-start"}}>
                    <Text style={styles.doctor}>
                    <Text style={styles.noteLabel}>{strings('appointment_item.specialist')} {appointment.facultyName}</Text>
                  </Text>
                </View>
              )
            }
            {
              appointment.description !== null && (
                <View>
                  <Text style={styles.noteLabel}>{strings('booking_modal.note_symptom')}: </Text>
                  <Text style={styles.noteLabel}>{FormatHelper.text_truncate(appointment.description,30)}</Text>
                </View>
              )
            }
            <Text style={styles.status}>
              {strings('appointment_item.status')}{": "}
              <Text style={{ color: this.setColorStatus(appointment.status),fontWeight: "bold", fontSize: sizeFont(3.5)}}>
              {strings("appointment_status." + appointment.status)}
              </Text>
            </Text>
          </View>
        </View>
        </TouchableOpacity>
      </ViewOverflow>
    );
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

const mapDispatchToProps = dispatch => {
  return {
    navigateToPage: (route, data) => dispatch(navigateToPage(route, data)),
  };
};

const mapStateToProps = state => {
  return { ...state.appointment, ...state.home };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppointmentItem);

const styles = StyleSheet.create({
  container: {
    marginVertical: sizeWidth(1),
    flexDirection: "row",
    padding: sizeWidth(2),
    marginHorizontal: sizeWidth(1),
    overflow: "visible",
    borderRadius:sizeWidth(1),
    borderWidth: 1,
    borderColor: "#888888",
    height:sizeHeight(25),
  },
  name: {
    fontWeight: "bold",
    color: "#333333",
    fontSize:sizeWidth(4),
    marginVertical: sizeWidth(1)
  },
  left: {
    overflow: "visible",
    alignItems: "center",
    marginRight: sizeWidth(3),
    justifyContent:"center",
    width:sizeWidth(38)
  },
  right: {
    flex: 1,
  },
  doctor: {
    fontWeight: "bold",
    color: "#333333",
    marginVertical: sizeWidth(1)
  },
  noteLabel: {
    fontWeight: "bold",
    fontSize: sizeFont(3.5),
    color: "#333333"
  },
  status: {
    fontWeight: "bold",
    color: "#333333",
    fontSize:sizeWidth(3.5),
    marginVertical: sizeWidth(1)
  },
  note: {
    fontWeight: "bold",
    fontSize: sizeFont(3),
    color: "#666666",
    minHeight: sizeWidth(8)
  },
  accept: {
    color: "green"
  },
  line: {
    height: 1,
    backgroundColor: "#CCCCCC",
    width: "95%",
    marginVertical: sizeWidth(1)
  },
  day: {
    fontWeight: "bold",
    marginTop: sizeWidth(1),
    color: "black",
    fontSize: sizeFont(3)
  },
  time: {
    fontWeight: "bold",
    color: "rgb(239, 97, 73)",
    fontSize: sizeFont(8)
  },
  textAppointment: {
    color: "white",
    fontWeight: "bold",
    fontSize: sizeFont(3)
  },
  top: {
    backgroundColor: "rgb(239, 97, 73)",
    padding: sizeWidth(1.5),
    position: "absolute",
    borderRadius: sizeWidth(2),
    top: sizeWidth(3),
    left: sizeWidth(4)
  },
  bottom: {
    left: sizeWidth(4),
    padding: sizeWidth(2),
    position: "absolute",
    borderTopLeftRadius: sizeWidth(2),
    borderTopRightRadius: sizeWidth(2),
    bottom: sizeWidth(3),
    alignItems: "center"
  },
  bottomText: {
    color: "white",
    fontSize: sizeWidth(2.5),
    fontWeight: "bold",
    marginTop: 10
  },
  icon: {
    width: sizeWidth(20),
    height: sizeWidth(20)
  },
  room: {
    fontWeight: "bold",
    width: sizeWidth(35),
    alignItems:"center",
    justifyContent:"center"
  }
});

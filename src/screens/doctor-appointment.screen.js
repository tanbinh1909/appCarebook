import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, FlatList, Animated } from 'react-native';
import AppHeader from "../components/app-header";
import { sizeWidth, sizeFont, sizeHeight } from "../helpers/size.helper";
import { secondary_bg_color } from "../constants/app.constant";
import { strings } from '../locate/I18n';
import Button from "../components/common/button";
import { Icon } from 'react-native-elements'
import { navigateBack, navigateToPage } from "../actions/nav.action";
import { connect } from "react-redux";
import { Calendar, LocaleConfig } from "react-native-calendars";

LocaleConfig.locales['vn'] = {
  monthNames: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
  //dayNames: ['Chủ nhật','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
  dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
};
LocaleConfig.defaultLocale = 'vn';

class DoctorAppointmentScreen extends Component {
  constructor() {
    super();
    this.state = {
      list: [{}, {}, {}, {}, {}]
    };
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <AppHeader isMain={true} />
        {this._renderCalendarContainer()}
        <View style={styles.contentWrapper}>
          {this._renderLatestItem()}
          <View style={styles.appointmentList}>
            <Text style={styles.listTitle}>{`danh sách đặt lịch`.toUpperCase()}</Text>
            <FlatList
              data={this.state.list}
              keyExtractor={(item, index) => index.toString()}
              renderItem={this._renderItem}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
  _keyExtractor = (item, index) => `${index}`;

  _renderItem() {
    return (
      <View style={[styles.appointment, styles.appointmentBorder]}>
        <View style={styles.latestDateTime}>
          <Text style={styles.latestTime}>10:45 SA</Text>
          <Text style={styles.roomName}>{`phòng A32`.toUpperCase()}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.latestDetailTextSmall}>{`khám đau dạ dày`.toUpperCase()}</Text>
          <Text style={styles.latestDetailTextSmall}>{`Trần Anh Khoa`.toUpperCase()}</Text>
          <Text style={styles.latestDetailTextSmall}>{`Khoa tiêu hoá`.toUpperCase()}</Text>
          <Text style={styles.latestDetailTextSmall}>
            <Text>Noi dung: </Text>
            <Text style={styles.latestDetailContent}>Bị đau ruột, buồn nôn, chóng mặt, làm biếng ăn uống.</Text>
          </Text>
        </View>
      </View>
    );
  }

  _renderLatestItem() {
    return (
      <View style={styles.appointment}>
        <View style={styles.latestDateTime}>
          <Text style={styles.latest}>{`gần nhất`.toUpperCase()}</Text>
          <Text style={styles.latestTime}>10:45 SA</Text>
          <Text style={styles.roomName}>{`phòng A32`.toUpperCase()}</Text>
        </View>
        <View style={styles.latestDetail}>
          <Text style={styles.latestDetailText}>{`khám đau dạ dày`.toUpperCase()}</Text>
          <Text style={styles.latestDetailText}>{`Trần Anh Khoa`.toUpperCase()}</Text>
          <Text style={styles.latestDetailText}>{`Khoa tiêu hoá`.toUpperCase()}</Text>
          <Text style={styles.latestDetailText}>
            <Text>Nội dung: </Text>
            <Text style={styles.latestDetailContent}>Bị đau ruột, buồn non, chóng mặt, làm biếng ăn uống.</Text>
          </Text>
          <View style={styles.actionButtons}>
            <Button
              style={{ margin: 1 }} textStyle={{ fontSize: sizeFont(2) }}
              text={strings('agree')}
              leftIcon={<Icon name="check" type="entypo" color="white" iconStyle={{ fontSize: sizeFont(3) }} />}
            />
            <Button
              style={{ backgroundColor: 'red', margin: 1 }}
              textStyle={{ fontSize: sizeFont(2) }}
              text={strings('refuse')}
              leftIcon={<Icon name="close" type="evilIcons" color="white" iconStyle={{ fontSize: sizeFont(3) }} />}
            />
            <Button
              style={{ backgroundColor: '#0091EA', margin: 1 }}
              textStyle={{ fontSize: sizeFont(2) }}
              text={strings('adjust')}
              leftIcon={<Icon name="edit" type="FontAwesome" color="white" iconStyle={{ fontSize: sizeFont(3) }} />}
              onPress={() => this.props.navigateToPage("EditAppointment")}
            />
          </View>
        </View>
      </View>
    );
  }

  _renderCalendarContainer() {
    return (
      <View style={styles.calendarManagement}>
        <View style={styles.calendarTitle}>
          <Icon name="calendar" type="entypo" color="white" iconStyle={{ fontSize: sizeFont(6) }} />
          <Text style={styles.calendarTitleText}>{`quản lý lịch hẹn`.toUpperCase()}</Text>
        </View>
        <View style={styles.calendarBody}>
          <View style={styles.requestNumbers}>
            <TouchableOpacity style={styles.deleteRequest}>
              <Icon name="trash-2" type="feather" color="white" iconStyle={{ fontSize: sizeFont(6) }} />
            </TouchableOpacity>
            <View style={styles.requestWrapper}>
              <Text style={{ color: "#FFF", fontSize: sizeFont(12), fontWeight: "900" }}>09</Text>
              <Text style={{ color: "#FFF", fontWeight: "bold" }}>{`yêu cầu`.toUpperCase()}</Text>
            </View>
          </View>
          <View style={styles.calendar}>
            <Calendar
              // Specify style for calendar container element. Default = {}
              style={{
                flex: 1,
                backgroundColor: "transparent",
                marginTop: -10
              }}
              // Specify theme properties to override specific styles for calendar parts. Default = {}
              theme={{
                calendarBackground: 'transparent',
                textMonthFontSize: sizeFont(4),
                textMonthFontWeight: "bold",
                dayTextColor: '#FFF',
                todayTextColor: '#000',
                arrowColor: '#FFF',
                monthTextColor: '#FFF',
                'stylesheet.calendar.header': {
                  header: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  },
                  dayHeader: {
                    marginTop: -10,
                    textAlign: 'center',
                    color: "#FFF",
                    fontSize: sizeFont(3),
                    fontWeight: "bold"
                  }
                }
              }}
              dayComponent={({ date, state }) => {
                return (
                  <TouchableOpacity style={{ flex: 1 }}>
                    <Text style={[styles.dayCalendarStyle, { color: state === "disabled" ? "#CCC" : (state === "today" ? "#000" : "#FFF") }]}>
                      {date.day}
                    </Text>
                  </TouchableOpacity>);
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default connect(
  null,
  { navigateBack, navigateToPage }
)(DoctorAppointmentScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentWrapper: {
    padding: 10
  },
  appointment: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f4f4f4",
    marginBottom: 10
  },
  latestDateTime: {
    flex: 1,
    alignItems: "center"
  },
  latestDetail: {
    flex: 2,
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: "#CCC"
  },
  latest: {
    fontSize: sizeFont(4),
    fontWeight: "bold",
    marginBottom: 5
  },
  latestTime: {
    fontSize: sizeFont(4.46),
    color: secondary_bg_color,
    fontWeight: "900",
    marginBottom: 5
  },
  roomName: {
    fontSize: sizeFont(4),
    color: secondary_bg_color,
    marginBottom: 5
  },
  latestDetailText: {
    fontSize: sizeFont(3),
    marginBottom: 3,
    fontWeight: "bold"
  },
  latestDetailContent: {
    fontStyle: "italic"
  },
  actionButtons: {
    flex: 1,
    flexDirection: 'row'
  },
  listTitle: {
    marginTop: 15,
    marginBottom: 15,
    fontWeight: "bold"
  },
  latestDetailTextSmall: {
    fontSize: sizeFont(2.46),
    fontWeight: "bold"
  },
  appointmentBorder: {
    borderRightWidth: sizeWidth(5),
    borderRightColor: secondary_bg_color
  },
  detail: {
    flex: 2
  },
  calendarManagement: {
    height: sizeHeight(30),
    backgroundColor: secondary_bg_color
  },
  calendarTitle: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingBottom: 0
  },
  calendarTitleText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: sizeFont(5),
    marginLeft: 5
  },
  calendarBody: {
    flexDirection: "row",
    flex: 1,
    padding: 10
  },
  requestNumbers: {
    justifyContent: "center"
  },
  requestWrapper: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    height: sizeWidth(30),
    width: sizeWidth(30),
    borderRadius: sizeWidth(15)
  },
  calendar: {
    flex: 1
  },
  deleteRequest: {
    backgroundColor: "red",
    position: "absolute",
    zIndex: 2,
    width: 40,
    height: 40,
    top: 0,
    left: 0,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  dayCalendarStyle: {
    textAlign: 'center',
    marginBottom: sizeHeight(-1.5),
    fontSize: sizeFont(3)
  }
});
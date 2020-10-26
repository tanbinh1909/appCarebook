import React, { Component } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  Alert
} from "react-native";
import Toolbars from "../components/common/toolbars";
import { connect } from "react-redux";
import { sizeWidth, sizeFont, sizeHeight } from "../helpers/size.helper";
import AppointmentItem from "../components/appointment/AppointmentItem";
import ViewOverflow from "react-native-view-overflow";
import AppHeader from "../components/app-header";
import { navigateToPage } from "../actions/nav.action";
import {
  LOAD_APPOINTMENTS,
  REFRESH_APPOINTMENTS,
  CANCEL_APPOINTMENT
} from "../actions/appointment.action";
import { TOGGLE_TABBAR } from "../actions/home.action";
import _ from "lodash";
import { strings } from '../locate/I18n';
import { Button} from 'native-base';
import { secondary_bg_color } from "../constants/app.constant";
class AppointmentScreen extends Component {

  render() {
    const {
      appointments,
      appointmentsLoading,
      appointmentsRefreshing
    } = this.props;

    return (
      <View style={styles.container}>
        <AppHeader isMain={true} />
        <Toolbars title={strings('navigator.appointment')}/>
          <View style={styles.actionRow}>
            <Button success
              onPress={() => this.props.navigateToPage("AddAppointment", {
              handleGoBack: this.props.loadAppointments.bind(this)
            })}
              style = {styles.button}
            >
              <Text style = {{color:"white"}}>{strings('appointment.add_appointment')}</Text>
            </Button>
          </View>
          <View style={{flex: 1, padding: sizeWidth(2)}}>
            {appointments.length > 0 ? (
              appointmentsLoading ? (
                <ActivityIndicator size="large" color="#000" />
              ) : (
                <FlatList
                  refreshing={appointmentsRefreshing}
                  onRefresh={this.props.refreshAppointments}
                  CellRendererComponent={ViewOverflow}
                  data={appointments}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={this.renderAppointmentItem}
                  // onMomentumScrollBegin={e => this._onScroll(e)}
                />
              )
            ) : (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text
                  style={{
                    fontSize: sizeFont(5),
                    fontWeight: "bold",
                    color: "gray",
                    marginTop: sizeWidth(5)
                  }}
                >
                  {strings('appointment.msg1')}
                </Text>
              </View>
            )}
        </View>
      </View>
    );
  }

  renderAppointmentItem = ({ item }) => {
    return (
      <AppointmentItem appointment={item} />
    );
  };

  gotoAppointmentEdit = (item) => {
    this.props.navigateToPage("AppointmentEdit", item);
  }

  cancelAppointment = (idEvent) => {
    Alert.alert(
      strings('appointment.confirm'),
      strings('appointment.msg2'),
      [
        {text: strings('cancel'), onPress: () => null },
        {text: strings('accept'), onPress: () => this.props.cancelAppointment(idEvent) }
      ],
      { cancelable: false }
    )
  }
  componentDidMount = async () => {
    this.props.loadAppointments();
    this.offsetY = 0;
  };

  search = _.debounce(keyword => {
    this.props.loadAppointments(keyword);
  }, 1000);

  _onScroll(event) {
    const { hideTabBar } = this.props;
    if (this.offsetY < event.nativeEvent.contentOffset.y && !hideTabBar) {
      this.props.toggleTabBar(true);
    }
    if (this.offsetY > event.nativeEvent.contentOffset.y && hideTabBar) {
      this.props.toggleTabBar(false);
    }
    this.offsetY = event.nativeEvent.contentOffset.y;
  }
}

const mapStateToProps = state => {
  return { ...state.appointment, ...state.home };
};

const mapDispatchToProps = dispatch => {
  return {
    navigateToPage: (route, data) => dispatch(navigateToPage(route, data)),
    loadAppointments: () => {
      dispatch({ type: LOAD_APPOINTMENTS });
    },
    cancelAppointment: (idEvent) => {
      dispatch({ type: CANCEL_APPOINTMENT, idEvent });
    },
    refreshAppointments: keyword => {
      dispatch({ type: REFRESH_APPOINTMENTS, keyword });
    },
    toggleTabBar: hideTabBar => dispatch({ type: TOGGLE_TABBAR, hideTabBar })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppointmentScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  actionButtons: {
    flex: 1,
    flexDirection: 'row',
    padding: sizeWidth(1),
    justifyContent: 'flex-end'
  },
  itemAppointment: {
    flex:1,
    backgroundColor: "rgb(249, 250, 254)",
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: 1
  },
  body: {
    padding: sizeWidth(5)
  },
  button: {
    paddingHorizontal: sizeWidth(10),
    // width: sizeWidth(37.06),
    height: sizeHeight(5),
    borderRadius:sizeWidth(1),
    backgroundColor: secondary_bg_color
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 12,
    marginTop: 10
  },
});

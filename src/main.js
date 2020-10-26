import React, { Component } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Platform,
  BackHandler
} from "react-native";
import { AppNavigator } from "./navigators/app.navigator";
import { addNavigationHelpers, NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import Toast from "@remobile/react-native-toast";
import { getPINCode } from "./helpers/storage.helper";
import { SET_PIN_CODE } from "./actions/user-info.action";
import BookingAppointment from "./screens/booking-appointment.screen";

class Main extends Component {
  state = {
    isVisibleModal: false
  };

  componentWillMount() {
    this.loadStorageData();
  }

  loadStorageData = async () => {
    const pinCode = await getPINCode();
    this.props.setPINCode(pinCode);
  };

  shouldCloseApp = () => {
    return this.props.nav.index === 0;
  };

  handleBackPress = () => {
    this.props.dispatch(NavigationActions.back({}));
    return true;
  };

  componentDidMount = () => {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  };

  componentWillUnmount = () => {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  };

  onClosed = () => {
    Toast.show("onClosed");
    this.setState({ isVisibleModal: false });
  };

  render() {
    const { dispatch, nav } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.statusBar}>
          <StatusBar barStyle="light-content" />
        </View>
        <AppNavigator
          navigation={addNavigationHelpers({ dispatch: dispatch, state: nav })}
        />
        {/* <ActionButton
          buttonColor="rgba(231,76,60,1)"
          style={{marginBottom: 50}}
          onPress={() => { this.setState({isVisibleModal: true});}} >
        </ActionButton> */}
        {this.state.isVisibleModal && (
          <BookingAppointment visible={true} onClosed={this.onClosed} />
        )}
      </View>
    );
  }
}

const statusBarHeight = Platform.OS === "ios" ? 20 : 0;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(31, 39, 43)"
  },
  statusBar: {
    height: statusBarHeight,
    backgroundColor: "rgb(31, 39, 43)"
  }
});

function mapStateToProps(state) {
  return { nav: state.nav };
}

const mapDispatchToProps = dispatch => ({
  setPINCode: pinCode => dispatch({ type: SET_PIN_CODE, pinCode }),
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);

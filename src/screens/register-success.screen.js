import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions
} from "react-native";
import Text from "../components/common/text";
import { sizeFont, sizeWidth } from "../helpers/size.helper";
import { navigateBack, navigateToPage } from "../actions/nav.action";
import { connect } from "react-redux";
import { Icon } from "react-native-elements";
import { strings } from '../locate/I18n';

const WINDOW_WIDTH = Dimensions.get("window").width;

class RegisterSuccessScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {userName} = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Icon
            name="ios-checkmark-circle"
            type="ionicon"
            size={sizeFont(50)}
            color="#CCC"
          />
        <Text style={[styles.text, styles.success]}>{strings('register_success.msg1').toUpperCase()}</Text>
        <Text style={[styles.text, styles.label]}>{strings('register_success.msg2').toUpperCase()}</Text>
        <Text style={[styles.text, styles.success]}>{userName}</Text>
        <TouchableOpacity
            style={styles.buttonLogin}
            activeOpacity={0.6}
            onPress={() => this.props.navigateToPage("Document")}
          >
            <Text style={styles.buttonText}>{strings('register_success.login')}</Text>
          </TouchableOpacity>
      </View>
    );
  }
}

export default connect(
  null,
  { navigateToPage }
)(RegisterSuccessScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(77, 179, 78)",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonLogin: {
    backgroundColor: "green",
    borderRadius: 10,
    width: (WINDOW_WIDTH / 10) * 9,
    padding: sizeWidth(4),
    alignItems: "center",
    marginVertical: sizeWidth(3)
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: sizeFont(5)
  },
  text: {
    color: "#FFF"
  },
  success: {
    fontSize: sizeFont(6),
    fontWeight: "bold"
  },
  label: {
    fontSize: sizeFont(5),
    marginTop: 30
  }
});

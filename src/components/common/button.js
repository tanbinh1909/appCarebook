import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import Text from "./text";
import { sizeFont, sizeWidth } from "../../helpers/size.helper";
import { secondary_bg_color } from "../../constants/app.constant";
import PropTypes from "prop-types";

export default class Button extends Component {
  render() {
    const {
      icon,
      disabled,
      text,
      style,
      textStyle,
      onPress,
      loading,
      leftIcon
    } = this.props;

    return (
      <TouchableOpacity
        disabled={disabled}
        style={[styles.container, style]}
        onPress={onPress}
      >
        {loading && this.renderLoading()}
        {leftIcon}
        <Text numberOfLines={1} style={[styles.text, textStyle]}>
          {text}
        </Text>
        {icon}
      </TouchableOpacity>
    );
  }

  renderLoading = () => {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="small" color="white" />
      </View>
    );
  };
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  textStyle: PropTypes.any,
  loading: PropTypes.bool
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: sizeWidth(1),
    paddingHorizontal: sizeWidth(3),
    backgroundColor: secondary_bg_color,
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: sizeWidth(1),
    borderWidth: 1,
    borderColor: "#888888",
  },
  loading: {
    alignSelf: "center",
    position: "absolute",
    left: sizeWidth(2.13)
  },
  text: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "bold",
    fontSize: sizeFont(4)
  }
});

import React, { Component } from "react";
import { Image, TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { sizeWidth } from "../../helpers/size.helper";

export default class TouchableIcon extends Component {
  render() {
    const { onPress, loading, source, iconStyle, style } = this.props;
    const icon = loading
      ? require("../../../res/img/ic_star_yellow.png")
      : source;
    return (
      <TouchableOpacity
        disabled={loading}
        style={[styles.container, style]}
        onPress={onPress}
      >
        <Image
          style={[styles.icon, iconStyle]}
          resizeMode="contain"
          source={icon}
        />
      </TouchableOpacity>
    );
  }
}

TouchableIcon.propTypes = {
  onPress: PropTypes.func,
  loading: PropTypes.bool,
  source: PropTypes.any.isRequired,
  iconStyle: PropTypes.any
};

const styles = StyleSheet.create({
  container: {
    padding: sizeWidth(2.13)
  },
  icon: {
    width: sizeWidth(6.4),
    height: sizeWidth(6.4)
  }
});

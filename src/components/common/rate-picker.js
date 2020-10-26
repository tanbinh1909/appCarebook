import React, { Component } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { sizeWidth, sizeFont } from "../../helpers/size.helper";
import { Icon } from "react-native-elements";

export default class RatePicker extends Component {
  render() {
    const { style, rate, maxRate, size, onRateChange } = this.props;
    const elements = [];
    for (let index = 0; index < rate; index++) {
      elements.push(
        <TouchableOpacity
          onPress={() => onRateChange(index + 1)}
          style={styles.star}
          key={index}
        >
          <Icon
            name={"star"}
            type="font-awesome"
            color="rgb(254, 237, 70)"
            size={size || sizeFont(3.4)}
          />
        </TouchableOpacity>
      );
    }
    for (let index = rate; index < maxRate; index++) {
      elements.push(
        <TouchableOpacity
          onPress={() => onRateChange(index + 1)}
          style={styles.star}
          key={index}
        >
          <Icon
            name={"star"}
            type="font-awesome"
            color="#CCCCCC"
            size={size || sizeFont(3.4)}
          />
        </TouchableOpacity>
      );
    }
    return <View style={[styles.container, style]}>{elements}</View>;
  }
}

RatePicker.propTypes = {
  rate: PropTypes.number
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  star: {
    marginHorizontal: sizeWidth(0.1)
  }
});

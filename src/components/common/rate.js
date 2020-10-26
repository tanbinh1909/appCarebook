import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";
import PropTypes from "prop-types";
import { sizeWidth, sizeFont } from "../../helpers/size.helper";
import { Icon } from "react-native-elements";

export default class Rate extends Component {
  render() {
    const { style, rate, maxRate, size } = this.props;
    const elements = [];
    for (let index = 0; index < rate; index++) {
      elements.push(
        <Icon
          key={index}
          iconStyle={styles.star}
          name={"star"}
          type="font-awesome"
          color="rgb(254, 237, 70)"
          size={size || sizeFont(3.4)}
        />
      );
    }
    for (let index = rate; index < maxRate; index++) {
      elements.push(
        <Icon
          key={index}
          iconStyle={styles.star}
          name={"star"}
          type="font-awesome"
          color="#CCCCCC"
          size={size || sizeFont(3.4)}
        />
      );
    }
    return <View style={[styles.container, style]}>{elements}</View>;
  }
}

Rate.propTypes = {
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

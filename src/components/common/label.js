import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import Text from "./text";
import { sizeFont, sizeWidth } from "../../helpers/size.helper";

export default class Label extends Component {
  render() {
    const { text, style } = this.props;
    return <Text style={[styles.container, style]}>{text}</Text>;
  }
}

const styles = StyleSheet.create({
  container: {
    color: "black",
    fontWeight: "bold",
    marginVertical: sizeWidth(1),
    fontSize: sizeFont(3.73)
  }
});

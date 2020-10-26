// @flow
import React, { PureComponent } from "react";
import { Text, StyleSheet } from "react-native";
import { sizeFont } from "../../helpers/size.helper";

const EMPTY = "";

export default class AppText extends PureComponent {
  render() {
    const { style, numberOfLines } = this.props;
    const children =
      this.props.children !== null && this.props.children !== undefined
        ? this.props.children
        : EMPTY;

    return (
      <Text
        ellipsizeMode="tail"
        numberOfLines={numberOfLines}
        style={[styles.text, style]}
      >
        {children}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: "black",
    fontSize: sizeFont(3.73),
    backgroundColor: "transparent"
  }
});

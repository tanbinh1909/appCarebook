import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import Text from "text";

export default class Checkbox extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Icon />
        <Text />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {}
});

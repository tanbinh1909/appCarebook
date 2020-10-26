import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";
import { sizeWidth, sizeFont } from "../../helpers/size.helper";
import Images from '../../constants/image';

export default class DetailMap extends Component {
  render() {
    return (
      <Image
        style={[styles.map, this.props.style]}
        source={Images.map}
      />
    );
  }
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: sizeWidth(30)
  }
});

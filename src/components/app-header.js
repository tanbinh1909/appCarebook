import React, { Component } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { sizeWidth, sizeFont } from "../helpers/size.helper";
import Text from "../components/common/text";
import { Icon } from "react-native-elements";
import {connect} from 'react-redux';
import {toggleDrawer} from '../actions/nav.action';
import Images from '../constants/image';
import { strings, switchLanguage } from '../locate/I18n';

class AppHeader extends Component {
  render() {
    return (
      <View style={[styles.container]}>
        {/* {
          this.props.isMain && this.renderToggleMenu()
        } */}
        <Image resizeMode="contain" source={Images.appLogo} style={[styles.image]} />
      </View>
    );
  }

  renderNotification = () => {
    return (
      <TouchableOpacity style={styles.bell}>
        <Icon
          name="bell"
          type="entypo"
          size={sizeFont(7)}
          color="rgb(250, 173, 42)"
        />
        <View style={styles.numberWrap}>
          <Text style={styles.number}>5</Text>
        </View>
      </TouchableOpacity>
    );
  };

  renderToggleMenu = () => {
    return (
      <TouchableOpacity style={styles.bell} onPress={this.props.toggleDrawer}>
        <Icon
          name="menu"
          type="Feather"
          size={sizeFont(7)}
          color="#000"
        />
      </TouchableOpacity>
    );
  };
}

export default connect(null, {toggleDrawer})(AppHeader)

const styles = StyleSheet.create({
  container: {
    width: sizeWidth(100),
    flexDirection: "row",
    height: sizeWidth(15),
    alignItems: "center",
    justifyContent: "space-between"
  },
  image: {
    width: sizeWidth(30),
    height: sizeWidth(12)
  },
  bell: {
    marginLeft: sizeWidth(2)
  },
  number: {
    color: "white",
    textAlign: "center",
    fontSize: sizeFont(2.5),
    textAlignVertical: "center"
  },
  numberWrap: {
    borderRadius: sizeWidth(10),
    bottom: 0,
    right: 0,
    width: sizeWidth(4),
    height: sizeWidth(4),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(161, 13, 66)",
    position: "absolute"
  }
});

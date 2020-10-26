import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import Button from "../common/button";
import { sizeWidth, sizeFont } from "../../helpers/size.helper";
import { Icon } from "react-native-elements";
import { strings } from '../../locate/I18n';

export default class FilterAction extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.filterAction}>
          <Button
            onPress={this.props.onBackPress}
            leftIcon={
              <Icon
                iconStyle={styles.icon}
                size={sizeWidth(3)}
                name="arrow-left"
                type="font-awesome"
                color="white"
              />
            }
            textStyle={styles.buttonText}
            style={styles.back}
            text="Trở Về"
          />
          <Button
            onPress={this.props.onRefreshPress}
            leftIcon={
              <Icon
                iconStyle={styles.icon}
                size={sizeWidth(3)}
                name="refresh"
                type="font-awesome"
                color="white"
              />
            }
            textStyle={styles.buttonText}
            style={styles.refresh}
            text={strings('component_search.refresh')}
          />
          <Button
            onPress={this.props.onFilterPress}
            leftIcon={
              <Icon
                iconStyle={styles.icon}
                size={sizeWidth(3)}
                name="filter"
                type="font-awesome"
                color="white"
              />
            }
            textStyle={styles.buttonText}
            style={styles.submit}
            text={strings('component_search.filter')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  filterAction: {
    flexDirection: "row",
    marginVertical: sizeWidth(1),
    justifyContent: "center",
    alignItems: "center"
  },
  back: {
    width: sizeWidth(25),
    marginHorizontal: sizeWidth(2),
    borderRadius: sizeWidth(2.13),
    backgroundColor: "black"
  },
  refresh: {
    width: sizeWidth(25),
    marginHorizontal: sizeWidth(2),
    borderRadius: sizeWidth(2.13)
  },
  submit: {
    width: sizeWidth(25),
    marginHorizontal: sizeWidth(2),
    borderRadius: sizeWidth(2.13),
    backgroundColor: "rgb(46, 62, 79)"
  },
  buttonText: {
    fontSize: sizeFont(3)
  },
  icon: {
    marginRight: sizeWidth(1)
  },
  container: {}
});

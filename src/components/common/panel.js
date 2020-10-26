import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import Text from "./text";
import { sizeFont, sizeWidth, sizeHeight } from "../../helpers/size.helper";
import { connect } from "react-redux";
import { secondary_bg_color, border_color } from "../../constants/app.constant";

class Panel extends Component {
  render() {
    const { title, isHeader = true, contentStyle } = this.props;
    return (
      <View>
        {isHeader && (
          <View style={styles.header}>
            <Text style={styles.title}>{title ? title.toUpperCase() : ""}</Text>
          </View>
        )}
        <View style={[styles.content, contentStyle]}>
          {this.props.children}
        </View>
      </View>
    );
  }
}

export default connect(null)(Panel);

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: border_color,
    height:sizeHeight(35)
  },
  header: {
    backgroundColor: secondary_bg_color,
    paddingVertical: sizeWidth(2.2),
    alignItems: "flex-start",
    paddingHorizontal: sizeWidth(1)
  },
  title: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
    height:sizeHeight(3)
  },
  content: {
    paddingVertical: sizeWidth(2)
  }
});

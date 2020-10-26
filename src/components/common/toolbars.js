import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Text from "./text";
import { sizeWidth } from "../../helpers/size.helper";
import { connect } from "react-redux";
import { navigateBack } from "../../actions/nav.action";
import { secondary_bg_color } from "../../constants/app.constant";

class Toolbars extends Component {
  render() {
    const { title, rightComponent } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title && title.toUpperCase()}</Text>
        {
          rightComponent && rightComponent
        }
      </View>     
    );
  }
}

export default connect(
  null,
  { navigateBack }
)(Toolbars);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: secondary_bg_color,
    paddingVertical: sizeWidth(2.2),
  },
  title: {
    flex: 1,
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  iconWrap: {
    paddingHorizontal: sizeWidth(4)
  }
});

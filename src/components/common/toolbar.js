import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import Text from "./text";
import { sizeFont, sizeWidth, sizeHeight } from "../../helpers/size.helper";
import { connect } from "react-redux";
import { navigateBack } from "../../actions/nav.action";
import { secondary_bg_color } from "../../constants/app.constant";

class Toolbar extends Component {
  render() {
    const { title, rightComponent } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.iconWrap}
          onPress={this.props.navigateBack}
        >
          <Icon
            style={styles.iconBack}
            name="chevron-left"
            type="material-community"
            size={sizeFont(7)}
            color="white"
          />
        </TouchableOpacity>
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
)(Toolbar);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: secondary_bg_color,
    paddingVertical: sizeWidth(2.2),
    alignItems: "center",
    justifyContent: "space-between",
    height: sizeHeight(6)
  },
  title: {
    flex: 1,
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  iconWrap: {
    paddingHorizontal: sizeWidth(1)
  }
});

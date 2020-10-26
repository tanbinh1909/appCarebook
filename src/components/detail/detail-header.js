import React, { Component } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { Icon } from "react-native-elements";
import Text from "../common/text";
import { sizeFont, sizeWidth } from "../../helpers/size.helper";
import { connect } from "react-redux";
import { navigateBack } from "../../actions/nav.action";
import { secondary_bg_color } from "../../constants/app.constant";
import Images from '../../constants/image';

class DetailHeader extends Component {
  render() {
    const { title } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.iconWrap}
          onPress={this.props.navigateBack}
        >
          <Icon
            style={styles.iconBack}
            name="arrow-long-left"
            type="entypo"
            size={sizeFont(4)}
            color="white"
          />
        </TouchableOpacity>

        <View style={styles.right}>
          <TouchableOpacity
            onPress={this.props.onTextPress}
            style={styles.text}
          >
            <Image
              source={Images.ic_text}
              style={styles.rightIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.props.onBookmarkPress}
            style={styles.bookmark}
          >
            <Image
              source={Images.ic_bookmark}
              style={styles.rightIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.props.onSharePress}
            style={styles.share}
          >
            <Image
              source={Images.ic_share}
              style={styles.rightIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default connect(
  null,
  { navigateBack }
)(DetailHeader);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "black",
    paddingVertical: sizeWidth(2.2),
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#333333"
  },
  iconWrap: {
    paddingHorizontal: sizeWidth(4)
  },
  right: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: sizeWidth(2)
  },
  rightIcon: {
    width: sizeWidth(4),
    height: sizeWidth(4)
  },
  text: {
    marginHorizontal: sizeWidth(2)
  },
  share: {
    marginHorizontal: sizeWidth(2)
  },
  bookmark: {
    marginHorizontal: sizeWidth(2)
  }
});

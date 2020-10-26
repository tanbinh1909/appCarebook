import React, { Component } from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { sizeWidth, sizeFont } from "../../helpers/size.helper";
import { Icon } from "react-native-elements";
import PropType from "prop-types";
import {
  LOCAL_IMAGES
} from "../../constants/app.constant";

class MenuItem extends Component {
  render() {
    const { onMenuPress, icon } = this.props;
    const _icon = LOCAL_IMAGES.find(item => item.id === icon);
    return (
      <TouchableOpacity onPress={onMenuPress}>
        <View style={{ height: sizeWidth(13), flexDirection: "row" }}>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
          {
            _icon && <Image style={{width: 30, height: 30}} source={_icon.localUrl} />
          }
          </View>

          <View
            style={{
              flex: 3,
              justifyContent: "center",
              flexDirection: "column"
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: sizeFont(5) }}>
              {this.props.menuName}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

MenuItem.propTypes = {
  icon: PropType.string
};

MenuItem.defaultProps = {
  icon: ""
};

export default MenuItem;

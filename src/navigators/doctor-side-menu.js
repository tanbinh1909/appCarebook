import React, { Component } from "react";
import {
  tab_font_size,
  primary_color,
  primary_bg_color,
  tab_height,
  actived_tab_color
} from "../constants/app.constant";
import {
  ScrollView,
  Image,
  StyleSheet,
  ImageBackground
} from "react-native";
import Text from "../components/common/text";
import MenuItem from "../components/profile/menu-item";
import { sizeWidth, sizeFont } from "../helpers/size.helper";
import { navigateToPage, resetPage, toggleDrawer } from "../actions/nav.action";
import { connect } from "react-redux";
import Images from '../constants/image';

class DoctorSideMenu extends Component {
  render() {
    return (
      <ScrollView style={styles.wrapper}>
        <ImageBackground
          source={Images.background}
          style={styles.header}
        >
          <Image
            style={styles.avatar}
            source={Images.avatar}
          />
          <Text style={styles.name}>{`bs.tran anh khoa`.toUpperCase()}</Text>
        </ImageBackground>
        {/* <MenuItem
          onMenuPress={() => {}}
          menuName="Quét Mã QRCode"
          iconName="qrcode"
          iconType="font-awesome"
        />
        <MenuItem
          onMenuPress={() => {}}
          menuName="Nhắc Nhở"
          iconName="bell-ring"
          iconType="material-community"
        />
        <MenuItem
          onMenuPress={() => this.onPressLogout()}
          menuName="Đăng Xuất"
          iconName="log-out"
          iconType="entypo"
        /> */}
      </ScrollView>
    );
  }

  onPressLogout = () => {
    this.props.toggleDrawer();
    this.props.resetPage("Login");
  };
}

export default connect(
  null,
  { navigateToPage, resetPage, toggleDrawer }
)(DoctorSideMenu);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  avatar: {
    width: sizeWidth(24),
    height: sizeWidth(24),
    borderRadius: sizeWidth(12),
    marginBottom: 10
  },
  header: {
    width: "100%",
    paddingTop: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  name: {
    fontWeight: "bold",
    marginBottom: 10
  }
});

import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import Text from "../components/common/text";
import { Icon } from "react-native-elements";
import { sizeWidth, sizeFont, sizeHeight } from "../helpers/size.helper";
import { connect } from "react-redux";
import { navigateBack, navigateToPage } from "../actions/nav.action";
import AppHeader from "../components/app-header";
import Images from '../constants/image';

class MenuProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 3
    };
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <AppHeader />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            borderTopWidth: 1,
            borderTopColor: "#eae5e5",
            paddingVertical: sizeHeight(2),
            borderBottomWidth: 1,
            borderBottomColor: "#eae5e5"
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigateBack()}
            activeIndex={this.state.activeIndex == 0}
          >
            <Icon
              name="home"
              type="entypo"
              color={this.state.activeIndex == 0 ? "green" : "black"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigateToPage('AppointmentManage')}
            activeIndex={this.state.activeIndex == 1}
          >
            <Icon
              name="clock"
              type="feather"
              color={this.state.activeIndex == 1 ? "green" : "black"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.segmentClicked(2)}
            activeIndex={this.state.activeIndex == 2}
          >
            <Icon
              name="notifications"
              type="MaterialIcons"
              color={this.state.activeIndex == 2 ? "green" : "black"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.segmentClicked(3)}
            activeIndex={this.state.activeIndex == 3}
          >
            <Icon
              name="menu"
              type="Feather"
              color={this.state.activeIndex == 3 ? "green" : "black"}
            />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row", flexWrap: "wrap", padding: 5 }}>
          {this.renderSection()}
        </View>
      </ScrollView>
    );
  }

  segmentClicked = index => {
    this.setState({
      activeIndex: index
    });
  };

  renderSection = () => {
    switch (this.state.activeIndex) {
      case 0:
        return (
          <View>
            <Text>Home</Text>
          </View>
        );
      case 1:
        return (
          <View>
            <Text>Clock</Text>
          </View>
        );
      case 2:
        return (
          <View>
            <Text>Notification</Text>
          </View>
        );
      case 3:
        return (
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={{ flex: 1, height: sizeWidth(20), flexDirection: "row" }}
              onPress={() => this.props.navigateToPage("Profile")}
            >
              <View style={{ flex: 1, alignItems: "center" }}>
                <Image
                  style={[{}, styles.avatar]}
                  source={Images}
                />
              </View>

              <View
                style={{
                  flex: 3,
                  justifyContent: "center",
                  flexDirection: "column"
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: sizeFont(6) }}>
                  Lê Thị Cẩm Dương
                </Text>
                <Text style={{ fontSize: sizeFont(3), color: "grey" }}>
                  Xem thông tin cá nhân
                </Text>
              </View>
            </TouchableOpacity>

            <View style={styles.line} />

            {/* <MenuItem
              onMenuPress={() => this.props.navigateToPage("MedicalHistory")}
              menuName="Hồ Sơ Bệnh Án"
              iconName="briefcase"
              iconType="entypo"
            />
            <MenuItem
              onMenuPress={() =>
                this.props.navigateToPage("PrescriptionHistory")
              }
              menuName="Lịch Sử Toa Thuốc"
              iconName="briefcase"
              iconType="entypo"
            />
            <MenuItem
              onMenuPress={() => this.props.navigateToPage("TestHistory")}
              menuName="Lịch Sử Xét Nghiệm"
              iconName="clipboard"
              iconType="entypo"
            />
            <MenuItem
              onMenuPress={() => this.props.navigateToPage("PaymentHistory")}
              menuName="Lịch Sử Thanh Toán"
              iconName="news"
              iconType="entypo"
            />
            <MenuItem
              onMenuPress={() => this.props.navigateToPage("Saved")}
              menuName="Đã Lưu"
              iconName="save"
              iconType="entypo"
            />
            <MenuItem
              onMenuPress={() => this.props.navigateToPage("Setting")}
              menuName="Cài Đặt"
              iconName="cog"
              iconType="entypo"
            />
            <MenuItem
              menuName="Đăng Xuất"
              iconName="log-out"
              iconType="entypo"
            /> */}
          </View>
        );
    }
  };
}

export default connect(
  null,
  { navigateBack, navigateToPage }
)(MenuProfileScreen);

const styles = StyleSheet.create({
  avatar: {
    width: sizeWidth(18),
    height: sizeWidth(18),
    borderRadius: sizeWidth(9),
    borderWidth: sizeWidth(1),
    borderColor: "white"
  },

  line: {
    width: "90%",
    height: 2,
    alignSelf: "center",
    backgroundColor: "#CCCCCC",
    marginBottom: sizeWidth(3)
  }
});

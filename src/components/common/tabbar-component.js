import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  ImageBackground,
  Animated,
  Keyboard,
  Platform
} from "react-native";
import { sizeWidth, sizeFont } from "../../helpers/size.helper";
import { connect } from "react-redux";
import { navigateToPage } from "../../actions/nav.action";
import Text from "../../components/common/text";
import { TOGGLE_TABBAR } from "../../actions/home.action";
import { strings } from '../../locate/I18n';
class TabbarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideTabBar: false
    };
  }

  componentDidMount() {
    if (Platform.OS === "ios") {
      this.keyboardWillShowSub = Keyboard.addListener(
        "keyboardWillShow",
        this.keyboardWillShow
      );
      this.keyboardWillHideSub = Keyboard.addListener(
        "keyboardWillHide",
        this.keyboardWillHide
      );
    } else {
      this.keyboardDidShowSub = Keyboard.addListener(
        "keyboardDidShow",
        this.keyboardDidShow
      );
      this.keyboardDidHideSub = Keyboard.addListener(
        "keyboardDidHide",
        this.keyboardDidHide
      );
    }
  }

  componentWillUnmount() {
    if (Platform.OS === "ios") {
      this.keyboardWillShowSub.remove();
      this.keyboardWillHideSub.remove();
    } else {
      this.keyboardDidShowSub.remove();
      this.keyboardDidHideSub.remove();
    }
  }

  keyboardWillShow = event => {
    this.setState({
      hideTabBar: false
    });
  };

  keyboardWillHide = event => {
    this.setState({
      hideTabBar: true
    });
  };

  keyboardDidShow = event => {
    this.setState({
      hideTabBar: false
    });
  };

  keyboardDidHide = event => {
    this.setState({
      hideTabBar: true
    });
  };

  getTabName = index => {
    let tabName;
    switch (index) {
      case 0:
        tabName = strings('navigator.home');
        break;
      case 1:
        tabName = strings('navigator.document');
        break;
      case 2:
        tabName = strings('navigator.search');
        break;
      case 3:
        tabName = strings('navigator.appointment');
        break;
      case 4:
        tabName = strings('side_menu.news');
      break;
      case 5:
        tabName = strings('navigator.chat');
        break;
    }
    return tabName;
  };

  render() {
    const {
      navigation,
      renderIcon,
      activeTintColor,
      inactiveTintColor,
      jumpToIndex,
      changeTab,
      hideTabBar
    } = this.props;
    const { routes } = navigation.state;
    return (
      <View style={styles.tabBar}>
        {routes &&
          routes.map((route, index) => {
            const focused = index === navigation.state.index;
            const tintColor = focused ? activeTintColor : inactiveTintColor;
            return (
              <TouchableWithoutFeedback
                key={route.key}
                style={styles.tab}
                onPress={() => {
                  // if (index == 3) {
                  //   this.props.navigateToPage("MenuProfile");
                  // } else {
                  //   jumpToIndex(index);
                  // }
                  jumpToIndex(index);
                }}
              >
                <View style={styles.tab}>
                  {renderIcon({
                    route,
                    index,
                    focused,
                    tintColor
                  })}
                  <Text style={styles.tabText}>{this.getTabName(index)}</Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabBar: {
    width: "100%",
    justifyContent: "flex-end",
    flexDirection: "row",
    paddingVertical: sizeWidth(1.03),
    borderTopWidth: 1,
    borderTopColor: "#CCC"
  },
  tab: {
    alignSelf: "stretch",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  tabText: {
    color: "black",
    marginTop: sizeWidth(1.03),
    fontWeight: "bold",
    fontSize: sizeFont(2)
  }
});

const mapStateToProps = state => {
  return state.home;
};

export default connect(
  mapStateToProps,
  { navigateToPage }
)(TabbarComponent);

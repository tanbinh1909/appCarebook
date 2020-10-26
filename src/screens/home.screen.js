import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import { connect } from "react-redux";
import AppHeader from "../components/app-header";
import { sizeWidth, sizeHeight, sizeFont } from "../helpers/size.helper";
import Text from "../components/common/text";
import { getUser, getLanguage } from "../helpers/storage.helper";
import { LOAD_CURRENT_USER } from "../actions/user-info.action";
import { navigateBack, navigateToPage } from "../actions/nav.action";
import firebase from "react-native-firebase";
import { strings } from "../locate/I18n";
import { ClassifyNotify } from "../constants/app.constant";
import UserApi from "../api/user.api";
import { SET_MESSENGER } from "../actions/chat.action";
import { UPDATE_LOCATION } from "../actions/user-info.action"
import Images from "../constants/image";
import RNLocation from 'react-native-location';

class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      listChats: [],
    };
  }

  async componentWillMount() {
    const user = await getUser();
    if (user) {
      this.props.loadCurrentUser(user.userID);
    }

    // this.props.onMessengerChanged();
    firebase
      .database()
      .ref("chat/")
      .on("value", this.fetchData);
  }

  fetchData = snapshot => {
    const id = "patient1";
    var listChats = [];
    const data = snapshot.val();
    for (const time in data) {
      const history = data[time];
      if (history.from === id || history.to === id) {
        const from =
          history.from === id
            ? history.to
            : history.to === id
            ? history.from
            : null;
        if (!this.isExist(listChats, history, from)) {
          var his = [];
          his.push({
            from: history.from,
            content: history.content,
            read: history.read
          });
          listChats.push(his);
        }
      }
    }
    // this.setState({listChats});
    this.props.setNewMessenger(listChats);
    RNLocation.configure({
      distanceFilter: 5.0,
    });
    
    RNLocation.requestPermission({
      ios: "whenInUse",
      android: {
        detail: "coarse"
      }
    }).then(granted => {
      if (granted) {
        this.startUpdatingLocation();
      }
    });
  };

  startUpdatingLocation = () => {
    RNLocation.subscribeToLocationUpdates(
      locations => {
        if (locations !== null) {
          this.props.updateLocation(locations[0]);
        }
      }
    );
  };

  isExist(listChats, history, from) {
    for (var element of listChats) {
      if (!Array.isArray(element)) {
        element = [];
      }
      if (
        (element.length > 0 && element[0].from === history.from) ||
        element[0].from === history.to ||
        element[0].to === history.from ||
        element[0].to === history.to
      ) {
        element.push(history);
        return true;
      }
    }
    return false;
  }

  handleClick = (medicalCategory) => {
    this.props.navigateToPage("Symptom", medicalCategory);
  };

  render() {
    return (
      <View style={styles.container}>
        <AppHeader isMain={true} />
        <ImageBackground
          style={styles.container}
          source={Images.img_home_background}
        >
          <ScrollView>
            <View style={styles.wrapper_home}>
              <View style={styles.wrapper_beside}>
                <TouchableOpacity onPress={() => this.handleClick('TIMMACH')}>
                  <Image
                    style={styles.img_icon}
                    source={Images.img_cardiovascular}
                  />
                  <Text style={styles.text}>
                    {strings("home.cardiovascular")}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.handleClick('HOHAP')}>
                  <Image style={styles.img_icon} source={Images.img_breathe} />
                  <Text style={styles.text}>{strings("home.breathe")}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.handleClick('TIEUHOA')}>
                  <Image
                    style={styles.img_icon}
                    source={Images.img_digestion}
                  />
                  <Text style={styles.text}>{strings("home.digest")}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.handleClick('UNGTHU')}>
                  <Image style={styles.img_icon} source={Images.img_cancer} />
                  <Text style={styles.text}>{strings("home.cancer")}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.handleClick('TIETNIEU-SINHDUC')}>
                  <Image
                    style={styles.img_icon}
                    source={Images.img_urinary_genital}
                  />
                  <Text style={styles.text}>
                    {strings("home.urinary_genital")}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.handleClick('NHIEMTRUNGTIEUHOA')}>
                  <Image
                    style={styles.img_icon}
                    source={Images.img_bacterial_digestive_infections}
                  />
                  <Text style={styles.text}>
                    {strings("home.bacterial_digestive_infections")}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.handleClick('DA')}>
                  <Image style={styles.img_icon} source={Images.img_skin} />
                  <Text style={styles.text}>{strings("home.skin")}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.wrapper_center}>
                <Image style={styles.img_human} source={Images.img_human} />
              </View>
              <View style={styles.wrapper_beside}>
                <TouchableOpacity onPress={() => this.handleClick('THANKINH')}>
                  <Image style={styles.img_icon} source={Images.img_nerve} />
                  <Text style={styles.text}>{strings("home.nerve")}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.handleClick('MAT')}>
                  <Image style={styles.img_icon} source={Images.img_eye} />
                  <Text style={styles.text}>{strings("home.eye")}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.handleClick('TAI')}>
                  <Image style={styles.img_icon} source={Images.img_ear} />
                  <Text style={styles.text}>{strings("home.ear")}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.handleClick('CO-XUONG-KHOP')}>
                  <Image
                    style={styles.img_icon}
                    source={Images.img_muscle_bone_joint}
                  />
                  <Text style={styles.text}>
                    {strings("home.muscle_bone_joint")}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.handleClick('NHIEMSIEUVI')}>
                  <Image
                    style={styles.img_icon}
                    source={Images.img_viral_infection}
                  />
                  <Text style={styles.text}>
                    {strings("home.viral_infection")}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.handleClick('NOITIET-CHUYENHOA')}>
                  <Image
                    style={styles.img_icon}
                    source={Images.img_endocrinology_metabolism}
                  />
                  <Text style={styles.text}>
                    {strings("home.endocrinology_metabolism")}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.handleClick('KHAC')}>
                  <Image
                    style={styles.img_icon}
                    source={Images.img_different}
                  />
                  <Text style={styles.text}>
                    {strings("home.different")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }

  componentDidMount = async () => {
    this.listeningNotify();
  };

  componentWillUnmount() {
    this.notificationOpenedListener();
  }

  async listeningNotify() {
    this.notificationOpenedListener = await firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        getUser()
          .then(user => {
            const url = notificationOpen.notification._data.screen;
            console.log("Link screen in App Open: ", url);
            if (user && user.userID) {
              this.classifyNotify(url);
            } else {
              this.navigateToPage("Login");
            }
          })
          .catch(error => {
            console.log(error);
            this.props.navigateToPage("Login");
          });
      });

    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      getUser()
        .then(user => {
          const url = notificationOpen.notification._data.screen;
          console.log("Link screen in App closed: ", url);
          if (user && user.userID) {
            this.classifyNotify(url);
          } else {
            this.props.navigateToPage("Login");
          }
        })
        .catch(error => {
          console.log(error);
          this.props.navigateToPage("Login");
        });
    }
  }
  classifyNotify(url) {
    if (url == ClassifyNotify.Appointment) {
      this.props.navigateToPage("Appointment");
    }
  }
}

const mapStateToProps = state => {
  return state.home;
};

const mapDispatchToProps = dispatch => {
  return {
    loadCurrentUser: userID => {
      dispatch({ type: LOAD_CURRENT_USER, userID });
    },
    toggleTabBar: hideTabBar => dispatch({ type: TOGGLE_TABBAR, hideTabBar }),
    navigateToPage: (route, data) => dispatch(navigateToPage(route, data)),
    onMessengerChanged: () => {
      dispatch({ type: "CHAT_GET_MESSENGER" });
    },
    setNewMessenger: listChats => {
      dispatch({ type: SET_MESSENGER, listChats });
    },
    updateLocation: location => {
      dispatch({ type: UPDATE_LOCATION, location });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapper_home: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    padding: 10
  },
  wrapper_beside: {
    width: "25%",
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  wrapper_center: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center"
  },
  img_human: {
    height: sizeHeight(80),
    width: '100%'
  },
  img_icon: {
    height: sizeWidth(17),
    width: sizeWidth(17),
    marginLeft: "auto",
    marginRight: "auto"
  },
  text: {
    fontSize: sizeFont(2),
    marginLeft: "auto",
    marginRight: "auto"
  }
});

import * as React from "react";
import { Provider } from "react-redux";
import configureStore from "./store/configure-store";
import { navReducer, initialState } from "./reducers/nav.reducer";
import Main from "./main";
import AppIntroSlider from 'react-native-app-intro-slider';
import checkIfFirstLaunch from './helpers/check-first-launch.helper';
import { StyleSheet, AsyncStorage } from 'react-native';
import { sizeHeight, sizeWidth } from "./helpers/size.helper";
import firebase from 'react-native-firebase';
import Images from './constants/image';

// firebase
//   .database()
//   .ref('chat/')
//   .on('value', snapshot => fetchData(snapshot));

// const fetchData = snapshot => {
//   console.log("fetchData fetchData fetchData")
//   console.log(snapshot.val())
// }

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFirstLaunch: false,
      hasCheckedAsyncStorage: false,
      showApp: false,
    }
  }

  componentWillMount = async () => {
    const isFirstLaunch = await checkIfFirstLaunch();
    this.setState({
      isFirstLaunch,
      hasCheckedAsyncStorage: true
    });
  }

  //handle press "done" button in intro screen
  _onDone = () => {
    this.setState({
      showApp: true
    })
  }

  render() {
    const { hasCheckedAsyncStorage, isFirstLaunch, showApp } = this.state;
    const slides = [
      {
        key: 'Introduction-1',
        title: 'Introduction 1',
        image: Images.doctor,
        text: 'Đây là màn hình Introduction',
        imageStyle: styles.image
      },
      {
        key: 'Introduction-2',
        title: 'Introduction 2',
        image: Images.doctor,
        text: 'Đây là màn hình Introduction',
        imageStyle: styles.image
      },
      {
        key: 'Introduction-3',
        title: 'Introduction 3',
        image: Images.doctor,
        text: 'Đây là màn hình Introduction',
        imageStyle: styles.image
      }
    ];
    if (!hasCheckedAsyncStorage) {
      return null;
    }
    if (!showApp) {
      if (isFirstLaunch) {
        return (
          <AppIntroSlider
            slides={slides}
            onDone={this._onDone}
            skipLabel="Bỏ qua"
            doneLabel="Xong" />
        )
      } else {
        return (
          <Provider store={store}>
            <Main />
          </Provider>
        )
      }
    } else {
      return (
        <Provider store={store}>
          <Main />
        </Provider>
      )
    }
  }

  async componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners();
    
  }

   //Remove listeners allocated in createNotificationListeners()
  componentWillUnmount() {
    this.notificationListener();
    // this.notificationOpenedListener();
  
  }

  //1
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  //3
  async getToken() {
   
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
     
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
        
      }
    }
    console.log('fcmToken: ', fcmToken);
  }

  //2
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }


  
  async createNotificationListeners() {

    const channel = new firebase.notifications.Android.Channel('carebook-center-channel', 'CarebookCenter Channel', firebase.notifications.Android.Importance.Max)
                .setDescription('My apps test channel');
    // Create the channel
    firebase.notifications().android.createChannel(channel);
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      notification
                .android.setChannelId('carebook-center-channel')
                .android.setSmallIcon('ic_launcher');
            firebase.notifications()
                .displayNotification(notification);
    });

    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    // this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      
    // });

    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    // const notificationOpen = await firebase.notifications().getInitialNotification();
    // if (notificationOpen) {
    //   // const { title, body } = notificationOpen.notification;
    //   // this.showAlert(title, body);
    // }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      console.log(JSON.stringify(message));
    });
  }
}

const { store } = configureStore(navReducer, { nav: initialState });
const styles = StyleSheet.create({
  image: {
    width: sizeWidth(100),
    height: sizeHeight(100)
  }
})

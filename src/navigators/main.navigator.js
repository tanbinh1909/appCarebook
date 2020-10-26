import React from "react";
import {View, Text} from 'react-native';

import { TabNavigator } from "react-navigation";
import { Icon } from "react-native-elements";
import {
  tab_font_size,
  primary_color,
  actived_tab_color
} from "../constants/app.constant";
import HomeScreen from "../screens/home.screen";
import SearchScreen from "../screens/search.screen";
import AppointmentScreen from "../screens/appointment.screen";
import ChatScreen from "../screens/chat.screen";
import DocumentScreen from "../screens/document.screen";

import TabbarComponent from "../components/common/tabbar-component";
import { strings } from '../locate/I18n';

export const MainNavigator = TabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: strings('navigator.home'),
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" type="entypo" color={tintColor} />
        )
      }
    },
    Document: {
      screen: DocumentScreen,
      navigationOptions: {
        title: strings('navigator.document'),
        tabBarIcon: ({ tintColor }) => (
          <Icon name="address-book" type="font-awesome" color={tintColor} />
        )
      }
    },
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        title: strings('navigator.search'),
        tabBarIcon: ({ tintColor }) => (
          <Icon name="search" type="font-awesome" color={tintColor} />
        )
      }
    },
    Appointment: {
      screen: AppointmentScreen,
      navigationOptions: {
        title: strings('navigator.appointment'),
        tabBarIcon: ({ tintColor }) => (
          <Icon name="clock" type="feather" color={tintColor} />
        )
      }
    },
    ChatScreen: {
      screen: ChatScreen,
      navigationOptions: {
        title: strings('chat'),
        tabBarIcon: ({ tintColor }) => (
          <View style={{flex: 1, justifyContent: 'space-around', paddingHorizontal: 10}}>
            <Icon name="comment" type="font-awesome" color={tintColor} />
            <View style={{width:20, height:20, borderRadius:10, backgroundColor: 'red', position: 'absolute', top: 0, right: 0, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: 'white', fontSize: 12}}>3</Text>
            </View>
          </View>
        )
      }
    }
  },
  {
    tabBarPosition: "bottom",
    tabBarComponent: TabbarComponent,
    initialRouteName: "Home",
    backBehavior: "none",
    tabBarOptions: {
      indicatorStyle: {
        backgroundColor: "transparent"
      },
      showIcon: true,
      showLabel: true,
      upperCaseLabel: false,
      labelStyle: {
        fontSize: tab_font_size,
        marginBottom: 5
      },
      activeTintColor: actived_tab_color,
      inactiveTintColor: primary_color,
      iconStyle: {
        marginBottom: -5
      }
    }
  }
);

export const MainNavigators = TabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: strings('navigator.home'),
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" type="entypo" color={tintColor} />
        )
      }
    },
    Document: {
      screen: DocumentScreen,
      navigationOptions: {
        title: strings('navigator.document'),
        tabBarIcon: ({ tintColor }) => (
          <Icon name="address-book" type="font-awesome" color={tintColor} />
        )
      }
    },
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        title: strings('navigator.search'),
        tabBarIcon: ({ tintColor }) => (
          <Icon name="search" type="font-awesome" color={tintColor} />
        )
      }
    },
    Appointment: {
      screen: AppointmentScreen,
      navigationOptions: {
        title: strings('navigator.appointment'),
        tabBarIcon: ({ tintColor }) => (
          <Icon name="clock" type="feather" color={tintColor} />
        )
      }
    },
    ChatScreen: {
      screen: ChatScreen,
      navigationOptions: {
        title: strings('chat'),
        tabBarIcon: ({ tintColor }) => (
          <View style={{flex: 1, justifyContent: 'space-around', paddingHorizontal: 10}}>
            <Icon name="comment" type="font-awesome" color={tintColor} />
            <View style={{width:20, height:20, borderRadius:10, backgroundColor: 'red', position: 'absolute', top: 0, right: 0, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: 'white', fontSize: 12}}>3</Text>
            </View>
          </View>
        )
      }
    }
  },
  {
    tabBarPosition: "bottom",
    tabBarComponent: TabbarComponent,
    initialRouteName: "Search",
    backBehavior: "none",
    tabBarOptions: {
      indicatorStyle: {
        backgroundColor: "transparent"
      },
      showIcon: true,
      showLabel: true,
      upperCaseLabel: false,
      labelStyle: {
        fontSize: tab_font_size,
        marginBottom: 5
      },
      activeTintColor: actived_tab_color,
      inactiveTintColor: primary_color,
      iconStyle: {
        marginBottom: -5
      }
    }
  }
);

export const MainsNavigators = TabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: strings('navigator.home'),
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" type="entypo" color={tintColor} />
        )
      }
    },
    Document: {
      screen: DocumentScreen,
      navigationOptions: {
        title: strings('navigator.document'),
        tabBarIcon: ({ tintColor }) => (
          <Icon name="address-book" type="font-awesome" color={tintColor} />
        )
      }
    },
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        title: strings('navigator.search'),
        tabBarIcon: ({ tintColor }) => (
          <Icon name="search" type="font-awesome" color={tintColor} />
        )
      }
    },
    Appointment: {
      screen: AppointmentScreen,
      navigationOptions: {
        title: strings('navigator.appointment'),
        tabBarIcon: ({ tintColor }) => (
          <Icon name="clock" type="feather" color={tintColor} />
        )
      }
    },
    ChatScreen: {
      screen: ChatScreen,
      navigationOptions: {
        title: strings('chat'),
        tabBarIcon: ({ tintColor }) => (
          <View style={{flex: 1, justifyContent: 'space-around', paddingHorizontal: 10}}>
            <Icon name="comment" type="font-awesome" color={tintColor} />
            <View style={{width:20, height:20, borderRadius:10, backgroundColor: 'red', position: 'absolute', top: 0, right: 0, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: 'white', fontSize: 12}}>3</Text>
            </View>
          </View>
        )
      }
    }
  },
  {
    tabBarPosition: "bottom",
    tabBarComponent: TabbarComponent,
    initialRouteName: "Appointment",
    backBehavior: "none",
    tabBarOptions: {
      indicatorStyle: {
        backgroundColor: "transparent"
      },
      showIcon: true,
      showLabel: true,
      upperCaseLabel: false,
      labelStyle: {
        fontSize: tab_font_size,
        marginBottom: 5
      },
      activeTintColor: actived_tab_color,
      inactiveTintColor: primary_color,
      iconStyle: {
        marginBottom: -5
      }
    }
  }
);

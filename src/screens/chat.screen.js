import React, { Component } from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator, FlatList, Image, TouchableHighlight } from "react-native";
import { resetPage } from "../actions/nav.action";
import { connect } from "react-redux";
import AppHeader from "../components/app-header";
import Toolbars from "../components/common/toolbars";
import { sizeWidth, sizeHeight, sizeFont } from "../helpers/size.helper";
import { LOAD_CATEGORIES, LOAD_ARTICLES, TOGGLE_TABBAR } from "../actions/home.action";
import Text from "../components/common/text";
import { getUser, getLanguage } from "../helpers/storage.helper";
import { LOAD_CURRENT_USER } from "../actions/user-info.action";
import { navigateBack, navigateToPage } from "../actions/nav.action";
import firebase from 'react-native-firebase';
import { strings } from '../locate/I18n';
import { ClassifyNotify } from '../constants/app.constant';
import UserApi from "../api/user.api";
import { Card } from 'react-native-paper';
import moment from 'moment';
import {SET_MESSENGER} from '../actions/chat.action';

class ChatScreen extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      listChats: []
    };
  } 


  componentWillMount(){
    // const user = getUser();
    // if(user) {
    //   UserApi.setHeader(user.token);
    //   this.props.loadCurrentUser(user.userID);
    // }

    // firebase
    //   .database()
    //   .ref('chat/')
    //   .on('value', this.fetchData);
  }

  fetchData = snapshot => {
    const id = 'patient1';
    var listChats = [];
    const obj = snapshot.val();
    for (const time in obj) {
      const history = obj[time];
      if (history.from === id || history.to === id) {
        const from = history.from === id ? history.to : history.to === id ? history.from : null;
        console.log("FROM: " + from);
        if (!this.isExist(listChats, history, from)) {
          var his = [];
          his.push({
            from: history.from,
            content: history.content,
            read: history.read,
          });
          listChats.push(his);
        }
      }
    }
    this.setState({listChats});
    
    // this.props.setNewMessenger(listChats);
  }

  isExist(array, history, from) {
    for (var element of array) {
      if (!Array.isArray(element)) {
        element = [];
      }
      if (element.length > 0 && from === history.from || from == history.to) {
        element.push(history);
        return true;
      }
    }
    return false;
  }
 
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container} >
        <AppHeader isMain={true} navigation={navigation}/>
        <Toolbars title={strings('chat')}/>
        <View style={{flex: 1, marginTop: 5}}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={this.props.listChats || []}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderItem}
          />
        </View>
      </View>
    );
  }

  renderItem = ({item, index}) => {
    const id = 'patient1';
    if (item == null) return null;
    const lastMessenger = item.slice(-1)[0];
    if (lastMessenger == null) {
      return null;
    }

    return (
      <Card style={{marginBottom: 5}}>
        <TouchableHighlight
          underlayColor="#ddd"
          onPress={() => this.selectChatDetail(item)}>
          <View style={{flexDirection: 'row', padding: 10, alignItems: 'center'}}>
            <Image
              style={{width: 50, height: 50}}
              source={{
                uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db',
              }}
            />
            <View style={{flex: 1, marginLeft: 10}}>
              <Text
                style={
                  lastMessenger.read
                    ? styles.itemNameNormal
                    : styles.itemNameBold
                }>
                {lastMessenger.from !== id ? lastMessenger.from : lastMessenger.to}
              </Text>
              <Text
                style={lastMessenger.read ? null : styles.itemContentBold}
                numberOfLines={1}>
                {lastMessenger.content}
              </Text>
            </View>
            <Text style={item.read ? null : styles.itemContentBold}>
              {item.time}
            </Text>
          </View>
        </TouchableHighlight>
      </Card>
    );
  };

  selectChatDetail = item => {
    this.props.navigateToPage('ChatDetail', {data: item});
  }

  componentDidMount = () => {
  }
}


const mapStateToProps = state => {
  return state.chat;
};

const mapDispatchToProps = dispatch => {
  return {
    setNewMessenger: (messenger) => {
      dispatch({ type: SET_MESSENGER, messenger });
    },
    navigateToPage: (route, data) => dispatch(navigateToPage(route, data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  featuresWrap: {
    width: sizeWidth(100),
    height: sizeHeight(35),
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center"
  },
  newFeedsWrap: {
    padding: 10,
    minHeight: sizeHeight(50),
    justifyContent: "center",
    alignItems: "center",
  },
  itemNameNormal: {
    fontSize: 18,
  },
  itemNameBold: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemContentBold: {
    fontWeight: 'bold',
  },
});

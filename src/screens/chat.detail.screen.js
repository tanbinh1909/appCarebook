import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, TextInput, FlatList, Image, TouchableHighlight } from "react-native";
import { resetPage } from "../actions/nav.action";
import { connect } from "react-redux";
import AppHeader from "../components/app-header";
import Toolbar from "../components/common/toolbar";
import { sizeWidth, sizeHeight } from "../helpers/size.helper";
import Text from "../components/common/text";
import {SET_MESSENGER} from '../actions/chat.action';
import { strings } from "../locate/I18n";
import moment from 'moment';
import firebase from 'react-native-firebase';

class ChatDetailScreen extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      listChats: [],
      from: 'Chat Detail',
      textChat: ''
    };
  }

  componentWillMount(){
    const id = 'patient1';
    const {data} = this.props.navigation.state.params;
    this.setState({ listChats: data });
    this.setState({ from: (data[0].from !== id ? data[0].from : data[0].to) });
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
        if (!this.isExist(listChats, history)) {
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

  isExist(array, history) {
    for (var element of array) {
      if (!Array.isArray(element)) {
        element = [];
      }
      if (element.length > 0 && element[0].from === history.from) {
        element.push(history);
        return true;
      }
    }
    return false;
  }
 
  render() {
    const {
      navigation,
    } = this.props;

    return (
      <View style={styles.container} >
        <AppHeader isMain={true} navigation={navigation}/>
        <Toolbar title={this.state.from}/>
        <View style={{flex: 1, marginTop: 5}}>
          <View style={{flex: 1, marginTop: 5}}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={this.state.listChats || []}
              keyExtractor={(item, index) => index.toString()}
              renderItem={this.renderItem}
            />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', padding: 5}}>
            <TextInput
              style={{ flex: 1, borderColor: 'gray', borderWidth: 1, paddingLeft: 5, maxHeight: 60 }}
              multiline
              onChangeText={text => this.setState({textChat: text})}
              value={this.state.textChat}
            />
            <TouchableOpacity onPress={this.sendMessenger}>
              <Text style={{ marginLeft: 5 }}>{strings('send')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  renderItem = ({item, index}) => {
    if (item == null) return null;
    return (
      <View style={{margin: 5}}>
        {
          item.from === this.state.from
          ? (<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
              <View style={{backgroundColor: 'blue', padding: 5, borderRadius: 10}}>
                <Text style={{color: 'white'}}>{item.content}</Text>
              </View>
            </View>)
          : (<View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{backgroundColor: 'green', padding: 5, borderRadius: 10}}>
                <Text style={{color: 'white'}}>{item.content}</Text>
              </View>
            </View>)
        }
      </View>
    );
  };

  sendMessenger = () => {
    const timestamp = moment().unix();
    firebase
      .database()
      .ref('chat/' + timestamp)
      .set({
        from: 'patient1',
        content: this.state.textChat,
        to: this.state.from,
        read: true
    })
    .then((data)=>{
      //success callback
      console.log('data ' , data)
    }).catch((error)=>{
        //error callback
        console.log('error ' , error)
    });
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatDetailScreen);

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

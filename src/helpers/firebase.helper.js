
import firebase from 'react-native-firebase';
import {connect} from 'react-redux';
import {SET_MESSENGER} from '../actions/chat.action';

class Firebase {
  static onMessengerChanged() {
    firebase
      .database()
      .ref('chat/')
      .on('value', snapshot => this.fetchData(snapshot));
  }

  static fetchData(snapshot) {
    const id = 'patient1';
    var listChats = [];
    const data = snapshot.val();
    for (const time in data) {
      const history = data[time];
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
    // this.setState({listChats});
    this.props.setNewMessenger(listChats);
  }

  static isExist(array, history) {
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
}

const mapDispatchToProps = dispatch => {
  return {
    setNewMessenger: listChats => {
      dispatch({ type: SET_MESSENGER, listChats });
    },
  };
};

export default connect(
  null,
  mapDispatchToProps)(Firebase);

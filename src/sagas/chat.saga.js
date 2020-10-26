import { put, call, takeLatest, select } from "redux-saga/effects";
import { SET_MESSENGER } from '../actions/chat.action';
import firebase from 'react-native-firebase';

function* onMessengerChanged() {
  console.log('saga onMessengerChanged')
  try {
    const ref = firebase.database().ref('chat/');
    const data = yield call([ref, ref.on], 'value');
      // .on( 'value', fetchData);
  } catch (error) {
    
  }
}

function* fetchData(snapshot) {
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
  yield put({ type: SET_MESSENGER, listChats });
}

function* setNewMessenger(params) {
  const listChats = params.listChats;
  yield put({ type: SET_MESSENGER, listChats });
}

// export default watchChatSagasAsync = [
//   takeLatest(SET_MESSENGER, setNewMessenger),
// ];

export function* watchChatSagasAsync() {
  yield [
    takeLatest("CHAT_GET_MESSENGER", onMessengerChanged),
    // takeLatest(SET_MESSENGER, setNewMessenger),
  ];
}

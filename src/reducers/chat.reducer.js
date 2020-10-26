import {SET_MESSENGER} from '../actions/chat.action';

const initState = {
  listChats: [],
};

export default function newMessenger(state = initState, action) {
  switch (action.type) {
    case SET_MESSENGER:
      return {
        ...state,
        listChats: action.listChats
      };
    default:
      return state;
  }
};
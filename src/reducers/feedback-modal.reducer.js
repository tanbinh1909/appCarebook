import {
  TOGGLE_MODAL
} from "../actions/feedback-modal.action";

const initState = {
  isToggle: false,
  forDoctor: false
};

export default function feedbackModalReducer(state = initState, action) {
  switch (action.type) {
    case TOGGLE_MODAL:
      return Object.assign({}, state, {
        isToggle: !state.isToggle
      });
    default:
      return state;
  }
}

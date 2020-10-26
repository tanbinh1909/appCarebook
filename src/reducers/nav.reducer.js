import { NavigationActions } from "react-navigation";
import { AppNavigator } from "../navigators/app.navigator";
import { getUser } from "../helpers/storage.helper";

export const initialState = AppNavigator.router.getStateForAction(
  NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({
        routeName: "Home"
      })
    ]
  })
);

export const navReducer = (state = initialState, action) => {
  const nextState = preventMultiTaps(action, state)
    ? null
    : AppNavigator.router.getStateForAction(action, state);
  return nextState || state;
};

const preventMultiTaps = (action, state) => {
  const { type, routeName, params } = action;
  return !!(
    state &&
    type === NavigationActions.NAVIGATE &&
    routeName === state.routes[state.routes.length - 1].routeName &&
    JSON.stringify(params) ===
      JSON.stringify(state.routes[state.routes.length - 1].params) &&
    routeName !== "AddTest"
  );
};

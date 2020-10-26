import { NavigationActions } from "react-navigation";

export const navigateToPage = (pageName, data) => {
  return NavigationActions.navigate({
    routeName: pageName,
    params: data
  });
};

export const toggleDrawer = () => {
  return NavigationActions.navigate({ routeName: "DrawerToggle" });
};

export const navigateBack = () => {
  return NavigationActions.back({});
};

export const backToSpecificRoute = (nav, routeName) => {
  const routes = nav.routes;
  const specificRouteIndex = routes.findIndex(
    item => item.routeName === routeName
  );
  if (specificRouteIndex)
    return NavigationActions.back({ key: routes[specificRouteIndex + 1].key });
};

export const resetPage = page => {
  return NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: page })]
  });
};

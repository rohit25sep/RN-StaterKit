import React from "react";
import Icon from "react-native-dynamic-vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { isReadyRef, navigationRef } from "@navigation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { SCREENS } from "@shared-constants";
import { LightTheme, DarkTheme, palette } from "@theme/themes";
import HomeScreenViewModel from "../viewModel/HomeScreenViewModel";
import SearchScreen from "@screens/search/SearchScreen";
import DetailScreen from "@screens/detail/DetailScreen";
import ProfileScreen from "@screens/profile/ProfileScreen";
import NotificationScreen from "@screens/notification/NotificationScreen";
import { useSelector } from "react-redux";
import { RootState } from "redux/store/Store";
import SignInViewModel from "viewModel/SignInViewModel";
import { Image } from "react-native";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Navigation = () => {
  const isDarkMode = useSelector(
    (state: RootState) => state.themeReducer.isDarkMode,
  );

  React.useEffect((): any => {
    return () => (isReadyRef.current = false);
  }, []);

  // const renderTabIcon = (
  //   route: any,
  //   focused: boolean,
  //   color: string,
  //   size: number,
  // ) => {
  //   let iconName = "home";
  //   switch (route.name) {
  //     case SCREENS.HOME:
  //       iconName = focused ? "home" : "home-outline";
  //       break;
  //     case SCREENS.SEARCH:
  //       iconName = focused ? "search" : "search-outline";
  //       break;
  //     case SCREENS.NOTIFICATION:
  //       iconName = focused ? "notifications" : "notifications-outline";
  //       break;
  //     case SCREENS.PROFILE:
  //       iconName = focused ? "person" : "person-outline";
  //       break;
  //     default:
  //       iconName = focused ? "home" : "home-outline";
  //       break;
  //   }
  //   return <Image source={""} />;
  // };

  const TabIcon = (    
    route: any,
    focused: boolean,
    color: string,
    size: number,) => {
    const get_tabIcon = (route: any) => {
      switch (route.name) {
        case SCREENS.HOME:
          return focused ? <HomeImageBlue /> : <HomeImage />;
        case SCREENS.SEARCH:
          return focused ? <ShopImageBlue /> : <ShopImage />;
        case SCREENS.NOTIFICATION:
          return focused ? <AccountImageBlue /> : <AccountImage />;
        case SCREENS.PROFILE:
          return focused ? <RewardImageBlue /> : <RewardImage />;
        default:
          return <></>;
      }
    };
    return get_tabIcon(route.name);
  };


  const RenderTabNavigation = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) =>
          TabIcon(route, focused, color, size),
          tabBarActiveTintColor: palette.primary,
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: isDarkMode ? palette.black : palette.white,
          },
        })}
      >
        <Tab.Screen name={SCREENS.HOME} component={HomeScreenViewModel} />
        <Tab.Screen name={SCREENS.SEARCH} component={SearchScreen} />
        <Tab.Screen
          name={SCREENS.NOTIFICATION}
          component={NotificationScreen}
        />
        <Tab.Screen name={SCREENS.PROFILE} component={ProfileScreen} />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}
      theme={isDarkMode ? DarkTheme : LightTheme}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={SCREENS.LOGIN} component={SignInViewModel} />
        <Stack.Screen name={SCREENS.HOME} component={RenderTabNavigation} />
        <Stack.Screen name={SCREENS.DETAIL}>
          {(props) => <DetailScreen {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

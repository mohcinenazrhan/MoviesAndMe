import React from "react";
import { StyleSheet, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Search from "../components/Search";
import FilmDetail from "../components/FilmDetail";
import Favorites from "../components/Favorites";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const tabBarOptions = {
  activeBackgroundColor: "#eeeeee",
  inactiveBackgroundColor: "#FFFFFF",
  showLabel: true,
  showIcon: true,
};

function SearchStack() {
  return (
    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="FilmDetail" options={{ title: 'Search' }} component={FilmDetail} />
    </Stack.Navigator>
  );
}

function FavoritesStack() {
  return (
    <Stack.Navigator initialRouteName="Favorites">
      <Stack.Screen name="Favorites" component={Favorites} />
      <Stack.Screen name="FilmDetail" options={{ title: 'Favorites' }} component={FilmDetail} />
    </Stack.Navigator>
  );
}

function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBarOptions={tabBarOptions}>
        <Tab.Screen
          name="Search"
          component={SearchStack}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: () => {
              return (
                <Image
                  source={require("../Images/ic_search.png")}
                  style={styles.icon}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Favorites"
          component={FavoritesStack}
          options={{
            tabBarLabel: 'Favorites',
            tabBarIcon: () => {
              return (
                <Image
                  source={require("../Images/ic_favorite.png")}
                  style={styles.icon}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },
});

export default Navigation;

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

const { Navigator, Screen } = createBottomTabNavigator();

import Favorites from "../pages/Favorites";
import TeacherList from "../pages/TeacherList";

function StudyTabs() {
  return (
    <Navigator
      tabBarOptions={{
        style: {
          elevation: 0,
          shadowOpacity: 0,
          height: 64,
        },
        tabStyle: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        },
        iconStyle: {
          flex: 0,
          width: 20,
          height: 20,
        },
        labelStyle: {
          fontFamily: "Archivo_700Bold",
          fontSize: 13,
          marginLeft: 16,
        },
        inactiveBackgroundColor: "#fafaf6",
        inactiveTintColor: "#C1BCCC",
        activeBackgroundColor: "#ebebf5",
        activeTintColor: "#32264D",
      }}
    >
      <Screen
        options={{
          tabBarLabel: "Proffy",
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Ionicons
                name="ios-easel"
                color={focused ? "#8257e5" : color}
                size={size}
              />
            );
          },
        }}
        name="TeacherList"
        component={TeacherList}
      />
      <Screen
        options={{
          tabBarLabel: "Favoritos",
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Ionicons
                name="ios-heart"
                color={focused ? "#8257e5" : color}
                size={size}
              />
            );
          },
        }}
        name="Favorites"
        component={Favorites}
      />
    </Navigator>
  );
}

export default StudyTabs;

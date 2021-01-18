import React from "react";
import { Image, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Logo from "../src/assets/instagram.png";
import Feed from "./pages/Feed";

const { Navigator, Screen } = createStackNavigator();

const Routes: React.FC = () => (
  <NavigationContainer>
    <Navigator>
      <Screen
        name="Feed"
        component={Feed}
        options={{
          headerTitleAlign: "center",
          headerTitle: () => <Image source={Logo} />,
          headerStyle: {
            backgroundColor: "#f5f5f5",
          },
        }}
      />
    </Navigator>
  </NavigationContainer>
);

export default Routes;

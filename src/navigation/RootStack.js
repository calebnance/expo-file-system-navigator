import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { gStyle } from '../constants';

// screens
import HomeScreen from '../screens/Home';

const Stack = createStackNavigator();

export default () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerStyle: gStyle.navHeaderContainerStyle,
          headerTitleStyle: gStyle.navHeaderTitleStyle,
          title: 'Home'
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

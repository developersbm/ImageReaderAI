import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import Login from './screens/Settings.js';
import HomeScreen from './screens/Home.js';
import SettingsScreen from './screens/Settings.js';
import AiScreen from './screens/AiScreen.js';
import CameraFunctional from './screens/CameraFunctional.js';

//Screen names
const homeName = "Home";
const cameraName = "Camera";
const settingsName = "Settings";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function CameraStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Camera" component={CameraFunctional} />
      <Stack.Screen name="AiScreen" component={AiScreen} />
    </Stack.Navigator>
  );
}

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';
            } else if (rn === cameraName) {
              iconName = focused ? 'camera' : 'camera';
            } else if (rn === settingsName) {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'red',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70 }
        }}
      >
        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={cameraName} component={CameraStack} options={{ headerShown: false }}/>
        <Tab.Screen name={settingsName} component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;
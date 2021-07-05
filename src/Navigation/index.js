import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../Screens/Splash';
import Auth from '../Screens/Auth';
import Dashboard from '../Screens/Dashboard';
import AudioCall from '../Screens/AudioCall';
import VideoCall from '../Screens/VideoCall';
import Chat from '../Screens/Chat';
import ChatRoom from '../Screens/Chat/ChatRoom';

const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
  },
};

const StackNav = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        initialRouteName="Dashboard"
        headerMode="none"
      >
        <Stack.Screen name="Splash" component={SplashScreen} options={{}} />
        <Stack.Screen name="Auth" component={Auth} options={{ headerTitle: "Login" }} />
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerTitle: "Dashboard" }} />
        <Stack.Screen name="AudioCall" component={AudioCall} options={{ headerTitle: "Audio Call" }} />
        <Stack.Screen name="Chat" component={Chat} options={{ headerTitle: "Chat Room" }} />
        <Stack.Screen name="ChatRoom" component={ChatRoom} options={{ headerTitle: "Chat Room" }} />
        <Stack.Screen name="VideoCall" component={VideoCall} options={{ headerTitle: "Video Call" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNav;
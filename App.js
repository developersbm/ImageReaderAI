import * as React from 'react';
import MainContainer from './src/MainContainer';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/Login';

const Stack = createStackNavigator();

function App() {
  return (
    <MainContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name = 'Login' component={Login} options={ {headerShown: false} }/>
      </Stack.Navigator>
    </MainContainer>
  );
}

export default App;
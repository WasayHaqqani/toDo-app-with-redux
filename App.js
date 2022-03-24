import React, {useState, useEffect} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text, View, Button, StyleSheet, TextInput} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {filter} from 'lodash';
import MainScreen from './Screens/MainScreen';
import AddTaskScreen from './Screens/AddTask';
import {Provider} from 'react-redux';
import {store} from './src/store';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}>
          {/* <Stack.Screen name="Details" >
          {props => <DetailsScreen text="Text passed in component through props in stack screen" />}
        </Stack.Screen> */}
          {/* <Stack.Screen name="Details" component={DetailsScreen} initialParams={{ text:'initial param' }}/> */}
          <Stack.Screen name="Home" component={MainScreen} />
          <Stack.Screen name="AddTask" component={AddTaskScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

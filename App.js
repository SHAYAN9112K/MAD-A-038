import { Button, StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { EventRegister } from 'react-native-event-listeners';
import SplashScreen from './Screens/SplashScreen';
import Piechart1 from './Screens/Piechart1';
import Setting from './Screens/Setting';
import TaskManager from './Screens/TaskManager'
import Calender1 from './Screens/Calender1';
import Login from './Screens/Login'
import Signup from './Screens/Signup'
import Welcome from './Screens/Welcome';
import { Provider } from 'react-redux';
import { store } from './Redux/store'
import themeContext from './Screens/themeContext';
import theme from './Screens/theme';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const theme1=useContext(themeContext);
  const [mode, setMode] = useState("Light");

  useEffect(() => {
    let eventListener = EventRegister.addEventListener("changeTheme", (data) => {
      setMode(data);
    });
    return () => {
      EventRegister.removeEventListener(eventListener);

    }
  }, []);

  const Nav1 = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='SplashScreen'>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Tabs" component={Nav2} />
        <Stack.Screen name="Welcome" component={Welcome} />
      </Stack.Navigator>
    );
  };

  const Nav3 = () => {
    console.log("now")
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Setting'>
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    );
  };

  const Nav2 = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'MainTasks') {
              iconName = focused
                ? 'ios-list'
                : 'ios-list-outline';
            } else if (route.name === 'Calender') {
              iconName = focused ? 'md-calendar-sharp' : 'md-calendar-outline';
            } else if (route.name === 'Piechart') {
              iconName = focused ? 'pie-chart' : 'pie-chart-outline';
            } else if (route.name === 'Themes') {
              iconName = focused ? 'color-wand' : 'color-fill';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: theme1.background,
          tabBarInactiveTintColor: theme1.color,
          // tabBarActiveBackgroundColor: 'blue',
          // tabBarInactiveBackgroundColor:theme.background,
        })}
      >
        <Tab.Screen name="MainTasks" component={TaskManager} />
        <Tab.Screen name="Calender" component={Calender1} />
        <Tab.Screen name="Piechart" component={Piechart1} />
        <Tab.Screen name="Themes" component={Nav3} />
      </Tab.Navigator>
    );
  };

  const cas = () => {
    if(mode==="Light"){
      console.log("printed")
        return  theme.light
    }
    else if(mode==="Dark"){
      return theme.dark
    }
    else if(mode===1){
      return theme.Custom1
    }
    else if(mode===2){
      return theme.Custom2
    }
    else if(mode===3){
      return theme.Custom3
    }
    else if(mode===4){
      return theme.Custom4
    }
    else if(mode===5){
      return theme.Custom5
    }
    else if(mode===6){
      return theme.Custom6
    }
    // mode === 0 ? theme.light : theme.dark
  }

  return (
    <themeContext.Provider value={cas() }>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="nav1">
            <Stack.Screen name="Nav1" component={Nav1} />
            <Stack.Screen name="Nav2" component={Nav2} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </themeContext.Provider>
  );
}

export default App

const styles = StyleSheet.create({})
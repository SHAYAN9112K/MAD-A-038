import React, { useState } from 'react';
import { View, useWindowDimensions, ScrollView } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import QuickTask from './QuickTask';
import { TabBar } from 'react-native-tab-view';

const FirstRoute = () => (
  <QuickTask/>
  
);

const SecondRoute = () => (
  <QuickTask/>
);

const ThirdRoute = () => (
  <QuickTask/>
);

const FourthRoute = () => (
  <QuickTask/>
);



const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third:ThirdRoute,
  fourth:FourthRoute
});

export default function CategoryTasks() {
  const layout = useWindowDimensions();
  
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'All' },
    { key: 'second', title: 'Work' },
    { key: 'third', title: 'Personal' },
    { key: 'fourth', title: 'Wishlist' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={props => <TabBar {...props} style={{backgroundColor: '#222831'}}/>}
    />
  );
}
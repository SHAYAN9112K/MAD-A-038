import * as React from 'react';
import { Text, View, StyleSheet,Button } from 'react-native';

import {useSelector,useDispatch} from 'react-redux'
import {addition,subtraction} from '../Redux/action'

// You can import from local files

import {Provider} from 'react-redux';
import {store} from '../Redux/store'

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';



function AssetExample() {
    const data =useSelector((state)=>state.counter)
    const dispatch=useDispatch();
  
  
    return (
      
      <View > 
      <View style={styles.container}> 
      <Text>Counter</Text>
      </View>
      <View style={styles.container1}>     
        <Button title="-" onPress={()=>{dispatch(subtraction())}}/>
        <Text style={styles.paragraph}>{data}</Text>
        <Button title="+" onPress={()=>{dispatch(addition())}}/>
      </View>
      </View>
      
    );
  }

export default function Counter() {
  return (
    <Provider store={store}>
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        Change code in the editor and watch it change on your phone! Save to get a shareable url.
      </Text>
      <Card>
        <AssetExample />
      </Card>
    </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',

    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'black'
  },
});

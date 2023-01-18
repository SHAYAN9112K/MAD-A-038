import React,{useState}from 'react';
import { Text, View, StyleSheet,TextInput,Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {EventRegister} from 'react-native-event-listeners'
// You can import from local files


// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';










export default function App({navigation}) {
  const [uval,setuVal]=useState('');
  const [pval,setpVal]=useState('');
  
  const getData = async (user,pass) => {
    if(user=='' || pass=='' ){
      alert("fill all field first")
    }else{
    try {
      const userval = await AsyncStorage.getItem('@store_UserName')
      const passval = await AsyncStorage.getItem('@store_pass')
      
      if(userval === user && passval === pass) {
      //  const stat = await AsyncStorage.getItem('@store_UserName')
       alert("Login Sucessful "+userval)
       EventRegister.emit("UsernameS",user)

       navigation.push('SplashScreen');
      }
      else{
        alert("Login failed")
      }
    } catch(e) {
      alert(e)
    }
    }
  }
  

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        Login
      </Text>

      
        
        <TextInput style={styles.input} placeholder="Enter UserName" value={uval} onChangeText={setuVal}/>
        <TextInput style={styles.input} placeholder="Enter Password" value={pval} onChangeText={setpVal}/>
        
        <View style={styles.btn}>
        <Button title="login" onPress={ ()=> getData(uval,pval)}/>
        </View>
        
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
   input:{
    flex: 1,
    padding:10,
    margin:10,
    backgroundColor:'grey'
  },
  btn:{
    flex: 1,
    padding:10,
    margin:10,
    
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

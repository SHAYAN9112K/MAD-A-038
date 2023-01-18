import React,{useState} from 'react';
import { Text, View, StyleSheet,TextInput,Button ,TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// You can import from local files


// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

const storeData = async (user,pass,confirmpass,xt) => {
  if(user=='' || pass=='' || confirmpass=='' || xt==''){
    alert("fill all field first")
  }else{
    if(confirmpass===pass ){
    try {
    await AsyncStorage.setItem('@store_UserName', user)
    await AsyncStorage.setItem('@store_pass', pass)
    alert(`Registered ${AsyncStorage.getItem('@store_pass')}  ${ AsyncStorage.getItem('@store_UserName')}`)
    console.log((`Registered ${AsyncStorage.getItem('@store_pass')}  ${ AsyncStorage.getItem('@store_UserName')}`))
  } catch (e) {
    alert("Registration failed")
  }
  }else{
    alert("Password MissMatch")
  }
  }
  
  
}





export default function App({navigation}) {
  const [uval,setuVal]=useState('');
  const [pval,setpVal]=useState('');
  const [cpval,setcpVal]=useState('');
  const [xt,setxt]=useState('');

  

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        Register
      </Text>

     
        
        <TextInput style={styles.input} placeholder="Enter Email" value={uval} onChangeText={setuVal}/>
        <TextInput style={styles.input} placeholder="Enter Username" value={xt} onChangeText={setxt}/>
        <TextInput style={styles.input} placeholder="Enter Password" value={pval} onChangeText={setpVal}/>
        <TextInput style={styles.input} placeholder="Enter Password Again" value={cpval} onChangeText={setcpVal}/>
        
        
        <View style={styles.btn}>
        <Button title="Register" onPress={ ()=> storeData(uval,pval,cpval,xt)}/>
        </View>
        <View style={styles.btn}>
        <Button color={'red'} title="Login" onPress={ ()=> navigation.navigate('Login')}/>
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

import { StyleSheet, Text, View ,Image,Button} from 'react-native'
import React, {useEffect,useContext, useState}from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EventRegister } from 'react-native-event-listeners';
 






const SplashScreen = ({navigation}) => {

  useEffect(() => {
    // var val='true';
    // let eventListener = EventRegister.addEventListener("UsernameS", (data) => {
    //   console.log(data)
    //   val=data;
    //   setTimeout(function(){EventRegister.emit("USerN",data) ,navigation.replace('Welcome')}, 1000)
    //   return false;
    // });
    // if(val!='true'){
    //   return () => {
    //     EventRegister.removeEventListener(eventListener);
    //   }
    // }else if(val==='true'){
    //   setTimeout(function(){navigation.navigate('Tabs')}, 1000)
    // }

    
    
    
    // try {
    //   const Status = AsyncStorage.getItem('@store_UserName')
    //   if(Status != null ) {
    //     console.log(Status)
    //     // setSnam(Status)
    //     // setTimeout(function(){navigation.navigate('Tabs')}, 1000)
       
    //   }
    //   else{
    //     console.log('2')
        setTimeout(function(){navigation.navigate('Tabs')}, 1000)
        // checkstat();
      // }
    // } catch(e) {
    //   alert(e)
    // }
    
    
    
    
  },[]);

  const checkstat=()=>{
    // AsyncStorage.getItem('@store_UserName')
    // .then((data) => {
    //   if (data != null) {
    //     console.log(JSON.parse(store_UserName));
    //   }else{
    //     console.log('no data')
    //   }
    // })
    // .catch((error) => console.log(error));
    // setTimeout(function(){navigation.navigate('Tabs')}, 1000)
  }

  return (
    <View style={styles.parentcontainer}>
      <View style={styles.imgcontainer}>
       
        <Text style={styles.titletxt}>TO-DO LIST</Text>
        <Image style={styles.img} source={require('../images/to-do-list1234.png')}/>
      </View>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  parentcontainer:{
    height:'100%',
    width:'100%',
    backgroundColor:'#ffdda1',
    // backgroundColor:'black',
    justifyContent:'center',
    alignItems:'center'
  },
  imgcontainer:{
    
  },
  img:{
    height:160,
    width:160,
    
  },
  titletxt:{
    color:'black',
    //color:'white',
    fontWeight:'bold',
    fontSize:20,
    padding:20,
    alignSelf:'center'
  }

})
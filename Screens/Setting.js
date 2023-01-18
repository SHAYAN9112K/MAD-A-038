import { StyleSheet, Text, View ,Switch,Button,Image,TouchableOpacity} from 'react-native'
import React, { useState,useContext } from 'react'
import {EventRegister} from 'react-native-event-listeners'
import themeContext from './themeContext';

const Setting = ({navigation}) => {
  const theme=useContext(themeContext);
    const [mode,setMode]=useState("Light");
  return (
    <View style={{backgroundColor:theme.background,flex:1,paddingTop:15,}}>
      <View style={{alignItems:'center',justifyContent:'center',padding:15}}>
      <Text style={[styles.sectionTitle,{color:theme.color}]}>Themes</Text>
      </View>
        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
        <TouchableOpacity  onPress={()=>{
        EventRegister.emit("changeTheme","Light")
            setMode("Light");      
        }}>
        <Image style={[styles.img,{borderColor:theme.color}]} source={require('../images/lightTheme.jpg')}/>
        </TouchableOpacity>

        <TouchableOpacity  onPress={()=>{
        EventRegister.emit("changeTheme","Dark")
            setMode("Dark");      
        }}>
        <Image style={[styles.img,{borderColor:theme.color}]} source={require('../images/darkTheme.jpg')}/>
        </TouchableOpacity>

        </View>
        
        <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:30}}>
        <TouchableOpacity  onPress={()=>{
        EventRegister.emit("changeTheme",1)
            setMode(1);      
        }}>
        <Image style={[styles.img,{borderColor:theme.color}]} source={require('../images/CustomThemes1.jpg')}/>
        </TouchableOpacity>

        <TouchableOpacity  onPress={()=>{
        EventRegister.emit("changeTheme",2)
            setMode(2);      
        }}>
        <Image style={[styles.img,{borderColor:theme.color}]} source={require('../images/CustomThemes2.jpg')}/>
        </TouchableOpacity>
        
        </View>

        <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:30}}>
        <TouchableOpacity  onPress={()=>{
        EventRegister.emit("changeTheme",3)
            setMode(3);      
        }}>
        <Image style={[styles.img,{borderColor:theme.color}]} source={require('../images/CustomThemes3.jpg')}/>
        </TouchableOpacity>

        <TouchableOpacity  onPress={()=>{
        EventRegister.emit("changeTheme",4)
            setMode(4);      
        }}>
        <Image style={[styles.img,{borderColor:theme.color}]} source={require('../images/CustomThemes4.jpg')}/>
        </TouchableOpacity>
        
        </View>

        <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:30}}>
        <TouchableOpacity  onPress={()=>{
        EventRegister.emit("changeTheme",5)
            setMode(3);      
        }}>
        <Image style={[styles.img,{borderColor:theme.color}]} source={require('../images/CustomThemes5.jpg')}/>
        </TouchableOpacity>

        <TouchableOpacity  onPress={()=>{
        EventRegister.emit("changeTheme",6)
            setMode(4);      
        }}>
        <Image style={[styles.img,{borderColor:theme.color}]} source={require('../images/CustomThemes6.jpg')}/>
        </TouchableOpacity>
        
        </View>


        

    </View>
  )
}

export default Setting

const styles = StyleSheet.create({
  img:{
    height:120,
    width:130,
    borderColor:'black',
    borderWidth:5
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#eee'
  },
})
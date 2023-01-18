import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect ,useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EventRegister } from 'react-native-event-listeners';

const Welcome = ({navigation}) => {
   

    useEffect(() => {
       
          
    });

        return (
            <View>
                <Text style={{color:'black'}}>Welcome {userName}</Text>
            </View>
        );
    }

export default Welcome;

    const styles = StyleSheet.create({})
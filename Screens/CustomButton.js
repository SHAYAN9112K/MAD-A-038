import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'


const CustomButton = () => {

    const navigation=useNavigation();
    return (
        <View >
            <TouchableOpacity
            style={{padding:10 ,marginLeft:10 ,backgroundColor:'black',justifyContent:'center'}}
            onPress={()=> navigation.navigate('Calender1')}>
                <Text style={{color:'white',alignSelf:'center'}}>Calender</Text>
            </TouchableOpacity>

        </View>
    )
}

export default CustomButton

const styles = StyleSheet.create({})
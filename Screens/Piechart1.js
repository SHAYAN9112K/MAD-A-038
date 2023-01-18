import { StyleSheet, Text, View, SafeAreaView, Piechart } from 'react-native'
import React, { useEffect, useState,useContext } from 'react'
import Pie from 'react-native-pie'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import themeContext from './themeContext';
import { Divider } from 'react-native-paper';


const Piechart1 = () => {
  const theme=useContext(themeContext);
  const [pendingTaskCount, setPendingTaskCount] = useState(0)
  const [doneTaskCount, setDoneTaskCount] = useState(0)
  const [pending, setPending] = useState(30)
  const [done, setDone] = useState(70)
  const isFocused = useIsFocused();
  useEffect(() => {
    LoadTodo();
  }, [isFocused]);

  

  const LoadTodo =async () => {
    var DoneT="new"
    var PendT="new"

    await AsyncStorage.getItem('@Stored_Tasks')
      .then((data) => {
        if (data != null) {
          const newdata = JSON.parse(data)
          setPendingTaskCount(newdata.length);
           DoneT=newdata.length;
          
        }
      })
      .catch((error) => console.log(error));

    await AsyncStorage.getItem('@Done_Tasks')
      .then((data) => {
        if (data != null) {
          setDoneTaskCount(parseInt(data));
           PendT=parseInt(data);
          
          
        }
      })
      .catch((error) => console.log(error));
      console.log(DoneT)
      console.log(PendT)
      setDone((DoneT/(PendT+DoneT))*100)
      setPending((PendT/(PendT+DoneT))*100)
      
  };

  return (
    <View style={styles.container}>
      <View style={[styles.top,{backgroundColor:theme.background}]}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10,color:theme.color  }}>Pie Chart</Text>
        <View style={{flex:1,height:-3,width:"100%",backgroundColor:theme.color,alignSelf:'center'}}><Text>.</Text></View>
      </View>
      <View style={[styles.unsheduledview,{backgroundColor:theme.background}]}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 40, marginTop: -50,color:theme.color }}> To-Do(s) Statistics</Text>
        <Pie
          radius={80}
          innerRadius={30}
          sections={[
            {
              // percentage: (doneTaskCount/(pendingTaskCount+doneTaskCount))*100,
              percentage:pending,
              color: '#44CD40',
            },
            {
              // percentage: (pendingTaskCount/(pendingTaskCount+doneTaskCount))*100,
              percentage:done,
              color: '#404FCD',

            },
            
          ]}
          dividerSize={1}
          backgroundColor={'gray'}
          strokeCap={'butt'}
        />
      </View>
      <View style={[styles.keyss,{backgroundColor:theme.background,padding:10}]}>
        <View style={[styles.square, { backgroundColor: '#404FCD' }]}></View>
        <Text style={{ marginLeft: -60 ,color:theme.color}}>Pending</Text>
        <View style={[styles.square, { backgroundColor: '#44CD40' }]}></View>
        <Text style={{ marginLeft: -60 ,color:theme.color}}>Done</Text>
        {/* <View style={[styles.square, { backgroundColor: '#C70039' }]}></View>
        <Text style={{ marginLeft: -10 }}>Missed</Text> */}
      </View>
      <View style={[styles.sheduledview,{backgroundColor:theme.background}]}>
        <Text style={{color:theme.color}}>Pending Tasks:{pendingTaskCount}</Text>
        <Text style={{color:theme.color}}>Pending Tasks % : {Math.floor((pendingTaskCount/(pendingTaskCount+doneTaskCount))*100)} %</Text>
        <Text style={{color:theme.color}}>Done Tasks:{doneTaskCount}</Text>
        <Text style={{color:theme.color}}>Done Tasks %: {Math.floor((doneTaskCount/(pendingTaskCount+doneTaskCount))*100)} %</Text>

        
      </View>

      
    </View>
  )
}

export default Piechart1

const styles = StyleSheet.create({

  container: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  top: {
    position: 'relative',
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#866DFF',
    width: '100%',
    height: 60,
  },
  sheduledview: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0056',

  },
  unsheduledview: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#866DFF',
  },
  keyss: {
    backgroundColor: '#0056',
    width: '100%',
    flexDirection: 'row',
    paddingBottom: 15,
    justifyContent:'space-around'
  },
  square: {
    width: 24,
    height: 24,
    borderRadius: 5,
    marginRight: 0,
    marginHorizontal: 10
  }

})
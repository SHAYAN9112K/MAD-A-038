
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useWindowDimensions, KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView, FlatList,Alert  } from 'react-native';

import Ionic from 'react-native-vector-icons/Ionicons';
import Task from './Task';
import { color } from 'react-native-elements/dist/helpers';

export default function QuickTask({ navigation ,route}) {
 

  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [newtask, setNewTask] = useState();
  const [taskList, setTaskList] = useState([]);

  const showAlert = (index) => {
    Alert.alert(
      'Confirmation',
      'Mark Task as Done?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => completeTask1(index),
        },
      ],
      { cancelable: false },
    );
  };

  const completeTask1 = (index) => {
    let itemsCopy = [...taskList];
    itemsCopy.splice(index, 1);
    setTaskList(itemsCopy)
  }

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task])
    setTask(null);
  }

  const handleAddTask1 = () => {
    if(newtask!=''){
    Keyboard.dismiss();
    setTaskList([...taskList, newtask])
    setNewTask('');
  }
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy)
  }

  return (
    <View style={styles.container}>
      {/* <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      > */}


        <View style={styles.tasksWrapper}>
          <View style={styles.topline}>
            <Text style={styles.sectionTitle}>Tasks TO-DO</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SheduledTask')}>
              <View style={styles.addDetailWrapper}>
                <Text style={styles.addText}>ADD Sheduled Task</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.items}>
            <FlatList
            style={{
              height:'85%'
            }}
              data={taskList}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => {
                if (item != undefined) {
                  return (
                    <View style={{ flexDirection: 'row', alignContent: 'space-between' }}>
                      <TouchableOpacity onPress={()=>{showAlert(index)}}>
                        <View style={styles.item}>
                          <View style={styles.itemLeft}>
                            <View style={styles.square}></View>
                            <Text style={styles.itemText}>{item}</Text>
                          </View>
                          <View style={styles.circular}></View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                }
              }}
            />
          </View>
        </View>

      {/* </ScrollView> */}

      <KeyboardAvoidingView
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder={'Write a Quick task'} value={newtask} onChangeText={setNewTask} />
        <TouchableOpacity onPress={() => handleAddTask1()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
        <Ionic name="home" color={"black"} />
      </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8D72E1',
  },
  topline: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  tasksWrapper: {
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#eee'
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#0014',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#0032',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },

  addDetailWrapper: {
    backgroundColor: '#0032',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },

  addText: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    color: '#eee'
  },
  item: {
    backgroundColor: 'lightblue',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    width:320
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#0045',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: '80%',
    color: 'blue'
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#55BCF6',
    borderWidth: 2,
    borderRadius: 5,
  },
});

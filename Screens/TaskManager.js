
import React, { useState, useEffect,useContext } from 'react';

import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, FlatList, Alert,   } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SheduleTask from './SheduledTask';
import { Modal } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux'
import { setSheduleVisible } from '../Redux/action'
import themeContext from './themeContext';


export default function QuickTask({ navigation }) {
  const theme=useContext(themeContext);
  const [categ,setCateg]=useState(["All","General","Work","WishList"])
  const data = useSelector((state) => state.booleanValue)
  const dispatch = useDispatch();

  const [newTask, setNewTask] = useState('');
  const [tasksList, settasksList] = useState([]);
  const [doneTaskCount, setDoneTaskCount] = useState(0)
  const [temptasksList, settemptasksList] = useState([]);




  useEffect(() => {
    LoadTodo();
  }, [data]);


  const LoadTodo = () => {
    AsyncStorage.getItem('@Stored_Tasks')
      .then((data) => {
        if (data != null) {
          settasksList(JSON.parse(data));
        }
      })
      .catch((error) => console.log(error));

    AsyncStorage.getItem('@Done_Tasks')
      .then((data) => {
        if (data != null) {
          setDoneTaskCount(parseInt(data))
        }
      })
      .catch((error) => console.log(error));
  };

  const clearTodos = () => {
    AsyncStorage.setItem('@Stored_Tasks', JSON.stringify([]))
      .then(() => {
        settasksList([]);
      })
      .catch((error) => console.log(error));

      AsyncStorage.removeItem('@Done_Tasks').then(
      setDoneTaskCount(0)
      )
  };



  const addTodos = () => {
    if(newTask!=""){
    const newTaskObj = {
      TaskName: newTask,
      taskbool: false,
    };
    const tempList = [...tasksList, newTaskObj];
    settasksList(tempList);

    AsyncStorage.setItem('@Stored_Tasks', JSON.stringify(tempList))
      .then(() => {
        settasksList(tempList);
      })
      .catch((error) => console.log(error));
      setNewTask('')
      Keyboard.dismiss();
    }
  };

  const DeleteTodo = (index) => {
    
    const tempList = [...tasksList];
    tempList.splice(index, 1);

    AsyncStorage.setItem('@Stored_Tasks', JSON.stringify(tempList))
      .then(() => {
        
        settasksList(tempList);
      })
      .catch((error) => console.log(error));

      const Tcount=doneTaskCount+1;
    AsyncStorage.setItem('@Done_Tasks', Tcount.toString())
      .then(() => {
        setDoneTaskCount(Tcount);
      })
      .catch((error) => console.log(error));
      
  };

  const UpdateTodo = (index) => {
    const newTaskObj = {
      TaskName: "updated task",
      date: '22-10-22'
    };

    const tempList = [...tasksList];
    tempList.splice(index, 1, newTaskObj);

    AsyncStorage.setItem('@Stored_Tasks', JSON.stringify(tempList))
      .then(() => {
        settasksList(tempList);
      })
      .catch((error) => console.log(error));
  };


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
          onPress: () => DeleteTodo(index),
          // onPress: () => UpdateTodo(index),
          // onPress: () => clearTodos(),
          

        },
        // {
        //   text: 'Update',
        //   // onPress: () => DeleteTodo(index),
        //   onPress: () => UpdateTodo(index),
        //   // onPress: () => clearTodos(),
        //   // onPress: () => DeleteTodo(index),

        // },

      ],
      { cancelable: false },
    );
  };

  return (
    <View style={[styles.container,{backgroundColor:theme.background}]}>
      <View style={styles.tasksWrapper}>
        <View style={styles.topline}>
          <Text style={[styles.sectionTitle,{color:theme.color}]}>Tasks TO-DO:</Text>
          <TouchableOpacity onPress={() => { dispatch(setSheduleVisible(true)) }}>
            <View style={styles.addDetailWrapper}>
              <Text style={[styles.addText,{color:theme.color}]}>ADD Sheduled Task</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.items}>
          <FlatList
            style={{
              height: '85%'
            }}
            data={tasksList}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              if (item != undefined) {
                return (

                  <View style={{ flexDirection: 'row', alignContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => { showAlert(index) }}>
                      <View style={styles.item}>

                        <View style={styles.itemLeft}>
                          <View style={styles.square}></View>
                          {
                            item.taskbool ?
                              <View style={{ width: 200 }}>
                                <Text style={styles.itemText}>{item.TaskName}</Text>
                                <View style={{ width: 200, flexDirection: 'row' }}>
                                  <Text style={styles.itemTextD}>{item.TaskCategory}</Text>
                                  <Text style={styles.itemTextD}>{item.TaskDate}</Text>
                                  <Text style={styles.itemTextD}>{item.TaskTime}</Text>
                                </View>
                              </View>
                              : <View style={{ width: 200 }}>
                                <Text style={styles.itemText}>{item.TaskName}</Text>
                                <Text style={styles.itemTextD}>Quick Task</Text>
                              </View>
                          }


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
        <TextInput style={styles.input} placeholder={'Write a Quick task'} 
        placeholderTextColor={theme.color}
        value={newTask} onChangeText={setNewTask} />
        <TouchableOpacity onPress={() => {addTodos()}}>
          <View style={styles.addWrapper}>
            <Text style={[styles.addText,{color:theme.color}]}>+</Text>
          </View>
        </TouchableOpacity>

      </KeyboardAvoidingView>
      <Modal
        style={styles.modalS}
        visible={data}>
        <View >
          <View style={styles.stas}>
            <SheduleTask />
          </View>

        </View>
      </Modal>

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
    padding:30,
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
    width: 320
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
    color: 'blue',
    fontSize: 15
  },
  itemTextD: {
    maxWidth: '80%',
    color: 'purple',
    fontSize: 10,
    marginRight: 10
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#55BCF6',
    borderWidth: 2,
    borderRadius: 5,
  },
  modalS: {

  },
  stas: {
    backgroundColor: 'grey',
    height: 740
  },


});

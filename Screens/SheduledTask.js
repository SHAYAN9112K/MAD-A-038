import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, FlatList } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { Picker } from '@react-native-picker/picker'
import DatePicker from 'react-native-modern-datepicker';
import { Modal } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector, useDispatch } from 'react-redux'
import { setSheduleVisible } from '../Redux/action'
import { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import themeContext from './themeContext';

const SheduledTask = () => {
    const theme = useContext(themeContext);

    const dispatch = useDispatch();

    const [newtask, setNewTask] = useState('');
    const [date, setDate] = useState();
    const [timee, setTimee] = useState();
    const [cat, setCat] = useState();
    const [tasksList, settasksList] = useState([]);
    

    const [selectedCategory, setSelectedCategory] = useState('General')
    const [Categories] = useState([
        'General',
        'Home',
        'Work',
        'Wishlist'
    ])

    const [selectedDate, setSelectedDate] = useState('Select Date ');
    const [time, setTime] = useState('select Time');

    const navigation = useNavigation();

    useEffect(() => {
        LoadTodo();
    }, []);

    const LoadTodo = () => {
        AsyncStorage.getItem('@Stored_Tasks')
            .then((data) => {
                if (data != null) {
                    settasksList(JSON.parse(data));
                }
            })
            .catch((error) => console.log(error));
    };



    const addTodos = () => {
        console.log(newtask)
        if (newtask != "") {
            const newTaskObj = {
                TaskName: newtask,
                TaskTime: time,
                TaskDate: selectedDate,
                TaskCategory: selectedCategory,
                taskbool: true,
            };
            const tempList = [...tasksList, newTaskObj];
            settasksList(tempList);

            AsyncStorage.setItem('@Stored_Tasks', JSON.stringify(tempList))
                .then(() => {
                    settasksList(tempList);
                    // navigation.push('Tabs', { screen: 'MainTasks' });

                    dispatch(setSheduleVisible(false))
                })
                .catch((error) => console.log(error));

        }
    };



    const [dateModalVisible, setDateModalVisible] = useState(false)

    const datemodvisible = () => {
        setDateModalVisible(true)
    };
    const datemodvisiblefalse = () => {
        setDateModalVisible(false)
    };

    const [timeModalVisible, setTimeModalVisible] = useState(false)

    const timemodvisible = () => {
        Keyboard.dismiss();
        setTimeModalVisible(true)
    };
    const timemodvisiblefalse = () => {
        Keyboard.dismiss();
        setTimeModalVisible(false)
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
        
            <View>
                <Text style={[styles.shtxt, { color: theme.color }]}>Sheduled Task</Text>
                <View style={styles.todo}>
                    <Text style={[styles.stxt, { color: theme.color }]}>Task</Text>
                    <TextInput
                        value={newtask} onChangeText={setNewTask}
                        style={styles.input}
                        placeholderTextColor={theme.color}
                        placeholder={'Write a Task'} />
                </View>

                <View>
                    <Text style={[styles.stxt, { color: theme.color }]}>Category</Text>
                    <Picker
                        style={{ marginVertical: 10, color: theme.color }}
                        selectedValue={selectedCategory}
                        onValueChange={(itemval) => {
                            setSelectedCategory(itemval);
                        }}
                    >{Categories.map((C) => (<Picker.Item label={C} value={C} key={Math.random()} />))}</Picker>
                </View>

                <View style={styles.todo}>
                    <Text style={[styles.stxt, { color: theme.color }]}>Date</Text>
                    <TouchableOpacity onPress={datemodvisible} style={styles.btnView}>
                        <Text style={{ color: theme.color }}>Select Date</Text>
                    </TouchableOpacity>
                    <Text style={[styles.s1txt, { color: theme.color }]}>Selected Date: {selectedDate}</Text>

                    <Text style={[styles.stxt, { color: theme.color }]}>Time</Text>
                    <TouchableOpacity onPress={timemodvisible} style={styles.btnView}>
                        <Text style={{ color: theme.color }}>Select Time</Text>
                    </TouchableOpacity>
                    <Text style={[styles.s1txt, { color: theme.color }]}>Selected time: {time}</Text>
                </View>

                <TouchableOpacity onPress={() => { addTodos() }}>
                    <View style={styles.addDetailWrapper}>
                        <Text style={[styles.addText, { color: theme.color }]}>ADD</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { dispatch(setSheduleVisible(false)) }}>
                    <View style={styles.addDetailWrapper}>
                        <Text style={[styles.addText, { color: theme.color }]}>Cancel</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <Modal visible={dateModalVisible} style={{ marginTop: 20, backgroundColor: theme.background }}>
                <View style={[styles.modalview, { marginTop: 80 }]}>
                    <DatePicker
                        mode='calendar'
                        // onSelectedChange={(date )=> {

                        //     {setSelectedDate(date)}
                        // }}  
                        onDateChange={(date) => {
                            // const FormatedDate=`${date.split('/')[0]}`
                            const FormatedDate = date.replaceAll("/", "-")
                            { setSelectedDate(FormatedDate) }
                        }}


                    />

                    <TouchableOpacity onPress={datemodvisiblefalse} style={[styles.btnView,{marginHorizontal:120,marginVertical:40}]}>
                        <Text>Done</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <Modal visible={timeModalVisible} tyle={{ marginTop: 20, backgroundColor: theme.background }}>
                <View style={[styles.modalview, { marginTop: 80 }]}>
                    <DatePicker
                        mode='time'
                        onTimeChange={time => setTime(time)}
                        
                    />

                    <TouchableOpacity onPress={timemodvisiblefalse} style={[styles.btnView,{marginHorizontal:120,marginVertical:40}]}>
                        <Text>Done</Text>
                    </TouchableOpacity>

                </View>
            </Modal>
        </View>
    )
}

export default SheduledTask

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6C4AB6',
        paddingHorizontal: 30,
        paddingVertical: 50,
    },
    shtxt: {
        color: '#eee',
        fontSize: 30,
        marginVertical: 10,
        alignSelf: 'center',
    },
    stxt: {
        color: '#eee',
        fontSize: 20,
        marginVertical: 10,
    },
    s1txt: {
        color: '#eee',
        fontSize: 15,
        marginVertical: 10,
    },
    todoti: {
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 20,
        margin: 20,
        width: '70%'
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#0014',
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 1,
        width: 300,
    },
    modalview: {
        height: "100%",
        width: "100%",
        backgroundColor: "lightblue"
    },
    addDetailWrapper: {
        backgroundColor: '#0032',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 1,
        marginHorizontal: 80,
        marginTop: 20
    },

    addText: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        color: '#eee'
    },
    btnView: {
        backgroundColor: "black",
        paddingVertical: 10,
        marginRight: 156,
        paddingHorizontal: 16,
        borderRadius: 10,
        backgroundColor: '#0032',
    }
})
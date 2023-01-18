
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal, ToastAndroid, SafeAreaView, ScrollView, } from 'react-native'
import React, { useState, useEffect ,useContext} from 'react'
import { Calendar } from 'react-native-calendars'
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import themeContext from './themeContext';

const Calender1 = ({ navigation }) => {
    const theme=useContext(themeContext);
    const [datetxt, setdatetxt] = useState('No date Selected')
    const [tasksList, settasksList] = useState([]);
    const [markedtasks, setmarkedtasks] = useState([{TaskName:'Select Date to Show tasks'}]);
    const [markedDatess, setmarkedDatess] = useState({});
    const [taskFound, setTaskFound] = useState(false);
    const isFocused = useIsFocused();



    useEffect(() => {
        LoadTodo();
    }, [isFocused]);





    const LoadTodo = () => {

        var tempList = [];
        AsyncStorage.getItem('@Stored_Tasks')
            .then((data) => {
                if (data != null) {
                    settasksList(JSON.parse(data));
                    setmarkedDatess({});
                    tempList = JSON.parse(data)
                }
            })
            .catch((error) => console.log(error));
    }

    const Showtasks = (FormatedDate) => {
        var TempList = []
        tasksList.forEach(element => {
            if (element.TaskDate === FormatedDate) {
                setTaskFound(true);
                TempList.push(element);
            }
            
        });
        if(TempList.length===0){
            setTaskFound(false);
            TempList = [{TaskName:'No Task on Selected Date'}]
        }

        setmarkedtasks(TempList);
    }



    const markedDatesList = [
        '2022-11-10',
        '2022-11-11'
    ];

    function getRandomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }

    var tempmarks=[];


    tasksList.forEach((date) => {



        if (date.TaskDate != null) {
            var dotss=[{ color: getRandomColor() }];
            if(tempmarks.includes(date.TaskDate)){
                 dotss.push({ color: getRandomColor() })
            }

            markedDatess[date.TaskDate] = { marked: true, selected: 'true', selectedColor: 'shayan',  selectedTextColor: getRandomColor(), dots:dotss };

            // markedDatess[date.TaskDate] = { marked: true, selected: 'true', selectedColor: getRandomColor(), selectedTextColor: getRandomColor(), dots: [{ color: getRandomColor() }, { color: getRandomColor() }, { color: getRandomColor() }] };

            tempmarks.push(date.TaskDate);

        }


    });


    return (
        <View style={[styles.container,{backgroundColor:theme.background}]}>
            <View style={[styles.top,{backgroundColor:theme.background}]}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10 ,color:theme.color}}>Calender View</Text>
            </View>
            <View style={styles.modalView}>
                <Calendar
                    onDayPress={(date) => {
                        var mon = '00'
                        var da = '00'
                        if (date.month <= 9) {
                            mon = `0${date.month}`
                        } else {
                            mon = date.month;
                        }
                        if (date.day <= 9) {
                            da = `0${date.day}`
                        } else {
                            da = date.day;
                        }
                        const FormatedDate = `${date.year}-${mon}-${da}`
                        setdatetxt(FormatedDate)
                        Showtasks(FormatedDate);

                    }}
                    // initialDate={'2023-1-17'}
                    style={[styles.calenderView,{}]}
                    headerStyle={{backgroundColor:theme.background}}
                    minDate={'2023-1-1'}
                    maxDate={'2023-12-30'}
                    hideExtraDays={true}
                    markingType={'multi-dot'}

                    markedDates={markedDatess}
                />


            </View>

            <View style={[styles.DetailsContainer,{backgroundColor:theme.background}]}>

                <View style={styles.Details}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10,color:theme.color }}>Date :</Text>
                    <Text style={{ fontSize: 17, fontWeight: '400', marginBottom: 15,color:theme.color }}>{datetxt}</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10,color:theme.color }}>Tasks ToDo :</Text>
                    <FlatList
                        style={{
                            height: '85%'
                        }}
                        data={markedtasks}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                            if (item != undefined) {
                                return (

                                    <>
                                        {
                                            taskFound ?
                                                <>
                                                    <Text style={{ fontSize: 17, fontWeight: '400', marginBottom: 5,color:theme.color }}>Task {index + 1} : {item.TaskName}</Text>
                                                    <Text style={{ fontSize: 17, fontWeight: '400', marginBottom: 0 ,color:theme.color}}>Time : {item.TaskTime}</Text>
                                                    <Text style={{ fontSize: 17, fontWeight: '400', height: 15 }}></Text></>
                                                :
                                                <>
                                                    <Text style={{ fontSize: 17, fontWeight: '400', marginBottom: 5 ,color:theme.color}}>{item.TaskName}</Text>
                                                </>
                                        }
                                    </>
                                );
                            }
                        }}
                    />

                </View>

            </View>


        </View>
    )
}

export default Calender1

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        
        
    },
    top: {
        position: 'relative',
        top: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6C4AB6',
        width: '100%',
        height: 60,
        
    },

    DetailsContainer: {
        backgroundColor: '#8D72E1',
        flex: 1

    },

    Details: {
        margin: 20,
    },

    btnView: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'lightblue'
    },
    calenderView: {
        borderRadius: 0,
        margin: 0,
        elevation: 25,
        // backgroundColor:'#8D72E1',

    },
    modalView: {

    }
})

//Toast message in react native?
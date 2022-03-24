/* eslint-disable prettier/prettier */
import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  TextInput,
  Alert,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {setTasks} from '../src/actions';

const AddTaskScreen = ({navigation}) => {
  const [value, setValue] = useState('empty');
  const [title, setTitle] = useState('');
  const [description, setdescription] = useState('');
  const [todos, settodos] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [trigger, setTrigger] = useState(false);

  const {tasks, taskID} = useSelector(state => state.taskReducer);
  const dispatch = useDispatch();

  const storeData = async () => {
    // await AsyncStorage.removeItem('Tasks');
    if (trigger == true) {
      try {
        const stringifyTasks = JSON.stringify(todos);
        await AsyncStorage.setItem('Tasks', stringifyTasks);
        dispatch(setTasks(stringifyTasks));
        navigation.goBack();
      } catch (e) {
        console.log(e);
      }
    }
  };
  useEffect(() => {
    storeData();
  }, [todos]);

  const newTask = async () => {
    if (title === '') {
      Alert.alert('Error', 'Please Enter Title!');
    } else {
      const newTask = {
        id: Math.random(),
        title: title,
        description: description,
        isComplete: false,
      };
      const todo = [...tasks, newTask];

      try {
        const stringifyTasks = JSON.stringify(todo);
        await AsyncStorage.setItem('Tasks', stringifyTasks);
        dispatch(setTasks(stringifyTasks));

        // console.log('Printing json', stringifyTasks);
        navigation.navigate('Home');
      } catch (e) {
        console.log(e);
      }
      // settodos([...todos, newTask]);
      // setTrigger(true);
      // storeData();
    }
  };

  return (
    <SafeAreaView style={styles.mainView}>
      <View style={styles.firstView}>
        <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 40}}>
          Create Task
        </Text>
        <View>
          <View style={styles.searchBar}>
            <TextInput placeholder="Title" onChangeText={setTitle} />
          </View>
          <View style={styles.searchBar}>
            <TextInput
              placeholder="Description"
              multiline
              numberOfLines={30}
              onChangeText={setdescription}
            />
          </View>
        </View>
      </View>
      <View style={styles.bottomView}>
        <Button
          title="Cancel"
          color="red"
          onPress={() => navigation.navigate('Home')}
        />
        <Button title="Save" color="lightgreen" onPress={newTask} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstView: {
    height: '90%',
    width: '100%',
    // backgroundColor: 'pink',
  },
  bottomView: {
    width: '50%',
    height: '4%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',

    // backgroundColor: 'pink',
  },
  searchBar: {
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    margin: 20,
    // justifyContent: 'center',
    padding: 10,
  },
});

export default AddTaskScreen;

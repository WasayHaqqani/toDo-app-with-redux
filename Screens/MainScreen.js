/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect, useMemo} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Text,
  View,
  Button,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {filter} from 'lodash';
import {
  setDeleteTask,
  setTaskId,
  setTasks,
  setMarkAsDone,
} from '../src/actions';
// import { useMemo } from 'react';

const MainScreen = ({navigation}) => {
  const {tasks} = useSelector(state => state.taskReducer);
  const dispatch = useDispatch();
  const [refresh, setrefresh] = useState(false);
  const [afterDel, setAfterDel] = useState('');
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [DeleteFlag, setDeleteFlag] = useState(false);
  const [DoneFlag, setDoneFlag] = useState(false);

  console.log('yeh redux se tasks', tasks);
  // console.log('yeh filter', filteredDataSource);
  // console.log('yeh filtered', filteredDataSource);
  // useEffect(() => {
  //   saveTasks();
  // });
  useEffect(() => {
    // if (filteredDataSource.length === 0) {
    //   // console.log('CALL HO NA PEHLI BAAR', filteredDataSource.length);
    //   setFilteredDataSource(tasks);
    // }
    // console.log('heheh');
    setFilteredDataSource(tasks);
    if (DeleteFlag == true || DoneFlag == true) {
      const saveTasks = async () => {
        const stringifyTasks = JSON.stringify(tasks);
        await AsyncStorage.setItem('Tasks', stringifyTasks);
        setDeleteTask(false);
        setDoneFlag(false);
      };
      saveTasks();
      // console.log('ITEMS TO BE SAVED AFTER DELETION: ', tasks);
    }
  }, [tasks]);
  // console.log('yeh', todos);
  useEffect(() => {
    getData();
    // const memoizedValue = useMemo(() => renderItem, [tasks]);
    // console.log(memoizedValue);
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData();

      // console.log('Refreshed!');
    });
    // return unsubscribe;
  }, [navigation]);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('Tasks');
      const val = JSON.parse(value);
      if (val && typeof val === 'object') {
        dispatch(setTasks(val));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteButton = async id => {
    console.log('To be deleted', id);

    dispatch(setDeleteTask(id));

    setDeleteFlag(true);

    // try {
    //   // const {todos} = useSelector(state => state.taskReducer);
    //   console.log('To be saved ', tasks);

    //   const stringifyTasks = JSON.stringify(tasks);
    //   await AsyncStorage.setItem('Tasks', stringifyTasks);
    // } catch (e) {
    //   console.log(e);
    // }
  };

  const searchFilter = text => {
    // console.log('This is text: ', text)
    // console.log('Search Function Called');
    if (text) {
      const newData = tasks.filter(item => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        // console.log(text);
        const textData = text.toUpperCase();

        return itemData.indexOf(textData) > -1;
      });
      // console.log(newData);
      setFilteredDataSource(newData);
      // setSearch(text);
    } else {
      setFilteredDataSource(tasks);
      setSearch('');
      console.log('NULL HMcd AIIII');
    }
  };

  const markCompleted = id => {
    console.log('Mark Completed : ', id);
    dispatch(setMarkAsDone(id));
    setDoneFlag(true);
  };

  return (
    <SafeAreaView style={styles.mainView}>
      <View style={styles.firstView}>
        <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 40}}>
          ToDo App
        </Text>
        <View>
          <View style={styles.searchBar}>
            <TextInput
              placeholder="Search"
              onChangeText={text => searchFilter(text)}
            />
          </View>
          <View style={{height: 550}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={filteredDataSource}
              // keyExtractor={item => item.id}
              // initialNumToRender={tasks.length}
              // extraData={setrefresh(!refresh)}
              renderItem={({item}) => {
                return (
                  <View style={styles.containerList}>
                    <View style={styles.listView}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <TouchableOpacity>
                          <View>
                            {item.isComplete == false ? (
                              <Text onPress={() => markCompleted(item.id)}>
                                ✅
                              </Text>
                            ) : (
                              <Text></Text>
                            )}
                          </View>
                          {/* // <Text style={{}}>✅</Text> */}
                        </TouchableOpacity>
                        <Text
                          style={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: 20,
                          }}>
                          {item.title}
                        </Text>
                        <TouchableOpacity
                          onPress={() => handleDeleteButton(item.id)}>
                          <Text>🗑</Text>
                        </TouchableOpacity>
                      </View>
                      <Text style={{marginTop: 10}}>{item.description}</Text>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </View>
      <View style={styles.bottomView}>
        <Button
          title="Add New Task"
          color="purple"
          onPress={() => {
            dispatch(setTaskId(tasks.length + 1));
            navigation.navigate('AddTask');
          }}
        />
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
  },
  bottomView: {
    width: '50%',
    height: '4%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    margin: 20,
    padding: 10,
  },
  listView: {
    padding: 20,
    backgroundColor: 'lightgrey',
    elevation: 12,
    borderRadius: 12,
    marginVertical: 10,
  },
  containerList: {
    flex: 1,
    padding: 10,
  },
  itemStyle: {
    padding: 10,
  },
  itemSeparatorStyle: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#C8C8C8',
  },
});
export default MainScreen;

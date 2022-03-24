/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
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
import {filter} from 'lodash';

class MainScreen extends React.Component {
  // const [todos, settodos] = useState([]);
  // const [filteredTodos, setFilteredTodos] = useState([]);
  // const [fullData, setFullData] = useState([]);
  // setFullData([...route.params])
  // console.log('Main Screen me: ',route.params)
  // useEffect(() => {
  //   getData();
  // }, [])

  state = {
    todos: '',
    fullData: '',
  };

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@TASKS');
      if (value != null) {
        const v1 = JSON.parse(value);
        this.setState({todos: v1});
      }
      console.log('Full Data', todos);
    } catch (e) {
      console.error(e);
    }
  };

  ListItem = ({todo}) => {
    return (
      <View>
        <View style={styles.listStyle}>
          <View style={{flex: 1}}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '600',
                color: '#1f145c',
                textDecorationLine: todo?.completed ? 'line-through' : 'none',
              }}>
              {todo.title}
            </Text>
            <Text
              style={{
                fontWeight: '500',
                fontSize: 12,
                textDecorationLine: todo?.completed ? 'line-through' : 'none',
              }}>
              {todo.description}
            </Text>
          </View>
          {!todo?.completed && (
            <TouchableOpacity onPress={() => markToDoComplete(todo?.id)}>
              <Text style={{fontSize: 20}}>✅ </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity>
            <Text style={{fontSize: 20}} onPress={() => deleteToDo(todo?.id)}>
              🗑
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    const {todos, fullData} = this.state;
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
                // value={query}
                // onChangeText={queryText => handleSearch(queryText)}
              />
            </View>
            <View style={{padding: 20}}>
              <Text>Flat List</Text>
              <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{padding: 20, paddingBottom: 100}}
                // data={filteredTodos.length || query ? filteredTodos : todos}
                // data={fullData}
                renderItem={({item}) => <ListItem todo={item} />}
              />
            </View>
          </View>
        </View>
        <View style={styles.bottomView}>
          <Button
            title="Add New Task"
            color="purple"
            onPress={() => this.props.navigation.navigate('AddTask')}
          />
        </View>
      </SafeAreaView>
    );
  }
}
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
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'pink',
  },
  searchBar: {
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    margin: 20,
    // justifyContent: 'center',
    padding: 10,
  },
  listStyle: {
    padding: 20,
    backgroundColor: 'lightgrey',
    flexDirection: 'row',
    elevation: 12,
    borderRadius: 12,
    marginVertical: 10,
  },
});
export default MainScreen;

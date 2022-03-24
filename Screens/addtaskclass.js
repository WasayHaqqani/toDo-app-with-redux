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

class AddTaskScreen extends React.Component {
  state = {
    value: 'empty',
    title: 'empty',
    description: 'empty',
    todos: [],
    fullData: [],
    trigger: false,
  };

  storeData = async () => {
    // let tasks = {};
    // await AsyncStorage.removeItem('Tasks');
    if (this.state.trigger == true) {
      try {
        const stringifyTasks = JSON.stringify(this.state.todos);
        await AsyncStorage.setItem('Tasks', stringifyTasks);

        console.log('Printing json', stringifyTasks);
        this.props.navigation.navigate('Home');
      } catch (e) {
        console.log(e);
      }
    }
  };
  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('Tasks');
      if (value != null) {
        setFullData(JSON.parse(value));
        settodos(JSON.parse(value));
      }
      console.log('Full Data', fullData);
    } catch (e) {
      console.error(e);
    }
  };

  newTask = () => {
    if (this.state.title === 'empty') {
      Alert.alert('Error', 'Please Enter Title!');
    } else {
      const newTask = {
        title: this.state.title,
        description: this.state.description,
      };
      const val = [];
      val.push([...this.state.todos], newTask);
      console.log('bvvv', val);
      this.setState({todos: [...this.state.todos], newTask});
      this.setState({trigger: true});
      this.storeData();
    }
  };
  render() {
    const {title, description} = this.state;
    return (
      <SafeAreaView style={styles.mainView}>
        <View style={styles.firstView}>
          <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 40}}>
            Create Task
          </Text>
          <View>
            <View style={styles.searchBar}>
              <TextInput
                placeholder="Title"
                onChangeText={e => this.setState({title: e})}
              />
            </View>
            <View style={styles.searchBar}>
              <TextInput
                placeholder="Description"
                multiline
                numberOfLines={30}
                onChangeText={e => this.setState({description: e})}
                // value={description}
              />
            </View>
          </View>
        </View>
        <View style={styles.bottomView}>
          <Button
            title="Cancel"
            color="red"
            onPress={() => this.props.navigation.navigate('Home')}
          />
          <Button title="Save" color="lightgreen" onPress={this.newTask} />
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

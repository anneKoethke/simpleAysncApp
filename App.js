import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { globalStyles } from './res/style/global';
import Card from './res/components/card';

export default function App() {

  const [keyCounter, setKeyCounter] = useState(0);
  const [nameData, setNameData] = useState([]);
  const [name, setName] = useState("");

  // runs after the first render and after every update (use as componentDidMount() in React)
  useEffect(() => {
    // set States to null
    resetStates();
    getDataFromDB();
  }, []); // Or [] if effect doesn't need props or state

  // to get an initial State at App opening and all updates to DB
  const resetStates = () => {
    setKeyCounter(0);
    setNameData([]);
  }

  const getDataFromDB = async () => {
    try {
      // get initial State from DB at App Start
      AsyncStorage.getAllKeys((err, allKeys) => {
        AsyncStorage.multiGet(allKeys, (err, items) => {
          items.map((res, i, item) => {
            let key = item[i][0], // String with '@SAA_...
              itemContent = JSON.parse(item[i][1]); // parse to get an Object
            // set keyCounter
            key = parseInt(key.replace('@SAA_name_key_', '')); // number
            setKeyCounter(key);
            // set nameData
            setNameData((currList) => {
              return [itemContent, ...currList]
            });
          }) 
        })
      });
    } catch(e) {
      alert("GET_ALL_NAMES_ERR"+e);
    }
  };

  const save = async () => {
    if (name !== "") {
      let key = (parseInt(keyCounter) + 1).toString(); // String
      // DB part
      try {
        const jsonValue = JSON.stringify({key, name})
        await AsyncStorage.setItem('@SAA_name_key_'+key, jsonValue);
        console.log("added '" + name + "' with key =", key, "to db.");
      } catch(e) {
        alert("SAVE_ERR: "+e);
      }
      // View part
      setKeyCounter(key); // must be a Sring here 
      setNameData((currList) => {
        return [{ key, name }, ...currList]
      });
      setName(""); // to clear input
    } else {
      alert("no name entered!")
    }
  };

  const removeName = async (name, key) => {
    console.log(name, "- key:", key);
    // remove from DB
    try {
      await AsyncStorage.removeItem('@SAA_name_key_'+key);
      console.log('removed:', name, "with key:", key)
    } catch(e) {
      alert('REMOVE_ERR:' + e);
    }
    // remove from nameData
    let currentList = nameData.filter(item => {
      return item.key !== key
    })
    setNameData(currentList);
  }

  const showAllKeys = async () => {
    let allKeys = []
    try {
      allKeys = await AsyncStorage.getAllKeys();
      console.log("showAllKeys => allKeys", allKeys);
    } catch(e) {
      alter("GET_ALL_KEYS_ERR: "+e);
    }
  }

  // (https://reactnative.dev/docs/security): Async Storage is not shared between apps: every app has its own sandbox environment and has no access to data from other apps.
  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      setNameData([]);
    } catch(e) {
      alert("CLEAR_STORE_ERR: "+e);
    }
    console.log("storage was cleared");    
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar style="auto" />

      <Text style={globalStyles.h1}>Simple AsyncStorage App</Text>
      
      <Text style={globalStyles.h2}>Name:</Text>
      <TextInput 
        style= {globalStyles.input}
        onChangeText={val => setName(val)}
        placeholder='enter name here'
        value={name} // löscht input, wenn setName('') im save
      />
      
      <Button 
        title="save name to Store"
        onPress={save}
      />
      
      <Text style={globalStyles.h2}>List Output: </Text>
      <FlatList 
        style={globalStyles.p}
        data={nameData}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => removeName(item.name, item.key)}>
            <Card name={item.name} id={item.key} />
          </TouchableOpacity>
        )}
      />

      <View style={globalStyles.controlBtnContainer}>
        <Button 
          title="show all keys"
          onPress={showAllKeys}
        />
        <Button 
          title="clear Storage"
          onPress={clearStorage}
        />
      </View>
      
    </SafeAreaView>
  );
}

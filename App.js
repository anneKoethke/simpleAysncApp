import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, SafeAreaView, Text, TextInput, Button, FlatList } from 'react-native';
import { globalStyles } from './res/style/global';

export default function App() {

  const [keyCounter, setKeyCounter] = useState(3);
  const [nameData, setNameData] = useState([
    { key: "1", name: "Anna" },
    { key: "2", name: "Berta" },
    { key: "3", name: "Carla" }
  ]);
  const [name, setName] = useState("");

  const pressHandler = () => {
    if (name !== "") {
      let key = (keyCounter + 1).toString();
      setKeyCounter(key);
      setNameData((currList) => {
        return [{ key, name }, ...currList]
      });
      setName("");
    } else {
      alert("no name entered!")
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar style="auto" />
      <Text style={globalStyles.h1}>Simple AsyncStorgae App</Text>
      <Text>Name:</Text>
      <TextInput 
        style= {globalStyles.input}
        onChangeText={val => setName(val)}
        placeholder='enter name here'
        value={name} // löscht input, wenn setName('') im pressHandler
      />
      <Button 
        title="save name"
        onPress={pressHandler}
      />
      <Text style={globalStyles.h2}>List Output: </Text>
      <FlatList 
        style={globalStyles.p}
        data={nameData}
        renderItem={({item}) => (
          <Text>{item.name}</Text>
        )}
      />
      
    </SafeAreaView>
  );
}

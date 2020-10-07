import React from 'react';
import { View, Text } from 'react-native';
import { globalStyles } from '../style/global';

export default function Card({ name, id }) {
  return (
    <View style={globalStyles.cardContainer}>
      <Text style={[globalStyles.card, globalStyles.fatCardText]}>{name}</Text>
      <Text style={globalStyles.card}>(id: {id})</Text>
    </View>
  );
}
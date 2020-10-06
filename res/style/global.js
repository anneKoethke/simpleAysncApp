import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#d3d3d3',
  },
  h1: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  h2: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  p: {
    paddingVertical: 10,
    fontSize: 17,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 20,
    marginRight: 10,
    padding: 10,
    minWidth: 100,
  }
});
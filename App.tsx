import React from 'react';
import {Text, StyleSheet} from 'react-native';

const App = () => {
  return <Text style={Styles.title}>HELLO WORLD</Text>;
};
export default App;

const Styles = StyleSheet.create({
  title: {
    backgroundColor: 'transparent',
    color: 'black',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    padding: 10,
    marginTop: 50,
    borderRadius: 10,
    overflow: 'hidden',
    textTransform: 'lowercase',
    letterSpacing: 2,
    width: '80%',
    alignSelf: 'center',
    fontStyle: 'italic',
  },
});

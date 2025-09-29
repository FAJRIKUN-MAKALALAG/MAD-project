import {StyleSheet, View} from 'react-native';
import React from 'react';

const Flexbox = () => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.redcontainer} />
        <View style={styles.greencontainer} />
        <View style={styles.bluecontainer} />
      </View>
      <View style={styles.container2}>
        <View style={styles.redbox} />
        <View style={styles.greenbox} />
        <View style={styles.bluebox} />
      </View>
    </>
  );
};

export default Flexbox;

const styles = StyleSheet.create({
  container: {
    flex: 1 / 2,
    backgroundColor: 'yellow',
  },
  redcontainer: {
    flex: 1,
    backgroundColor: 'red',
  },
  greencontainer: {
    flex: 4,
    backgroundColor: 'green',
  },
  bluecontainer: {
    flex: 1,
    backgroundColor: 'blue',
  },
  container2: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'pink',
  },
  redbox: {
    height: 50,
    width: 100,
    backgroundColor: 'red',
  },
  greenbox: {
    height: 50,
    width: 100,
    backgroundColor: 'green',
  },
  bluebox: {
    height: 50,
    width: 100,
    backgroundColor: 'blue',
  },
});

import React from 'react';
import {View, StyleSheet} from 'react-native';

export default function ColorTest() {
  return (
    <View style={s.wrap}>
      <View style={[s.box, {backgroundColor: 'red'}]} />
      <View style={[s.box, {backgroundColor: 'green'}]} />
      <View style={[s.box, {backgroundColor: 'blue'}]} />
      <View style={[s.box, {backgroundColor: 'yellow'}]} />
      <View style={[s.box, {backgroundColor: 'magenta'}]} />
      <View style={[s.box, {backgroundColor: 'cyan'}]} />
    </View>
  );
}
const s = StyleSheet.create({
  wrap: {flex: 1, flexWrap: 'wrap', flexDirection: 'row'},
  box: {width: '33.33%', height: '33.33%'},
});

import {StyleSheet, View, Image, Text} from 'react-native';
import React from 'react';

const Flexbox = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.BlackBox} />
        <View style={styles.YellowBox} />
        <View style={styles.BlackBox} />
      </View>

      <View style={styles.middleSection}>
        <Image
          source={require('./assets/logo_unklab.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Universitas Klabat</Text>
          <Text style={styles.subtitle}>Pathway to Excellence</Text>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <View style={styles.blackBox} />
        <View style={styles.yellowBox} />
        <View style={styles.blackBox} />
      </View>
    </View>
  );
};

export default Flexbox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'red',
    paddingVertical: 50,
    paddingHorizontal: 15,
  },

  BlackBox: {
    width: 70,
    height: 70,
    backgroundColor: 'black',
    marginRight: 20,
  },

  YellowBox: {
    width: 70,
    height: 70,
    backgroundColor: 'yellow',
    marginRight: 20,
  },

  middleSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 80,
    marginRight: 15,
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontStyle: 'italic',
    fontSize: 14,
  },

  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'blue',
    paddingVertical: 50,
  },
  blackBox: {
    width: 70,
    height: 70,
    backgroundColor: 'black',
  },
  yellowBox: {
    width: 70,
    height: 70,
    backgroundColor: 'yellow',
  },
});

import React, {useEffect, useRef, useState} from 'react';
import {Animated, StatusBar, StyleSheet, View} from 'react-native';
import ChatScreen from './src/screens/ChatScreen';

const LOGO = require('./assets/Aicode.png');

const FADE_IN_DURATION = 800;
const VISIBLE_DURATION = 1400;
const FADE_OUT_DURATION = 800;

const MainApp: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: FADE_IN_DURATION,
        useNativeDriver: true,
      }),
      Animated.delay(VISIBLE_DURATION),
      Animated.timing(opacity, {
        toValue: 0,
        duration: FADE_OUT_DURATION,
        useNativeDriver: true,
      }),
    ]);

    animation.start(({finished}) => {
      if (finished) {
        setShowSplash(false);
      }
    });

    return () => {
      animation.stop();
    };
  }, [opacity]);

  if (showSplash) {
    return (
      <View style={styles.splashContainer}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <Animated.Image
          source={LOGO}
          style={[styles.logo, {opacity}]}
          resizeMode="contain"
        />
      </View>
    );
  }

  return (
    <View style={styles.chatContainer}>
      <StatusBar backgroundColor="#000000" barStyle="light-content" />
      <ChatScreen />
    </View>
  );
};

export default MainApp;

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
});

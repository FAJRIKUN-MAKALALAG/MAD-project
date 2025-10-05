import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

interface ChatHeaderProps {
  title?: string;
  onPressSettings?: () => void;
  logoSource?: number | {uri: string};
}

const SLIDE_DURATION = 500;

const ChatHeader: React.FC<ChatHeaderProps> = ({
  onPressSettings,
  logoSource,
}) => {
  const menuTranslate = useRef(new Animated.Value(-40)).current;
  const logoTranslate = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(menuTranslate, {
        toValue: 0,
        duration: SLIDE_DURATION,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(logoTranslate, {
        toValue: 0,
        duration: SLIDE_DURATION,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [logoTranslate, menuTranslate]);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Animated.View
          style={{
            transform: [{translateX: menuTranslate}],
          }}
        >
          <TouchableOpacity
            onPress={onPressSettings}
            style={styles.menuButton}
            accessibilityRole="button"
            accessibilityLabel="Menu"
          >
            <Animated.Text style={styles.menuIcon}>☰</Animated.Text>
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.spacer} />

        {logoSource ? (
          <Animated.Image
            source={logoSource}
            style={[styles.logo, {transform: [{translateX: logoTranslate}]}]}
            resizeMode="contain"
          />
        ) : null}
      </View>
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#1F1F23',
    backgroundColor: '#000000',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  menuIcon: {
    fontSize: 22,
    color: '#F5F5F5',
  },
  spacer: {
    flex: 1,
  },
  logo: {
    width: 48,
    height: 48,
  },
});

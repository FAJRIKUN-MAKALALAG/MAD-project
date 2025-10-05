import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface ChatSidebarProps {
  visible: boolean;
  onClose: () => void;
}

const SIDEBAR_WIDTH = Dimensions.get('window').width * 0.5;
const ANIMATION_DURATION = 280;

const ChatSidebar: React.FC<ChatSidebarProps> = ({visible, onClose}) => {
  const [renderSidebar, setRenderSidebar] = useState(visible);
  const translateX = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setRenderSidebar(true);
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 0,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0.6,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
        }),
      ]).start();
    } else if (renderSidebar) {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: -SIDEBAR_WIDTH,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
        }),
      ]).start(({finished}) => {
        if (finished) {
          setRenderSidebar(false);
        }
      });
    }
  }, [overlayOpacity, renderSidebar, translateX, visible]);

  if (!renderSidebar) {
    return null;
  }

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      <Animated.View style={[styles.overlay, {opacity: overlayOpacity}]}>
        <Pressable style={styles.overlayPressable} onPress={onClose} />
      </Animated.View>

      <Animated.View style={[styles.sidebar, {transform: [{translateX}]}]}>
        <Text style={styles.heading}>Menu</Text>
        <View style={styles.itemGroup}>
          <Text style={styles.item}>Profil</Text>
          <Text style={styles.item}>Riwayat Chat</Text>
          <Text style={styles.item}>Pengaturan</Text>
          <Text style={styles.item}>Bantuan</Text>
        </View>
      </Animated.View>
    </View>
  );
};

export default ChatSidebar;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
  },
  overlayPressable: {
    flex: 1,
  },
  sidebar: {
    position: 'absolute',
    top: 12,
    bottom: 12,
    left: 12,
    width: SIDEBAR_WIDTH,
    backgroundColor: '#0D0D10',
    paddingTop: 36,
    paddingHorizontal: 16,
    paddingBottom: 28,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#1F1F23',
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#F5F5F5',
    marginBottom: 18,
  },
  itemGroup: {
    gap: 14,
  },
  item: {
    fontSize: 14,
    color: '#E4E6EB',
    letterSpacing: 0.3,
  },
});

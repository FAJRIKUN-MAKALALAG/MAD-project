import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';

// import base64 dari constants
import {myBase64Image} from './src/constants/images';

const App: React.FC = () => {
  // 2) NETWORK image
  const networkUri: string =
    'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800';

  // 1) STATIC image
  const localImage: ImageSourcePropType = require('./assets/local-cat.png');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* 1) STATIC / LOCAL */}
        <Text style={styles.title}>1) Static Resource (Lokal Project)</Text>
        <Image source={localImage} style={styles.image} resizeMode="cover" />

        {/* 2) NETWORK */}
        <Text style={styles.title}>2) Network Image (Internet)</Text>
        <Image
          source={{uri: networkUri}}
          style={styles.image}
          resizeMode="cover"
        />

        {/* 3) BASE64 */}
        <Text style={styles.title}>3) Base64 Image (Data URI)</Text>
        <Image
          source={{
            uri: myBase64Image.startsWith('data:')
              ? myBase64Image // kalau sudah ada prefix
              : `data:image/png;base64,${myBase64Image}`, // kalau cuma raw base64
          }}
          style={styles.base64}
        />
        <Text style={styles.note}>
          (Gambar ini dari base64 di src/constants/images.ts)
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#101114'},
  content: {padding: 16, gap: 12},
  title: {color: '#fff', fontSize: 16, fontWeight: '600', marginTop: 8},
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    backgroundColor: '#222',
  },
  base64: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#222',
  },
  note: {color: '#b5b5b5', fontSize: 12},
});

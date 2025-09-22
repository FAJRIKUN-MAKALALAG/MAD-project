import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import TextInput from './components/TextInput';
import Button from './components/Button';

const Register = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleRegister = () => {
    console.log('=== User Registration Data ===');
    console.log('Name:', name);
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Phone:', phone);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registration</Text>

      <TextInput
        placeholder="Masukan Nama Anda"
        label="Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Masukan Username Anda"
        label="Username"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        placeholder="Masukan Email Anda"
        label="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Masukan Nomor tlp Anda"
        label="Phone Number"
        keyboardType="numeric"
        onlyNumbers
        value={phone}
        onChangeText={setPhone}
      />

      <Button
        label="Register"
        color="#ad19e7ff"
        colorText="white"
        onPress={handleRegister}
      />
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 40,
    textAlign: 'center',
  },
});

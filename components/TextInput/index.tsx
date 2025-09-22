import React, {useState} from 'react';
import {
  TextInput as RNTextInput,
  Text,
  StyleSheet,
  View,
  TextInputProps,
} from 'react-native';

type Props = TextInputProps & {
  label?: string;
  onlyNumbers?: boolean; // tambahan
};

const TextInput: React.FC<Props> = ({
  placeholder,
  label,
  onlyNumbers,
  onChangeText,
  ...rest
}) => {
  const [value, setValue] = useState('');

  const handleChangeText = (text: string) => {
    let newText = text;
    if (onlyNumbers) {
      // filter hanya angka
      newText = text.replace(/[^0-9]/g, '');
    }

    setValue(newText);
    if (onChangeText) {
      onChangeText(newText);
    }
  };

  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <RNTextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={handleChangeText}
        {...rest}
      />
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 13,
    height: 45,
    paddingHorizontal: 10,
    fontSize: 14,
    color: 'black',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
});

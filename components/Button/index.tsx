import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  GestureResponderEvent,
} from 'react-native';

type Props = {
  label: string;
  color?: string;
  colorText?: string;
  onPress?: (event: GestureResponderEvent) => void;
};

const Button: React.FC<Props> = ({
  label,
  color = 'orange',
  colorText = 'black',
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: color}]}
      activeOpacity={0.5}
      onPress={onPress}>
      <Text style={[styles.buttonText, {color: colorText}]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    height: 45,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
  },
});

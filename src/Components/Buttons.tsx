import React from 'react';
import { View, Text, StyleProp, ViewStyle, TextStyle, GestureResponderEvent, StyleSheet, Dimensions } from 'react-native';
import { Button, colors } from 'react-native-elements';

let { width } = Dimensions.get("window");

export default function CustomButtons(props: ButtonProps) {
  return (
    <Button
      title={props.title}
      type={props.type}
      buttonStyle={{
        ...styles.button,
        backgroundColor: props.backgroundColor,
        marginTop: props.marginTop
      }}
      loading={props.loading}
      titleStyle={{
        fontFamily: props.fontFamily,
        color: props.color
      }}
      disabled={props.disabled}
      onPress={props.onPress}
      disabledStyle={{
        backgroundColor: props.backgroundColor,
      }}
      disabledTitleStyle={{
        color: props.color
      }}
    />
  )
}

interface ButtonProps {
  // buttonStyle?: StyleProp<ViewStyle>;
  // titleStyle?: StyleProp<TextStyle>;
  onPress?: ((event: GestureResponderEvent) => void) | undefined
  title?: string
  marginTop?: number
  color?: string
  backgroundColor?: string
  fontFamily?: string
  type?: "outline" | "solid" | undefined
  disabled?: boolean;
  loading?: boolean;
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    padding: 15,
    width: width - 40,
  },
})
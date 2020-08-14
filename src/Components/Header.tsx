import React, { ReactNode } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { CustomThemeInterface } from '../Interfaces/interface';
import { useTheme } from '@react-navigation/native';
import { Icon } from 'react-native-elements';


export default function CustomHeader(props: HeaderProps) {
  const { colors, fonts }: CustomThemeInterface = useTheme();

  return (
    <View style={{ ...styles.container, backgroundColor: colors.appBar, ...props.style }}>
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',

  },
})

interface HeaderProps {
  leftIcon?: any;
  rightIcon?: any;
  title?: string;
  children?: any;
  style?: any;
}
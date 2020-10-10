import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { CustomThemeInterface } from '../Interfaces/interface';
import { useTheme } from '@react-navigation/native';

export default function Notifications() {
  const { colors, fonts, fontSizes }: CustomThemeInterface = useTheme();

  return (
    <View style={{ ...style.container }}>
      <Text style={{
        fontFamily: fonts?.FuturaBold
      }}>Notifications</Text>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
import React from 'react'
import { View, StyleSheet, ImageBackground, ImageProps } from 'react-native'
import { CustomThemeInterface } from '../Interfaces/interface';
import { useTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

export default function BackgroundImage(props: BackgroundImageProps) {
  const { colors }: CustomThemeInterface = useTheme();

  return (
    <View style={{ ...styles.container, backgroundColor: colors.background }}>
      <StatusBar style="light" />
      <ImageBackground source={props.img} style={{
        ...styles.backgroundImage
      }}>
        <View style={{ ...styles.overlay, justifyContent: props.justifyContent, alignItems: props.alignItems }}>
          {props.children}
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  }, backgroundImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  }, overlay: {
    flex: 1,
    padding: 20,
    paddingBottom: 30,
    backgroundColor: 'rgba(0,0,0, .60)'
  },
})

interface BackgroundImageProps {
  img: ImageProps;
  children: any;
  justifyContent?: "center" | "flex-end" | "flex-start" | "space-around" | "space-evenly" | "space-between" | undefined;
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline" | undefined
}
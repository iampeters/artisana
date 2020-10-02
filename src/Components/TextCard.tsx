import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import { CustomThemeInterface } from '../Interfaces/interface';
import { useTheme } from '@react-navigation/native';

let { width } = Dimensions.get('window');

export default function TextCard(props: CardProps) {
  const { colors, fonts }: CustomThemeInterface = useTheme();

  return (

    <View style={{
      backgroundColor: props.backgroundColor,
      borderRadius: 10,
      // borderColor: '#121212',
      // borderWidth: 1,
      width: width / 2.3,
      paddingVertical: 15,
      paddingHorizontal: 20,
      marginBottom: 10
    }}>
      <Text style={{
        fontFamily: fonts?.RubikMedium,
        // fontSize: fontSizes?.body,
        color: colors.dark
      }}>{props.title}</Text>
      <Text style={{
        fontFamily: fonts?.ProductSansLight,
        // fontSize: fontSizes?.body,
        color: colors.dark
      }}>{props.subTitle}</Text>
    </View>
  )
}

interface CardProps {
  children?: any;
  backgroundColor?: any;
  elevation?: number;
  iconName?: any;
  title?: string;
  subTitle?: string;
}

import React from 'react'
import { View, Text, Dimensions, Platform } from 'react-native'
import { CustomThemeInterface } from '../Interfaces/interface';
import { useTheme } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';


let { width } = Dimensions.get("window");

export default function CustomHeader(props: HeaderProps) {
  const { colors, fonts, fontSizes }: CustomThemeInterface = useTheme();

  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: props.justifyContent,
      alignItems: 'center',
      paddingVertical: 10,
      width: width - 40,
      marginBottom: 20,
      paddingTop: Platform.OS === "ios" ? 60 : 40,
    }}>

      {props.showLeftIcon && <FontAwesome5 name="arrow-left" size={23} onPress={props.onPress} color={colors.text} />}

      <Text
        onPress={props.onPress}
        style={{
          fontFamily: fonts?.ProductSansBold,
          color: colors.text,
          fontSize: fontSizes?.cardTitle,
          marginLeft: props.showLeftIcon ? 30 : 0,
        }}>{props.title}</Text>


    </View>
  )
}


interface HeaderProps {
  leftIcon?: any;
  rightIcon?: any;
  justifyContent?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly" | undefined;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  title?: string;
  children?: any;
  style?: any;
  navigation?: any
  onPress?: () => void;
}
import React from 'react'
import { View, Text, Dimensions, ImageBackground } from 'react-native'
import { Fontisto, FontAwesome5 } from '@expo/vector-icons';
import { CustomThemeInterface } from '../Interfaces/interface';
import { useTheme } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';

let { width } = Dimensions.get('window');

export default function CardFullWith(props: CardProps) {
  const { colors, fonts, fontSizes }: CustomThemeInterface = useTheme();

  return (
    // <TouchableOpacity>

    <View style={{
      backgroundColor: props.backgroundColor,
      borderRadius: 10,
      // elevation: props.elevation,
      borderColor: props.borderColor,
      // borderWidth: 1,
      marginBottom: 30
    }}>
      <ImageBackground source={require('../../assets/bg.png')} style={{
        width: width - 40,
        // height: 140,
        padding: 20,
        borderRadius: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
      }}>

        <View style={{
          flex: 1
        }}>
          <FontAwesome5 name={props.iconName} color={props.iconColor} size={40} />
        </View>

        <View style={{
          justifyContent: 'center',
          alignItems: 'flex-start',
          flex: 5
        }}>
          <Text style={{
            fontFamily: fonts?.RubikBold,
            fontSize: fontSizes?.body,
            color: props.titleColor,
            // textTransform: 'uppercase',
          }}>{props.title}</Text>

          <Text style={{
            fontFamily: fonts?.ProductSansLight,
            fontSize: fontSizes?.body,
            color: props.textColor,
            marginBottom: 5,
            marginTop: 15
          }}>{props.text}</Text>

          <Text style={{
            fontFamily: fonts?.ProductSansLight,
            fontSize: fontSizes?.body,
            color: props.textTwoColor
          }}>{props.textTwo}</Text>

          <Button
            mode="contained"
            color={props.buttonColor}
            labelStyle={{
              color: props.buttonTextColor
            }}
            onPress={props.onPress}
            style={{
              marginTop: 15,
              borderRadius: 20,
            }}>
            {props.buttonText}</Button>
        </View>

      </ImageBackground >
    </View>
    // </TouchableOpacity>
  )
}

interface CardProps {
  children?: any;
  backgroundColor: any;
  elevation: number;
  iconName: any;
  title: string;
  titleColor?: any;
  titleTwoColor?: any;
  buttonColor?: any;
  buttonTextColor?: any;
  textColor?: any;
  textTwoColor?: any;
  titleTwo?: string;
  buttonText?: string;
  text?: string;
  textTwo?: string;
  onPress?: () => void;
  iconColor?: any;
  borderColor?: string;
}

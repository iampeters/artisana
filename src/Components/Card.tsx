import React from 'react'
import { View, Text, Dimensions, ImageBackground } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CustomThemeInterface } from '../Interfaces/interface';
import { useTheme } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

let { width } = Dimensions.get('window');

export default function Card(props: CardProps) {
  const { colors, fonts, fontSizes }: CustomThemeInterface = useTheme();

  return (
    <TouchableOpacity onPress={props.onPress}>

      <View style={{
        backgroundColor: props.backgroundColor,
        borderRadius: 10,
        // borderTopRightRadius: 10,
        // borderTopLeftRadius: 10,
        // borderBottomRightRadius: 10,
        // elevation: props.elevation,
      }}>
        <ImageBackground source={require('../../assets/bg.png')} style={{
          width: width / 2.3,
          height: 100,
          borderRadius: 10,
          justifyContent: 'space-around',
          alignItems: 'center',
          flexDirection: 'row',
        }}>

          <MaterialCommunityIcons name={props.iconName} color={colors.primary} size={22} />

          <View style={{
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
            <Text style={{
              fontFamily: fonts?.FuturaMedium,
              fontSize: fontSizes?.body,
              color: colors.white
            }}>{props.title}</Text>
            <Text style={{
              fontFamily: fonts?.FuturaBold,
              fontSize: fontSizes?.cardTitle,
              color: colors.primary,
              textAlign: 'center'
            }}>{props.cardValue}</Text>
          </View>

        </ImageBackground >
      </View>
    </TouchableOpacity>
  )
}

interface CardProps {
  children?: any;
  backgroundColor: any;
  elevation: number;
  iconName: any;
  onPress?: () => void;
  title: string;
  cardValue: number;
}

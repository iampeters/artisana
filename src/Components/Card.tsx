import React from 'react'
import { View, Text, Dimensions, ImageBackground } from 'react-native'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
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
        marginBottom: 10
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

          <MaterialCommunityIcons name={props.iconName} color={props.color? props.color: colors.primary} size={30} />

          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text style={{
              fontFamily: fonts?.FuturaBold,
              fontSize: fontSizes?.body,
              color: colors.white,
              marginBottom: 5
            }}>{props.title}</Text>
            <Text style={{
              fontFamily: fonts?.FuturaBold,
              fontSize: fontSizes?.cardTitle,
              color: props.color ? props.color : colors.primary,
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
  color?: string;
}

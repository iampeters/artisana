import React from 'react'
import { View } from 'react-native'
import { SocialIcon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import { CustomThemeInterface } from '../Interfaces/interface';
import { useTheme } from '@react-navigation/native';

export default function Social(props: SocialAuth) {
  const { colors, fontSizes, fonts }: CustomThemeInterface = useTheme();

  return (
    <React.Fragment>
      <Animatable.Text animation='fadeIn' style={{
        color: colors.light,
        fontFamily: fonts?.FuturaRegular,
        fontSize: fontSizes?.small,
        marginTop: 30,

      }}
      >Or continue with</Animatable.Text>

      <View style={{
        flexDirection: "row",
        marginTop: 20,
      }}>
        <TouchableOpacity onPress={props.googleAuth}>
          <SocialIcon
            // title='Sign In With Facebook'
            // button
            light

            type='google'
          // style={{
          //   ...styles.button,
          //   // backgroundColor: colors.primary,
          //   marginTop: 15
          // }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={props.facebookAuth}>
          <SocialIcon
            // title='Sign In With Facebook'
            // button
            light
            type='facebook'
          // style={{
          //   ...styles.button,
          //   // backgroundColor: colors.primary,
          //   marginTop: 15
          // }}
          />
        </TouchableOpacity>
      </View>
    </React.Fragment>
  )
}

interface SocialAuth {
  facebookAuth?: any;
  googleAuth?: any;
}

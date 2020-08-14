import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { CustomThemeInterface } from '../Interfaces/interface';
import { useTheme, StackActions } from '@react-navigation/native';
import { Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import BackgroundImage from '../Components/ImageBackground';
import Social from '../Components/Social';
import CustomButtons from '../Components/Buttons';
import { useSelector } from 'react-redux';
import { Reducers } from '../interfaces/interface';

let img = require('../../assets/Silas-Adekunle.jpg');

let { width } = Dimensions.get("window");

export default function GetStarted({ navigation }: any) {
  const { colors, fontSizes, fonts }: CustomThemeInterface = useTheme();
  const auth = useSelector((state: Reducers) => state.auth);


  React.useEffect(() => {
    if (Object.entries(auth).length !== 0) {
      navigation.dispatch(StackActions.replace('Auth'));
    }

  }, [auth]);


  return (
    <BackgroundImage img={img} justifyContent="flex-end">

      <Animatable.Text animation='fadeIn' style={{
        color: colors.white,
        fontFamily: fonts?.RubikBold,
        textTransform: 'uppercase',
        fontSize: fontSizes?.title,
        marginBottom: 15,
      }}
        h1
      >Get Started</Animatable.Text>
      <Animatable.Text animation='fadeIn' style={{
        color: colors.white,
        fontFamily: fonts?.ProductSansRegular,
        fontSize: fontSizes?.body,
        marginBottom: 4,

      }}
      >Artisana is free and easily accessible</Animatable.Text>
      <Animatable.Text animation='fadeIn' style={{
        color: colors.white,
        fontFamily: fonts?.ProductSansRegular,
        fontSize: fontSizes?.body,
        marginBottom: 4,

      }}
      >Sign up, add and review artisans</Animatable.Text>

      <View style={{ ...styles.buttonContainer }}>
        <CustomButtons
          title="Login"
          type="solid"
          backgroundColor={colors.white}
          fontFamily={fonts?.RubikMedium}
          color={colors.primary}
          onPress={() => navigation.navigate('Login')}
        />

        <CustomButtons
          title="Sign Up"
          type="solid"
          backgroundColor={colors.primary}
          fontFamily={fonts?.RubikMedium}
          color={colors.white}
          marginTop={15}
          onPress={() => navigation.navigate('Register')}
        />
        <Social />
      </View>
    </BackgroundImage>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    padding: 15,
    width: width - 40,
  }, buttonContainer: {
    marginTop: 70,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

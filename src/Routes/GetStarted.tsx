import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { CustomThemeInterface } from '../Interfaces/interface';
import { useTheme, StackActions } from '@react-navigation/native';
import { Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import BackgroundImage from '../Components/ImageBackground';
import Social from '../Components/Social';
import CustomButtons from '../Components/Buttons';
import { useDispatch, useSelector } from 'react-redux';
import { Reducers } from '../interfaces/interface';
import firebase, { FacebookAuth, GoogleAuth } from '../Firebase/FirebaseConfig';
import { socialAuth } from '../Redux/Actions/userActions';

let img = require('../../assets/tailor.jpg');

let { width } = Dimensions.get("window");

export default function GetStarted({ navigation }: any) {
  const { colors, fontSizes, fonts }: CustomThemeInterface = useTheme();
  const auth = useSelector((state: Reducers) => state.auth);

  const dispatch = useDispatch();


  const handleGoogleAuth = () => {
    // open spinner
    // dispatch({
    //   type: 'LOADING',
    //   payload: true
    // });
    firebase.auth().signInWithPopup(GoogleAuth)
      .then(function (result: any) {
        const name = result.user.displayName.split(' ');
        const user = {
          firstname: name[0],
          lastname: name[1],
          email: result.user.email,
          phoneNumber: result.user.phoneNumber,
          imageUrl: result.user.photoURL
        }

        dispatch(socialAuth(user));

      }).catch(function (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;

        console.log(errorCode, errorMessage);

        dispatch({
          type: 'ALERT',
          payload: {
            message: 'Network request failed',
            successful: false,
          },
        });

        // dispatch({
        //   type: 'LOADING',
        //   payload: false
        // });
      });
  };

  const handleFacebookAuth = () => {
    // open spinner
    dispatch({
      type: 'LOADING',
      payload: true
    });
    firebase.auth().signInWithPopup(FacebookAuth)
      .then(function (result: any) {
        const name = result.user.displayName.split(' ');
        const user = {
          firstname: name[0],
          lastname: name[1],
          email: result.user.email,
          phoneNumber: result.user.phoneNumber,
          imageUrl: result.user.photoURL
        }

        dispatch(socialAuth(user));

      }).catch(function (error) {
        // close spinner

        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;

        console.log(errorCode, errorMessage);
        dispatch({
          type: 'ALERT',
          payload: {
            message: 'Network request failed',
            successful: false,
          },
        });

        dispatch({
          type: 'LOADING',
          payload: false
        });
      });
  };

  React.useEffect(() => {
    if (Object.entries(auth).length !== 0) {
      navigation.dispatch(StackActions.replace('Auth'));
    }

  }, [auth]);


  return (
    <BackgroundImage img={img} justifyContent="flex-end">

      <Animatable.Text animation='fadeIn' style={{
        color: colors.white,
        fontFamily: fonts?.FuturaBold,
        textTransform: 'uppercase',
        fontSize: fontSizes?.title,
        marginBottom: 15,
      }}
        h1
      >Get Started</Animatable.Text>
      <Animatable.Text animation='fadeIn' style={{
        color: colors.white,
        fontFamily: fonts?.FuturaRegular,
        fontSize: fontSizes?.body,
        marginBottom: 4,

      }}
      >Artisana is free and easily accessible</Animatable.Text>
      <Animatable.Text animation='fadeIn' style={{
        color: colors.white,
        fontFamily: fonts?.FuturaRegular,
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
          color={colors.black}
          onPress={() => navigation.navigate('Login')}
        />

        <CustomButtons
          title="Sign Up"
          type="solid"
          backgroundColor={colors.primary}
          fontFamily={fonts?.RubikMedium}
          color={colors.black}
          marginTop={15}
          onPress={() => navigation.navigate('Register')}
        />
        <Social
          googleAuth={handleGoogleAuth}
          facebookAuth={handleFacebookAuth} />
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

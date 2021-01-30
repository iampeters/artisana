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
import { socialAuth } from '../Redux/Actions/userActions';
import * as Google from "expo-google-app-auth";
import * as Facebook from 'expo-facebook';
import { ActivityIndicator } from 'react-native-paper';

let img = require('../../assets/tailor.jpg');

let { width } = Dimensions.get("window");

export default function GetStarted({ navigation }: any) {
  const { colors, fontSizes, fonts }: CustomThemeInterface = useTheme();
  const auth = useSelector((state: Reducers) => state.auth);
  const user = useSelector((state: Reducers) => state.user);
  const alert = useSelector((state: Reducers) => state.alert);

  const [loading, setLoader] = React.useState(false);

  const dispatch = useDispatch();

  const { height } = Dimensions.get("window")

  const signInWithGoogle = async () => {
    setLoader(true);
    try {
      const result = await Google.logInAsync({
        // iosClientId: IOS_CLIENT_ID,
        clientId: '103249686034-hbb2tpa2vglihsa21gpvh90sjsu6cni8.apps.googleusercontent.com',
        scopes: ["profile", "email"],
        // redirectUrl: 'https://auth.artisana.ng/__/auth/handler',
        // redirectUrl: 'https://artisana-cce6a.firebaseapp.com/__/auth/handler',

      });

      if (result.type === "success") {
        console.log("LoginScreen.js.js 21 | ", result.user.givenName);
        let data = result.user;

        const user = {
          firstname: data.givenName,
          lastname: data.familyName,
          email: data.email,
          // phoneNumber: result.user.phoneNumber,
          imageUrl: data.photoUrl
        }

        dispatch(socialAuth(user));
        setLoader(false);
        // this.props.navigation.navigate("Profile", {
        //   username: result.user.givenName
        // }); //after Google login redirect to Profile
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log('LoginScreen.js.js 30 | Error with login', e);
      return { error: true };
    }
  };

  const facebookLogIn = async () => {
    try {
      await Facebook.initializeAsync({
        appId: '689247371682611',
      });
      const {
        type,
        token,
        expirationDate,
        permissions,
        declinedPermissions, }: any = await Facebook.logInWithReadPermissionsAsync({
          permissions: ['public_profile'],
        });

      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        let data = await response.json();

        console.log(`======Facebook======`, data);

      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      console.log(`Facebook Login Error: ${message}`);
    }
  }

  React.useEffect(() => {

    if (alert.message === "unverified") {
      navigation.dispatch(StackActions.replace('PersonalInformation'));
    }
    else {
      if (Object.entries(auth).length !== 0 && Object.entries(user).length !== 0) {

        if (user.userType === 2) {

          if (user)
            navigation.dispatch(StackActions.replace('ArtisanAuth')); // artisan login

        } else {
          navigation.dispatch(StackActions.replace('Auth')); //  user login 
        }
      }
    }

  }, [auth, user, alert]);



  return (
    <BackgroundImage img={img} justifyContent="flex-end">

      {loading &&
        <View style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: height,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          zIndex: 2000,
          backgroundColor: "rgba(0,0,0, 0.5)",

        }}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>}

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
          color={colors.dark}
          onPress={() => navigation.dispatch(StackActions.replace('Login'))}
        />

        <CustomButtons
          title="Register As User"
          type="solid"
          backgroundColor={colors.primary}
          fontFamily={fonts?.RubikMedium}
          color={colors.dark}
          marginTop={15}
          onPress={() => navigation.dispatch(StackActions.replace('Register'))}
        />

        <CustomButtons
          title="Register As Artisan"
          type="solid"
          backgroundColor={colors.primary}
          fontFamily={fonts?.RubikMedium}
          color={colors.dark}
          marginTop={15}
          onPress={() => navigation.dispatch(StackActions.replace('ArtisanRegister'))}
        />

        <Social
          googleAuth={signInWithGoogle}
          facebookAuth={facebookLogIn}
        />
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

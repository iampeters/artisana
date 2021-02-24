import React from 'react'
import { View } from 'react-native'
import { SocialIcon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import { CustomThemeInterface } from '../Interfaces/interface';
import { useTheme } from '@react-navigation/native';
import * as Google from "expo-google-app-auth";
import * as Facebook from 'expo-facebook';


export default function Social(props: SocialAuth) {
  const { colors, fontSizes, fonts }: CustomThemeInterface = useTheme();

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
          permissions: ['public_profile', 'email'],
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

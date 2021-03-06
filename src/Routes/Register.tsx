import React from 'react'
import { View, Text, StyleSheet, Platform, Dimensions } from 'react-native'
import { CustomThemeInterface } from '../Interfaces/interface';
import { useTheme, StackActions, useNavigation } from '@react-navigation/native';
import BackgroundImage from '../Components/ImageBackground';
import { Container, Input } from 'native-base';
import { Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import Social from '../Components/Social';
import InputFieldWithIcon from '../Components/Inputs';
import CustomButtons from '../Components/Buttons';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { Reducers } from '../interfaces/interface';
import { login, signUp, socialAuth } from '../Redux/Actions/userActions';
import * as Google from "expo-google-app-auth";
import * as Facebook from 'expo-facebook';
let img = require('../../assets/Silas-Adekunle.jpg');
let { width, height } = Dimensions.get("window");

export default function Register(props: any) {
  const { colors, fonts, fontSizes }: CustomThemeInterface = useTheme();

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const alert = useSelector((state: Reducers) => state.alert);
  const user = useSelector((state: Reducers) => state.user);
  const auth = useSelector((state: Reducers) => state.auth);


  const [email, setEmail]: any = React.useState();
  const [password, setPassword]: any = React.useState();
  const [firstname, setFirstname]: any = React.useState();
  const [lastname, setLastname]: any = React.useState();
  const [hidden, setHidden] = React.useState(true);
  const [submitted, setSubmitted] = React.useState(false);
  const [isPasswordValid, setPasswordValid]: any = React.useState(null);
  const [isPasswordMatch, setPasswordMatch]: any = React.useState(null);
  const [isLastnameValid, setLastnameValid]: any = React.useState(null);
  const [isFirstnameValid, setFirstValid]: any = React.useState(null);
  const [phoneNumber, setPhoneNumber]: any = React.useState();
  const [isPhoneNumberValid, setPhoneNumberValid]: any = React.useState(null);
  const [isEmailValid, setEmailValid]: any = React.useState(null);
  const [loading, setLoader] = React.useState(false);

  const validateEmail = (text: any) => {
    // email pattern
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!reg.test(text)) {
      setEmailValid(false);
      setEmail(text.toLowerCase());
    } else {
      setEmailValid(true);
      setEmail(text);
    }
  };

  const validateName = (text: any, type: any) => {
    // email pattern
    let reg = /^[a-zA-Z]{2,}$/;
    if (!reg.test(text)) {
      if (type === 'firstname') {
        setFirstname(text);
        setFirstValid(false);
      } else {
        setLastname(text);
        setLastnameValid(false);
      }
    } else {
      if (type === 'firstname') {
        setFirstname(text);
        setFirstValid(true);
      } else {
        setLastname(text);
        setLastnameValid(true);
      }
    }
  };

  const validatePhoneNumber = (text: any) => {
    let reg = /^[0-9]{11,11}$/;
    if (!reg.test(text)) {
      setPhoneNumber(text);
      setPhoneNumberValid(false);
    } else {
      setPhoneNumber(text);
      setPhoneNumberValid(true);
    }
  };

  const validatePassword = (text: any) => {
    let reg = /(?=.*\d)(?=.*[a-z]*[A-Z]).{6,}/;
    // min 6 chars
    //  number required
    //   uppercase letter
    if (!reg.test(text)) {
      setPasswordValid(false);
      setPassword(text);
    } else {
      setPasswordValid(true);
      setPassword(text);
    }
  };

  const handleVisibility = () => {
    setHidden(hidden ? false : true);
  };

  const handleSubmit = async () => {
    let user = {
      email,
      password,
      firstname,
      lastname,
      phoneNumber,
    };

    setHidden(true);
    setSubmitted(true);
    dispatch(signUp(user));
  };

  const signInWithGoogle = async () => {
    setLoader(true);
    try {
      const result = await Google.logInAsync({
        // iosClientId: IOS_CLIENT_ID,
        clientId: '103249686034-hbb2tpa2vglihsa21gpvh90sjsu6cni8.apps.googleusercontent.com',
        scopes: ["profile", "email"],
        redirectUrl: 'https://auth.artisana.ng/__/auth/handler',
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


  React.useEffect(() => {
    if (Object.entries(alert).length !== 0) {
      if (!alert.successful) {
        // display error message

        dispatch({
          type: 'LOADING',
          payload: false
        })

        setSubmitted(false);
      } else {
        dispatch({
          type: 'LOADING',
          payload: false
        })
      }
    }
  }, [dispatch, alert]);

  React.useEffect(() => {
    if (Object.entries(auth).length !== 0 && Object.entries(user).length !== 0) {

      if (user.userType === 2) {
        navigation.dispatch(StackActions.replace('ArtisanAuth')); // artisan login

      } else {
        navigation.dispatch(StackActions.replace('Auth')); //  user login 
      }
    }

  }, [auth, user]);

  return (
    <Container style={{ height }}>
      <BackgroundImage img={img} >

        <View style={{
          marginTop: Platform.OS === "ios" ? 20 : 10,
          alignItems: 'flex-start',
          justifyContent: 'space-around',
          paddingVertical: 10,
          // marginBottom: 30,
        }}>
          <Icon
            name='arrow-left'
            // raised
            // reverse
            type="font-awesome-5"
            color='#fff'
            size={fontSizes?.iconSize}
            onPress={() => props.navigation.navigate("GetStarted")} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
          justifyContent: 'flex-end',
          // flex: 1,

        }}
        >
          <View style={{
            ...styles.content
          }}>
            <Animatable.Text animation='fadeIn' style={{
              color: colors.white,
              fontFamily: fonts?.FuturaBold,
              textTransform: 'uppercase',
              fontSize: fontSizes?.title,
              marginBottom: 10,
              marginTop: Platform.OS === "ios" ? 30 : 20,
            }}
              h1
            >Create Account</Animatable.Text>
            {/* <Animatable.Text animation='fadeIn' style={{
              color: colors.white,
              fontFamily: fonts?.ProductSansLight,
              fontSize: fontSizes?.body,
              marginBottom: 4,

            }}
            >Login to your account</Animatable.Text> */}
          </View>

          <View style={{
            marginTop: 30,
          }}>
            <InputFieldWithIcon
              iconName='person'
              iconColor={
                isFirstnameValid
                  ? colors.success
                  : isFirstnameValid === null
                    ? colors.light
                    : colors.danger
              }
              iconSize={20}
              autoFocus={false}
              placeholder='Firstname'
              onChangeText={(text: any) => validateName(text, 'firstname')}
              returnKeyType='next'
              keyboardType='default'
              maxLength={15}
              placeholderTextColor={colors.light}
              textContentType='name'
              secureTextEntry={false}
              value={firstname}
              disabled={submitted}
            />

            {/* lastname */}
            <InputFieldWithIcon
              iconName='person'
              iconColor={
                isLastnameValid
                  ? colors.success
                  : isLastnameValid === null
                    ? colors.light
                    : colors.danger
              }
              iconSize={20}
              autoFocus={false}
              placeholder='Lastname'
              onChangeText={(text: any) => validateName(text, 'lastname')}
              returnKeyType='next'
              keyboardType='default'
              maxLength={15}
              placeholderTextColor={colors.light}
              textContentType='familyName'
              secureTextEntry={false}
              value={lastname}
              valid={isLastnameValid}
              disabled={submitted}
            />

            <InputFieldWithIcon
              iconName="mention"
              iconColor={
                isEmailValid
                  ? colors.success
                  : isEmailValid === null
                    ? colors.light
                    : colors.danger
              }
              iconSize={20}
              placeholder="Email"
              isPassword={false}
              placeholderTextColor={colors.light}
              onChangeText={(text: any) => validateEmail(text)}
              returnKeyType='next'
              keyboardType='email-address'
              textContentType='emailAddress'
              autoCapitalize='none'
              maxLength={null}
              onIconPress={null}
              rightIconName=''
              onSubmitEditing={null}
              blurOnSubmit={true}
              secureTextEntry={false}
              value={email}
              disabled={submitted}
            // rightIconName="eye"
            />

            <InputFieldWithIcon
              iconName='device-mobile'
              iconColor={
                isPhoneNumberValid
                  ? colors.success
                  : isPhoneNumberValid === null
                    ? colors.light
                    : colors.danger
              }
              iconSize={20}
              autoFocus={false}
              placeholder='Phone number'
              onChangeText={(text: any) => validatePhoneNumber(text)}
              returnKeyType='next'
              keyboardType='number-pad'
              placeholderTextColor={colors.light}
              textContentType='telephoneNumber'
              secureTextEntry={false}
              maxLength={11}
              value={phoneNumber}
              autoCapitalize='none'
              blurOnSubmit={true}
              isPassword={false}
              onIconPress={null}
              onSubmitEditing={null}
              rightIconName=''
              disabled={submitted}
            />

            <InputFieldWithIcon
              iconName="key"
              iconSize={20}
              iconColor={
                isPasswordValid
                  ? colors.success
                  : isPasswordValid === null
                    ? colors.light
                    : colors.danger
              }
              placeholder="Password"
              keyboardType='default'
              returnKeyType='done'
              isPassword={true}
              textContentType='password'
              autoCapitalize='none'
              secureTextEntry={hidden}
              placeholderTextColor={colors.light}
              rightIconName={hidden ? 'eye-closed' : 'eye'}
              value={password}
              maxLength={20}
              onSubmitEditing={null}
              onIconPress={handleVisibility}
              onChangeText={(text: any) => validatePassword(text)}
              disabled={submitted}
            />

            <CustomButtons
              title="SIGN UP"
              type="solid"
              backgroundColor={colors.primary}
              fontFamily={fonts?.RubikMedium}
              color={colors.black}
              marginTop={15}
              onPress={handleSubmit}
              loading={submitted}
              disabled={
                !email ||
                  !password ||
                  !isPasswordValid ||
                  !isEmailValid ||
                  !isFirstnameValid ||
                  !isLastnameValid ||
                  !setPhoneNumberValid ||
                  submitted
                  ? true
                  : false
              }
            />

            <TouchableOpacity style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 35
            }} onPress={() => props.navigation.navigate('Login')}>
              <Text style={{
                color: colors.light,
                fontFamily: fonts?.FuturaRegular,
                fontSize: fontSizes?.small,
              }}>Already a user? Sign In</Text>
            </TouchableOpacity>
          </View>
          <View style={{
            ...styles.socialContainer
          }}>
            <Social
               googleAuth={signInWithGoogle}
               facebookAuth={facebookLogIn}
              />
          </View>
        </ScrollView>
      </BackgroundImage>
    </Container>
  )
}

const styles = StyleSheet.create({
  socialContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }, content: {
    flex: 1,
    alignItems: 'flex-start',
    // justifyContent: 'center',
  }
})
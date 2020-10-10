import React from 'react'
import { View, Text, StyleSheet, Platform, Dimensions } from 'react-native'
import { CustomThemeInterface } from '../Interfaces/interface';
import { useTheme, StackActions } from '@react-navigation/native';
import BackgroundImage from '../Components/ImageBackground';
import { Container } from 'native-base';
import { Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import Social from '../Components/Social';
import InputFieldWithIcon from '../Components/Inputs';
import CustomButtons from '../Components/Buttons';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { Reducers } from '../interfaces/interface';
import { login, socialAuth } from '../Redux/Actions/userActions';
import firebase, { FacebookAuth, GoogleAuth } from '../Firebase/FirebaseConfig';


let img = require('../../assets/carpenter.jpg');
let { width, height } = Dimensions.get("window");


export default function Login(props: any) {
  const { colors, fonts, fontSizes }: CustomThemeInterface = useTheme();
  const dispatch = useDispatch();

  const alert = useSelector((state: Reducers) => state.alert);
  const auth = useSelector((state: Reducers) => state.auth);


  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [hidden, setHidden] = React.useState(true);
  const [submitted, setSubmitted] = React.useState(false);
  const [isEmailValid, setEmailValid]: any = React.useState(null);

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

  const handleVisibility = () => {
    setHidden(hidden ? false : true);
  };

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

  const handleSubmit = async () => {
    let user = {
      email: email,
      password: password,
    };


    setHidden(true);
    setSubmitted(true);
    dispatch(login(user));
  };

  React.useEffect(() => {
    if (Object.entries(alert).length !== 0) {
      if (!alert.successful) {

        dispatch({
          type: 'ALERT',
          payload: {}
        })

        setSubmitted(false);
      } else {
        dispatch({
          type: 'ALERT',
          payload: {}
        })
      }
    }
  }, [dispatch, alert]);

  React.useEffect(() => {
    if (Object.entries(auth).length !== 0) {
      props.navigation.dispatch(StackActions.replace('Auth'));
    }

  }, [auth]);


  return (
    <Container style={{ height }}>
      <BackgroundImage img={img} >

        <View style={{
          marginTop: Platform.OS === "ios" ? 20 : 10,
          alignItems: 'flex-start',
          justifyContent: 'space-around',
          paddingVertical: 10,
        }}>
          <Icon
            name='arrow-left'
            type="font-awesome-5"
            color='#fff'
            size={fontSizes?.iconSize}
            onPress={() => props.navigation.goBack()} />
        </View>

        <ScrollView scrollEnabled={false} showsVerticalScrollIndicator={false} contentContainerStyle={{
          justifyContent: 'flex-end',
          // flex: 1
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
              marginBottom: 15,
              marginTop: Platform.OS === "ios" ? 60 : 30,
            }}
              h1
            >Welcome Back</Animatable.Text>
            <Animatable.Text animation='fadeIn' style={{
              color: colors.light,
              fontFamily: fonts?.FuturaRegular,
              fontSize: fontSizes?.body,
              marginBottom: 4,

            }}
            >Login to your account</Animatable.Text>
          </View>

          <View style={{
            marginTop: 50,
          }}>
            <InputFieldWithIcon
              iconName="person"
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
            />

            <InputFieldWithIcon
              iconName="key"
              iconSize={20}
              placeholder="Password"
              keyboardType='default'
              returnKeyType='done'
              isPassword={true}
              textContentType='password'
              autoCapitalize='none'
              secureTextEntry={hidden}
              iconColor={colors.light}
              placeholderTextColor={colors.light}
              rightIconName={hidden ? 'eye-closed' : 'eye'}
              value={password}
              maxLength={20}
              onSubmitEditing={null}
              onIconPress={handleVisibility}
              onChangeText={(text: any) => setPassword(text)}
              disabled={submitted}
            />

            <CustomButtons
              title="LOGIN"
              type="solid"
              backgroundColor={colors.primary}
              fontFamily={fonts?.RubikMedium}
              color={colors.black}
              marginTop={15}
              onPress={handleSubmit}
              loading={submitted}
              disabled={
                !email || !password || !isEmailValid || submitted ? true : false
              }
            />

            <TouchableOpacity style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 35
            }} onPress={() => props.navigation.navigate('ForgotPassword')}>
              <Text style={{
                color: colors.light,
                fontFamily: fonts?.FuturaRegular,
                fontSize: fontSizes?.small,
              }}>Forgot your password?</Text>
            </TouchableOpacity>
          </View>
          <View style={{
            ...styles.socialContainer
          }}>
            <Social
              googleAuth={handleGoogleAuth}
              facebookAuth={handleFacebookAuth} />
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
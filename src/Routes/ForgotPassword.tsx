import React from 'react'
import { View, Text, StyleSheet, Platform, Dimensions } from 'react-native'
import { CustomThemeInterface } from '../Interfaces/interface';
import { useTheme } from '@react-navigation/native';
import BackgroundImage from '../Components/ImageBackground';
import { Container, Input } from 'native-base';
import { Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import Social from '../Components/Social';
import InputFieldWithIcon from '../Components/Inputs';
import CustomButtons from '../Components/Buttons';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import { Reducers } from '../interfaces/interface';
import { forgotPassword } from '../Redux/Actions/userActions';

let img = require('../../assets/user.jpg');
let { width, height } = Dimensions.get("window");


export default function ForgotPassword(props: any) {
  const { colors, fonts, fontSizes }: CustomThemeInterface = useTheme();
  const alert = useSelector((state: Reducers) => state.alert);
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState();
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

  const handleSubmit = async () => {
    let user = {
      email: email,
    };

    setSubmitted(true);
    dispatch(forgotPassword(user));
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

        // props.navigation.navigate('Home');
      }
    }
  }, [dispatch, alert]);

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
            onPress={() => props.navigation.goBack()} />
        </View>

        <ScrollView contentContainerStyle={{
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
              marginBottom: 15,
              marginTop: Platform.OS === "ios" ? 60 : 30,
            }}
              h1
            >Forgot your password?</Animatable.Text>
            <Animatable.Text animation='fadeIn' style={{
              color: colors.white,
              fontFamily: fonts?.ProductSansLight,
              fontSize: fontSizes?.body,
              marginBottom: 4,

            }}
            >Don't worry we got your back</Animatable.Text>
          </View>

          <View style={{
            marginTop: 50,
          }}>
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
              placeholder="Enter registered email"
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

            <CustomButtons
              title="REMIND ME"
              type="solid"
              backgroundColor={colors.primary}
              fontFamily={fonts?.RubikMedium}
              color={colors.black}
              marginTop={15}
              onPress={handleSubmit}
              loading={submitted}
              disabled={
                !email || !isEmailValid || submitted ? true : false
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
              }}>Remembered password? Sign In</Text>
            </TouchableOpacity>
          </View>
          <View style={{
            ...styles.socialContainer
          }}>
            <Social />
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
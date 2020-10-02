import React from 'react'
import { View, Text, StyleSheet, RefreshControl, Dimensions, Platform } from 'react-native'
import { CustomThemeInterface, Reducers } from '../Interfaces/interface';
import { useTheme } from '@react-navigation/native';
import Fab from '../Components/Fab';
import { Container, Content } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { TextInput } from 'react-native-paper';
import CustomButtons from '../Components/Buttons';
import CustomHeader from '../Components/Header';
import { changePassword } from '../Redux/Actions/userActions';
import { Icon } from 'react-native-elements';


function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}


export default function ChangePassword(props: any) {
  const { colors, fonts, fontSizes }: CustomThemeInterface = useTheme();
  const user = useSelector((state: Reducers) => state.user);
  const alert = useSelector((state: Reducers) => state.alert);
  const loading = useSelector((state: Reducers) => state.loading);
  const tokens = useSelector((state: Reducers) => state.tokens);
  const theme = useSelector((state: Reducers) => state.theme);
  const dispatch = useDispatch()

  const Theme = useTheme();

  const [minify, setMinify] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  const [oldPassword, setOldPassword]: any = React.useState('');
  const [password, setPassword]: any = React.useState('');
  const [passwordValid, setPasswordValid]: any = React.useState(null);
  const [passwordMatch, setPasswordMatch]: any = React.useState(null);
  const [confirmPassword, setConfirmPassword]: any = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  let { width, height } = Dimensions.get("window");

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  const handleState = (event: any) => {
    let scrollHeight = event.nativeEvent.contentOffset.y;
    if (scrollHeight > 50) {
      setMinify(false)
    } else {
      setMinify(true)
    }
  }

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

  const comparePassword = (text: string) => {
    setConfirmPassword(text);
    if (password === text) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  }

  const handleSubmit = (e: any) => {
    setSubmitted(true);

    // dispatch({
    //   type: 'LOADING',
    //   payload: true
    // })

    const data = {
      oldPassword,
      newPassword: password,
      confirmPassword,
      userId: user._id,
    };
    dispatch(changePassword(data, tokens));
  }

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

        setPassword('');
        setConfirmPassword('');
        setOldPassword('');
        setSubmitted(false);

        props.navigation.navigate('Account')
      }
    }
  }, [dispatch, alert]);

  return (
    <Container style={{ ...style.container, backgroundColor: colors.background }}>
      <StatusBar style={theme === "light" ? "dark" : "light"} />

      <CustomHeader title="Change password" showLeftIcon onPress={() => props.navigation.goBack()} />

      <ScrollView
        onScrollEndDrag={handleState}
        showsVerticalScrollIndicator={false}
        scrollsToTop

        refreshControl={
          <RefreshControl
            title='Refreshing'
            tintColor={colors.text}
            titleColor={colors.text}
            colors={[`${colors.text}`]}
            progressBackgroundColor={colors.surface}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        contentContainerStyle={{
          width,
          padding: 20,
        }}>

        <View>
          <TextInput
            mode="flat" allowFontScaling
            label="Current Password"
            underlineColor="transparent"
            theme={Theme}
            style={{
              backgroundColor: colors.light,
              marginBottom: 30,
            }}
            secureTextEntry
            textContentType="password"
            returnKeyType='next'
            keyboardType='default'
            value={oldPassword}
            onChangeText={(text: any) => setOldPassword(text)}
            disabled={submitted}
          />

          <TextInput
            mode="flat" allowFontScaling
            label="New Password"
            underlineColor="transparent"
            theme={Theme}
            style={{
              backgroundColor: colors.light,
              marginBottom: 30
            }}
            secureTextEntry
            textContentType="password"
            returnKeyType='next'
            keyboardType='default'
            value={password}
            onChangeText={(text: any) => validatePassword(text)}
            disabled={submitted}
            error={!passwordValid && passwordValid !== null}
          />

          <TextInput
            mode="flat" allowFontScaling
            label="Confirm Password"
            underlineColor="transparent"
            theme={Theme}
            style={{
              backgroundColor: colors.light,
              marginBottom: 30
            }}
            secureTextEntry
            textContentType="password"
            returnKeyType='done'
            keyboardType='default'
            value={confirmPassword}
            onChangeText={(text: any) => comparePassword(text)}
            disabled={submitted}
            error={!passwordMatch && passwordMatch !== null}
          />

          <CustomButtons
            title="CHANGE PASSWORD"
            type="solid"
            backgroundColor={colors.appBar}
            fontFamily={fonts?.RubikMedium}
            color={colors.white}
            marginTop={15}
            onPress={handleSubmit}
            loading={submitted}
            disabled={
              !passwordValid || !password || !passwordMatch || submitted ? true : false
            }
          />
        </View>




      </ScrollView>
      {/* <Fab onPress={() => props.navigation.navigate('AddArtisan')} iconName="plus" size={20} color={colors.white} backgroundColor={colors.purple} label={minify ? "add Artisan" : ""} /> */}
    </Container>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
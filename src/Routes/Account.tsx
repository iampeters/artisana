import React from 'react'
import { View, Text, StyleSheet, RefreshControl, Dimensions, Platform, Alert } from 'react-native'
import { CustomThemeInterface, Reducers } from '../Interfaces/interface';
import { useTheme } from '@react-navigation/native';
import Fab from '../Components/Fab';
import { Container } from 'native-base';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import { Icon, Avatar } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { SharedElement } from 'react-navigation-shared-element';
import TextCard from '../Components/TextCard';
import Functions from '../Helpers/Functions';
import { Switch } from 'react-native-paper';
import { setTheme } from '../Redux/Actions/themeActions';
import { Fontisto, FontAwesome5 } from '@expo/vector-icons';
import { logout } from '../Redux/Actions/userActions';
import CustomHeader from '../Components/Header';


function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}


export default function Account(props: any) {
  const { colors, fonts, fontSizes }: CustomThemeInterface = useTheme();
  const user = useSelector((state: Reducers) => state.user);
  const alert = useSelector((state: Reducers) => state.alert);
  const theme = useSelector((state: Reducers) => state.theme);

  const dispatch = useDispatch();

  const [minify, setMinify] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isSwitchOn, setIsSwitchOn] = React.useState(theme === 'dark' ? true : false);
  const [spinner, setSpinner] = React.useState(false);

  // const { data } = props.route.params;  

  const onToggleSwitch = () => {
    switch (theme) {
      case 'light': {
        dispatch(setTheme('dark'));
        break;
      }
      case 'dark': {
        dispatch(setTheme('light'));
        break;
      }

      default:
        dispatch(setTheme('light'));
    }
  };

  const logOut = () => {
    setSpinner(true);
    // setTimeout(() => {
    dispatch(logout());
    // }, 2000);
    // BackHandler.exitApp();
  };

  const confirmExit = () => {

    Alert.alert(
      'Logout',
      'we will miss you',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Yes', onPress: logOut, style: 'destructive' },
      ],
      { cancelable: true }
    );
    // return true;
  };

  React.useEffect(() => {
    if (theme === 'dark') {
      setIsSwitchOn(true);
    } else {
      setIsSwitchOn(false);
    }
  }, [theme]);


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

  return (
    <Container style={{ ...style.container, backgroundColor: colors.background }}>
      <Spinner
        visible={spinner}
        textContent={'Goodbye...'}
        color={colors.text}
        animation='fade'
      />

      <CustomHeader title="Account" justifyContent="center" onPress={() => props.navigation.goBack()} />

      <ScrollView
        onScrollEndDrag={handleState}
        showsVerticalScrollIndicator={false}
        // scrollsToTop
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
          // height,
          // paddingTop: Platform.OS === "ios" ? 70 : 50,
          padding: 20,
        }}>

        <View style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 10,
          width: width - 40,
          marginBottom: 20
        }}>

          <SharedElement id={'user.' + user._id}>
            <Avatar source={{ uri: user.imageUrl }} rounded size="xlarge" />
          </SharedElement>

          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text style={{
              fontFamily: fonts?.FuturaBold,
              color: colors.text,
              fontSize: fontSizes?.heading,
              marginTop: 10,
            }}>{user.firstname} {user.lastname}</Text>

            <Text style={{
              fontFamily: fonts?.FuturaMedium,
              color: colors.gray,
              fontSize: 14
            }}>{user.email}</Text>
          </View>
        </View>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: "wrap",
          marginBottom: 20,
        }}>
          {/* <TextCard backgroundColor={colors.light} title="First Name" subTitle={user.firstname} /> */}
          {/* <TextCard backgroundColor={colors.light} title="Last Name" subTitle={user.lastname} /> */}
          {/* <TextCard backgroundColor={colors.light} title="Email Address" subTitle={user.email} /> */}
          <TextCard backgroundColor={colors.light} title="Phone Number" subTitle={user.phoneNumber} />
          <TextCard
            backgroundColor={colors.light}
            title="Location"
            subTitle={user.state ? (user.state + ', ' + user.country) : 'N/A'} />

          <TextCard backgroundColor={colors.light} title="Last Login"
            subTitle={Functions.getDate(user.lastLogin)} />

          <TextCard backgroundColor={colors.light} title="Joined Since"
            subTitle={Functions.getDate(user.createdOn)} />
        </View>

        {/* <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20
        }}>
          <Text style={{
            fontFamily: fonts?.RubikMedium,
            color: colors.text
          }}>Enable Dark Mode</Text>
          <Switch value={isSwitchOn}
            onValueChange={onToggleSwitch}
            color={colors.primary} />
        </View> */}

        <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
          <View style={{
            flexDirection: 'row',
            // justifyContent: 'space-evenly',
            alignItems: 'center',
            marginBottom: 20,
            borderColor: colors.light,
            borderWidth: 1,
            padding: 20,
            borderRadius: 10,
            borderBottomRightRadius: 0
          }}>
            <Fontisto name="person" color={colors.text} size={22} />
            <Text style={{
              fontFamily: fonts?.FuturaRegular,
              fontSize: 16,
              color: colors.text,
              marginLeft: 50
            }}>Profile Settings</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => props.navigation.navigate('ChangePassword')}>
          <View style={{
            flexDirection: 'row',
            // justifyContent: 'space-evenly',
            alignItems: 'center',
            marginBottom: 20,
            borderColor: colors.light,
            borderWidth: 1,
            padding: 20,
            borderRadius: 10,
            borderBottomRightRadius: 0
          }}>
            <FontAwesome5 name="key" color={colors.text} size={22} />
            <Text style={{
              fontFamily: fonts?.FuturaRegular,
              fontSize: 16,
              color: colors.text,
              marginLeft: 50
            }}>Change Password</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => confirmExit()}>
          <View style={{
            flexDirection: 'row',
            // justifyContent: 'space-evenly',
            alignItems: 'center',
            marginBottom: 20,
            borderColor: colors.light,
            borderWidth: 1,
            padding: 20,
            borderRadius: 10,
            borderBottomRightRadius: 0
          }}>
            <FontAwesome5 name="sign-out-alt" color={colors.danger} size={22} />
            <Text style={{
              fontFamily: fonts?.ProductSansBold,
              fontSize: 16,
              color: colors.danger,
              marginLeft: 50
            }}>Logout</Text>
          </View>
        </TouchableOpacity>

      </ScrollView>
      {/* <Fab onPress={() => props.navigation.navigate('AddArtisan')} iconName="plus" size={20} color={colors.dark} backgroundColor={colors.warn} label={minify ? "add Artisan" : ""} /> */}
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
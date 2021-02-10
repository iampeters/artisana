import React from 'react'
import { View, Text, StyleSheet, RefreshControl, Dimensions, Platform, Alert } from 'react-native'
import { CustomThemeInterface, Reducers } from '../Interfaces/interface';
import { useTheme } from '@react-navigation/native';
import Fab from '../Components/Fab';
import { ActionSheet, Container, Content } from 'native-base';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import CustomHeader from '../Components/Header';
import { updateAccount } from '../Redux/Actions/userActions';
import { Avatar, TextInput } from 'react-native-paper';
import CustomButtons from '../Components/Buttons';
import * as ImagePicker from 'expo-image-picker';
import { fileUpload } from '../Redux/Actions/fileAction';
import { Picker } from '@react-native-community/picker';

function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}


export default function Profile(props: any) {
  const { colors, fonts, fontSizes }: CustomThemeInterface = useTheme();
  const user = useSelector((state: Reducers) => state.user);
  const alert = useSelector((state: Reducers) => state.alert);
  const theme = useSelector((state: Reducers) => state.theme);
  const file = useSelector((state: Reducers) => state.file);
  const tokens = useSelector((state: Reducers) => state.tokens);

  const [minify, setMinify] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const dispatch = useDispatch();
  const Theme = useTheme();

  const [imageUrl, setImageUrl]: any = React.useState(user.imageUrl);
  const [firstname, setFirstname]: any = React.useState(user.firstname);
  const [lastname, setLastname]: any = React.useState(user.lastname);
  const [state, setState]: any = React.useState(user.state);
  const [country, setCountry]: any = React.useState(user.country);
  const [phoneNumber, setPhoneNumber]: any = React.useState(user.phoneNumber);
  const [email, setEmail]: any = React.useState(user.email);
  const [isPhoneNumberValid, setPhoneNumberValid]: any = React.useState(user.phoneNumber ? true : null);
  const [isEmailValid, setEmailValid]: any = React.useState(user.email ? true : null);
  const [submitted, setSubmitted] = React.useState(false);
  const [isImage, setIsImage] = React.useState(false);
  const [pickerOpacity, setPickerOpacity] = React.useState(0);
  const RAND_NUM = Math.floor(Math.random() * 1234567890);

  let { width, height } = Dimensions.get("window");

  // const handleFile = (e: any) => {
  //   let pic = e.currentTarget.files[0];
  //   let fd = new FormData();
  //   if (pic) {
  //     fd.append('imageUrl', pic)
  //     fd.append('code', `${RAND_NUM}`)
  //     dispatch(fileUpload(fd, tokens))
  //     dispatch({
  //       type: 'LOADING',
  //       payload: true
  //     })

  //   }
  // }

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

  const handleFileAction = (type: any) => {
    if (type) {
      switch (type.text) {
        case 'Camera': {
          pickImageCamera();
          break;
        }
        case 'File Explorer': {
          pickImageFile()
          break;
        }
        default:
          return;
      }
    }
  };

  const handleFile = () => {
    const BUTTONS = [
      {
        text: 'Camera',
        icon: "ios-camera",
      },
      {
        text: 'File Explorer',
        icon: "ios-albums",
      },
    ];

    ActionSheet.show(
      {
        options: BUTTONS,
      },
      (buttonIndex) => {
        handleFileAction(BUTTONS[buttonIndex]);
      }
    );
  };

  const pickImageFile = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {

      // ImagePicker saves the taken photo to disk and returns a local URI to it
      let localUri = result.uri;
      let filename: any = localUri.split('/').pop();

      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      let fd: any = new FormData();
      fd.append('imageUrl', { uri: localUri, name: filename, type })
      fd.append('code', `${RAND_NUM}`)

      dispatch(fileUpload(fd, tokens))
      dispatch({
        type: 'LOADING',
        payload: true
      });
    }
  };

  const pickImageCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      // mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {

      // ImagePicker saves the taken photo to disk and returns a local URI to it
      let localUri = result.uri;
      let filename: any = localUri.split('/').pop();

      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      let fd: any = new FormData();
      fd.append('imageUrl', { uri: localUri, name: filename, type })
      fd.append('code', `${RAND_NUM}`)

      dispatch(fileUpload(fd, tokens))
      dispatch({
        type: 'LOADING',
        payload: true
      })
    }
  };

  React.useEffect(() => {
    if (file && file.successful) {
      setImageUrl(file.result);
      setIsImage(true);
    }
  }, [file]);

  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const handleSubmit = (e: any) => {
    setSubmitted(true);

    dispatch({
      type: 'LOADING',
      payload: true
    })

    const data = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      phoneNumber: phoneNumber,
      imageUrl: imageUrl,
      _id: user._id,
      state: state,
      country: country
    };

    dispatch(updateAccount(data, tokens));
  }

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

        setSubmitted(false);

        props.navigation.navigate('Account')
      }
    }
  }, [dispatch, alert]);

  return (
    <Container style={{ ...style.container, backgroundColor: colors.background }}>
      <StatusBar style={theme === "light" ? "dark" : "light"} />

      <CustomHeader title="Edit profile" showLeftIcon onPress={() => props.navigation.goBack()} />

      <ScrollView
        onScroll={handleState}
        onScrollToTop={() => setMinify(false)}
        // onMomentumScrollEnd={handleState}
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
          <TouchableOpacity
            onPress={handleFile}
            style={{
              marginBottom: 25
            }}
          >
            <React.Fragment>
              <Avatar.Image
                source={{ uri: imageUrl }}
                size={80}
                style={{
                  backgroundColor: colors.transparent
                }}
              />

              <Text>Change Image</Text>
            </React.Fragment>

          </TouchableOpacity>

          <TextInput
            mode="flat" allowFontScaling
            label="First Name"
            underlineColor="transparent"
            theme={Theme}
            style={{
              backgroundColor: colors.light,
              marginBottom: 30
            }}
            textContentType="name"
            returnKeyType='next'
            keyboardType='default'
            value={firstname}
            onChangeText={(text: any) => setFirstname(text)}
            disabled={submitted}
          />

          <TextInput
            mode="flat" allowFontScaling
            label="Last Name"
            underlineColor="transparent"
            theme={Theme}
            style={{
              backgroundColor: colors.light,
              marginBottom: 30
            }}
            textContentType="familyName"
            returnKeyType='next'
            keyboardType='default'
            value={lastname}
            onChangeText={(text: any) => setLastname(text)}
            disabled={submitted}
          />

          <TextInput
            mode="flat" allowFontScaling
            label="Email Address"
            underlineColor="transparent"
            theme={Theme}
            style={{
              backgroundColor: colors.light,
              marginBottom: 30
            }}
            textContentType="emailAddress"
            returnKeyType='done'
            keyboardType='email-address'
            value={email}
            onChangeText={(text: any) => validateEmail(text)}
            disabled={submitted}
            error={!isEmailValid && isEmailValid !== null}
          />

          <TextInput
            mode="flat" allowFontScaling
            label="Phone Number"
            underlineColor="transparent"
            theme={Theme}
            style={{
              backgroundColor: colors.light,
              marginBottom: 30
            }}
            textContentType="telephoneNumber"
            returnKeyType='next'
            keyboardType='phone-pad'
            value={phoneNumber}
            onChangeText={(text: any) => validatePhoneNumber(text)}
            disabled={submitted}
            error={!isPhoneNumberValid && isPhoneNumberValid !== null}
          />

          <TextInput
            mode="flat" allowFontScaling
            label="State"
            underlineColor="transparent"
            theme={Theme}
            style={{
              backgroundColor: colors.light,
              marginBottom: 30
            }}
            textContentType="addressState"
            returnKeyType='next'
            keyboardType='default'
            value={state}
            onChangeText={(text: any) => setState(text)}
            disabled={submitted}
          />

          <TextInput
            mode="flat" allowFontScaling
            label="Country"
            underlineColor="transparent"
            theme={Theme}
            style={{
              backgroundColor: colors.light,
              marginBottom: 30
            }}
            textContentType="countryName"
            returnKeyType='done'
            keyboardType='default'
            value={country}
            onChangeText={(text: any) => setCountry(text)}
            disabled={submitted}
          />

          <CustomButtons
            title="UPDATE PROFILE"
            type="solid"
            backgroundColor={colors.warn}
            fontFamily={fonts?.RubikMedium}
            color={colors.dark}
            marginTop={15}
            onPress={handleSubmit}
            loading={submitted}
            disabled={
              !isEmailValid || !isPhoneNumberValid || submitted ? true : false
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
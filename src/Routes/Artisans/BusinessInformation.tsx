import React from 'react'
import { View, Text, StyleSheet, RefreshControl, Dimensions, Platform, Alert } from 'react-native'
import { Category, CountryProps, CustomThemeInterface, Reducers, StateProps } from '../../Interfaces/interface';
import { useTheme } from '@react-navigation/native';
import { ActionSheet, Container, Icon, Item } from 'native-base';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import CustomHeader from '../../Components/Header';
import CustomButtons from '../../Components/Buttons';
import { Avatar, TextInput } from 'react-native-paper';
import { getCategory } from '../../Redux/Actions/categoryActions';
import { States } from '../../Helpers/States';
import { Countries } from '../../Helpers/Countries';
import { createArtisan } from '../../Redux/Actions/artisanActions';
import * as ImagePicker from 'expo-image-picker';
import { fileUpload } from '../../Redux/Actions/fileAction';
// import { Picker } from '@react-native-picker/picker';
import { Picker } from '@react-native-community/picker';

export default function BusinessInformation(props: any) {
  const { colors, fonts, fontSizes }: CustomThemeInterface = useTheme();
  const user = useSelector((state: Reducers) => state.user);
  const alert = useSelector((state: Reducers) => state.alert);
  const theme = useSelector((state: Reducers) => state.theme);
  const loading = useSelector((state: Reducers) => state.loading);
  const [minify, setMinify] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(loading);
  const file = useSelector((state: Reducers) => state.file);
  const tokens = useSelector((state: Reducers) => state.tokens);
  const category = useSelector((state: Reducers) => state.category);

  const dispatch = useDispatch();
  const Theme = useTheme();
  let categoryList: any[] = category.items ? category.items : [];

  const [imageUrl, setImageUrl]: any = React.useState('/add-user.png');
  const [country, setCountry]: any = React.useState('');
  const [email, setEmail]: any = React.useState('');
  const [isPhoneNumberValid, setPhoneNumberValid]: any = React.useState(null);
  const [isEmailValid, setEmailValid]: any = React.useState(null);
  const [firstname, setFirstname] = React.useState('')
  const [firstnameValid, setFirstnameValid]: any = React.useState(null)
  const [lastname, setLastname] = React.useState('')
  const [categoryId, setCategoryId]: any = React.useState('');
  const [lastnameValid, setLastnameValid]: any = React.useState(null)
  const [phoneNumber, setPhoneNumber] = React.useState('')
  const [businessName, setBusinessName]: any = React.useState('');
  const [RCNumber, setRCNumber]: any = React.useState('');
  const [address, setAddress]: any = React.useState('');
  const [state, setState]: any = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);
  const [isImage, setIsImage] = React.useState(false);
  const [pickerOpacity, setPickerOpacity] = React.useState(0);
  const [opacityOfOtherItems, setOpacityOfOtherItems] = React.useState(1);

  const RAND_NUM = Math.floor(Math.random() * 1234567890);

  let { width, height } = Dimensions.get("window");
  let filter: any = {};
  let paginationConfig = {
    page: 1,
    pageSize: 0,
    whereCondition: JSON.stringify(filter)
  }
  let imageFile = require('../../../assets/add-user.png')

  const onRefresh = React.useCallback(() => {
    dispatch(getCategory(paginationConfig, tokens));
    dispatch({
      type: 'LOADING',
      payload: true
    });
  }, [refreshing]);

  const handleState = (event: any) => {
    let scrollHeight = event.nativeEvent.contentOffset.y;
    if (scrollHeight > 50) {
      setMinify(false)
    } else {
      setMinify(true)
    }
  }

  const reset = () => {
    setState('');
    setAddress('');
    setFirstname('');
    setBusinessName('');
    setCategoryId('');
    setCountry('');
    setEmail('');
    setLastname('');
    setLastnameValid(null);
    setIsImage(false);
    setSubmitted(false);
    setRCNumber('');
    setPhoneNumber('');
    setPhoneNumberValid(null);
    setEmailValid(null);
    setImageUrl('/add-user.png');
  }

  const handleSubmit = (e: any) => {
    setSubmitted(true);

    dispatch({
      type: 'LOADING',
      payload: true
    })

    const artisan = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      phoneNumber: phoneNumber,
      address: address,
      categoryId: categoryId,
      createdBy: user._id,
      imageUrl: imageUrl,
      businessName: businessName,
      RCNumber: RCNumber,
      state: state,
      country: country
    };

    dispatch(createArtisan(artisan, tokens));
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

  React.useEffect(() => {
    setRefreshing(loading);
  }, [loading])

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

  const validateName = (text: any, type: any) => {
    // minimum of one character
    let reg = /^[a-zA-Z]{1,}$/;
    if (!reg.test(text)) {

      if (type === 'firstname') {
        setFirstname(text);
        setFirstnameValid(false);
      } else {
        setLastname(text);
        setLastnameValid(false);
      }
    } else {
      if (type === 'firstname') {
        setFirstname(text);
        setFirstnameValid(true);
      } else {
        setLastname(text);
        setLastnameValid(true);
      }
    }
  };

  React.useEffect(() => {

    const subscribe = props.navigation.addListener('focus', () => {

      dispatch(getCategory(paginationConfig, tokens));
      dispatch({
        type: 'LOADING',
        payload: true
      });
    });


    const unsubscribe = props.navigation.addListener('blur', () => {
      // reset component
      reset();
      subscribe();

      dispatch({
        type: 'GET_CATEGORY',
        payload: {}
      });

      dispatch({
        type: 'FILE_UPLOAD',
        payload: {}
      });
    });
  }, [dispatch]);

  const toggle = () => {
    if (Platform.OS === 'ios') {

      if (pickerOpacity == 0) {
        setPickerOpacity(1);
        setOpacityOfOtherItems(0) // THIS WILL HIDE YOUR BUTTON!
      } else {
        setPickerOpacity(0);
        setOpacityOfOtherItems(1);
      }
    }
  }


  React.useEffect(() => {

    if (Object.entries(alert).length !== 0) {
      if (!alert.successful) {

        setSubmitted(false);

        dispatch({
          type: 'ALERT',
          payload: {}
        })

      } else {

        props.navigation.navigate('Category');
        dispatch({
          type: 'ALERT',
          payload: {}
        })
      }
    }
  }, [dispatch, alert]);

  return (
    <Container style={{ ...style.container, backgroundColor: colors.background }}>
      <StatusBar style={theme === "light" ? "dark" : "light"} />

      <CustomHeader title="Add artisan" showLeftIcon onPress={() => props.navigation.goBack()} />

      <ScrollView
        onScroll={handleState}
        onScrollToTop={() => setMinify(false)}
        onMomentumScrollEnd={handleState}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
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
          // height,
          padding: 20,
        }}>

        <View>

          <TouchableOpacity
            onPress={handleFile}
            style={{
              marginBottom: 25
            }}
          >
            {!isImage &&
              <React.Fragment>
                <Avatar.Image
                  source={imageFile}
                  size={80}
                  style={{
                    backgroundColor: colors.transparent
                  }}
                />

                <Text>Choose image</Text>
              </React.Fragment>
            }

            {isImage &&
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
            }

          </TouchableOpacity>

          <View style={{
            // marginTop: 40
            marginBottom: 15,
          }}>
            <Text style={{
              fontFamily: fonts?.FuturaBold,
              textTransform: 'uppercase',
              color: colors.text
            }}>Basic Information</Text>
          </View>

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
            onChangeText={(text: any) => validateName(text, 'firstname')}
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
            onChangeText={(text: any) => validateName(text, 'lastname')}
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

          {Platform.OS === "android" && <Item picker style={{
            backgroundColor: colors.light,
            borderBottomColor: colors.transparent,
            padding: 5
          }}>
            <Picker
              mode="dialog"
              style={{ width: '100%', color: colors.dark }}
              selectedValue={categoryId}
              onValueChange={(itemValue: any, itemPosition: number) => setCategoryId(itemValue)}
            >
              <Picker.Item label="Select Category" value={""} color={colors.warn} />
              {categoryList.length !== 0 && categoryList.map((item: Category, index: number) => {
                return (
                  <Picker.Item label={item.name} value={item._id} key={index} />
                )
              })}

            </Picker>
          </Item>}

          {Platform.OS === "ios" && <Item picker style={{
            backgroundColor: colors.light,
            borderBottomColor: colors.transparent,
            padding: 5
          }}>
            <Picker

              mode="dialog"
              style={{ width: '100%' }}
              // itemStyle={{ height: 50, borderColor: colors.transparent  }}
              selectedValue={categoryId}
              onValueChange={(itemValue: any, itemPosition: number) => setCategoryId(itemValue)}
            >
              <Picker.Item label="Select" value={""} color={colors.warn} />
              {categoryList.length !== 0 && categoryList.map((item: Category, index: number) => {
                return (
                  <Picker.Item label={item.name} value={item._id} key={index} />
                )
              })}

            </Picker>
          </Item>}


          <View style={{
            marginTop: 40,
            marginBottom: 15,
          }}>
            <Text style={{
              fontFamily: fonts?.FuturaBold,
              textTransform: 'uppercase',
              color: colors.text
            }}>Business Information</Text>
          </View>

          <TextInput
            mode="flat" allowFontScaling
            label="Business Name"
            underlineColor="transparent"
            theme={Theme}
            style={{
              backgroundColor: colors.light,
              marginBottom: 30
            }}
            textContentType="organizationName"
            returnKeyType='next'
            keyboardType='default'
            value={businessName}
            onChangeText={(text: any) => setBusinessName(text)}
            disabled={submitted}
          />

          <TextInput
            mode="flat" allowFontScaling
            label="RC Number"
            underlineColor="transparent"
            theme={Theme}
            style={{
              backgroundColor: colors.light,
              // marginBottom: 30
            }}
            textContentType="none"
            returnKeyType='next'
            keyboardType='default'
            value={RCNumber}
            onChangeText={(text: any) => setRCNumber(text)}
            disabled={submitted}
          />

          <View style={{
            marginTop: 40,
            marginBottom: 15,
          }}>
            <Text style={{
              fontFamily: fonts?.FuturaBold,
              textTransform: 'uppercase',
              color: colors.text
            }}>Artisan Location</Text>
          </View>

          <TextInput
            mode="flat" allowFontScaling
            label="Address"
            underlineColor="transparent"
            theme={Theme}
            style={{
              backgroundColor: colors.light,
              marginBottom: 30
            }}
            textContentType="streetAddressLine1"
            returnKeyType='next'
            keyboardType='default'
            value={address}
            onChangeText={(text: any) => setAddress(text)}
            disabled={submitted}
          />

          <Item picker style={{
            backgroundColor: colors.light,
            borderBottomColor: colors.transparent,
            padding: 5,
            marginBottom: 30
          }}>
            <Picker
              mode="dialog"
              style={{ width: '100%' }}
              selectedValue={state}
              onValueChange={(itemValue: any, itemPosition: number) => setState(itemValue)}
            >
              <Picker.Item label="Select State" value="" color={colors.warn} />
              {States.length !== 0 && States.map((item: StateProps, index: number) => {
                return (
                  <Picker.Item label={item.name} value={item.name} key={index} />
                )
              })}

            </Picker>
          </Item>

          <Item picker style={{
            backgroundColor: colors.light,
            borderBottomColor: colors.transparent,
            padding: 5,
            marginBottom: 30
          }}>
            <Picker
              mode="dialog"
              style={{ width: '100%' }}
              selectedValue={country}
              onValueChange={(itemValue: any, itemPosition: number) => setCountry(itemValue)}
            >
              <Picker.Item label="Select Country" value="" color={colors.warn} />
              {Countries.length !== 0 && Countries.map((item: CountryProps, index: number) => {
                return (
                  <Picker.Item label={item.label} value={item.label} key={index} />
                )
              })}

            </Picker>
          </Item>

          <CustomButtons
            title="UPDATE ACCOUNT"
            type="solid"
            backgroundColor={colors.warn}
            fontFamily={fonts?.RubikMedium}
            color={colors.dark}
            marginTop={15}
            onPress={handleSubmit}
            loading={submitted}
            disabled={
              !lastnameValid ||
                !firstnameValid ||
                !isPhoneNumberValid ||
                state === '' ? true : false ||
                  country === '' ? true : false ||
                    address === '' ? true : false ||
                    submitted
            }
          />

        </View>


      </ScrollView>
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

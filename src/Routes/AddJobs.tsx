import React from 'react'
import { View, Text, StyleSheet, ScrollView, RefreshControl, Dimensions } from 'react-native'
import { Artisans, Category, CustomThemeInterface, Reducers, StateProps } from '../Interfaces/interface';
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { createReviews } from '../Redux/Actions/reviewAction';
import { getArtisanDetails } from '../Redux/Actions/artisanActions';
import { Container, Item } from 'native-base';
import { StatusBar } from 'expo-status-bar';
import CustomHeader from '../Components/Header';
import { Avatar, Rating, AirbnbRating } from 'react-native-elements';
import { Picker } from '@react-native-community/picker';
import { TextInput } from 'react-native-paper';
import CustomButtons from '../Components/Buttons';
import { createJob } from '../Redux/Actions/jobActions';
import { getCategory } from '../Redux/Actions/categoryActions';
import { States } from '../Helpers/States';

export default function AddJobs
  (props: any) {
  const { colors, fonts, fontSizes }: CustomThemeInterface = useTheme();
  const alert = useSelector((state: Reducers) => state.alert);
  const loading = useSelector((state: Reducers) => state.loading);
  const tokens = useSelector((state: Reducers) => state.tokens);
  const theme = useSelector((state: Reducers) => state.theme);
  const user = useSelector((state: Reducers) => state.user);
  const category = useSelector((state: Reducers) => state.category);

  const dispatch = useDispatch();
  const Theme = useTheme();

  const [title, setTitle]: any = React.useState('');
  const [description, setDescription]: any = React.useState('');
  const [submitted, setSubmitted]: any = React.useState(null);
  const [phoneNumberValid, setPhoneNumberValid]: any = React.useState(null);
  const [phoneNumber, setPhoneNumber]: any = React.useState('');
  const [categoryId, setCategoryId]: any = React.useState('')
  const [state, setState]: any = React.useState('');
  const [lga, setLga]: any = React.useState('');
  const [address, setAddress]: any = React.useState('');

  let list: any = category.items && category.items;
  // let params: any = props.route.params.item;
  let { width } = Dimensions.get("window");

  const handleSubmit = () => {
    setSubmitted(true);

    dispatch({
      type: 'LOADING',
      payload: true
    })

    const data = {
      title,
      description,
      categoryId: categoryId,
      phoneNumber,
      userId: user._id,
      state,
      address,
      lga
    };

    dispatch(createJob(data, tokens));    

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

  React.useEffect(() => {
    let filter: any = {};
    let paginationConfig = {
      page: 1,
      pageSize: 0,
      whereCondition: JSON.stringify(filter)
    }
    dispatch(getCategory(paginationConfig, tokens));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  React.useEffect(() => {

    if (Object.entries(alert).length !== 0) {
      if (!alert.successful) {

        setSubmitted(false);

        dispatch({
          type: 'ALERT',
          payload: {}
        })

      } else {

        props.navigation.navigate('MyJobs');
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

      <CustomHeader
        title={"Add Review"}
        showLeftIcon
        onPress={() => props.navigation.goBack()} />

      <ScrollView
        scrollsToTop

        contentContainerStyle={{
          width,
          paddingBottom: 20,
          paddingHorizontal: 20,
        }}>


        <View>
          <TextInput
            mode="flat" allowFontScaling
            label="Job Title"
            underlineColor="transparent"
            theme={Theme}
            style={{
              backgroundColor: colors.light,
              marginBottom: 30
            }}
            textContentType="none"
            keyboardType='default'
            value={title}
            onChangeText={(text: any) => setTitle(text)}
            disabled={submitted}
          />

          <Item picker style={{
            backgroundColor: colors.light,
            borderBottomColor: colors.transparent,
            padding: 5,
            marginBottom: 20
          }}>

            <Picker
              mode="dialog"
              style={{ width: '100%', color: colors.dark }}
              selectedValue={categoryId}
              onValueChange={(itemValue: any, itemPosition: number) => setCategoryId(itemValue)}
            >
              <Picker.Item label="Select Category" value={""} color={colors.warn} />
              {list && list.length !== 0 && list.map((item: Category, index: number) => {
                return (
                  <Picker.Item label={item.name} value={item._id} key={index} />
                )
              })}

            </Picker>
          </Item>

          <TextInput
            mode="flat" allowFontScaling
            label="Contact Phone Number"
            underlineColor="transparent"
            theme={Theme}
            style={{
              backgroundColor: colors.light,
              marginBottom: 30
            }}
            textContentType="none"
            keyboardType='default'
            value={phoneNumber}
            onChangeText={(text: any) => validatePhoneNumber(text)}
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

          <TextInput
            mode="flat" allowFontScaling
            label="Local Government"
            underlineColor="transparent"
            theme={Theme}
            style={{
              backgroundColor: colors.light,
              marginBottom: 30
            }}
            textContentType="none"
            keyboardType='default'
            value={lga}
            onChangeText={(text: any) => setLga(text)}
            disabled={submitted}
          />

          <TextInput
            mode="flat" allowFontScaling
            label="Address"
            underlineColor="transparent"
            theme={Theme}
            style={{
              backgroundColor: colors.light,
              marginBottom: 30
            }}
            textContentType="none"
            keyboardType='default'
            value={address}
            onChangeText={(text: any) => setAddress(text)}
            disabled={submitted}
          />

          <TextInput
            mode="flat" allowFontScaling
            label="Description"
            underlineColor="transparent"
            theme={Theme}
            style={{
              backgroundColor: colors.light,
              marginBottom: 30
            }}
            textContentType="none"
            keyboardType='default'
            value={description}
            onChangeText={(text: any) => setDescription(text)}
            disabled={submitted}
          />

          <CustomButtons
            title="Create Job"
            type="solid"
            backgroundColor={colors.appBar}
            fontFamily={fonts?.RubikMedium}
            color={colors.white}
            marginTop={15}
            onPress={handleSubmit}
            loading={submitted}
            disabled={
              description === '' ? true : false || !phoneNumberValid ||
                title === '' ? true : false ||
                  state === '' ? true : false ||
                    lga === '' ? true : false ||
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
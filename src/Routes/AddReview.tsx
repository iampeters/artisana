import React from 'react'
import { View, Text, StyleSheet, ScrollView, RefreshControl, Dimensions } from 'react-native'
import { Artisans, CustomThemeInterface, Reducers } from '../Interfaces/interface';
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

export default function AddReview(props: any) {
  const { colors, fonts, fontSizes }: CustomThemeInterface = useTheme();
  const alert = useSelector((state: Reducers) => state.alert);
  const loading = useSelector((state: Reducers) => state.loading);
  const tokens = useSelector((state: Reducers) => state.tokens);
  const theme = useSelector((state: Reducers) => state.theme);
  const user = useSelector((state: Reducers) => state.user);

  const dispatch = useDispatch();
  const Theme = useTheme();

  const artisan = useSelector((state: Reducers) => state.artisan);

  const [title, setTitle]: any = React.useState('');
  const [description, setDescription]: any = React.useState('');
  const [rating, setRating] = React.useState<number | string>(0);
  const [submitted, setSubmitted]: any = React.useState(null);
  const [ratingSet, setRatingSet]: any = React.useState(null);

  let data: Artisans = artisan.result && artisan.result;
  let params: any = props.route.params.item;
  let { width } = Dimensions.get("window");

  const titles: any[] = [
    { name: 'Poor', value: "Poor" },
    { name: 'Very poor', value: "Very poor" },
    { name: "Good", value: "Good" },
    { name: "Very good", value: "Very good" },
    { name: "Excellent", value: "Excellent" }
  ];

  const handleSubmit = () => {

    if (rating !== 0) {
      setSubmitted(true);

      dispatch({
        type: 'LOADING',
        payload: true
      })

      const review = {
        title,
        description,
        rating,
        artisanId: params._id,
        userId: user._id
      };      

      dispatch(createReviews(review, tokens));
    } else {
      setRatingSet(false)
    }
  }

  const ratingCompleted = (rating: number) => {
    setRating(rating)
    setRatingSet(true);
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

        props.navigation.goBack();
        dispatch({
          type: 'ALERT',
          payload: {}
        })
      }
    }
  }, [dispatch, alert]);

  React.useEffect(() => {

    const unsubscribe = props.navigation.addListener('focus', () => {
      dispatch({
        type: 'LOADING',
        payload: true
      })

      dispatch(getArtisanDetails(params._id, tokens))
    });


    // return subscription;
    const unmount = props.navigation.addListener('blur', () => {
      unsubscribe;
      dispatch({
        type: 'GET_ARTISAN',
        payload: {}
      });
    });

    return () => {
      unmount;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

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
        <View style={{
          justifyContent: "center",
          alignItems: "center",
        }}>
          <Avatar source={{ uri: params.imageUrl }} size="large" rounded />
          <Text style={{
            color: colors.dark,
            fontFamily: fonts?.FuturaMedium,
            marginTop: 5,
            fontSize: fontSizes?.body
          }}>{params.name}</Text>
          <Text style={{
            color: colors.dark,
            fontFamily: fonts?.FuturaMedium,
            marginTop: 5,
            fontSize: fontSizes?.small
          }}>{params.address}</Text>
          <Text style={{
            color: colors.dark,
            fontFamily: fonts?.FuturaMedium,
            marginTop: 5,
            fontSize: fontSizes?.small
          }}>{params.state}, {params.country}</Text>
        </View>

        <View style={{
          marginBottom: 10
        }}>
          <AirbnbRating
            count={5}
            reviews={["Bad", "Poor", "Ok", "Good", "Excellent"]}
            defaultRating={0}
            size={30}
            showRating
            onFinishRating={ratingCompleted}
          />
        </View>


        <View>
          <Item picker style={{
            backgroundColor: colors.light,
            borderBottomColor: colors.transparent,
            padding: 5,
            marginBottom: 20
          }}>
            <Picker
              mode="dialog"
              style={{ width: '100%', color: colors.dark }}
              selectedValue={title}
              onValueChange={(itemValue: any, itemPosition: number) => setTitle(itemValue)}
            >
              <Picker.Item label="Select" value={""} color={colors.warn} />
              {titles.length !== 0 && titles.map((item: any, index: number) => {
                return (
                  <Picker.Item label={item.name} value={item.value} key={index} />
                )
              })}

            </Picker>
          </Item>

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
            title="ADD REVIEW"
            type="solid"
            backgroundColor={colors.appBar}
            fontFamily={fonts?.RubikMedium}
            color={colors.white}
            marginTop={15}
            onPress={handleSubmit}
            loading={submitted}
            disabled={
              !ratingSet ||
                title === '' ? true : false ||
                  description === '' ? true : false ||
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
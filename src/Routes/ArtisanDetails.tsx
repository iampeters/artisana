import React from 'react'
import { View, Text, StyleSheet, Dimensions, ScrollView, RefreshControl } from 'react-native'
import { Artisans, CustomThemeInterface, Reducers, Reviews } from '../Interfaces/interface';
import { useIsFocused, useNavigation, useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews } from '../Redux/Actions/reviewAction';
import CustomHeader from '../Components/Header';
import { Container } from 'native-base';
import { StatusBar } from 'expo-status-bar';
import Fab from '../Components/Fab';
import { Avatar, Rating } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getArtisanDetails } from '../Redux/Actions/artisanActions';

export default function ArtisanDetails(props: any) {
  const { colors, fonts, fontSizes }: CustomThemeInterface = useTheme();
  const alert = useSelector((state: Reducers) => state.alert);
  const loading = useSelector((state: Reducers) => state.loading);
  const tokens = useSelector((state: Reducers) => state.tokens);
  const theme = useSelector((state: Reducers) => state.theme);
  const user = useSelector((state: Reducers) => state.user);
  const isFocused = useIsFocused();

  const dispatch = useDispatch();

  const [minify, setMinify] = React.useState(true);
  const [refreshing] = React.useState(loading);
  const reviews = useSelector((state: Reducers) => state.reviews);

  let reviewList: any = reviews.items && reviews.items;

  const [page, setPage] = React.useState(0)
  const [pageSize, setPageSize] = React.useState(25)
  const [open, setOpen] = React.useState(false);

  let { width } = Dimensions.get("window");
  let params: Artisans | any = props.route.params.item;

  let filter: any = { artisanId: params._id };
  let paginationConfig = {
    page: page + 1,
    pageSize,
    whereCondition: JSON.stringify(filter)
  }

  const onRefresh = React.useCallback(() => {
    dispatch(getArtisanDetails(params._id, tokens))
    dispatch(getReviews(paginationConfig, tokens));
    dispatch({
      type: 'LOADING',
      payload: true
    })

  }, [refreshing]);

  const handleState = (event: any) => {
    let scrollHeight = event.nativeEvent.contentOffset.y;
    if (scrollHeight > 50) {
      setMinify(false)
    } else {
      setMinify(true)
    }
  }

  React.useEffect(() => {

    if (isFocused) {
      dispatch({
        type: 'LOADING',
        payload: true
      });

       dispatch(getArtisanDetails(params._id, tokens))
      dispatch(getReviews(paginationConfig, tokens));
    }


    return () => {
      dispatch({
        type: 'GET_REVIEWS',
        payload: {},
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isFocused]);

  React.useEffect(() => {
    if (Object.entries(alert).length !== 0) {
      if (!alert.successful) {

        dispatch({
          type: 'ALERT',
          payload: {}
        })

      } else {
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
        // title={params.name}
        showLeftIcon
        onPress={() => props.navigation.goBack()} />


      <ScrollView
        onScroll={handleState}
        onScrollToTop={() => setMinify(false)}
        onMomentumScrollEnd={handleState}
        showsVerticalScrollIndicator={false}
        pagingEnabled
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
          marginVertical: 10
        }}>
          <Rating imageSize={30} fractions={1} startingValue={params.rating} />
        </View>

        <View style={{
          marginVertical: 10
        }}>
          <Text style={{
            color: colors.dark,
            fontFamily: fonts?.FuturaBold,
            marginTop: 5,
            fontSize: fontSizes?.body
          }}>Reviews</Text>
        </View>

        <View style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "flex-start",
          // paddingHorizontal: 10
        }}>

          {reviewList && !loading ? (
            <React.Fragment>

              {reviewList.length !== 0 && reviewList?.map((item: Reviews, index: number) => {
                return (
                  <View style={{
                    flexDirection: "row",
                    width: "100%",
                    paddingVertical: 5,
                    marginBottom: 10
                  }} key={index}>
                    <View style={{
                      flexDirection: "row",
                    }}>
                      <Avatar source={{ uri: item.userId.imageUrl }} size="small" rounded />

                    </View>

                    <View style={{
                      marginLeft: 20,
                      flex: 1
                    }}>
                      <Text style={{
                        color: colors.dark,
                        fontFamily: fonts?.FuturaMedium,
                        fontSize: fontSizes?.body
                      }}>{item.title}</Text>
                      <Text style={{
                        color: colors.dark,
                        fontFamily: fonts?.FuturaRegular,
                        fontSize: fontSizes?.small
                      }}>{item.userId.firstname} {item.userId.lastname} - {item.description}</Text>
                    </View>
                    { user._id !== item.userId._id && <View>

                      <TouchableOpacity onPress={() => props.navigation.navigate('Messages', { item: item.userId })}>
                        <MaterialIcons name="email" size={25} color={colors.success} />
                      </TouchableOpacity>

                    </View>}
                  </View>
                )
              })}


              {reviewList.length === 0 &&
                <View style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}>
                  <Text>No Result</Text>
                </View>
              }
            </React.Fragment>
          ) : (<>
            <Text>Loading...</Text>
          </>)}

        </View>


      </ScrollView>
      <Fab onPress={() => props.navigation.navigate('AddReview', { item: params })} iconName="plus" size={20} color={colors.dark} backgroundColor={colors.warn} label={minify ? "add Review" : ""} />
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
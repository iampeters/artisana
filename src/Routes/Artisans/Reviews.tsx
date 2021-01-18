import React from 'react'
import { View, Text, StyleSheet, RefreshControl, Dimensions, ActivityIndicator } from 'react-native'
import { CustomThemeInterface, Reducers, Reviews } from '../../Interfaces/interface';
import { useIsFocused, useTheme } from '@react-navigation/native';
import { Container } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import CustomHeader from '../../Components/Header';
import { Avatar } from 'react-native-elements';
import { getReviews } from '../../Redux/Actions/reviewAction';

export default function ArtisanReviews(props: any) {
  const { colors, fonts, fontSizes }: CustomThemeInterface = useTheme();
  const user = useSelector((state: Reducers) => state.user);
  const alert = useSelector((state: Reducers) => state.alert);
  const theme = useSelector((state: Reducers) => state.theme);
  const loading = useSelector((state: Reducers) => state.loading);
  const tokens = useSelector((state: Reducers) => state.tokens);

  const [, setMinify] = React.useState(true);
  const [refreshing] = React.useState(loading ? true : false);
  const reviews = useSelector((state: Reducers) => state.reviews);
  const dispatch = useDispatch();

  const [page] = React.useState(0)
  const [pageSize] = React.useState(25)

  let reviewList: any = reviews.items && reviews.items;

  const isFocused = useIsFocused();


  let { width } = Dimensions.get("window");


  let filter: any = { artisanId: user._id };
  let paginationConfig = {
    page: page + 1,
    pageSize,
    whereCondition: JSON.stringify(filter)
  }

  const onRefresh = React.useCallback(() => {
    dispatch(getReviews(paginationConfig, tokens));

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


  React.useEffect(() => {

    if (isFocused) {
      dispatch({
        type: 'LOADING',
        payload: true
      });

      dispatch(getReviews(paginationConfig, tokens));

    } else {
      dispatch({
        type: 'GET_REVIEWS',
        payload: {},
      });
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

      <CustomHeader title="Reviews" />

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
          // height,

          padding: 20,
        }}>


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
              <View style={{
                height: 400,
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}>
                <ActivityIndicator size='large' color={colors.dark} />
              </View>
          </>)}

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
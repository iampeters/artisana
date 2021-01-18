import { useIsFocused, useNavigation, useTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Container } from 'native-base';
import React from 'react'
import { View, Text, StyleSheet, ScrollView, RefreshControl, Dimensions, ActivityIndicator } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import CustomButtons from '../../Components/Buttons';
import CustomHeader from '../../Components/Header';
import Functions from '../../Helpers/Functions';
import { CustomThemeInterface, JobProps, Reducers } from '../../Interfaces/interface';
import { getJobDetails } from '../../Redux/Actions/jobActions';
import { timeoutRequest } from '../../Redux/Actions/requestActions';

export default function ArtisanJobDetails(props: any) {
  const { colors, fonts, fontSizes }: CustomThemeInterface = useTheme();
  const alert = useSelector((state: Reducers) => state.alert);
  const loading = useSelector((state: Reducers) => state.loading);
  const tokens = useSelector((state: Reducers) => state.tokens);
  const theme = useSelector((state: Reducers) => state.theme);
  const jobs: JobProps = useSelector((state: any) => state.jobDetails);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const Theme = useTheme();

  const [refreshing, setRefreshing] = React.useState(loading);

  let { width } = Dimensions.get("window");
  let params: any | any = props.route.params;


  const onRefresh = React.useCallback(() => {
    dispatch(getJobDetails(params.id, tokens))
    dispatch(timeoutRequest(params.id, tokens));

    dispatch({
      type: 'LOADING',
      payload: true
    });

  }, [refreshing]);

  const handleState = (event: any) => {
    let scrollHeight = event.nativeEvent.contentOffset.y;
  }

  React.useEffect(() => {

    if (isFocused) {
      console.log(jobs);


      dispatch({
        type: 'LOADING',
        payload: true
      });

      dispatch({
        type: 'ARTISANS',
        payload: {},
      });

      setRefreshing(loading);

      dispatch(getJobDetails(params.id, tokens));
      dispatch(timeoutRequest(params.id, tokens));
    } else {
      dispatch({
        type: 'GET_JOBS_DETAILS',
        payload: {},
      });

      dispatch({
        type: 'ARTISANS',
        payload: {},
      });
    }


    return () => {
      dispatch({
        type: 'GET_JOBS_DETAILS',
        payload: {},
      });

      dispatch({
        type: 'ARTISANS',
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
        title={"Job Details"}
        showLeftIcon
        onPress={() => navigation.goBack()} />


      <ScrollView
        onScroll={handleState}
        // onScrollToTop={() => setMinify(false)}
        onMomentumScrollEnd={handleState}
        showsVerticalScrollIndicator={false}
        // pagingEnabled
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

        {!loading && !refreshing && Object.entries(jobs).length !== 0 ?
          (
            <React.Fragment>
              <View style={{
                marginBottom: 15,
                // width: "auto"
              }} >
                {jobs && jobs.status === "PENDING" && <Text style={{
                  color: colors.dark,
                  backgroundColor: colors.warn,
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  borderRadius: 25,
                  fontSize: 12,
                  textAlign: "center",
                  fontFamily: fonts?.FuturaBold,
                }}>{jobs.status}</Text>}

                {jobs && jobs.status === "NEW" && <Text style={{
                  color: colors.dark,
                  backgroundColor: colors.warn,
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  borderRadius: 25,
                  fontSize: 12,
                  textAlign: "center",
                  fontFamily: fonts?.FuturaBold,
                }}>{jobs.status}</Text>}

                {jobs && jobs.status === "COMPLETED" && <Text style={{
                  color: colors.dark,
                  backgroundColor: colors.success,
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  borderRadius: 25,
                  fontSize: 12,
                  textAlign: "center",
                  fontFamily: fonts?.FuturaBold,
                }}>{jobs.status}</Text>}

                {jobs && jobs.status === "ASSIGNED" && <Text style={{
                  color: colors.dark,
                  backgroundColor: colors.success,
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  borderRadius: 25,
                  fontSize: 12,
                  textAlign: "center",
                  fontFamily: fonts?.FuturaBold,
                }}>{jobs.status}</Text>}
              </View>


              <View style={{
                borderColor: colors.border,
                borderWidth: 1,
                padding: 15,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                marginVertical: 5
              }} >
                <Text style={{
                  fontFamily: fonts?.FuturaBold,
                  fontSize: fontSizes?.body,
                  marginBottom: 5
                }}>Name</Text>
                <Text style={{
                  fontFamily: fonts?.FuturaMedium,
                  fontSize: fontSizes?.small,
                  color: colors.dark
                }}>{jobs.title}</Text>
              </View>

              <View style={{
                borderColor: colors.border,
                borderWidth: 1,
                padding: 15,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                marginVertical: 5
              }} >
                <Text style={{
                  fontFamily: fonts?.FuturaBold,
                  fontSize: fontSizes?.body,
                  marginBottom: 5
                }}>Category</Text>
                <Text style={{
                  fontFamily: fonts?.FuturaMedium,
                  fontSize: fontSizes?.small,
                  color: colors.dark
                }}>{jobs.categoryId && jobs.categoryId.name}</Text>
              </View>

              <View style={{
                borderColor: colors.border,
                borderWidth: 1,
                padding: 15,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                marginVertical: 5
              }} >
                <Text style={{
                  fontFamily: fonts?.FuturaBold,
                  fontSize: fontSizes?.body,
                  marginBottom: 5
                }}>Date</Text>
                <Text style={{
                  fontFamily: fonts?.FuturaMedium,
                  fontSize: fontSizes?.small,
                  color: colors.dark
                }}>{jobs.createdOn ? Functions.getDate(jobs.createdOn) : "-"}</Text>
              </View>

              {/* <View style={{
                borderColor: colors.border,
                borderWidth: 1,
                padding: 15,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                marginVertical: 5
              }} >
                <Text style={{
                  fontFamily: fonts?.FuturaBold,
                  fontSize: fontSizes?.body,
                  marginBottom: 5
                }}>Contact</Text>
                <Text style={{
                  fontFamily: fonts?.FuturaMedium,
                  fontSize: fontSizes?.small,
                  color: colors.dark
                }}>{jobs.phoneNumber}</Text>
              </View> */}
              {/* 
              <View style={{
                borderColor: colors.border,
                borderWidth: 1,
                padding: 15,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                marginVertical: 5
              }} >
                <Text style={{
                  fontFamily: fonts?.FuturaBold,
                  fontSize: fontSizes?.body,
                  marginBottom: 5
                }}>Address</Text>
                <Text style={{
                  fontFamily: fonts?.FuturaMedium,
                  fontSize: fontSizes?.small,
                  color: colors.dark
                }}>{jobs.address}</Text>
              </View> */}


              <View style={{
                borderColor: colors.border,
                borderWidth: 1,
                padding: 15,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                marginVertical: 5
              }} >
                <Text style={{
                  fontFamily: fonts?.FuturaBold,
                  fontSize: fontSizes?.body,
                  marginBottom: 5
                }}>Local Government</Text>
                <Text style={{
                  fontFamily: fonts?.FuturaMedium,
                  fontSize: fontSizes?.small,
                  color: colors.dark
                }}>{jobs.lga}</Text>
              </View>


              <View style={{
                borderColor: colors.border,
                borderWidth: 1,
                padding: 15,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                marginBottom: 10,
                marginTop: 5
              }} >
                <Text style={{
                  fontFamily: fonts?.FuturaBold,
                  fontSize: fontSizes?.body,
                  marginBottom: 5
                }}>State</Text>
                <Text style={{
                  fontFamily: fonts?.FuturaMedium,
                  fontSize: fontSizes?.body,
                  color: colors.dark
                }}>{jobs.state}</Text>
              </View>

              {/* <View style={{
                marginBottom: 15,
                marginTop: 15
              }} >
                {jobs.status === "NEW" && <CustomButtons
                  title="Assign Job"
                  type="solid"
                  backgroundColor={colors.warn}
                  fontFamily={fonts?.RubikMedium}
                  color={colors.dark}
                  marginTop={15}
                  onPress={() => navigation.navigate("AssignJob", { job: jobs })}
                />}

                {jobs.status === "COMPLETED" && <CustomButtons
                  title="Review Artisan"
                  type="solid"
                  backgroundColor={colors.warn}
                  fontFamily={fonts?.RubikMedium}
                  color={colors.dark}
                  marginTop={15}
                  onPress={() => navigation.navigate("AddReview", { job: jobs })}
                />}
              </View> */}

            </React.Fragment>

          ) : (
            <View style={{
              height: 400,
              justifyContent: "center",
              alignItems: "center"
            }}>
              <ActivityIndicator size='large' color={colors.dark} />
            </View>
          )}

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
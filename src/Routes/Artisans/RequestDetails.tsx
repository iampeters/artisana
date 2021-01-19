import { useIsFocused, useNavigation, useTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Container } from 'native-base';
import React from 'react'
import { View, Text, StyleSheet, ScrollView, RefreshControl, Dimensions, Alert, ActivityIndicator } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import CustomButtons from '../../Components/Buttons';
import CustomHeader from '../../Components/Header';
import Functions from '../../Helpers/Functions';
import { CustomThemeInterface, JobProps, Reducers } from '../../Interfaces/interface';
import { acceptRequest, getRequestDetails, rejectRequest, timeoutRequest } from '../../Redux/Actions/requestActions';

export default function RequestDetails(props: any) {
  const { colors, fonts, fontSizes }: CustomThemeInterface = useTheme();
  const alert = useSelector((state: Reducers) => state.alert);
  const loading = useSelector((state: Reducers) => state.loading);
  const tokens = useSelector((state: Reducers) => state.tokens);
  const theme = useSelector((state: Reducers) => state.theme);
  const jobs: any = useSelector((state: Reducers) => state.requestDetails);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const Theme = useTheme();

  const [refreshing, setRefreshing] = React.useState(loading);

  let { width } = Dimensions.get("window");
  let params: any | any = props.route.params;

  const [submitted, setSubmitted] = React.useState(false);
  const [type, setType] = React.useState(0);


  const onRefresh = React.useCallback(() => {
    dispatch(getRequestDetails(params.id, tokens))
    dispatch(timeoutRequest(params.id, tokens));

    dispatch({
      type: 'LOADING',
      payload: true
    });

  }, [refreshing]);

  const handleState = (event: any) => {
    let scrollHeight = event.nativeEvent.contentOffset.y;
  }

  const acceptJob = () => {

    setSubmitted(true);
    setType(1);

    dispatch(acceptRequest(params.id, tokens,));
  };

  const rejectJob = () => {

    setSubmitted(true);
    setType(2);

    dispatch(rejectRequest(params.id, tokens));
  };

  const handleConfirm = (type: number) => {

    Alert.alert(
      'Are you sure?',
      '',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Yes', onPress: type === 1 ? acceptJob : rejectJob, style: 'destructive' },
      ],
      { cancelable: true }
    );
    // return true;
  };

  React.useEffect(() => {

    if (isFocused) {

      dispatch({
        type: 'LOADING',
        payload: true
      });

      dispatch(getRequestDetails(params.id, tokens));
      dispatch(timeoutRequest(params.id, tokens));
    } else {
      dispatch({
        type: 'GET_REQUESTS_DETAILS',
        payload: {},
      });

      dispatch({
        type: 'ARTISANS',
        payload: {},
      });
    }


    return () => {
      dispatch({
        type: 'GET_REQUESTS_DETAILS',
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
        });

        setSubmitted(false);
        setType(0);

      } else {
        onRefresh();

        setSubmitted(false);
        setType(0);

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
        title={"Request Details"}
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

                {jobs && jobs.status === "TIMEOUT" && <Text style={{
                  color: colors.white,
                  backgroundColor: colors.danger,
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  borderRadius: 25,
                  fontSize: 12,
                  textAlign: "center",
                  fontFamily: fonts?.FuturaBold,
                }}>{jobs.status}</Text>}

                {jobs && jobs.status === "DECLINED" && <Text style={{
                  color: colors.white,
                  backgroundColor: colors.danger,
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
                  color: colors.white,
                  backgroundColor: colors.success,
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  borderRadius: 25,
                  fontSize: 12,
                  textAlign: "center",
                  fontFamily: fonts?.FuturaBold,
                }}>{jobs.status}</Text>}

                {jobs && jobs.status === "ACCEPTED" && <Text style={{
                  color: colors.white,
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
                }}>{jobs.jobId ? jobs.jobId.title : "-"}</Text>
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
                }}>Contact</Text>
                <Text style={{
                  fontFamily: fonts?.FuturaMedium,
                  fontSize: fontSizes?.small,
                  color: colors.dark
                }}>{jobs.jobId ? jobs.jobId.phoneNumber : "N/A"}</Text>
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
                }}>Address</Text>
                <Text style={{
                  fontFamily: fonts?.FuturaMedium,
                  fontSize: fontSizes?.body,
                  color: colors.dark
                }}>{jobs.jobId ? jobs.jobId.address : "N/A"}</Text>
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
                }}>LGA</Text>
                <Text style={{
                  fontFamily: fonts?.FuturaMedium,
                  fontSize: fontSizes?.body,
                  color: colors.dark
                }}>{jobs.jobId ? jobs.jobId.lga : "N/A"}</Text>
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
                }}>{jobs.jobId ? jobs.jobId.state : "N/A"}</Text>
              </View>

              <View style={{
                marginBottom: 15,
                marginTop: 15
              }} >
                {jobs.status === "NEW" && <CustomButtons
                  title={"Accept"}
                  disabled={submitted}
                  type="solid"
                  backgroundColor={colors.success}
                  fontFamily={fonts?.RubikMedium}
                  color={colors.white}
                  loading={submitted}
                  marginTop={15}
                  onPress={() => handleConfirm(1)}
                />}

                {jobs.status === "NEW" && <CustomButtons
                  title={"Decline"}
                  type="solid"
                  disabled={submitted}
                  backgroundColor={colors.danger}
                  loading={submitted}
                  fontFamily={fonts?.RubikMedium}
                  color={colors.white}
                  marginTop={15}
                  onPress={() => handleConfirm(2)}
                />}
              </View>

            </React.Fragment>

          ) : (
            <View style={{
              height: 400,
              flex: 1,
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
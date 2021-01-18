import React from 'react'
import { View, Text, StyleSheet, RefreshControl, Dimensions, Platform, ActivityIndicator } from 'react-native'
import { CustomThemeInterface, Reducers } from '../../Interfaces/interface';
import { useIsFocused, useNavigation, useTheme } from '@react-navigation/native';
import { Container } from 'native-base';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon, Avatar } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../Components/Card';
import { SharedElement } from 'react-navigation-shared-element';
import { StatusBar } from 'expo-status-bar';
import { getArtisanDashboard } from '../../Redux/Actions/configAction';
import { logout, refreshToken } from '../../Redux/Actions/userActions';
import { getJobs } from '../../Redux/Actions/jobActions';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getDate } from '../../Helpers/Functions';


export default function ArtisanHome(props: any) {
  const { colors, fonts, fontSizes }: CustomThemeInterface = useTheme();
  const user = useSelector((state: Reducers) => state.user);
  const alert = useSelector((state: Reducers) => state.alert);
  const theme = useSelector((state: Reducers) => state.theme);
  const dashboard = useSelector((state: Reducers) => state.dashboard);
  const token = useSelector((state: Reducers) => state.tokens);
  const loading = useSelector((state: Reducers) => state.loading);
  const requests = useSelector((state: Reducers) => state.jobs);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  let list: any = requests.items && requests.items;

  const [, setMinify] = React.useState(true);
  const [refreshing] = React.useState(loading);


  let { width } = Dimensions.get("window");
  let filter: any = { status: 'NEW', categoryId: user.categoryId };
  let paginationConfig = {
    page: 1,
    pageSize: 0,
    whereCondition: JSON.stringify(filter)
  }

  const onRefresh = React.useCallback(() => {
    dispatch({ type: "LOADING", payload: true });

    dispatch(getArtisanDashboard(token));
    dispatch(getJobs(paginationConfig, token));

  }, [refreshing]);

  const handleState = (event: any) => {
    let scrollHeight = event.nativeEvent.contentOffset.y;
    if (scrollHeight >= 30) {
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

      dispatch(getJobs(paginationConfig, token));
    } else {
      dispatch({
        type: "GET_JOBS",
        payload: {}
      })
    }

    return () => {
      dispatch({
        type: "GET_JOBS",
        payload: {}
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isFocused]);

  React.useEffect(() => {
    filter.createdBy = user._id;
    paginationConfig.whereCondition = JSON.stringify(filter);

    dispatch(getArtisanDashboard(token));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isFocused]);

  React.useEffect(() => {

    if (Object.entries(alert).length !== 0) {
      if (!alert.successful) {

        if (alert.message === "Session Expired! Login again to continue.") {

          dispatch(refreshToken(token));
          dispatch(logout());

          props.navigation.navigate('Login');
          dispatch({
            type: 'ALERT',
            payload: {}
          })
        } else {
          if (alert.message === "Refreshed successfully.")
            onRefresh();
        }

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
      <View style={{
        marginTop: Platform.OS === "ios" ? 60 : 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        // paddingVertical: 10,
        width,
      }}>
        <Icon
          name='align-left'
          type="font-awesome-5"
          color={colors.text}
          size={25}
          onPress={() => props.navigation.openDrawer()} />

        <Text style={{
          fontFamily: fonts?.FuturaBold,
          color: colors.text,
          fontSize: fontSizes?.cardTitle
        }}>Artisana</Text>

        <SharedElement id={'user.' + user._id}>
          <Avatar source={{ uri: user.imageUrl }} rounded size="medium" onPress={() => props.navigation.navigate('Account', {
            data: user
          })} />
        </SharedElement>
      </View>


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
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: width - 40,
          marginBottom: 20
        }}>
          {/* <Icon
            name='bars'
            type="font-awesome-5"
            color={colors.text}
            size={25}
            onPress={() => props.navigation.openDrawer()} /> */}

          <View>
            <Text style={{
              fontFamily: fonts?.FuturaBold,
              color: colors.text,
              fontSize: fontSizes?.heading
            }}>Hi {user.firstname}</Text>

            {/* <Text style={{
              fontFamily: fonts?.FuturaMedium,
              color: colors.gray,
              fontSize: 14
            }}>Good morning</Text> */}
          </View>
          {/* <SharedElement id={'user.' + user._id}>
            <Avatar source={{ uri: user.imageUrl }} rounded size="medium" onPress={() => props.navigation.navigate('Account', {
              data: user
            })} />
          </SharedElement> */}
        </View>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: "wrap"
        }}>

          {/* <Card
            backgroundColor={colors.dark}
            elevation={6}
            title="My Artisans"
            cardValue={dashboard.artisans ? dashboard.artisans : 0}
            iconName="persons"
            onPress={() => props.navigation.navigate('MyArtisans')}
          /> */}

          <Card
            backgroundColor={colors.black}
            color={colors.primary}
            elevation={6}
            title="New"
            cardValue={dashboard.newRequest ? dashboard.newRequest : 0}
            iconName="new-box"
            // onPress={() => props.navigation.navigate('Requests')}
          />

          <Card
            backgroundColor={colors.black}
            color={colors.primary}
            elevation={6}
            title="Declined"
            cardValue={dashboard.declinedRequest ? dashboard.declinedRequest : 0}
            iconName="thumb-down"
            onPress={() => props.navigation.navigate('DeclinedJobs')}
          />

          <Card
            backgroundColor={colors.black}
            color={colors.primary}
            elevation={6}
            title="Ongoing"
            cardValue={dashboard.ongoing ? dashboard.ongoing : 0}
            iconName="cached"
            onPress={() => props.navigation.navigate('ActiveJobs')}
          />

          <Card
            backgroundColor={colors.black}
            color={colors.primary}
            elevation={6}
            title="Completed"
            cardValue={dashboard.completed ? dashboard.completed : 0}
            iconName="check-all"
            onPress={() => props.navigation.navigate('CompletedJobs')}
          />
        </View>

        <View style={{
          marginTop: 20,
          marginBottom: 15,
        }}>
          <Text style={{
            fontFamily: fonts?.FuturaBold,
            // fontSize: fontSizes?.body,
            textTransform: 'uppercase',
            color: colors.text
          }}>Latest Jobs</Text>
        </View>


        {list && !loading ? (
          <React.Fragment>

            {list.length !== 0 && list?.map((item: any, index: number) => {
              return (
                <TouchableOpacity key={index}

                  style={{
                    flexDirection: "row",
                    width: "100%",
                    paddingVertical: 5,
                    marginBottom: 10,
                  }} onPress={() => navigation.navigate("JobDetails", { id: item._id })}>
                  <View style={{
                    flexDirection: "row",
                    width: "100%",
                    paddingVertical: 5,
                    marginBottom: 10,
                  }} >
                    <View style={{
                      flexDirection: "row",
                    }}>

                      <MaterialCommunityIcons
                        name='briefcase'
                        style={{ color: colors.text, fontSize: 30 }}
                      />

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
                      }}>{getDate(item.createdOn)}</Text>
                    </View>

                    <View>

                      {item.status === "NEW" && <Text style={{
                        color: colors.dark,
                        backgroundColor: colors.warn,
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                        borderRadius: 25,
                        fontWeight: "bold",
                        fontSize: 12,
                        minWidth: 105,
                        textAlign: 'center'
                      }}>{item.status}</Text>}

                    </View>
                  </View>
                </TouchableOpacity>
              )
            })}


            {list.length === 0 &&
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
              height: 200,
              justifyContent: "center",
              alignItems: "center"
            }}>
              <ActivityIndicator size='large' color={colors.dark} />
            </View>
        </>)}



      </ScrollView>
      {/* <Fab onPress={() => props.navigation.navigate('AddArtisan')} iconName="plus" size={20} color={colors.dark} backgroundColor={colors.primary} label={minify ? "add Artisan" : ""} /> */}
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
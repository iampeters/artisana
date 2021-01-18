import React from 'react'
import { View, Text, StyleSheet, RefreshControl, Dimensions, ActivityIndicator } from 'react-native'
import { CustomThemeInterface, Reducers } from '../../Interfaces/interface';

import { useIsFocused, useNavigation, useTheme } from '@react-navigation/native';
import { Container } from 'native-base';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import CustomHeader from '../../Components/Header';
import { getJobs } from '../../Redux/Actions/jobActions';
import { getDate } from '../../Helpers/Functions';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function CompletedJobs(props: any) {
  const { colors, fonts, fontSizes }: CustomThemeInterface = useTheme();
  const user = useSelector((state: Reducers) => state.user);
  const alert = useSelector((state: Reducers) => state.alert);
  const theme = useSelector((state: Reducers) => state.theme);
  const loading = useSelector((state: Reducers) => state.loading);
  const [minify, setMinify] = React.useState(true);
  const [refreshing] = React.useState(loading);
  const tokens = useSelector((state: Reducers) => state.tokens);
  const jobs = useSelector((state: Reducers) => state.jobs);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  let list: any = jobs.items && jobs.items;


  const isFocused = useIsFocused();

  let { width } = Dimensions.get("window");
  let filter: any = { artisanId: user._id, status: "COMPLETED" };
  let paginationConfig = {
    page: 1,
    pageSize: 0,
    whereCondition: JSON.stringify(filter)
  }

  const onRefresh = React.useCallback(() => {
    dispatch(getJobs(paginationConfig, tokens));
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

      dispatch(getJobs(paginationConfig, tokens));

    } else {
      dispatch({
        type: 'GET_JOBS',
        payload: {},
      });
    }

    return () => {
      dispatch({
        type: 'GET_JOBS',
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

      <CustomHeader title="Completed Jobs" showLeftIcon onPress={() => props.navigation.goBack()} />

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

        <View style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "flex-start",
          // paddingHorizontal: 10
        }}>

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

                        {item.status === "COMPLETED" && <Text style={{
                          color: colors.dark,
                          backgroundColor: colors.success,
                          paddingHorizontal: 15,
                          paddingVertical: 10,
                          borderRadius: 25,
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
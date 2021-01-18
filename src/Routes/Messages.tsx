import React from 'react'
import { View, Text, StyleSheet, RefreshControl, Dimensions, Platform, ActivityIndicator } from 'react-native'
import { CustomThemeInterface, Reducers, Artisans } from '../Interfaces/interface';
import { useIsFocused, useNavigation, useTheme } from '@react-navigation/native';
import Fab from '../Components/Fab';
import { Container, Icon } from 'native-base';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import CustomHeader from '../Components/Header';
import { Avatar, SearchBar } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { getActiveChats } from '../Redux/Actions/ChatActions';
import { getDateTime } from '../Helpers/Functions';

export default function Messages(props: any) {
  const { colors, fonts, fontSizes }: CustomThemeInterface = useTheme();
  const user = useSelector((state: Reducers) => state.user);
  const alert = useSelector((state: Reducers) => state.alert);
  const loading = useSelector((state: Reducers) => state.loading);
  const activeChats = useSelector((state: Reducers) => state.activeChats);
  const tokens = useSelector((state: Reducers) => state.tokens);
  const theme = useSelector((state: Reducers) => state.theme);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const [minify, setMinify] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(loading ? true : false);

  const [searchQuery, setSearchQuery] = React.useState('');
  const [page, setPage] = React.useState(0)
  const [pageSize, setPageSize] = React.useState(25)

  let { width, height } = Dimensions.get("window");

  let list: any = activeChats.items && activeChats.items;

  let filter: Artisans = {};
  let paginationConfig = {
    page: page + 1,
    pageSize,
    whereCondition: JSON.stringify(filter)
  }

  const onRefresh = React.useCallback(() => {

    dispatch(getActiveChats(paginationConfig, tokens));
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

  const handleClick = (userId: any) => {
    navigation.navigate(`MessageDetails`, { userId });
  }


  React.useEffect(() => {

    if (isFocused) {
      dispatch({
        type: 'LOADING',
        payload: true
      });

      dispatch(getActiveChats(paginationConfig, tokens));
    }

    return () => {
      dispatch({
        type: 'GET_ACTIVE_CHATS',
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
        title={"Messages"}
        justifyContent="center"
      />


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
                  <TouchableOpacity key={index} onPress={() => handleClick(item.userId._id === user._id ? item.sender._id : item.userId._id)}>
                    <View style={{
                      width: width - 40,
                      // height: 120,
                      borderRadius: 5,
                      backgroundColor: colors.light,
                      marginBottom: 10,
                      justifyContent: "flex-start",
                      alignItems: "center",
                      flexDirection: "row",
                      padding: 10
                    }}>
                      <View style={{
                        // backgroundColor: colors.warn,
                        // flex: 1,
                        // flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}>
                        <Avatar source={{ uri: item.userId._id === user._id ? item.sender.imageUrl : item.userId.imageUrl }} size="medium" rounded />
                      </View>

                      <View style={{
                        justifyContent: "flex-start",
                        alignItems: "baseline",
                        // backgroundColor: colors.danger,
                        marginLeft: 10,
                        flex: 3
                      }}>

                        <Text style={{
                          color: colors.dark,
                          fontFamily: fonts?.FuturaMedium,
                          marginTop: 5,
                          fontSize: fontSizes?.small
                        }}>{item.userId._id === user._id ? item.sender.name : item.userId.name}</Text>

                        <Text style={{
                          color: colors.dark,
                          fontFamily: fonts?.ProductSansRegular,
                          marginTop: 5,
                          fontSize: fontSizes?.small
                        }}>{item.message.length > 20 ? item.message.slice(0, 20) + '...' : item.message}</Text>
                       
                      </View>

                      <View style={{
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                        // backgroundColor: colors.danger,
                        // flex: 1
                      }}>

                        <Text style={{
                          color: colors.dark,
                          fontFamily: fonts?.ProductSansLight,
                          // marginTop: 5,
                          fontSize: 10
                        }}>{getDateTime(item.createdOn)}</Text>

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
                  <Text>No Messages</Text>
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
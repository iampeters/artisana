import React from 'react'
import { View, Text, StyleSheet, RefreshControl, Dimensions, Platform, ActivityIndicator } from 'react-native'
import { CustomThemeInterface, Reducers, Artisans, Category } from '../Interfaces/interface';
import { useIsFocused, useNavigation, useTheme } from '@react-navigation/native';
import Fab from '../Components/Fab';
import { Container, Icon } from 'native-base';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import CustomHeader from '../Components/Header';
import { Avatar, SearchBar } from 'react-native-elements';
import { getArtisans } from '../Redux/Actions/artisanActions';
import { MaterialIcons } from '@expo/vector-icons';


export default function ArtisanList(props: any) {
  const { colors, fonts, fontSizes }: CustomThemeInterface = useTheme();
  const user = useSelector((state: Reducers) => state.user);
  const alert = useSelector((state: Reducers) => state.alert);
  const loading = useSelector((state: Reducers) => state.loading);
  const artisans = useSelector((state: Reducers) => state.artisan);
  const tokens = useSelector((state: Reducers) => state.tokens);
  const theme = useSelector((state: Reducers) => state.theme);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [minify, setMinify] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(loading ? true : false);

  const [searchQuery, setSearchQuery] = React.useState('');
  const [page, setPage] = React.useState(0)
  const [pageSize, setPageSize] = React.useState(25)

  let { width, height } = Dimensions.get("window");

  let params: Category = props.route.params.item;
  let artisanList: any = artisans.items && artisans.items;  

  let filter: Artisans = {categoryId: params._id};
  let paginationConfig = {
    page: page + 1,
    pageSize,
    whereCondition: JSON.stringify(filter)
  }

  const onRefresh = React.useCallback(() => {

    dispatch(getArtisans(paginationConfig, tokens));
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

      dispatch(getArtisans(paginationConfig, tokens));
    }

    return () => {
      dispatch({
        type: 'GET_ARTISANS',
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
        title={params.name}
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

        <View>
          <SearchBar
            placeholder="Type Here..."
            onChangeText={(text: any) => setSearchQuery(text)}
            value={searchQuery}
            platform={Platform.OS === "ios" ? "ios" : "android"}
            containerStyle={{
              backgroundColor: Platform.OS === "android" ? colors.light : colors.transparent,
              padding: 0,
              marginBottom: 10,
            }}
          />
        </View>

        <View style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "flex-start",
          // paddingHorizontal: 10
        }}>

          {artisanList && !loading ? (
            <React.Fragment>
              {artisanList.length !== 0 && artisanList?.map((item: Artisans, index: number) => {
                return (
                  <TouchableOpacity key={index} onPress={() => props.navigation.navigate(`ArtisanDetails`, { item })}>
                    <View style={{
                      width: width - 40,
                      // height: 120,
                      borderRadius: 5,
                      backgroundColor: colors.light,
                      marginBottom: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                      padding: 10
                    }}>
                      <View style={{
                        // backgroundColor: colors.warn,
                        flex: 1,
                        // flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}>
                        <Avatar source={{ uri: item.imageUrl }} size="medium" rounded />
                        <Text style={{
                          color: colors.dark,
                          fontFamily: fonts?.FuturaMedium,
                          marginTop: 5,
                          fontSize: fontSizes?.small
                        }}>{item.name}</Text>
                        {item.rating > 0 && <MaterialIcons name="verified-user" size={20} color={colors.success} />}
                      </View>

                      <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                        // backgroundColor: colors.danger,
                        flex: 1
                      }}>
                       
                        <Text style={{
                          color: colors.dark,
                          fontFamily: fonts?.FuturaMedium,
                          marginTop: 5,
                          fontSize: fontSizes?.small
                        }}>{item.rating}</Text>
                        <Icon name="star" style={{
                          color: colors.warn
                        }} />
                        {/* <Text style={{
                          color: colors.dark,
                          fontFamily: fonts?.FuturaMedium,
                          marginTop: 5,
                          fontSize: fontSizes?.small
                        }}>Rating</Text> */}
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              })}

              {artisanList.length === 0 &&
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
                justifyContent: "center",
                alignItems: "center"
              }}>
                <ActivityIndicator size='large' color={colors.dark} />
              </View>
          </>)}

        </View>


      </ScrollView>
      <Fab onPress={() => props.navigation.navigate('AddArtisan')} iconName="plus" size={20} color={colors.dark} backgroundColor={colors.warn} label={minify ? "add Artisan" : ""} />
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
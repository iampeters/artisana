import React from 'react'
import { View, Text, StyleSheet, RefreshControl, Dimensions, Platform } from 'react-native'
import { CustomThemeInterface, Reducers, Artisans, Category } from '../Interfaces/interface';
import { useTheme } from '@react-navigation/native';
import Fab from '../Components/Fab';
import { Container, Content, Image } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import CustomHeader from '../Components/Header';
import { Avatar, SearchBar } from 'react-native-elements';
import { getArtisans } from '../Redux/Actions/artisanActions';
import { getCategory } from '../Redux/Actions/categoryActions';


function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}


export default function CategoryComponent(props: any) {
  const { colors, fonts, fontSizes }: CustomThemeInterface = useTheme();
  const user = useSelector((state: Reducers) => state.user);
  const alert = useSelector((state: Reducers) => state.alert);
  const loading = useSelector((state: Reducers) => state.loading);
  const category = useSelector((state: Reducers) => state.category); const tokens = useSelector((state: Reducers) => state.tokens);
  const theme = useSelector((state: Reducers) => state.theme);

  const dispatch = useDispatch();

  const [minify, setMinify] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(loading);

  const [searchQuery, setSearchQuery] = React.useState('');
  const [page, setPage] = React.useState(0)
  const [pageSize, setPageSize] = React.useState(25)

  let { width, height } = Dimensions.get("window");
  let categoryList: any = category.items && category.items;


  let filter: Artisans = {};
  let paginationConfig = {
    page: page + 1,
    pageSize,
    whereCondition: JSON.stringify(filter)
  }

  const onRefresh = React.useCallback(() => {
    // wait(2000).then(() => setRefreshing(false));
    dispatch(getCategory(paginationConfig, tokens));
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
    dispatch(getCategory(paginationConfig, tokens));

    dispatch({
      type: 'LOADING',
      payload: true
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page]);


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
        title="Artisans"
        justifyContent="center"
        onPress={() => props.navigation.goBack()} />


      <ScrollView
        onScroll={handleState}
        onScrollToTop={() => setMinify(false)}
        // onMomentumScrollEnd={handleState}
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
          paddingHorizontal: 10,
        }}>

        <View>
          <SearchBar
            placeholder="Type Here..."
            onChangeText={(text: any) => setSearchQuery(text)}
            value={searchQuery}
            platform={Platform.OS === "ios" ? "ios" : "android"}
            containerStyle={{
              backgroundColor: 'transparent',
              marginBottom: 10
            }}
          />
        </View>

        <View style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "flex-start",
          paddingHorizontal: 10
        }}>

          {categoryList ? (
            <React.Fragment>
              {categoryList.length !== 0 && categoryList?.map((item: Category, index: number) => {
                return (
                  <View key={index} style={{
                    width: 115,
                    height: 115,
                    borderRadius: 5,
                    // backgroundColor: colors.light,
                    marginBottom: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                    <Avatar source={{ uri: item.imageUrl }} size="large" />
                    <Text style={{
                      color: colors.dark,
                      fontFamily: fonts?.FuturaMedium,
                      marginTop: 5,
                      fontSize: fontSizes?.small
                    }}>{item.name}</Text>
                  </View>
                )
              })}

              {categoryList.length === 0 &&
                <View style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}>
                  <Text>No category</Text>
                </View>
              }
            </React.Fragment>
          ) : (<></>)}

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
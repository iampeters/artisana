import React from 'react'
import { View, Text, StyleSheet, RefreshControl, Dimensions, Platform } from 'react-native'
import { CustomThemeInterface, Reducers, Category } from '../Interfaces/interface';
import { useTheme } from '@react-navigation/native';
import { Container } from 'native-base';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import CustomHeader from '../Components/Header';
import { Avatar, SearchBar } from 'react-native-elements';
import { getCategory } from '../Redux/Actions/categoryActions';
import Placeholder from '../Components/Placeholder';


export default function CategoryComponent(props: any) {
  const { colors, fonts, fontSizes }: CustomThemeInterface = useTheme();
  const alert = useSelector((state: Reducers) => state.alert);
  const loading = useSelector((state: Reducers) => state.loading);
  const category = useSelector((state: Reducers) => state.category);
  const tokens = useSelector((state: Reducers) => state.tokens);
  const theme = useSelector((state: Reducers) => state.theme);

  const dispatch = useDispatch();

  const [, setMinify] = React.useState(true);
  const [refreshing] = React.useState(loading);

  const [searchQuery, setSearchQuery] = React.useState('');
  const [page] = React.useState(0)
  const [pageSize] = React.useState(25)

  let { width } = Dimensions.get("window");
  let categoryList: any = category.items && category.items;


  let filter: any = {};
  let paginationConfig = {
    page: page + 1,
    pageSize,
    whereCondition: JSON.stringify(filter)
  }

  const onRefresh = React.useCallback(() => {
    // wait(2000).then(() => setRefreshing(false));
    // dispatch(getCategory(paginationConfig, tokens));
    // dispatch({
    //   type: 'LOADING',
    //   payload: true
    // })

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
    
    const unsubscribe = props.navigation.addListener('focus', () => {
      
      dispatch({
        type: 'LOADING',
        payload: true
      });

      if (searchQuery.length >= 2) {
        filter.name = searchQuery.trim();
        paginationConfig.whereCondition = JSON.stringify(filter)

        dispatch({
          type: 'LOADING',
          payload: true
        });

        dispatch(getCategory(paginationConfig, tokens));
      } else {

        if (searchQuery.length === 0) {
          delete filter.name;

          dispatch({
            type: 'LOADING',
            payload: true
          });

          dispatch(getCategory(paginationConfig, tokens));
        }
      }
    });

    const unmount = props.navigation.addListener('blur', () => {
      dispatch({
        type: 'GET_CATEGORY',
        payload: {}
      });

      return () => {
        unsubscribe;
        unmount;
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page, searchQuery]);

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
        title="Category"
        justifyContent="center"
      // onPress={() => props.navigation.goBack()} 
      />


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
            placeholder="Search Category..."
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
        {/* <Placeholder /> */}

        <View style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "flex-start",
          // paddingHorizontal: 10
        }}>

          {categoryList ? (
            <React.Fragment>
              {categoryList.length !== 0 && categoryList?.map((item: Category, index: number) => {
                return (
                  <TouchableOpacity key={index} onPress={() => props.navigation.navigate(`Artisans`, { item })}>
                    <View style={{
                      width: width / 2.17,
                      height: 115,
                      borderRadius: 5,
                      backgroundColor: colors.light,
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
                  </TouchableOpacity>
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
          ) : (<>
            <Text>Loading...</Text>
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
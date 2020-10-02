import React from 'react'
import { View, Text, StyleSheet, RefreshControl, Dimensions, Platform } from 'react-native'
import { CustomThemeInterface, Reducers, Artisans } from '../Interfaces/interface';
import { useTheme } from '@react-navigation/native';
import Fab from '../Components/Fab';
import { Container, Content } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import CustomHeader from '../Components/Header';
import { SearchBar } from 'react-native-elements';
import { getArtisans } from '../Redux/Actions/artisanActions';


function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}


export default function ArtisanList(props: any) {
  const { colors, fonts, fontSizes }: CustomThemeInterface = useTheme();
  const user = useSelector((state: Reducers) => state.user);
  const alert = useSelector((state: Reducers) => state.alert);
  const loading = useSelector((state: Reducers) => state.loading);
  const artisans = useSelector((state: Reducers) => state.artisan);
  const tokens = useSelector((state: Reducers) => state.tokens);
  const theme = useSelector((state: Reducers) => state.theme);

  const dispatch = useDispatch();

  const [minify, setMinify] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(loading);

  const [searchQuery, setSearchQuery] = React.useState('');
  const [page, setPage] = React.useState(0)
  const [pageSize, setPageSize] = React.useState(25)

  let { width, height } = Dimensions.get("window");


  let filter: Artisans = {};
  let paginationConfig = {
    page: page + 1,
    pageSize,
    whereCondition: JSON.stringify(filter)
  }

  const onRefresh = React.useCallback(() => {
    // wait(2000).then(() => setRefreshing(false));
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
    dispatch(getArtisans(paginationConfig, tokens));

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
          paddingHorizontal: 20,
        }}>

        <View>
          <SearchBar
            placeholder="Type Here..."
            onChangeText={(text: any) => setSearchQuery(text)}
            value={searchQuery}
            platform={Platform.OS === "ios" ? "ios" : "android"}
            containerStyle={{
              backgroundColor: 'transparent',

            }}
          />
        </View>




      </ScrollView>
      <Fab onPress={() => props.navigation.navigate('AddArtisan')} iconName="plus" size={20} color={colors.white} backgroundColor={colors.purple} label={minify ? "add Artisan" : ""} />
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
import React from 'react'
import { View, Text, StyleSheet, RefreshControl, Dimensions, ActivityIndicator } from 'react-native'
import { CustomThemeInterface, Reducers, Artisans } from '../../Interfaces/interface';
import { useIsFocused, useNavigation, useTheme } from '@react-navigation/native';
import { Container } from 'native-base';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import CustomHeader from '../../Components/Header';
import { Avatar } from 'react-native-elements';
// import { MaterialIcons } from '@expo/vector-icons';
import { getActiveChats } from '../../Redux/Actions/ChatActions';
import { getDateTime } from '../../Helpers/Functions';

export default function EmailConfirmation() {
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

  const [, setMinify] = React.useState(true);
  const [refreshing] = React.useState(loading ? true : false);

  const [] = React.useState('');
  const [page] = React.useState(0)
  const [pageSize] = React.useState(25)

  let { width } = Dimensions.get("window");

  let list: any = activeChats.items && activeChats.items;

  let filter: Artisans = {};
  let paginationConfig = {
    page: page + 1,
    pageSize,
    whereCondition: JSON.stringify(filter)
  }

  const onRefresh = React.useCallback(() => {

    // dispatch(getActiveChats(paginationConfig, tokens));
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


  // React.useEffect(() => {

  //   if (isFocused) {
  //     dispatch({
  //       type: 'LOADING',
  //       payload: true
  //     });

  //   }

  //   return () => {
  //     dispatch({
  //       type: 'GET_ACTIVE_CHATS',
  //       payload: {},
  //     });
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [dispatch, isFocused]);


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
          <Text>{"hello world"}</Text>

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
import React from 'react'
import { View, Text, StyleSheet, Dimensions, Platform, RefreshControl, ActivityIndicator } from 'react-native'
import { CustomThemeInterface, Reducers } from '../Interfaces/interface';
import { useIsFocused, useNavigation, useTheme } from '@react-navigation/native';
import { Button, Container, Content, Footer, FooterTab, Input, Item, Right } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { logout, refreshToken } from '../Redux/Actions/userActions';
import { Avatar, colors, Icon } from 'react-native-elements';
import { getChats, getChatUserDetails, sendMessage } from '../Redux/Actions/ChatActions';
import { FlatList, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import RightBubble from '../Components/RightBubble';
import LeftBubble from '../Components/LeftBubble';
import { getDateTime } from '../Helpers/Functions';
import { color } from 'react-native-redash';

export default function MessageDetails(props: any) {
  const { colors, fonts, fontSizes }: CustomThemeInterface = useTheme();
  const user = useSelector((state: Reducers) => state.user);
  const theme = useSelector((state: Reducers) => state.theme);
  const alert = useSelector((state: Reducers) => state.alert);
  const chatUser = useSelector((state: Reducers) => state.chatUser);
  const chats = useSelector((state: Reducers) => state.chats);
  const tokens = useSelector((state: Reducers) => state.tokens);
  const spinner = useSelector((state: Reducers) => state.loading);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [message, setMessage] = React.useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoader] = React.useState(spinner);
  const [page, setPage] = React.useState(1)
  const [pageSize, setPageSize] = React.useState(50)

  let interval: any;
  let params: any | any = props.route.params;
  let chatList: any = chats.items ? chats.items : [];

  let { width, height } = Dimensions.get("window");
  let filter: any = {};
  let paginationConfig = {
    page: 1,
    pageSize: 1000,
    whereCondition: JSON.stringify(filter)
  }

  const onRefresh = React.useCallback(() => {
    dispatch({ type: "LOADING", payload: true });
    dispatch(getChats(paginationConfig, params.userId, tokens));
  }, [refreshing]);

  const renderRow = (item: any) => {

    if (item && item.sender._id === user._id) {
      return (
        <TouchableWithoutFeedback>
          <RightBubble
            text={item.message}
            timestamp={getDateTime(item.createdOn)}
          // status={"item.status"}
          />
        </TouchableWithoutFeedback>
      );
    } else {
      return (
        <TouchableWithoutFeedback>
          <LeftBubble text={item.message} timestamp={getDateTime(item.createdOn)} />
        </TouchableWithoutFeedback>
      );
    }
  };

  const handleSubmit = () => {
    if (message.length !== 0) {
      let data = {
        receiver: params.userId,
        message
      }

      dispatch(sendMessage(data, tokens));
      setLoader(true);
    }
  };

  React.useEffect(() => {
    setLoader(loading);
  }, [loading])

  React.useEffect(() => {
    if (isFocused) {
      dispatch({
        type: 'LOADING',
        payload: true
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
      interval = setInterval(() => {
        dispatch(getChats(paginationConfig, params.userId, tokens));
      }, 1000);

    } else {
      clearInterval(interval._id);
      dispatch({
        type: 'GET_CHATS',
        payload: {}
      });
    }

    return () => {
      clearInterval(interval._id);
      dispatch({
        type: 'GET_CHATS',
        payload: {}
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  React.useEffect(() => {
    if (isFocused) {
      // dispatch(getChats(paginationConfig, params.id));
      dispatch(getChatUserDetails(params.userId, tokens));

    }
    return () => {
      dispatch({
        type: 'GET_CHATS',
        payload: {}
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  React.useEffect(() => {

    if (Object.entries(alert).length !== 0) {
      if (!alert.successful) {

        if (alert.message === "Session Expired! Login again to continue.") {

          dispatch(refreshToken(tokens));
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
        });

        setLoader(false);
      } else {
        if (alert.message === "Message sent") {
          setMessage("");
          setRefreshing(false);
          setLoader(false);
        }
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
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Icon
            name='arrow-left'
            type="font-awesome-5"
            color={colors.text}
            size={20}
          />
        </TouchableOpacity>

        <View style={{
          flex: 1,
          marginLeft: 5,
          // justifyContent=""
          flexDirection: "row"
        }}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Avatar source={{ uri: chatUser && chatUser.imageUrl }} rounded size="medium" />

          </TouchableOpacity>
          <View style={{
            marginLeft: 10,
            justifyContent: "center",
            alignItems: "center"
          }}>
            <Text style={{
              fontFamily: fonts?.FuturaBold,
              color: colors.text,
              fontSize: fontSizes?.cardTitle
            }}>{chatUser && chatUser.firstname} {chatUser && chatUser.lastname}</Text>
          </View>
        </View>

      </View>

      {/* Body */}

      {loading && <View style={{
        position: "absolute",
        backgroundColor: "rgba(0,0,0, .67)",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000
      }}>
        <ActivityIndicator size='large' color="#fff" />
      </View>}

      <FlatList
        style={style.chatContainer}
        data={chatList}
        renderItem={({ item }) => renderRow(item)}
        // initialScrollIndex={Object(chatList).length}
        scrollEnabled
        inverted
        snapToEnd
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
        // ref={ref => (listRef = ref)}
        keyExtractor={(chat, index) => index.toString()}
      />


      {/* footer */}
      <Footer style={style.footer}>
        <FooterTab style={style.footerTab}>
          <Item style={style.left}>
            <Input
              onChangeText={(text: string) => setMessage(text)}
              placeholder="Start typing..."
              value={message}
              multiline
              style={style.searchBar}
            />
            {/* <Icon name="attach" style={style.attachIcon} /> */}
            {/* <Icon name="camera" style={style.icon} /> */}
          </Item>
          <Right style={style.right}>
            <Button style={style.sendButton} onPress={handleSubmit}>
              <Icon name="send" style={style.sendIcon} />
            </Button>
          </Right>
        </FooterTab>
      </Footer>

    </Container>
  )
}

const style = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 40,
    fontWeight: '600',
  },
  thumbnail: { width: 35, height: 35, borderRadius: 35 / 2 },
  nameStatus: {
    marginLeft: 20,
  },
  status: {
    fontSize: 12,
  },
  sendButton: {
    backgroundColor: colors.warning,
    borderRadius: 50 / 2,
    width: 50,
    height: 50,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  right: { flex: 1 },
  left: {
    flex: 4,
    width: '100%',
    backgroundColor: 'gray',
    borderRadius: 100,
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 3,
    marginLeft: 10,
    color: 'white',
  },
  footer: {
    backgroundColor: '#fff',
    bottom: 0,
  },
  footerTab: {
    backgroundColor: '#fff',
    borderRadius: 100,
    bottom: 0,
  },
  searchBar: {
    backgroundColor: 'gray',
    color: 'white',
    borderRadius: 100,
  },
  icon: {
    color: '#fafafa',
  },
  attachIcon: {
    color: '#fafafa',
    marginRight: 10,
  },
  sendIcon: {
    color: 'white',
  },
  chatContainer: {
    paddingTop: 5,
    paddingBottom: 10,
    // marginBottom: 20,
    // backgroundColor: 'red',
  },
  rightBubble: {
    width: 'auto',
    maxWidth: '80%',
    backgroundColor: '#f0f0f5',
    color: '#fff',
    borderRadius: 25,
    borderBottomRightRadius: 0,
    alignSelf: 'flex-end',
    marginBottom: 20,
    marginRight: 10,
    elevation: 2,
  },
  leftBubble: {
    width: 'auto',
    maxWidth: '80%',
    backgroundColor: '#6355a6',
    color: '#fff',
    borderRadius: 25,
    borderBottomLeftRadius: 0,
    alignSelf: 'flex-start',
    marginBottom: 20,
    elevation: 2,
  },
  leftTimeStamp: {
    color: '#cccbd2',
  },
  leftBubbleText: {
    color: '#fff',
  },
});

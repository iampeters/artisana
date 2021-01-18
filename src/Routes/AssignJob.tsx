import React from 'react'
import { View, Text, StyleSheet, ScrollView, RefreshControl, Dimensions, Alert, ActivityIndicator } from 'react-native'
import { Artisans, Category, CustomThemeInterface, Reducers, StateProps } from '../Interfaces/interface';
import { useIsFocused, useNavigation, useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { createReviews } from '../Redux/Actions/reviewAction';
import { getArtisanDetails, getArtisans } from '../Redux/Actions/artisanActions';
import { Container, Item, Icon } from 'native-base';
import { StatusBar } from 'expo-status-bar';
import CustomHeader from '../Components/Header';
import { Avatar, Rating, AirbnbRating } from 'react-native-elements';
import { Picker } from '@react-native-community/picker';
import { TextInput } from 'react-native-paper';
import CustomButtons from '../Components/Buttons';
import { createJob } from '../Redux/Actions/jobActions';
import { getCategory } from '../Redux/Actions/categoryActions';
import { States } from '../Helpers/States';
import { assignRequest } from '../Redux/Actions/requestActions';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackActions } from '@react-navigation/native';

export default function AssignJob
  (props: any) {
  const { colors, fonts, fontSizes }: CustomThemeInterface = useTheme();
  const alert = useSelector((state: Reducers) => state.alert);
  const loading = useSelector((state: Reducers) => state.loading);
  const tokens = useSelector((state: Reducers) => state.tokens);
  const theme = useSelector((state: Reducers) => state.theme);
  const user = useSelector((state: Reducers) => state.user);
  const artisans = useSelector((state: Reducers) => state.artisan);
  

  let list = artisans.items && artisans.items;

  const dispatch = useDispatch();
  const Theme = useTheme();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = React.useState(loading);

  const [duration, setDuration] = React.useState('1');
  const [submitted, setSubmitted]: any = React.useState(null);

  let params: any = props.route.params.job;
  let { width } = Dimensions.get("window");


  const onRefresh = React.useCallback(() => {
    let id = params.categoryId._id
    let filter: any = { categoryId: id };
    let paginationConfig = {
      page: 1,
      pageSize: 0,
      whereCondition: JSON.stringify(filter)
    }

    dispatch(getArtisans(paginationConfig, tokens));
    dispatch({
      type: 'LOADING',
      payload: true
    });

  }, [refreshing]);

  const handleState = (event: any) => {
    let scrollHeight = event.nativeEvent.contentOffset.y;
  }

  const confirmSubmit = (item: any) => {

    Alert.alert(
      'Assign Job',
      'Artisan will have to accept this job within the time you specified',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Yes', onPress:() => handleSubmit(item), style: 'destructive' },
      ],
      { cancelable: true }
    );
    // return true;
  };

  const handleSubmit = (item: any) => {
    setSubmitted(true);

    setRefreshing(true);

    dispatch({
      type: 'LOADING',
      payload: true
    })

    const data = {
      timeout: duration,
      artisanId: item._id,
      userId: user._id,
      jobId: params._id
    };    

    dispatch(assignRequest(data, tokens));

  }

  React.useEffect(() => {
    if (isFocused) {
      let id = params.categoryId._id
      let filter: any = { categoryId: id };
      let paginationConfig = {
        page: 1,
        pageSize: 0,
        whereCondition: JSON.stringify(filter)
      }

      dispatch(getArtisans(paginationConfig, tokens));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isFocused])

  React.useEffect(() => {

    if (Object.entries(alert).length !== 0) {
      if (!alert.successful) {

        setSubmitted(false);

        dispatch({
          type: 'ALERT',
          payload: {}
        })

      } else {

        navigation.dispatch(
          StackActions.replace('MyJobs')
        );

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
        title={"Assign Job"}
        showLeftIcon
        onPress={() => props.navigation.goBack()} />

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

        <View style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "flex-start",
          // paddingHorizontal: 10
        }}>

          {list && list.length !== 0 && <View style={{
            width: width - 40
          }}>
            <Text style={{
              fontSize: fontSizes?.body
            }}>Set request timeout duration in hours</Text>
            <TextInput
              mode="flat" allowFontScaling
              label="Enter Duration"
              underlineColor="transparent"
              theme={Theme}
              style={{
                backgroundColor: colors.light,
                marginBottom: 30
              }}
              textContentType="none"
              keyboardType='default'
              value={duration}
              onChangeText={(text: any) => setDuration(text)}
              disabled={submitted}
            />
          </View>}

          {list && !loading ? (
            <React.Fragment>
              {list.length !== 0 && list?.map((item: Artisans, index: number) => {
                return (
                  // onPress={() => props.navigation.navigate(`ArtisanDetails`, { item })}
                  <TouchableOpacity key={index} onPress={() => confirmSubmit(item)}>
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
                      </View>

                      <View>
                        <TouchableOpacity style={{
                          borderRadius: 20,
                          backgroundColor: colors.success,
                          paddingVertical: 5,
                          paddingHorizontal: 15
                        }}>
                         <Text>Assign</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              })}

              {list.length === 0 &&
                <View style={{
                  width: width - 40,
                  justifyContent: "center",
                  alignItems: "center"
                }}>
                  <Text style={{
                    textAlign: "center"
                  }}>No Artisans in this category</Text>
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


        {/* {list && list.length !== 0 && <View>

          <CustomButtons
            title="Assign"
            type="solid"
            backgroundColor={colors.warn}
            fontFamily={fonts?.RubikMedium}
            color={colors.black}
            marginTop={15}
            onPress={handleSubmit}
            loading={submitted}
            disabled={
              duration === '' ? true : false ||
                submitted
            }
          />
        </View>} */}

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
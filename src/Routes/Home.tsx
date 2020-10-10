import React from 'react'
import { View, Text, StyleSheet, RefreshControl, Dimensions, Platform } from 'react-native'
import { CustomThemeInterface, Reducers } from '../Interfaces/interface';
import { useTheme } from '@react-navigation/native';
import Fab from '../Components/Fab';
import { Container, Content } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { Icon, Avatar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import Card from '../Components/Card';
import CardFullWith from '../Components/CardFullWith';
import { SharedElement } from 'react-navigation-shared-element';
import { StatusBar } from 'expo-status-bar';


function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}


export default function Home(props: any) {
  const { colors, fonts, fontSizes }: CustomThemeInterface = useTheme();
  const user = useSelector((state: Reducers) => state.user);
  const alert = useSelector((state: Reducers) => state.alert);
  const theme = useSelector((state: Reducers) => state.theme);

  const [minify, setMinify] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);


  let { width, height } = Dimensions.get("window");

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  const handleState = (event: any) => {
    let scrollHeight = event.nativeEvent.contentOffset.y;
    if (scrollHeight >= 30) {
      setMinify(false)
    } else {
      setMinify(true)
    }
  }

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
          marginBottom: 30
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
        }}>

          <Card
            backgroundColor={colors.dark}
            elevation={6}
            title="My Artisans"
            cardValue={120}
            iconName="persons"
            // onPress={() => props.navigation.navigate('MyArtisans')}
          />

          <Card
            backgroundColor={colors.dark}
            elevation={6}
            title="My Reviews"
            cardValue={12}
            iconName="star"
            onPress={() => props.navigation.navigate('Reviews')}
          />
        </View>

        <View style={{
          marginTop: 40,
          marginBottom: 15,
        }}>
          <Text style={{
            fontFamily: fonts?.FuturaBold,
            // fontSize: fontSizes?.body,
            textTransform: 'uppercase',
            color: colors.text
          }}>Get Started</Text>
        </View>

        <CardFullWith
          backgroundColor={colors.dark}
          elevation={2}
          title="Become a premium user for free now"
          iconName="medal"
          textTwo="Enjoy ₦50,000 worth of work tools."
          text="Register up to 15 artisans"
          buttonText="Get Started"
          buttonColor={colors.primary}
          buttonTextColor={colors.dark}
          textColor={colors.white}
          textTwoColor={colors.white}
          titleColor={colors.light}
          titleTwoColor={colors.light}
          iconColor={colors.primary}
          borderColor={colors.light}
          onPress={() => props.navigation.navigate('Profile')}
        />

        <CardFullWith
          backgroundColor={colors.dark}
          elevation={2}
          title="Before giving out that job"
          iconName="id-badge"
          text="Take a few seconds to add that artisan on Artisana "
          textTwo="Let’s collaborate to separate the wheat from the chaff"
          buttonText="Get Started"
          buttonColor={colors.primary} // '#dcffeb'
          buttonTextColor={colors.dark}
          textColor={colors.white}
          textTwoColor={colors.white}
          titleColor={colors.light}
          iconColor={colors.primary}
          borderColor={colors.light}
        />

      </ScrollView>
      <Fab onPress={() => props.navigation.navigate('AddArtisan')} iconName="plus" size={20} color={colors.dark} backgroundColor={colors.primary} label={minify ? "add Artisan" : ""} />
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
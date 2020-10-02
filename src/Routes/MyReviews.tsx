import React from 'react'
import { View, Text, StyleSheet, RefreshControl, Dimensions, Platform } from 'react-native'
import { CustomThemeInterface, Reducers } from '../Interfaces/interface';
import { useTheme } from '@react-navigation/native';
import Fab from '../Components/Fab';
import { Container, Content } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import CustomHeader from '../Components/Header';


function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}


export default function MyReviews(props: any) {
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
    if (scrollHeight > 50) {
      setMinify(false)
    } else {
      setMinify(true)
    }
  }

  return (
    <Container style={{ ...style.container, backgroundColor: colors.background }}>
      <StatusBar style={theme === "light" ? "dark" : "light"} />

      <CustomHeader title="My reviews" justifyContent="center" onPress={() => props.navigation.goBack()} />

      <ScrollView
        onScroll={handleState}
        onScrollToTop={() => setMinify(false)}
        // onMomentumScrollEnd={handleState}
        showsVerticalScrollIndicator={false}
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
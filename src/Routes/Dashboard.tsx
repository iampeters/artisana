import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Octicons as Icon, Ionicons, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';
import Home from './Home';
import MyReviews from './MyReviews';
import Artisans from './Artisans';
import Account from './Account';
import { CustomThemeInterface } from '../Interfaces/interface';
import { useTheme } from '@react-navigation/native';
import MyArtisans from './MyArtisans';
import Category from './Category';

const Tab = createMaterialBottomTabNavigator();

export default function Dashboard() {
  const { colors, fonts, fontSizes }: CustomThemeInterface = useTheme();


  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={colors.active}
      backBehavior="history"
      // labeled={false}
      barStyle={{
        backgroundColor: colors.background
      }}
      sceneAnimationEnabled
      shifting
      screenOptions={{
        // tabBarBadge: 6
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        // listeners={()}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="view-dashboard" color={color} size={26} />
          ),
          // tabBarBadge: true
        }}
      />
      <Tab.Screen
        name="Artisans"
        component={Category}
        options={{
          tabBarLabel: 'Artisans',
          tabBarIcon: ({ color }) => (
            <Fontisto name="persons" color={color} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="Reviews"
        component={MyReviews}
        options={{
          tabBarLabel: 'Reviews',
          tabBarIcon: ({ color }) => (
            <Fontisto name="star" color={color} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color }) => (
            <Fontisto name="person" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// import React from 'react'
// import { View, Text, StyleSheet } from 'react-native'
// import { CustomThemeInterface } from '../Interfaces/interface';
// import { useTheme } from '@react-navigation/native';

// export default function Dashboard() {
//   const { colors, fonts, fontSizes }: CustomThemeInterface = useTheme();

//   return (
//     <View style={{ ...style.container }}>
//       <Text style={{
//         fontFamily: fonts?.FuturaBold
//       }}>Dashboard</Text>
//     </View>
//   )
// }

// const style = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   }
// })
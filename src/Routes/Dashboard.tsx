import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';
import Home from './Home';
import MyReviews from './MyReviews';
import Account from './Account';
import { CustomThemeInterface } from '../Interfaces/interface';
import { useTheme } from '@react-navigation/native';
import Category from './Category';
import Messages from './Messages';

const Tab = createMaterialBottomTabNavigator();

export default function Dashboard() {
  const { colors }: CustomThemeInterface = useTheme();


  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={colors.dark}
      backBehavior="history"
      // labeled={false}
      barStyle={{
        backgroundColor: colors.background
      }}
      // sceneAnimationEnabled
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
            <MaterialCommunityIcons name="home" color={color} size={24} />
          ),
          // tabBarBadge: true
        }}
      />
      <Tab.Screen
        name="Category"
        component={Category}
        options={{
          tabBarLabel: 'Category',
          tabBarIcon: ({ color }) => (
            <Fontisto name="persons" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Reviews"
        component={MyReviews}
        options={{
          tabBarLabel: 'Reviews',
          tabBarIcon: ({ color }) => (
            <Fontisto name="star" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color }) => (
            <Fontisto name="person" color={color} size={20} />
          ),
        }}
      />

      <Tab.Screen
        name="Message"
        component={Messages}
        options={{
          tabBarLabel: 'Message',
          tabBarBadge: true,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="inbox" color={color} size={24} />
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
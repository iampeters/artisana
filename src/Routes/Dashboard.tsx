// import React from 'react';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Home from './Home';
// import Reviews from './Reviews';
// import Artisans from './Artisans';

// const Tab = createMaterialBottomTabNavigator();

// export default function Dashboard() {
//   return (
//     <Tab.Navigator
//       initialRouteName="Home"
//       activeColor="#e91e63"
//       style={{ backgroundColor: 'tomato' }}
//     >
//       <Tab.Screen
//         name="Home"
//         component={Home}
//         options={{
//           tabBarLabel: 'Home',
//           tabBarIcon: ({ color }) => (
//             <MaterialCommunityIcons name="home" color={color} size={26} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Reviews"
//         component={Reviews}
//         options={{
//           tabBarLabel: 'Reviews',
//           tabBarIcon: ({ color }) => (
//             <MaterialCommunityIcons name="bell" color={color} size={26} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Artisans"
//         component={Artisans}
//         options={{
//           tabBarLabel: 'Artisans',
//           tabBarIcon: ({ color }) => (
//             <MaterialCommunityIcons name="account" color={color} size={26} />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { CustomThemeInterface } from '../Interfaces/interface';
import { useTheme } from '@react-navigation/native';

export default function Dashboard() {
  const { colors, fonts, fontSizes }: CustomThemeInterface = useTheme();

  return (
    <View style={{ ...style.container }}>
      <Text style={{
        fontFamily: fonts?.RubikBold
      }}>Dashboard</Text>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
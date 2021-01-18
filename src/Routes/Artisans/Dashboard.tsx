import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import Account from '../Account';
import { CustomThemeInterface } from '../../Interfaces/interface';
import { useTheme } from '@react-navigation/native';
import ArtisanHome from './Home';
import Requests from './Requests';
import Reviews from './Reviews';

const Tab = createMaterialBottomTabNavigator();

export default function ArtisanDashboard() {
  const { colors }: CustomThemeInterface = useTheme();


  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
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
        component={ArtisanHome}
        // listeners={()}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" color={color} size={24} />
          ),
          // tabBarBadge: true
        }}
      />
      <Tab.Screen
        name="Requests"
        component={Requests}
        options={{
          tabBarLabel: 'Requests',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="list" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Reviews"
        component={Reviews}
        options={{
          tabBarLabel: 'Reviews',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="star" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
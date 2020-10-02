import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from '../Components/DrawerContent';
import Dashboard from '../Routes/Dashboard';
import MyArtisans from '../Routes/MyArtisans';
import Artisans from '../Routes/Artisans';
import Profile from '../Routes/Profile';
import ChangePassword from '../Routes/ChangePassword';
import Home from '../Routes/Home';
import AddArtisan from '../Routes/AddArtisan';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name='Dashboard' component={Dashboard} />
      <Drawer.Screen name='Profile' component={Profile} />
      {/* <Drawer.Screen name='Artisans' component={Artisans} /> */}
      {/* <Drawer.Screen name='MyArtisans' component={MyArtisans} /> */}
      <Drawer.Screen name='AddArtisan' component={AddArtisan} />
      <Drawer.Screen name='ChangePassword' component={ChangePassword} />
    </Drawer.Navigator>
  );
}

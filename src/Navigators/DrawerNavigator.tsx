import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import Home from '../pages/Home/Home';
// import ChatDetails from '../pages/MessageDetails/MessageDetails';
// import Profile from '../pages/Profile/Profile';
import DrawerContent from '../Components/DrawerContent';
import Dashboard from '../Routes/Dashboard';
// import Settings from '../pages/Settings/Settings';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name='Dashboard' component={Dashboard} />
      {/* <Drawer.Screen name='Profile' component={Profile} /> */}
      {/* <Drawer.Screen name='ChatDetails' component={ChatDetails} /> */}
      {/* <Drawer.Screen name='Courses' component={CourseList} /> */}
      {/* <Drawer.Screen name='CourseDetails' component={CourseDetails} /> */}
      {/* <Drawer.Screen name='Settings' component={Settings} /> */}
    </Drawer.Navigator>
  );
}

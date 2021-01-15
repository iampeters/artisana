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
import ArtisanDetails from '../Routes/ArtisanDetails';
import AddReview from '../Routes/AddReview';
import MyJobs from '../Routes/MyJobs';
import AddJobs from '../Routes/AddJobs';
import JobDetails from '../Routes/JobDetails';
import AssignJob from '../Routes/AssignJob';
import MessageDetails from '../Routes/MessageDetails';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name='Dashboard' component={Dashboard} />
      <Drawer.Screen name='Profile' component={Profile} />
      <Drawer.Screen name='Artisans' component={Artisans} />
      <Drawer.Screen name='MyJobs' component={MyJobs} />
      <Drawer.Screen name='AddJobs' component={AddJobs} />
      <Drawer.Screen name='JobDetails' component={JobDetails} />
      <Drawer.Screen name='AssignJob' component={AssignJob} />
      <Drawer.Screen name='ArtisanDetails' component={ArtisanDetails} />
      <Drawer.Screen name='MessageDetails' component={MessageDetails} />
      <Drawer.Screen name='AddArtisan' component={AddArtisan} />
      <Drawer.Screen name='AddReview' component={AddReview} />
      <Drawer.Screen name='ChangePassword' component={ChangePassword} />
    </Drawer.Navigator>
  );
}

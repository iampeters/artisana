import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from '../Routes/Profile';
import ChangePassword from '../Routes/ChangePassword';
import ArtisanDrawerContent from '../Components/ArtisanDrawerContents';
import ArtisanDashboard from '../Routes/Artisans/Dashboard';
import ActiveJobs from '../Routes/Artisans/ActiveJobs';
import CompletedJobs from '../Routes/Artisans/CompletedJobs';
import DeclinedJobs from '../Routes/Artisans/DeclinedJobs';
import ArtisanJobDetails from '../Routes/Artisans/JobDetails';
import RequestDetails from '../Routes/Artisans/RequestDetails';

const Drawer = createDrawerNavigator();

export default function ArtisanDrawerNavigator() {
  return (
    <Drawer.Navigator drawerContent={(props) => <ArtisanDrawerContent {...props} />}>
      <Drawer.Screen name='Dashboard' component={ArtisanDashboard} />
      <Drawer.Screen name='Profile' component={Profile} />
      <Drawer.Screen name='ActiveJobs' component={ActiveJobs} />
      <Drawer.Screen name='JobDetails' component={ArtisanJobDetails} />
      <Drawer.Screen name='RequestDetails' component={RequestDetails} />
      <Drawer.Screen name='CompletedJobs' component={CompletedJobs} />
      <Drawer.Screen name='DeclinedJobs' component={DeclinedJobs} />
      <Drawer.Screen name='ChangePassword' component={ChangePassword} />
    </Drawer.Navigator>
  );
}

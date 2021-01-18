import React, { useState, useEffect } from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import {
  Drawer,
  Text,
  Avatar,
} from 'react-native-paper';
import { View } from 'native-base';
import { StyleSheet, Alert, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../Redux/Actions/themeActions';
import { useTheme, StackActions } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { logout } from '../Redux/Actions/userActions';
import Spinner from 'react-native-loading-spinner-overlay';
import { Reducers } from '../interfaces/interface';
import { CustomThemeInterface } from '../Interfaces/interface';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

export default function ArtisanDrawerContent(props: any) {
  const dispatch = useDispatch();
  const theme = useSelector((state: any) => state.theme);
  const [, setDarkMode] = useState(false);
  const { colors, fonts, fontSizes }: CustomThemeInterface = useTheme();
  const auth = useSelector((state: Reducers) => state.auth);
  const user = useSelector((state: Reducers) => state.user);

  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    if (theme === 'dark' || 'blue') {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, [theme]);

  useEffect(() => {
    if (!auth.isLoggedIn) {
      setSpinner(false);
      props.navigation.dispatch(StackActions.replace('GetStarted'));
    }
  }, [auth]);

  const logOut = () => {
    setSpinner(true);
    // setTimeout(() => {
    dispatch(logout());
    // }, 2000);
    // BackHandler.exitApp();
  };

  const confirmExit = () => {
    // close drawer
    props.navigation.closeDrawer();

    Alert.alert(
      'Logout',
      'we will miss you',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Yes', onPress: logOut, style: 'destructive' },
      ],
      { cancelable: true }
    );
    // return true;
  };


  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* <Spinner
        visible={spinner}
        textContent={'Goodbye...'}
        color={colors.text}
        animation='fade'
      /> */}
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          {/* user */}
          <View style={styles.userInfoSection}>
            <View style={{
              // flexDirection: 'row', 
              // marginTop: 15,
              // backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Avatar.Image
                source={{ uri: user.imageUrl }}
                size={100}
                style={{
                  // marginLeft: -25
                }}
              />
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Profile')}
                style={{
                  // marginLeft: -25
                }}
              >
                <View style={{
                  width: '100%',
                }}>
                  <Text
                    style={
                      {
                        ...styles.title,
                        color: colors.text,
                        fontFamily: fonts?.ProductSansBold,
                        fontSize: fontSizes?.heading,
                        marginTop: 10
                      }
                    }
                  >
                    {user.firstname} {user.lastname}
                  </Text>
                  {/* <Text
                    style={
                      {
                        ...styles.title,
                        color: colors.text,
                        fontFamily: fonts?.ProductSansRegular,
                        fontSize: fontSizes?.small,
                        // marginTop: 10
                      }
                    }

                  >
                    {user.categoryId}
                  </Text> */}
                </View>
              </TouchableOpacity>
            </View>

          </View>

          {/* screens */}
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={() => (
                <MaterialIcons
                  name='home'
                  style={{ color: colors.text, fontSize: 24 }}
                />
              )}
              label='Dashboard'
              onPress={() => {
                props.navigation.navigate('Home');
              }}
              activeTintColor={colors.active}
              labelStyle={{ color: colors.text, fontSize: fontSizes?.body, fontFamily: fonts?.FuturaRegular }}
            // style={{
            //   justifyContent: 'space-evenly',
            //   alignItems: 'flex-start'
            // }}
            />

            <DrawerItem
              icon={() => (
                <MaterialIcons
                  name='list'
                  style={{ color: colors.text, fontSize: 24 }}
                />
              )}
              label='Requests'
              onPress={() => {
                props.navigation.navigate('Requests');
              }}
              activeTintColor={colors.active}
              labelStyle={{ color: colors.text, fontSize: fontSizes?.body, fontFamily: fonts?.FuturaRegular }}
            />

            <DrawerItem
              icon={() => (
                <MaterialIcons
                  name='assignment'
                  style={{ color: colors.text, fontSize: 24 }}
                />
              )}
              label='Active Jobs'
              onPress={() => {
                props.navigation.navigate('ActiveJobs');
              }}
              activeTintColor={colors.active}
              labelStyle={{ color: colors.text, fontSize: fontSizes?.body, fontFamily: fonts?.FuturaRegular }}
            />

            <DrawerItem
              icon={() => (
                <MaterialIcons
                  name='done-all'
                  style={{ color: colors.text, fontSize: 24 }}
                />
              )}
              label='Completed Jobs'
              onPress={() => {
                props.navigation.navigate('CompletedJobs');
              }}
              activeTintColor={colors.active}
              labelStyle={{ color: colors.text, fontSize: fontSizes?.body, fontFamily: fonts?.FuturaRegular }}
            />

            <DrawerItem
              icon={() => (
                <MaterialIcons
                  name='thumb-down'
                  style={{ color: colors.text, fontSize: 24 }}
                />
              )}
              label='Declined Jobs'
              onPress={() => {
                props.navigation.navigate('DeclinedJobs');
              }}
              activeTintColor={colors.active}
              labelStyle={{ color: colors.text, fontSize: fontSizes?.body, fontFamily: fonts?.FuturaRegular }}
            />

            <DrawerItem
              icon={() => (
                <MaterialIcons
                  name='star'
                  style={{ color: colors.text, fontSize: 24 }}
                />
              )}
              label='Reviews'
              onPress={() => {
                props.navigation.navigate('Reviews');
              }}
              activeTintColor={colors.active}
              labelStyle={{ color: colors.text, fontSize: fontSizes?.body, fontFamily: fonts?.FuturaRegular }}
            />

            <DrawerItem
              icon={() => (
                <MaterialIcons
                  name='person'
                  style={{ color: colors.text, fontSize: 24, }}
                />
              )}
              label='Account'
              onPress={() => {
                props.navigation.navigate('Account', {
                  data: user
                });
              }}
              activeTintColor={colors.active}
              labelStyle={{ color: colors.text, fontSize: fontSizes?.body, fontFamily: fonts?.FuturaRegular }}
            // style={{
            //   justifyContent: 'space-around',
            //   alignItems: 'flex-start',
            // }}
            />

          </Drawer.Section>

          {/* preference */}
          {/* <Drawer.Section theme={theme}>
            <List style={[styles.spacing]}>
              <Text style={[styles.spacingText, { color: colors.text, fontSize: fontSizes?.body, fontFamily: fonts?.FuturaRegular}]}>
                Themes
              </Text>
            </List>
            <View style={styles.preference}>
              <Content contentContainerStyle={{
                flexDirection: 'row',
              }}>

                <TouchableRipple onPress={() => _setTheme('light')}>
                  <View
                    style={[
                      styles.themes,
                      {
                        backgroundColor: '#fafbfc',
                        borderColor: colors.light,
                      },
                    ]}
                  >
                    <Ionicons
                      name={isDarkMode ? 'md-sunny' : 'md-sunny'}
                      style={{ color: colors.dark, fontSize: fontSizes?.iconSize }}
                    />
                  </View>
                </TouchableRipple>


                <TouchableRipple onPress={() => _setTheme('dark')}>
                  <View
                    style={[
                      styles.themes,
                      {
                        backgroundColor: colors.dark,
                        borderColor: colors.light,
                      },
                    ]}
                  >
                    <Ionicons
                      name={isDarkMode ? 'md-sunny' : 'md-sunny'}
                      style={{ color: colors.white, fontSize: fontSizes?.iconSize }}
                    />
                  </View>
                </TouchableRipple>
              </Content>
            </View>
          </Drawer.Section> */}
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ }) => (
            <FontAwesome5
              name='sign-out-alt'
              style={{ color: colors.danger, fontSize: fontSizes?.iconSize, fontFamily: fonts?.ProductSansBold }}
            />
          )}
          label='Logout'
          onPress={() => confirmExit()}
          labelStyle={{
            color: colors.danger,
            fontFamily: fonts?.FuturaBold,
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    // paddingLeft: 20,
    // backgroundColor: 'red'
  },
  title: {
    marginTop: 3,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: Platform.OS === "ios" ? 20 : 0,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  themes: {
    width: 50,
    height: 50,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100 / 2,
    borderWidth: 1,
    marginRight: 5,
  },
  spacing: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flex: 1,
    marginTop: 10,
  },
  spacingText: {
    fontFamily: 'ProductSansRegular',
    fontSize: 16,
  },
});

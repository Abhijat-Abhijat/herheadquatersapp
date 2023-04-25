import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// navigators
import NewsfeedNavigator from 'src/routers/AppNavigator/NewsfeedNavigator';
import MyCollaborationsNavigator from 'src/routers/AppNavigator/MyCollaborationsNavigator';
import ChatNavigator from 'src/routers/AppNavigator/ChatNavigator';
import FavoritesNavigator from 'src/routers/AppNavigator/FavoritesNavigator';
import UserNavigator from 'src/routers/AppNavigator/UserNavigator';
// icons
import HerHeadquartersIcon from 'src/components/Icons/HerHeadquartersIcon';
import ChatBottomIcon from 'src/components/Icons/ChatBottomIcon';
import CollaborationsBottomIcon from 'src/components/Icons/CollaborationsBottomIcon';
// styles
import {
  contrastTextInactive,
  contrastText,
  primaryColor,
} from 'src/assets/jss/styles';

const Tab = createBottomTabNavigator();

function AppTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Newsfeed"
      screenOptions={({ route }) => {
        const screensWithoutTabBar = ['FullScreenImage'];

        return {
          tabBarIcon: ({ color }) => {
            const size = 23;
            let icon;

            switch (route.name) {
              case 'Newsfeed':
                icon = (
                  <HerHeadquartersIcon
                    name={'ios-paper'}
                    size={size}
                    color={color}
                  />
                );
                break;
              case 'Partnerships':
                icon = (
                  <CollaborationsBottomIcon size={size * 1.2} color={color} />
                );
                break;
              case 'Chat':
                icon = <ChatBottomIcon size={size} color={color} />;
                break;
              case 'Favorites':
                icon = (
                  <HerHeadquartersIcon
                    name={'ios-heart'}
                    size={size}
                    color={color}
                  />
                );
                break;
              case 'MyHQ':
                icon = (
                  <HerHeadquartersIcon
                    name={'md-apps'}
                    size={size}
                    color={color}
                  />
                );
                break;
              default:
                break;
            }

            return icon;
          },
          tabBarVisible: !screensWithoutTabBar.includes(route.name),
        };
      }}
      tabBarOptions={{
        activeTintColor: contrastText,
        inactiveTintColor: contrastTextInactive,
        style: {
          backgroundColor: primaryColor.main,
          paddingBottom: 1,
        },
        labelStyle: {
          fontSize: 11,
          letterSpacing: 0,
          lineHeight: 14,
          marginBottom: 0,
        },
      }}
    >
      <Tab.Screen name="Newsfeed" component={NewsfeedNavigator} />
      <Tab.Screen name="Partnerships" component={MyCollaborationsNavigator} />
      <Tab.Screen name="Chat" component={ChatNavigator} />
      <Tab.Screen name="Favorites" component={FavoritesNavigator} />
      <Tab.Screen name="MyHQ" component={UserNavigator} />
    </Tab.Navigator>
  );
}

export default AppTabNavigator;

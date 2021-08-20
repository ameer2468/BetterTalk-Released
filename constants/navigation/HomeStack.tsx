import {AntDesign, MaterialIcons} from '@expo/vector-icons';
import HomeContent from '../../screens/homeContent';
import RequestScreen from '../../screens/RequestScreen';
import MessageContent from '../../screens/MessagesContent';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Platform} from 'react-native';
import {activeTab, darkCard, darkTabs, darkText} from '../styling/colors/colors';

const Tab = createBottomTabNavigator();

export const HomeTabs = () => {

    return (
        <Tab.Navigator
            initialRouteName='Home'
            sceneContainerStyle={{backgroundColor: darkCard}}
            tabBarOptions={{
                labelStyle: {
                    fontSize: 12,
                },
                showLabel: false,
                inactiveTintColor: darkText,
                activeTintColor: activeTab,
                style: {
                    backgroundColor: darkTabs,
                    height: Platform.OS === 'ios' ? 75 : 70,
                    paddingTop: 14,
                    paddingBottom: Platform.OS === 'ios' ? 30 : 10,
                    borderTopColor: 'transparent',
                    borderTopWidth: 0,
                    elevation: 0,
                    shadowOpacity: 0,
                }
            }}
        >
            <Tab.Screen   options={{
                // tabBarLabel: "Messages",
                tabBarIcon: ({color, size}) => (
                    <AntDesign name={'wechat'} color={color} size={25}/>
                )
            }} name='Messages' component={MessageContent}/>
            <Tab.Screen
                options={{
                    // tabBarLabel: "Home",
                    tabBarIcon: ({color}) => (
                        <MaterialIcons name='home' color={color} size={30}/>
                    )
                }}
                name='Home' component={HomeContent}/>
           <Tab.Screen
                options={{
                    // tabBarLabel: "Home",
                    tabBarIcon: ({color}) => (
                        <MaterialIcons name='contact-support' color={color} size={30}/>
                    )
                }}
                name='Request' component={RequestScreen}/>
        </Tab.Navigator>
    )
}

export default HomeTabs;

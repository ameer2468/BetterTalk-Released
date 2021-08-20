import {AntDesign, MaterialIcons, FontAwesome} from '@expo/vector-icons';
import HomeContent from '../../screens/homeContent';
import MessageContent from '../../screens/MessagesContent';
import MembersContent from '../../screens/MembersContent';
import React from 'react';
import {Platform} from 'react-native';
import {darkText, darkCard, darkTabs, activeTab} from '../styling/colors/colors';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import RequestScreen from '../../screens/RequestScreen';
import {auth} from '../firebase/firebase';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';

const Tab = createBottomTabNavigator();

const VolunteerTabs = () => {

    const membersReducer = useSelector((state: RootState) => state.membersReducer)

    const currentMember = membersReducer.members.filter((member: any) => {
        const value = auth.currentUser?.email as any
        return member.data.email === value?.charAt(0).toUpperCase() + value?.slice(1)
    })


    return (
        <Tab.Navigator
            sceneContainerStyle={{backgroundColor: darkCard}}
            initialRouteName='Home'
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
            <Tab.Screen options={{
                tabBarIcon: ({color, size}) => (
                    <FontAwesome name={'users'} color={color} size={22}/>
                )
            }} name='Members' component={MembersContent}/>
            <Tab.Screen
                options={{
                    tabBarIcon: ({color}) => (
                        <MaterialIcons name='home' color={color} size={30}/>
                    )
                }}
                name='Home' component={HomeContent}/>
            <Tab.Screen   options={{
                tabBarIcon: ({color, size}) => (
                    <AntDesign name={'wechat'} color={color} size={25}/>
                )
            }} name='Messages' component={MessageContent}/>
          <Tab.Screen
                options={{
                    // tabBarLabel: "Home",
                    tabBarIcon: ({color}) => (
                        <MaterialIcons name='contact-support' color={color} size={30}/>
                    )
                }}
                name='request' component={RequestScreen}/>
        </Tab.Navigator>
    )
}

export default VolunteerTabs;

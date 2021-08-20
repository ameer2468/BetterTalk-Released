import React from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import {MembersStyle} from '../constants/styling/MembersScreen';

const MemberItem = ({data, id, enterChat}: any) => {
    return (
        <TouchableOpacity activeOpacity={0.9} key={id} onPress={() => enterChat(id)}>
        <View style={MembersStyle.MemberCard}>
            <Image style={MembersStyle.MemberImage} source={require('../assets/avatar.png')}/>
            <Text style={MembersStyle.MemberName}>{data.displayName}</Text>
            <Text style={MembersStyle.date}>{data.joinedDate}</Text>
            <Text style={MembersStyle.issue}>{data.requestedForm.issue}</Text>
        </View>
        </TouchableOpacity>
    )
}

export default MemberItem;

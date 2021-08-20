import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {HomeStyle} from '../constants/styling/HomeScreen';
import {AntDesign} from '@expo/vector-icons';
import {db, auth} from '../constants/firebase/firebase';

const PostItem = ({item}: any) => {

    const checkUser = item.data.usersLiked.filter((user: any) => {
        return user.user === auth.currentUser?.displayName
    })

    const findDeleteIndex = item.data.usersLiked.findIndex((user: any) => {
        return user.user === auth.currentUser?.displayName
    })

    const likeHandler = () => {
        if (checkUser[0] === undefined) {
            db.collection('posts')
                .doc(item.data.id.toString())
                .update(
                    {
                        like: item.data.like + 1,
                        usersLiked: [...item.data.usersLiked, {user: auth.currentUser?.displayName}]
                    }
                )
        } else if (checkUser[0].user === auth.currentUser?.displayName) {
            db.collection('posts')
                .doc(item.data.id.toString())
                .update(
                    {
                        like: item.data.like - 1,
                        usersLiked: [...item.data.usersLiked.slice(0, findDeleteIndex), ...item.data.usersLiked.slice(findDeleteIndex + 1)]
                    }
                )
        } else if(checkUser[0].user !== auth.currentUser?.displayName) {
            db.collection('posts')
                .doc(item.data.id.toString())
                .update(
                    {
                        like: item.data.like + 1,
                        usersLiked: [...item.data.usersLiked, {user: auth.currentUser?.displayName}]
                    }
                )
        }
    }

    const shortenText = (text: string) => {
        if (text === undefined) {
            return <></>
        } else if (text.length > 20) {
           return `${text.substring(0, 15) + '...'}`
        } else {
            return text;
        }
    }

    const liked = checkUser.length === 0 ? '#999999' :  checkUser[0].user === auth?.currentUser?.displayName ? '#FF0000' : '#cbcbcb'

    return (
        <View style={HomeStyle.TextContainer}>
            <Text style={HomeStyle.QuoteText}>{`"${item.data.text}"`}</Text>
            <Text style={HomeStyle.AuthorText}>{`${item.data.author === null ? 'Unknown' : shortenText(item.data.author)}`}</Text>
            <TouchableOpacity style={HomeStyle.LikeStyling} onPress={likeHandler}>
                <View style={HomeStyle.LikeWrap}>
                    <AntDesign name='heart' color={liked} size={20}/>
                    <Text style={HomeStyle.LikeText}>{item.data.like}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default PostItem;

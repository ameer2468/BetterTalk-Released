import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import {View, Image, Text, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {Button} from 'react-native-elements';

const OnBoarding = ({navigation}: any) => {

    const Skip = ({...props}) => (
            <View style={{paddingLeft: 20}}>
                <Button
                    type={'clear'}
                    title={'Skip'}
                    style={{paddingLeft: 20}}
                    titleStyle={{color: 'white'}}
                    {...props}
                />
            </View>
    )

    const Next = ({...props}) => (
        <View style={{paddingRight: 20}}>
            <Button
                type={'clear'}
                title={'Next'}
                titleStyle={{color: 'white'}}
                {...props}
            />
        </View>
    )

    const Done = ({...props}) => (
        <View style={{paddingRight: 20}}>
            <Button
                type={'clear'}
                title={'Done'}
                titleStyle={{color: 'white'}}
                {...props}
            />
        </View>
    )

    return (
        <Onboarding
            onSkip={() => navigation.replace('Login')}
            onDone={() => navigation.replace('Login')}
            SkipButtonComponent={Skip}
            NextButtonComponent={Next}
            DoneButtonComponent={Done}
            pages={[
                {
                    backgroundColor: '#720eff',
                    image: <Image source={require('../assets/boarding1.png')} />,
                    title: 'Connect with a volunteer',
                    subtitle: 'Vent & speak to someone about your difficulties',
                },
                {
                    backgroundColor: '#35b7d7',
                    image: <Image source={require('../assets/boarding2.png')} />,
                    title: 'Browse Inspiring Quotes',
                    subtitle: 'Feel motivated and inspired by wisdom',
                }
            ]}
        />
    );
};

export default OnBoarding;

import React from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';

const CustomStatusBar = ({backgroundColor, ...props}: any) => {
    return (
        <View style={backgroundColor}>
            <StatusBar backgroundColor={backgroundColor} {...props} />
        </View>
    );
};



export default CustomStatusBar;

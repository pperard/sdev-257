import React from 'react';
import {Text, View, ScrollView, TouchableOpacity} from "react-native";
import Animated, { FadeInLeft, FadeOutRight} from "react-native-reanimated";

import Styles from "./styles";

export default function Swipeable({onSwipe, name}) {
    function onScroll(e) {
        e.nativeEvent.contentOffset.x === 1 && onSwipe();
    }

    const scrollProps = {
        horizontal: true,
        pagingEnabled: true,
        showsHorizontalScrollIndicator: false,
        scrollEventThrottle: 10,
        onScroll,
    };

    return(
        <View style={Styles.container}>
            <ScrollView {...scrollProps}>
                <Animated.View entering={FadeInLeft} exiting={FadeOutRight} style={Styles.container}>
                    <TouchableOpacity>
                        <View>
                            <Text style={Styles.item}>{name}</Text>
                        </View>
                    </TouchableOpacity>
                    
                </Animated.View>
            </ScrollView>
        </View>
    )
}
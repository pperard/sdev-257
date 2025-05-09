import React from "react";
import { View, Text} from "react-native";
import Styles from "./styles"

export default function Details({ route }) {
    const { film } = route.params; // Access the passed film data

    return (
        <View style={[Styles.container, {padding: 16}]}>
            <Text style={Styles.title}>{film.properties.title}</Text>
            <Text style={Styles.text}>Director: {film.properties.director}</Text>
            <Text style={Styles.text}>Release Date: {film.properties.release_date}</Text>
            <Text></Text>
            {/* <Text style={styles.text}>Description</Text> */}
            <Text style={Styles.description}>{film.properties.opening_crawl}</Text>
        </View>
    );
}

import React, {useState, useEffect} from "react";
import {View, Text, FlatList} from "react-native";
import Styles from "./styles";

export default function Planets(){
    const [planets, setPlanets] = useState([]) // for receiving the planets
    const [error, setError] = useState(null) // for error handling

    // fetch the planet from the API when the app load
    useEffect(() => {
        const fetchPlanets = async () => {
            try{
                const response = await fetch("https://www.swapi.tech/api/planets")

                if(!response.ok){
                    throw new Error("Failed to get response from API.")
                }

                const data = await response.json()
                setPlanets(data.results)
            }
            catch(err){
                setError(err)
            }
        }
        fetchPlanets()

    }, [])

    if(error){
        return(
            <View style={Styles.container}>
                <Text>{error.message}</Text>
            </View>
        )
    }

    return (
        <View style={Styles.container}>
            <FlatList
            data={planets}
            keyExtractor={(item) => item.uid}
            renderItem={({item}) => (
                <Text style={Styles.item}>{item.name}</Text>
            )} />
        </View>
    )
}
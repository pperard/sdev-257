import React, {useState, useEffect} from "react";
import {View, Text, FlatList} from "react-native";
import Styles from "./styles"

export default function Spaceships(){
        const [spaceships, setSpaceships] = useState([]) // for receiving the spaceships fetched from the API
        const [error, setError] = useState(null) // for handling errors
    
        // fetch the planet from the API when the app load
        useEffect(() => {
            const fetchSpaceships = async () => {
                try{
                    const response = await fetch("https://www.swapi.tech/api/starships")
                    
                    if(!response.ok){
                        throw new Error("Failed to get response from API.")
                    }
    
                    const data = await response.json()
                    setSpaceships(data.results)
                }
                catch(err){
                    setError(err)
                }
            }
            fetchSpaceships()
    
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
            data={spaceships}
            keyExtractor={(item) => item.uid}
            renderItem={({item}) => (
                <Text style={Styles.item}>{item.name}</Text>
            )} />
        </View>
    )
}
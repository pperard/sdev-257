import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {View, Text, FlatList} from "react-native";
import Styles from "./styles"
import Input from "./input";
import Notif from "./Notif";

Input.propTypes = {
    label: PropTypes.string,
};

export default function Spaceships(){
        const [spaceships, setSpaceships] = useState([]) // for receiving the spaceships fetched from the API
        const [error, setError] = useState(null) // for handling errors
        const [message, setMessage] = useState(null)// for knowing what message to display in the modal

    
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
            <Notif message={message} />
            <Input 
            label="Search"
            onSubmitEditing={(e) => {
                setMessage(e.nativeEvent.text);
            }}
            />
            <FlatList
            data={spaceships}
            keyExtractor={(item) => item.uid}
            renderItem={({item}) => (
                <Text style={Styles.item}>{item.name}</Text>
            )} />
        </View>
    )
}
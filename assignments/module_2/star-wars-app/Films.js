import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {View, Text, FlatList} from "react-native";
import Styles from "./styles";
import Input from "./input";
import Notif from "./Notif";

Input.propTypes = {
    label: PropTypes.string,
};

export default function Films(){
    const [films, setFilms] = useState([]) // for receiving the films fetched from the API
    const [error, setError] = useState(null) // for handling errors
    const [message, setMessage] = useState(null)// for knowing what message to display in the modal


    // fetch the planet from the API when the app load
    useEffect(() => {
        const fetchFilms = async () => {
            try{
                const response = await fetch("https://www.swapi.tech/api/films")
                
                if(!response.ok){
                    throw new Error("Failed to get response from API.")
                }

                const data = await response.json()
                setFilms(data.result)
            }
            catch(err){
                setError(err)
            }
        }
        fetchFilms()

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
            data={films}
            keyExtractor={(item) => item._id}
            renderItem={({item}) => (
                <Text style={Styles.item}>{item.properties.title}</Text>
            )} />
        </View>
    )
}
import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {View, Text, ScrollView} from "react-native";
import Styles from "./styles";
import Input from "./input";
import Notif from "./Notif";

Input.propTypes = {
    label: PropTypes.string,
};

export default function Planets(){
    const [planets, setPlanets] = useState([]) // for receiving the planets
    const [error, setError] = useState(null) // for error handling
    const [message, setMessage] = useState(null)// for knowing what message to display in the modal


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
            <Notif message={message} />
            <Input 
            label="Search"
            onSubmitEditing={(e) => {
                setMessage(e.nativeEvent.text);
            }}
            />
            <ScrollView style={Styles.scroll}>
                {planets.map((v, i) => (
                    <View key={i}>
                        <Text style={Styles.item}>{planets[i].name}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}
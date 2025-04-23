import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {View, Text, ScrollView} from "react-native";
import Styles from "./styles";
import Input from "./input";
import Notif from "./Notif";
import Swipeable from "./Swipeable";

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

    // implementing the swipeable feature
    function onSwipe(id) {
        return () => {
            setPlanets(planets.filter((planet) => planet.uid !== id))
        }
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
                    <Swipeable key={planets[i].uid} onSwipe={onSwipe(planets[i].uid)} name={planets[i].name} />
                ))}
            </ScrollView>
        </View>
    )
}
import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {View, Text, ScrollView, Image} from "react-native";
import Styles from "./styles";
import Input from "./input";
import Notif from "./Notif";
import Swipeable from "./Swipeable";
import NetInfo from "@react-native-community/netinfo"

Input.propTypes = {
    label: PropTypes.string,
};

// Props for image, logo
const sourceProp = PropTypes.oneOfType([
  PropTypes.shape({
    uri: PropTypes.string.isRequired,
  }),
  PropTypes.number,
]).isRequired;

Films.propTypes = {
  reactSource: sourceProp,
};

Films.defaultProps = {
  reactSource: {
    uri: "https://www.vhv.rs/dpng/d/447-4475287_jedi-order-symbol-png-jedi-order-symbols-transparent.png",
  },
}; // end of prop for image, logo

const connectedMap = { //connectedMap covers all connection states and will help us to render it on the screen.
    none: "Disconnected",
    unknown: "Disconnected",
    wifi: "Connected",
    cell: "Connected",
    mobile: "Connected",
}


export default function Films({reactSource , navigation}){
    const [films, setFilms] = useState([]) // for receiving the films fetched from the API
    const [originalFilms, setOriginalFilms] = useState([]); // Store the original list of films    
    const [error, setError] = useState(null) // for handling errors
    const [message, setMessage] = useState(null)// for knowing what message to display in the modal
    const [connected, setConnected] = useState("");


    // fetch the film from the API when the app load
    useEffect(() => {
        const fetchFilms = async () => {
            try{
                const response = await fetch("https://www.swapi.tech/api/films")
                
                if(!response.ok){
                    throw new Error("Failed to get response from API.")
                }

                const data = await response.json()
                setFilms(data.result)
                setOriginalFilms(data.result); // Save the original list
            }
            catch(err){
                setError(err)
            }
        }
        // fetchFilms()

        function onNetworkChange(connection){
            setConnected(connectedMap[connection.type]);
            if (connection.isConnected === true) {
                fetchFilms() // fetch the API only if the device is connected.
                // console.log(connection)
            }
            else {
                console.log("unfortunately your device is " + connected)
            }
        }
        const unsubscribe = NetInfo.addEventListener(onNetworkChange);
        return () => {
            unsubscribe()
            
        }

    }, [])

    if(error){
        return(
            <View style={Styles.container}>
                <Text>{error.message}</Text>
            </View>
        )
    }

    // implementing the swipeable feature
    function onSwipe(navigation, film) {
        return () => {
            // setMessage(filmName)
            // setFilms(films.filter((film) => film.uid !== id))
            navigation.navigate("Details", {film}) // also passing the film data to the details screen
        }
    }


    return (
        <View style={Styles.container}>
            <Image style={Styles.image} source={reactSource} />
            <Notif message={message} />
            <Input 
            label="Search"
            onChangeText={(text) => {
                const filteredFilms = originalFilms.filter((film) =>
                    film.properties.title.toLowerCase().includes(text.toLowerCase()) // Case-insensitive partial match
                );
                setFilms(filteredFilms);
            }}
            />
            <ScrollView style={Styles.scroll}>
                {films.map((film, i) => (
                    <View key={i}>
                        <Swipeable key={film.uid} onSwipe={onSwipe(navigation, film)} name={film.properties.title} />
                    </View>
                ))}
                <View>
                    <Text>Your device is {connected}</Text>
                </View>
            </ScrollView>
        </View>
    )
}
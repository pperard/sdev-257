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

Planets.propTypes = {
  reactSource: sourceProp,
};

Planets.defaultProps = {
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

// App starts here
export default function Planets({reactSource}){
    const [planets, setPlanets] = useState([]) // for receiving the planets
    const [originalPlanets, setOriginalPlanets] = useState([]); // Store the original list of planets
    const [error, setError] = useState(null) // for error handling
    const [message, setMessage] = useState(null)// for knowing what message to display in the modal
    const [connected, setConnected] = useState("");


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
                setOriginalPlanets(data.results); // Save the original list
            }
            catch(err){
                setError(err)
            }
        }
// fetchPlanets()

        function onNetworkChange(connection){
            setConnected(connectedMap[connection.type]);
            if (connection.isConnected === true) {
                fetchPlanets() // fetch the API only if the device is connected.
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
    function onSwipe(planetName, id) {
        return () => {
            setMessage(planetName)
            setPlanets(planets.filter((planet) => planet.uid !== id))
        }
    }

    return (
        <View style={Styles.container}>
            <Image style={Styles.image} source={reactSource} />
            <Notif message={message} />
            <Input 
            label="Search"
            onChangeText={(text) => {
                const filteredPlanets = originalPlanets.filter((planet) =>
                    planet.name.toLowerCase().includes(text.toLowerCase()) // Case-insensitive partial match
                );
                setPlanets(filteredPlanets);
            }}
            />
            
            <ScrollView style={Styles.scroll}>
                {planets.map((v, i) => (
                    <View key={i}>
                        <Swipeable key={planets[i].uid} onSwipe={onSwipe(planets[i].name, planets[i].uid)} name={planets[i].name} />
                    </View>
                ))}

                <View>
                    <Text>Your device is {connected}</Text>
                </View>
            </ScrollView>

        </View>
    )
}
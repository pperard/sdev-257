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

Spaceships.propTypes = {
  reactSource: sourceProp,
};

Spaceships.defaultProps = {
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


export default function Spaceships({reactSource}){
        const [spaceships, setSpaceships] = useState([]) // for receiving the spaceships fetched from the API
        const [error, setError] = useState(null) // for handling errors
        const [message, setMessage] = useState(null)// for knowing what message to display in the modal
        const [connected, setConnected] = useState("");

    
        // fetch the spaceship from the API when the app load
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
        // fetchSpaceships()

        function onNetworkChange(connection){
            setConnected(connectedMap[connection.type]);
            if (connection.isConnected === true) {
                fetchSpaceships() // fetch the API only if the device is connected.
                console.log(connection)
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
    function onSwipe(spaceshipName, id) {
        return () => {
            setMessage(spaceshipName)
            setSpaceships(spaceships.filter((spaceship) => spaceship.uid !== id))
        }
    }

    
    return (
        <View style={Styles.container}>
            <Image style={Styles.image} source={reactSource} />
            <Notif message={message} />
            <Input 
            label="Search"
            onSubmitEditing={(e) => {
                setMessage(e.nativeEvent.text);
            }}
            />
            <ScrollView>
                {spaceships.map((v, i) => (
                    <View key={i}>
                        <Swipeable key={spaceships[i].uid} onSwipe={onSwipe(spaceships[i].name, spaceships[i].uid)} name={spaceships[i].name} />
                    </View>
                ))}

                <View>
                    <Text>Your device is {connected}</Text>
                </View>
            </ScrollView>
        </View>
    )
}
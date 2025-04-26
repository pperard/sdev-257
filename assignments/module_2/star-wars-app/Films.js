import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {View, Text, ScrollView, Image} from "react-native";
import Styles from "./styles";
import Input from "./input";
import Notif from "./Notif";
import Swipeable from "./Swipeable";

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
};


export default function Films({reactSource}){
    const [films, setFilms] = useState([]) // for receiving the films fetched from the API
    const [error, setError] = useState(null) // for handling errors
    const [message, setMessage] = useState(null)// for knowing what message to display in the modal


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

    // implementing the swipeable feature
    function onSwipe(filmName, id) {
        return () => {
            setMessage(filmName)
            setFilms(films.filter((film) => film.uid !== id))
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
            <ScrollView style={Styles.scroll}>
                {films.map((v, i) => (
                    <View key={i}>
                        <Swipeable key={films[i].uid} onSwipe={onSwipe(films[i].properties.title, films[i].uid)} name={films[i].properties.title} />
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}
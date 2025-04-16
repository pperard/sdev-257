import {Text, TextInput, View} from "react-native";
import Styles from "./styles";

export default function Input(props) {
    return (
        <View style={Styles.textInputContainer}>
            <Text style={Styles.textInputLabel}>{props.label}</Text>
            <TextInput style={Styles.textInput} {...props} />
        </View>
    )
}
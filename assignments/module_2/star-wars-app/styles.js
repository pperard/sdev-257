import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    item: {
        width: 250,
        marginTop: 24,
        padding: 10,
        backgroundColor: "orange",
        fontSize: 18,
        textAlign: "center"
    },
    textInputContainer: {
        alignSelf: "stretch",
        marginBottom: 30,
    },
    textInputLabel: {
        marginBottom: 4,
        textAlign: "center",
        fontSize: 20,
    },
    textInput: {
        backgroundColor: "white",
        height: 50,
        fontSize: 25,
        borderStyle: "solid",
        borderWidth: 1,
        alignItems: "center"
    },
    notificationContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
    
    notificationInner: {
        backgroundColor: "azure",
        padding: 20,
        borderWidth: 1,
        borderColor: "lightsteelblue",
        borderRadius: 2,
        alignItems: "center",
    },
    scroll: {
        flex: 1,
        height: 1,
        alignSelf: "center",
    },
    swipeBlank: {
        height: 30,
    },
    image: {
        width: 40,
        height: 40,
        margin: 5,
    },
        title: {
            fontSize: 34,
            fontWeight: "bold",
            marginBottom: 8,
        },
        text: {
            fontSize: 20
        },
        description: {
            alignSelf: "stretch",
            fontFamily: "Courier New",
            fontSize:18,
            fontWeight: 500
        },
    
    
});
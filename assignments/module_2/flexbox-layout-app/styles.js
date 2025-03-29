import { Platform, StyleSheet, StatusBar} from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "ghostwhite",
        alignItems: 'center',
        justifyContent: "center",
    },
    containerRow: {
      flex: 0,
      flexDirection: "row",
      backgroundColor: "ghostwhite",
      alignItems: 'center',
      justifyContent: "center",
    },
    containerColumn:{
        flex: 1,
        flexDirection: "column",
        backgroundColor: "ghostwhite",
        alignItems: 'center',
        justifyContent: 'space-around',  
    },
    ...Platform.select({
        ios: {padding: 20},
        android: {paddingTop: StatusBar.currentHeight}
    }),
    box: {
        width: 100,
        height: 100,
        margin: 5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "lightgray",
        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: "darkslatefray",
    },
    boxText: {
        color: "darkslategray",
        fontWeight: "bold",
    }
  });
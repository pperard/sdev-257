import { NavigationContainer } from "@react-navigation/native"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Platform } from "react-native"
import Planet from "./Planets"
import Spaceships from "./Spaceships"
import Films from "./Films"
import Details from "./Details"

const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator()

export default function App() {
    return (
        <NavigationContainer>
          {Platform.OS === "ios" && (
            <Tab.Navigator>
              <Tab.Screen name="Planets" component={Planet} />
              <Tab.Screen name="Spaceships" component={Spaceships} />
              <Tab.Screen name="Films" component={Films} />
              <Tab.Screen name="Details" component={Details} />
            </Tab.Navigator>
          )}

          {Platform.OS === "android" && (
            <Drawer.Navigator>
              <Drawer.Screen name="Planets" component={Planet} />
              <Drawer.Screen name="Spaceships" component={Spaceships} />
              <Drawer.Screen name="Films" component={Films} />
              <Drawer.Screen name="Details" component={Details} />
            </Drawer.Navigator>
          )}
        </NavigationContainer>
    )
}
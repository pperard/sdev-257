import { NavigationContainer } from "@react-navigation/native"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Platform } from "react-native"
import Planet from "./Planet"
import Spaceships from "./Spaceships"
import Films from "./Films"

const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator()

export default function App() {
    return (
        <NavigationContainer>
          {Platform.OS === "ios" && (
            <Tab.Navigator>
              <Tab.Screen name="Planet" component={Planet} />
              <Tab.Screen name="Spaceships" component={Spaceships} />
              <Tab.Screen name="Films" component={Films} />
            </Tab.Navigator>
          )}

          {Platform.OS === "android" && (
            <Drawer.Navigator>
              <Drawer.Screen name="Planet" component={Planet} />
              <Drawer.Screen name="Spaceships" component={Spaceships} />
              <Drawer.Screen name="Films" component={Films} />
            </Drawer.Navigator>
          )}
        </NavigationContainer>
    )
}
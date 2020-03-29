import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const AppStack = createStackNavigator();

import Incidents from "./pages/Incidents";
import Detail from "./pages/Detail";

export default function Routes() {
   return (
      /**Definir o headerShown faz com que o app não mostre o header que
         aparecia por padrão com o nome da tela (prop name em AppStack.Screen)
         */
      <NavigationContainer>
         <AppStack.Navigator screenOptions={{ headerShown: false }}>
            <AppStack.Screen name="Incidents" component={Incidents} />
            <AppStack.Screen name="Detail" component={Detail} />
         </AppStack.Navigator>
      </NavigationContainer>
   );
}

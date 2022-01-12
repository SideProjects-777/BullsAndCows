import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Game from '../screens/Game';
import Intro from '../screens/Intro';


const Stack = createNativeStackNavigator();

export default function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator  initialRouteName="Intro">
          <Stack.Screen name="Intro" component={Intro}  options={{ headerShown: false }} />  
          <Stack.Screen name="Game" component={Game}  options={{ headerShown: false }} initialParams={{ guess: null }} />      
      </Stack.Navigator>
    </NavigationContainer>
  );
}
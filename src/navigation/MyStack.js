import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Game from '../screens/Game';
import Intro from '../screens/Intro';
import Statistics from '../screens/Statistics';
import Continue from '../screens/Continue';


const Stack = createNativeStackNavigator();

export default function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator  initialRouteName="Intro">
          <Stack.Screen name="Intro" component={Intro}  options={{ headerShown: false }} />  
          <Stack.Screen name="Game" component={Game}  initialParams={{ guess: null }} />      
          <Stack.Screen name="Statistics" component={Statistics}  options={{ title: 'Old Games'}} />      
          <Stack.Screen name="Continue" component={Continue}   options={{ title: 'Proceed'}} />      
      </Stack.Navigator>
    </NavigationContainer>
  );
}
import { createStackNavigator } from '@react-navigation/stack';
import {Game} from '../screens/Game';
import {Intro} from '../screens/Intro';

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator  initialRouteName="Intro">
        <Stack.Screen name="Intro" component={Intro} />  
        <Stack.Screen name="Game" component={Game} />      
    </Stack.Navigator>
  );
}
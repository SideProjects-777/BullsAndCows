import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './navigation';
import MyStack from './src/navigation/MyStack';


export default function App() {
  return (
      <MyStack />
  );

}

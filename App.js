import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MyStack from './src/navigation/MyStack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
      
      <SafeAreaProvider>
      <MyStack />
    </SafeAreaProvider>
  );

}

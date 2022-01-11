import React, { Component } from 'react'
import { View, Text } from 'react-native'

export default class Game extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Game Screen</Text>
      </View>
    )
  }
}
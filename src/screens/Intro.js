import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SectionList
} from 'react-native';

export default class Intro extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data:[
        {
          title:"A", 
          data:[
            {key:1, name:'User 1', image:"https://bootdey.com/img/Content/avatar/avatar6.png"},
            {key:2, name:'User 2', image:"https://bootdey.com/img/Content/avatar/avatar1.png"},
            {key:3, name:'User 3', image:"https://bootdey.com/img/Content/avatar/avatar7.png"},
          ]
        },
        {
          title:"B", 
          data:[
            {key:1, name:'User 1', image:"https://bootdey.com/img/Content/avatar/avatar3.png"},
            {key:2, name:'User 2', image:"https://bootdey.com/img/Content/avatar/avatar4.png"},
          ]
        },
        {
          title:"C", 
          data:[
            {key:1, name:'User 1', image:"https://bootdey.com/img/Content/avatar/avatar5.png"},
          ]
        },
        {
          title:"D", 
          data:[
            {key:1, name:'User 1', image:"https://bootdey.com/img/Content/avatar/avatar2.png"},
          ]
        },
      ]
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <SectionList
          sections={this.state.data}
          renderSectionHeader={({section}) => {
            return (
              <View style={styles.titleContainer}>
                <Text style={styles.title}>
                  {section.title}
                </Text>
              </View>
            )
          }}
          renderItem={({item}) => {
            return (
            <View style={styles.container}>
              <TouchableOpacity onPress={() => {}}>
                <Image style={styles.image} source={{uri: item.image}}/>
              </TouchableOpacity>
              <View style={styles.content}>
                <View style={styles.contentHeader}>
                  <Text  style={styles.name}>{item.name}</Text>
                </View>
              </View>
            </View>
            )
        }}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root:{
    marginTop:20,
    padding:10,
  },
  titleContainer:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor:"#DCDCDC",
    padding:10
  },
  title:{
    fontSize:25,
    color:"#000000"
  },
  container: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC"
  },
  image:{
    width:45,
    height:45,
    borderRadius:20,
    marginLeft:20
  },
  time:{
    fontSize:11,
    color:"#808080",
  },
  name:{
    fontSize:16,
    fontWeight:"bold",
  },
});

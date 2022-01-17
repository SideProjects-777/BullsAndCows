import React, { Component } from 'react';
import {iconSet} from '../helper/Icons';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native';
import { Icon } from 'react-native-elements';

const size = iconSet.length;
const tmpData = [
    {
      id:3, 
      name:"Group 1", 
      countMembers:51,
      icon: iconSet[Math.floor(Math.random() * (size - 1))]
    },
    {
      id:2, 
      name:"Group 2", 
      countMembers:10,
      icon: iconSet[Math.floor(Math.random() * (size - 1))]
    },
    {
      id:4, 
      name:"Group 3", 
      countMembers:58,
      icon: iconSet[Math.floor(Math.random() * (size - 1))]
    },
    {
      id:5, 
      name:"Group 4", 
      countMembers:63,
      icon: iconSet[Math.floor(Math.random() * (size - 1))]
    },
]


export default class Continue extends Component {

  constructor(props) {
    super(props);    
    this.state = { data:tmpData }
  }


  render() {
    return (
      <FlatList
        style={styles.root}
        data={this.state.data}
        extraData={this.state}
        ItemSeparatorComponent={() => {
          return (
            <View style={styles.separator}/>
          )
        }}
        keyExtractor={(item)=>{
          return item.id;
        }}
        renderItem={(item) => {
          const Group = item.item;
          let mainContentStyle;
          if(Group.attachment) {
            mainContentStyle = styles.mainContent;
          }
          return(
            <View style={styles.container}>
              <Icon reverse name={Group.icon} type="ionicon"/>
              <View style={styles.content}>
                <View style={mainContentStyle}>
                  <View style={styles.text}>
                    <Text style={styles.groupName}>{Group.name}</Text>
                  </View>
                  <Text style={styles.countRounds}>
                    {Group.countMembers} rounds
                  </Text>
                </View>
              </View>
            </View>
          );
        }}/>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#FFFFFF"
  },
  container: {
    padding: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: "#FFFFFF",
    alignItems: 'flex-start'
  },
  avatar: {
    width:55,
    height:55,
    borderRadius:25,
  },
  text: {
    marginBottom: 5,
    flexDirection: 'row',
    flexWrap:'wrap'
  },
  content: {
    flex: 1,
    marginLeft: 16,
    marginRight: 0
  },
  mainContent: {
    marginRight: 60
  },
  memberImage: {
    height: 30,
    width: 30,
    marginRight:4,
    borderRadius:10,
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC"
  },
  countRounds:{
    color:"#20B2AA"
  },
  groupName:{
    fontSize:23,
    color:"#1E90FF"
  },
});  
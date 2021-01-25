import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity,Dimensions } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';

export default class SwipeableFlateList extends Component{
    constructor(props){
        super(props)
        this.state={allNotifaction:this.props.allNotifaction}
    }
    onSwipeValueChange = swipeData =>{
var allNotification = this.state.allNotifaction
const {key,value}=swipeData

if(value<Dimensions.get("window").width){
const newData = [...allNotification]
this.updateMarkAsRead(allNotification[key])
newData.slice(key,1)
this.setState({allNotifaction:newData})

}
    }

    updateMarkAsRead=Notification=>{
        db.collection("all_notifications") 
        .doc(notification.doc_id) 
        .update({ notification_status: "read" 
    });
    }

renderItem=data=>{
<ListItem
leftElement={<Icon name="book" type="font-awesome" color="#696969" />}
title={Data.item.book_name}
titleStyle={{color:"black",fontWeight:"bold"}}
subtitle={Data.title.message}

bottomDivider
></ListItem>
}

renderHiddenItem=()=>{
    <View>
        <View>
            <Text>MarkAsRead</Text>
        </View>
    </View>
}

render(){
    return(
        <View>
            <SwipeableFlateList 
            disableRightSwipe
            data={this.state.allNotifaction}
            renderItem={this.state.renderItem}
            renderHiddenItem={this.renderHiddenItem}
            rightOpenValue={-Dimensions.get("window").width}
            previewRowkey={"0"}
            onSwipeValueChange={this.onSwipeValueChange}
            ></SwipeableFlateList>
        </View>
    )
}
}
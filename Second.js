/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import { Container, Header, Content, Button, Form, Input, Item, Icon } from 'native-base';
import {Platform, StyleSheet, Text, View} from 'react-native';
import firebase from 'react-native-firebase';

type Props = {};
export default class Second extends Component<Props> {
  ref = firebase.firestore().collection('properties');

  state = {
    properties: []
  };

  componentWillMount() {
    this.ref.get()
    .then((response) => {
      this.setState({properties: response.docs});
    })
    .catch((error) => console.log(error));
  }

  renderProperties() {
    if(this.state.properties.length){
      return this.state.properties.map(
        (property, index) =>
          <View key={index} style={{marginBottom: 20}}>
            <Text>Title: {property.data().title}</Text>
            <Text>Price: ${property.data().price}.00</Text>
            <Text>Max Occupancy: ${property.data().capacity}.00</Text>
          </View>
        );
    } else {
      return (
        <Text>Loading...</Text>
        );
    }

  }

  static navigationOptions = {
    title: 'Second',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: 'white'
  };

  render() {
    const location = this.props.navigation.getParam('location', 'N/A');
    const rentalType = this.props.navigation.getParam('rentalType', 'N/A');

    return (
      <Container>
        <Content contentContainerStyle={styles.content}>
          {this.renderProperties()}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row'
  },
  content: {
    marginLeft: '5%'
  },
  dateButton: {
    padding: 15,
    marginRight: 10
  },
  searchBar: {
    marginTop: 20,
    marginBottom: 20,
    width: '95%',
    elevation: 5,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: 'black',
    shadowOpacity: 0.5,
    backgroundColor: 'white',
    borderRadius: 3
  }
});

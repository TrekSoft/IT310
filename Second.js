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

type Props = {};
export default class Second extends Component<Props> {
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
          <Text>Location: {location}</Text>
          <Text>Rental Type: {rentalType}</Text>
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

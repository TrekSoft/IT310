/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  Button,
  Form,
  Input,
  Item,
  Icon,
  ListItem,
  Left,
  Right,
  Radio
} from 'native-base';
import {Platform, StyleSheet, Text, View} from 'react-native';
import stripe from 'tipsi-stripe'

const WHOLE_HOUSE = "whole_house";
const APARTMENT = "apartment";
const CABIN = "cabin";
const BOAT = "boat";

stripe.setOptions({
  publishableKey: 'pk_test_K5pZcjk0TdV5FndXD4DVt7wA00mvCaBVGx',
  androidPayMode: 'test',
});

type Props = {};
export default class App extends Component<Props> {
  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: 'white'
  };

  apartmentTypes = [
    {
      displayText: 'Apartment',
      rentalType: APARTMENT
    },
    {
      displayText: 'The Entire House',
      rentalType: WHOLE_HOUSE
    },
    {
      displayText: 'A House Boat - Yay!',
      rentalType: BOAT
    },
    {
      displayText: 'Cozy Cabin',
      rentalType: CABIN
    }
  ];

  state = {
    location: '',
    rentalType: WHOLE_HOUSE
  };

  onLocationChange = (location) => {
    this.setState({ location: location });
  }

  pay() {
    stripe.paymentRequestWithNativePay({
        total_price: '100.00',
        currency_code: 'USD',
        shipping_address_required: true,
        phone_number_required: true,
        shipping_countries: ['US', 'CA'],
        line_items: [{
          currency_code: 'USD',
          description: 'Tipsi',
          total_price: '20.00',
          unit_price: '20.00',
          quantity: '1',
        }],
      }).then((response) => console.log(response));
  }

  renderRadioButtons() {
    return this.apartmentTypes.map(
      (currentType, index) =>
        <ListItem key={index} onPress={() => this.setState({ rentalType: currentType.rentalType })}>
          <Left>
            <Text>{currentType.displayText}</Text>
          </Left>
          <Right>
            <Radio
             selected={this.state.rentalType === currentType.rentalType}
             />
          </Right>
        </ListItem>
    );
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.content}>
          <Item regular style={styles.searchBar}>
            <Icon active name='search' />
            <Input
              value={this.state.location}
              placeholder='Have you ever been to Maine?'
              onChangeText={this.onLocationChange}
            />
          </Item>

          <View style={styles.buttonContainer}>
            <Button bordered dark style={styles.dateButton}
              onPress={() => this.pay()}
            >
              <Text>All Dates</Text>
            </Button>

            <Button bordered dark style={styles.dateButton}
            onPress={() => this.props.navigation.navigate(
              'Second',
              {
                rentalType: this.state.rentalType,
                location: this.state.location
              }
            )}>
              <Text>Guests</Text>
            </Button>
          </View>

          {this.renderRadioButtons()}
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

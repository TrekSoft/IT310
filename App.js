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
import {PaymentRequest} from 'react-native-payments';

const WHOLE_HOUSE = "whole_house";
const APARTMENT = "apartment";
const CABIN = "cabin";
const BOAT = "boat";

const METHOD_DATA = [{
  supportedMethods: ['android-pay'],
  data: {
    supportedNetworks: ['visa', 'mastercard', 'amex'],
    currencyCode: 'USD',
    environment: 'TEST', // defaults to production
    paymentMethodTokenizationParameters: {
      tokenizationType: 'NETWORK_TOKEN',
      parameters: {
        publicKey: 'your-public-key'
      }
    }
  }
}];

const DETAILS = {
  id: 'basic-example',
  displayItems: [
    {
      label: 'Movie Ticket',
      amount: { currency: 'USD', value: '15.00' }
    }
  ],
  total: {
    label: 'Merchant Name',
    amount: { currency: 'USD', value: '15.00' }
  }
};

const paymentRequest = new PaymentRequest(METHOD_DATA, DETAILS);

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
              onPress={() => paymentRequest.show().then((response) => alert(response)).catch((error) => console.log(error)).finally((response) => alert(response))}
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

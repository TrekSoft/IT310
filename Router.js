import { createStackNavigator, createAppContainer } from 'react-navigation';
import App from './App';
import Second from './Second';

const Router = createStackNavigator(
  {
    App,
    Second
  },
  {
    initialRouteName: 'App',
  }
);

export default Router;

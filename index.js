/** @format */

import { AppRegistry, YellowBox } from 'react-native';
import Entry from './Entry';
import { name as appName } from './app.json';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings(['Require cycle']);
AppRegistry.registerComponent(appName, () => Entry);

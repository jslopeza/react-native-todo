/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Main from './src/main';

class todo extends Component {
  render() {
    return (
      <Main />
    );
  }
}

AppRegistry.registerComponent('todo', () => todo);

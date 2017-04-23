import React from 'react';
import { AppRegistry } from 'react-native';
import App from './app/app'

export default class nurse extends React.Component {
  render() {
    return (
      <App></App>
    );
  }
}

AppRegistry.registerComponent('nurse', () => nurse);

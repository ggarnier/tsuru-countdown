/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class TsuruCountdown extends Component {
  constructor(props) {
    super(props)
    this.finishTime = new Date(2017, 2, 2).getTime()
    this.state = {
      remainingTime: (this.finishTime - new Date().getTime()) / 1000
    }
  }

  componentDidMount() {
    const binded = this.updateRemainingTime.bind(this)
    setInterval(binded, 1000)
  }

  updateRemainingTime() {
    this.setState({remainingTime: (this.finishTime - new Date().getTime()) / 1000})
  }

  formatRemainingTime() {
    let remainingSeconds = this.state.remainingTime
    const days = Math.floor(remainingSeconds / (60 * 60 * 24))
    remainingSeconds -= days * 24 * 60 * 60
    const hours = Math.floor(remainingSeconds / (60 * 60))
    remainingSeconds -= hours * 60 * 60
    const minutes = Math.floor(remainingSeconds / 60)
    const seconds = Math.floor(remainingSeconds - (minutes * 60))
    return `${this.leftPad(days)}:${this.leftPad(hours)}:${this.leftPad(minutes)}:${this.leftPad(seconds)}`
  }

  leftPad(value) {
    return value < 10 ? `0${value}` : value
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.time}>
          {this.formatRemainingTime()}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  time: {
    fontSize: 80,
    textAlign: 'center',
  },
});

AppRegistry.registerComponent('TsuruCountdown', () => TsuruCountdown);

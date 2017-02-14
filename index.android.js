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
  View,
  Image
} from 'react-native';
import PushNotification from 'react-native-push-notification';

export default class TsuruCountdown extends Component {
  constructor(props) {
    super(props)
    this.finishTime = new Date(2017, 2, 2).getTime()
    this.state = {
      remainingTime: (this.finishTime - new Date().getTime()) / 1000
    }

    this.setupNotifications()
  }

  setupNotifications() {
    if (this.hasTimeLeft()) {
      const days = Math.floor((this.finishTime - new Date().getTime()) / (1000 * 60 * 60 * 24))
      PushNotification.localNotificationSchedule({
        title: "Tsuru Countdown",
        message: `${days} days left`,
        date: new Date(2017, 1, 15, 8, 0, 0),
        repeatType: "day"
      })
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
    return `${this.leftPad(days)}d ${this.leftPad(hours)}:${this.leftPad(minutes)}:${this.leftPad(seconds)}`
  }

  leftPad(value) {
    return value < 10 ? `0${value}` : value
  }

  hasTimeLeft() {
    return this.state.remainingTime > 0
  }

  render() {
    if (this.hasTimeLeft()) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Tsuru Countdown</Text>
          <Text style={styles.time}>
            {this.formatRemainingTime()}
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Image source={require('./homer.jpg')} style={styles.image} />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 45,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 40,
  },
  time: {
    fontSize: 90,
    textAlign: 'center',
  },
  image: {
    width: 350,
    height: 197,
  },
});

AppRegistry.registerComponent('TsuruCountdown', () => TsuruCountdown);

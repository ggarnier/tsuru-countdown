import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback,
  DatePickerAndroid,
} from 'react-native'
import Router from 'react-native-simple-router'
import PushNotification from 'react-native-push-notification'

export default class TsuruCountdown extends Component {
  render() {
    const firstRoute = {
      name: "Tsuru Countdown",
      component: CountdownPage
    }

    return (
      <Router
        firstRoute={firstRoute}
        headerStyle={{backgroundColor: '#222233'}}
        backButtonComponent={BackButton}
      />
    )
  }
}

class CountdownPage extends Component {
  constructor(props) {
    super(props)
    this.finishTime = new Date(2017, 2, 2).getTime()
    this.state = {
      remainingTime: (this.finishTime - new Date().getTime()) / 1000
    }
    this.configPage = this.configPage.bind(this)

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

  configPage() {
    this.props.toRoute({
      name: "Config",
      component: ConfigPage
    })
  }

  render() {
    if (this.hasTimeLeft()) {
      return (
        <View style={styles.container}>
          <TouchableHighlight onPress={this.configPage} underlayColor="transparent">
            <Image source={require('./images/configs-icon.png')} style={styles.configIcon}/>
          </TouchableHighlight>

          <Image source={require('./images/tsuru-logo.png')} style={styles.logo} />
          <Text style={styles.time}>
            {this.formatRemainingTime()}
          </Text>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <Image source={require('./images/homer.jpg')} style={styles.image} />
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
    fontSize: 40,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 40,
  },
  time: {
    fontSize: 70,
    textAlign: 'center',
    marginBottom: 50,
  },
  logo: {
    width: 300,
    height: 157,
    marginBottom: 30,
  },
  image: {
    width: 350,
    height: 197,
  },
  configIcon: {
    width: 30,
    height: 30,
    marginBottom: 50,
    marginLeft: 200,
  }
})

class ConfigPage extends Component {
  state = {
    presetDate: new Date(2020, 4, 5),
    simpleDate: new Date(2020, 4, 5),
    spinnerDate: new Date(2020, 4, 5),
    calendarDate: new Date(2020, 4, 5),
    defaultDate: new Date(2020, 4, 5),
    allDate: new Date(2020, 4, 5),
    simpleText: 'pick a date',
    spinnerText: 'pick a date',
    calendarText: 'pick a date',
    defaultText: 'pick a date',
    minText: 'pick a date, no earlier than today',
    maxText: 'pick a date, no later than today',
    presetText: 'pick a date, preset to 2020/5/5',
    allText: 'pick a date between 2020/5/1 and 2020/5/10',
  };

  showDatePicker = async (stateKey, options) => {
    try {
      var newState = {};
      const {action, year, month, day} = await DatePickerAndroid.open(options);
      if (action === DatePickerAndroid.dismissedAction) {
        newState[stateKey + 'Text'] = 'dismissed';
      } else {
        var date = new Date(year, month, day);
        newState[stateKey + 'Text'] = date.toLocaleDateString();
        newState[stateKey + 'Date'] = date;
      }
      this.setState(newState);
    } catch ({code, message}) {
      console.warn(`Error in example '${stateKey}': `, message);
    }
  };

  render() {
    return (
      <View>
        <Text>Finish date:</Text>
        <Text>{this.state.simpleDate.toDateString()}></Text>

        <TouchableWithoutFeedback
          onPress={this.showDatePicker.bind(this, 'simple', {date: this.state.simpleDate})}
        >
          <Text>click to choose</Text>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

class BackButton extends Component {
  render() {
    return <Image source={require('./images/back-icon.png')} style={{width: 20, height: 20}} />
  }
}

AppRegistry.registerComponent('TsuruCountdown', () => TsuruCountdown)

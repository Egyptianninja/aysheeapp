import * as React from 'react';
import { View, Text } from 'react-native';
import { getSecondsDistance } from '../../utils';

class CountDownTimer extends React.Component<any, any> {
  intervalId: any;
  state = {
    counter: 0,
    date: {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    }
  };

  componentDidMount() {
    this.setState({ counter: this.props.counter });
    this.intervalId = setInterval(this.timer, 1000);
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.counter !== this.state.counter) {
      if (nextProps.counter === 0) {
        this.setState({ counter: 0 });
      } else {
        this.setState({ counter: Number(nextProps.counter) });
        if (this.intervalId) {
          clearInterval(this.intervalId);
        }
        this.intervalId = setInterval(this.timer, 1000);
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  timer = () => {
    this.setState({
      counter: this.state.counter - 1,
      date: getSecondsDistance(this.state.counter)
    });
    if (this.state.counter < 0) {
      clearInterval(this.intervalId);
      this.props.cb();
    }
  };

  render() {
    const { days, hours, minutes, seconds } = this.state.date;
    const { size = 16 } = this.props;
    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
      return <View />;
    }
    let chours;
    if (this.state.date.days === 0 && this.state.date.days === 0) {
      chours = ('0' + this.state.date.hours).slice(-2);
    }
    const cminutes = ('0' + this.state.date.minutes).slice(-2);
    const cseconds = ('0' + this.state.date.seconds).slice(-2);

    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10
          }}
        >
          <Text
            style={{
              color: '#fff',
              fontSize: size,
              fontWeight: '200'
            }}
          >
            {chours}:
          </Text>
          <Text
            style={{
              color: '#fff',
              fontSize: size,
              fontWeight: '200'
            }}
          >
            {cminutes}:
          </Text>
          <Text
            style={{
              color: '#fff',
              fontSize: size,
              fontWeight: '200'
            }}
          >
            {cseconds}
          </Text>
        </View>
      </View>
    );
  }
}
export default CountDownTimer;

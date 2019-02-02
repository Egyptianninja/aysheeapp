import * as React from "react";
import { View, Text } from "react-native";

class CountDown extends React.Component<any, any> {
  intervalId: any;
  state = {
    counter: this.props.seconds
  };

  componentDidMount() {
    this.intervalId = setInterval(this.timer, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  timer = () => {
    this.setState({
      counter: this.state.counter - 1
    });
    if (this.state.counter < 1) {
      clearInterval(this.intervalId);
      this.props.cb();
    }
  };

  render() {
    return (
      <Text style={{ color: "#272727", fontSize: 18 }}>
        {this.state.counter}
      </Text>
    );
  }
}
export default CountDown;

import * as React from "react";
import { StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";

export default class CalendarsScreen extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
    this.onDayPress = this.onDayPress.bind(this);
  }
  componentDidMount() {
    if (this.props.value.name) {
      this.setState({
        selected: this.props.value.name
      });
    }
  }

  render() {
    return (
      <Calendar
        onDayPress={this.onDayPress}
        style={styles.calendar}
        hideExtraDays
        markedDates={{
          [this.state.selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedDotColor: "orange"
          }
        }}
      />
    );
  }

  onDayPress(day: any) {
    this.setState({
      selected: day.dateString
    });
    this.props.onChange(this.props.name, {
      name: day.dateString
    });

    this.props.toggleModal();
  }
}

const styles = StyleSheet.create({
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: "#eee",
    height: 350
  },
  text: {
    textAlign: "center",
    borderColor: "#bbb",
    padding: 10,
    backgroundColor: "#eee"
  },
  container: {
    flex: 1,
    backgroundColor: "gray"
  }
});

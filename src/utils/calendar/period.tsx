import * as React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
export default class CalendarsScreen extends React.Component<any, any> {
  period: any;
  constructor(props: any) {
    super(props);
    this.state = {
      start: null,
      end: null,
      period: null
    };
  }

  componentDidMount() {
    if (this.props.value.name) {
      this.setState({
        period: this.rangeBuild(this.props.value.name)
      });
      this.period = this.props.value.name;
    }
  }

  getDaysArray = (s: any, e: any) => {
    const a = [];
    for (const d = s; d <= e; d.setDate(d.getDate() + 1)) {
      a.push(new Date(d));
    }
    return a.map((v: any) => v.toISOString().slice(0, 10));
    // return a.map((v: any) => v.toISOString().slice(0, 10)).slice(1, -1);
  };
  onDayPress = (day: any) => {
    if (!this.state.start || this.state.period) {
      this.setState({
        start: day.dateString,
        end: null,
        period: null
      });
    } else if (this.state.start && !this.state.end) {
      if (new Date(day.dateString) < new Date(this.state.start)) {
        this.setState({
          start: day.dateString,
          end: null,
          period: null
        });
        return;
      } else {
        const prePeriod = this.getDaysArray(
          new Date(this.state.start),
          new Date(day.dateString)
        );
        this.period = prePeriod.map((dy: any, i: number) => {
          // return dy;
          if (i === 0) {
            return { [dy]: { startingDay: true, color: 'skyblue' } };
          } else if (i === prePeriod.length - 1) {
            return { [dy]: { endingDay: true, color: 'skyblue' } };
          } else {
            return { [dy]: { color: 'skyblue' } };
          }
        });
        this.setState({
          end: day.dateString,
          period: this.rangeBuild(this.period)
        });
      }
    } else {
      this.setState({
        start: day.dateString,
        end: null,
        period: null
      });
    }
  };

  rangeBuild = (period: any) => {
    let obj = {};
    period.map((day: any, i: number) => {
      obj = { ...obj, ...day };
    });
    return obj;
  };

  submit = () => {
    this.props.onChange(this.props.name, {
      name: this.period
    });

    this.props.toggleModal();
  };

  render() {
    return (
      <View style={{ backgroundColor: '#fff' }}>
        <Calendar
          onDayPress={this.onDayPress}
          style={styles.calendar}
          hideExtraDays
          markingType={'period'}
          markedDates={
            this.state.period
              ? this.state.period
              : {
                  [this.state.start]: { startingDay: true, color: 'skyblue' },
                  [this.state.end]: { endingDay: true, color: 'skyblue' }
                }
          }
        />
        <View style={{ height: 80, alignItems: 'center' }}>
          {this.state.period && (
            <TouchableOpacity
              onPress={() => this.submit()}
              style={styles.btnStyle}
            >
              <Text style={styles.btnTextStyle}>Submit</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 350
  },
  text: {
    textAlign: 'center',
    borderColor: '#bbb',
    padding: 10,
    backgroundColor: '#eee'
  },
  container: {
    flex: 1,
    backgroundColor: 'gray'
  },
  btnStyle: {
    marginTop: 20,
    height: 40,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#272727'
  },
  btnTextStyle: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'cairo-regular'
  }
});

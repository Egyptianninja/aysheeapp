import * as React from 'react';
import {
  View,
  Keyboard,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from '../../utils';
import { Button, InputPhone, CountDownTimer } from '../../lib';
import {
  login,
  phoneAdded,
  phoneRemoved,
  smsSent,
  initTime
} from '../../store/actions/userAtions';
import smsRequestCode from '../../graphql/mutation/smsRequestCode';
import { smsTimes } from '../../constants';

const { width } = Dimensions.get('window');
class PhoneScreen extends React.Component<any, any> {
  subs: any;
  state = {
    phone: null,
    name: null,
    loading: false,
    interval: 0
  };

  componentDidMount() {
    if (this.props.phone) {
      this.setState({ phone: this.props.phone, name: this.props.name });
      this.props.navigation.navigate('CodeScreen', {
        phone: this.props.phone,
        name: this.props.name
      });
    }
    this.setInterval();

    this.subs = [
      this.props.navigation.addListener('didFocus', () => {
        this.setInterval();
      }),
      this.props.navigation.addListener('willBlur', () => {
        //
      })
    ];
  }
  componentWillUnmount() {
    this.subs.forEach((sub: any) => sub.remove());
  }

  setInterval = () => {
    const interval =
      this.props.sms.nextTime - Math.floor(new Date().getTime() / 1000);
    if (interval > 86399) {
      this.props.initTime();
      this.setState({
        interval: 0
      });
    } else {
      if (this.props.sms.nextTime) {
        this.setState({
          interval: interval > 0 ? interval : 0
        });
      }
    }
  };

  handleCodeSubmit = async (values: any, bag: any) => {
    try {
      const { phone } = values;
      const phoneNumber = `${this.props.ccode}${phone}`;

      const res = await this.props.smsRequestCode({
        variables: { phone: phoneNumber }
      });
      if (res.data.smsRequestCode.ok) {
        const name = res.data.smsRequestCode.message;
        const nowTime = Math.floor(new Date().getTime() / 1000);
        const nextTime = Math.floor(nowTime + smsTimes[this.props.sms.qty]);
        await this.props.smsSent(nextTime);
        const interval = nextTime - nowTime;
        await this.setState({
          phone: phoneNumber,
          name,
          interval: interval > 0 ? interval : 0
        });
        this.props.phoneAdded(phoneNumber, name);
        this.props.navigation.navigate('CodeScreen', {
          phone: phoneNumber,
          name
        });
      } else {
        bag.setErrors({ phone: res.data.smsRequestCode.error });
      }
      bag.setSubmitting(false);
    } catch (error) {
      bag.setErrors(error);
    }
  };

  counterCllBack = () => {
    this.setState({ interval: 0 });
  };

  render() {
    const { words } = this.props;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <TouchableOpacity
            style={{ position: 'absolute', left: 20, top: 30, zIndex: 150 }}
            onPress={() => this.props.navigation.navigate('App')}
          >
            <Ionicons
              name="ios-arrow-back"
              size={30}
              color="#777"
              style={{ margin: 20 }}
            />
          </TouchableOpacity>
          <View style={{ flex: 2 }}>
            <CountDownTimer
              counter={this.state.interval}
              cb={this.counterCllBack}
            />
          </View>

          <View style={{ height: 20 }} />
          <KeyboardAvoidingView
            style={{
              flex: 3,
              justifyContent: 'center',
              alignItems: 'center'
            }}
            behavior="padding"
            enabled
          >
            <Formik
              initialValues={{
                phone: this.props.phone
                  ? this.props.phone.replace(this.props.ccode, '')
                  : ''
              }}
              onSubmit={this.handleCodeSubmit}
              validationSchema={Yup.object().shape({
                phone: Yup.string()
                  .min(6, words.notvalidmobile)
                  .required(words.phoneisrequired)
              })}
              render={({
                values,
                handleSubmit,
                setFieldValue,
                errors,
                touched,
                setFieldTouched,
                isSubmitting
              }: any) => (
                <React.Fragment>
                  <InputPhone
                    num
                    name="phone"
                    label={words.entermobilenumber}
                    value={values.phone}
                    onChange={setFieldValue}
                    onTouch={setFieldTouched}
                    outerStyle={styles.outerStyle}
                    innerStyle={styles.innerStyle}
                    labelStyle={styles.labelStyle}
                    error={touched.phone && errors.phone}
                    keyboardType="number-pad"
                    height={50}
                    countryCode={this.props.ccode}
                  />
                  <Button
                    background="#272727"
                    style={styles.btnStyle}
                    textStyle={styles.btnTextStyle}
                    title={words.send}
                    disabled={this.state.interval > 0 ? true : false}
                    onPress={handleSubmit}
                    loading={isSubmitting}
                  />
                </React.Fragment>
              )}
            />
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginTop: 20,
    width: '100%'
  },
  outerStyle: {
    justifyContent: 'flex-start'
  },
  innerStyle: {
    width: width - 80,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    writingDirection: 'auto',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5
  },
  labelStyle: {
    fontSize: 18,
    padding: 5,
    marginVertical: 20
  },
  btnStyle: {
    height: 40,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    borderRadius: 5
  },
  btnTextStyle: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'cairo-regular'
  }
});

const mapStateToProps = (state: any) => ({
  phone: state.user.phone,
  name: state.user.name,
  sms: state.user.sms,
  lang: state.glob.languageName,
  ccode: state.glob.ccode,
  words: state.glob.language.words
});

export default connect(
  mapStateToProps,
  {
    login,
    phoneAdded,
    phoneRemoved,
    smsSent,
    initTime
  }
)(
  graphql(smsRequestCode, {
    name: 'smsRequestCode'
  })(PhoneScreen)
);

import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as React from 'react';
import { graphql } from 'react-apollo';
import {
  AsyncStorage,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { smsTimes } from '../../constants';
import notificationSub from '../../graphql/mutation/notificationSub';
import smsLoginWithPhone from '../../graphql/mutation/smsLoginWithPhone';
import smsRequestCode from '../../graphql/mutation/smsRequestCode';
import { Button, CountDownTimer, InputPhone } from '../../lib';
import {
  addUniquename,
  initCode,
  initTime,
  login,
  phoneAdded,
  phoneRemoved,
  smsSent
} from '../../store/actions/userAtions';
import { StyleSheet, isIphoneX, rtlos } from '../../utils';
import { Logo } from '../../componenets';

class PhoneScreen extends React.Component<any, any> {
  subs: any;
  state = {
    localePhone: null,
    phone: null,
    name: null,
    loading: false,
    interval: 0
  };

  async componentWillMount() {
    const phone = await AsyncStorage.getItem('phone');
    if (phone) {
      await this.setState({ localePhone: phone });
    }
  }

  async componentDidMount() {
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

  getDestinationRout = ({ directstore, add, origin, isstore }: any) => {
    if (origin === 'profile') {
      return { screen: 'MyProfileScreen' };
    } else if (origin === 'notification') {
      return { screen: 'NotificationsScreen' };
    } else {
      if (directstore) {
        if (isstore) {
          return { screen: 'HomeScreen' };
        } else {
          return {
            screen: 'UpgradeToStore',
            title: this.props.words.apdateaccount
          };
        }
      }
      if (add) {
        return { screen: 'ChoiseScreen', title: this.props.words.addnewad };
      } else {
        return { screen: 'HomeScreen' };
      }
    }
  };

  handleCodeSubmit = async (values: any, bag: any) => {
    const directstore = this.props.navigation.getParam('directstore');
    const add = this.props.navigation.getParam('add');
    const origin = this.props.navigation.getParam('origin');

    try {
      const { phone } = values;
      const phoneNumber = `${this.props.code}${phone}`;
      if (phoneNumber === this.state.localePhone) {
        const res = await this.props.smsLoginWithPhone({
          variables: { phone: phoneNumber }
        });
        if (res.data.smsLoginWithPhone.ok) {
          const { token, data } = res.data.smsLoginWithPhone;
          const isstore = data.isstore;
          await AsyncStorage.setItem('aysheetoken', token);
          const name = await AsyncStorage.getItem('name');
          await this.props.addUniquename(name);
          await this.props.login(token, data);
          await this.props.initTime();
          await this.props.initCode();
          const rout = this.getDestinationRout({
            directstore,
            add,
            origin,
            isstore
          });
          this.props.navigation.navigate(rout.screen, { title: rout.title });
        }
      } else {
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
            name,
            directstore,
            add,
            origin
          });
        } else {
          bag.setErrors({ phone: res.data.smsRequestCode.error });
        }
        bag.setSubmitting(false);
      }
    } catch (error) {
      bag.setErrors(error);
    }
  };

  counterCllBack = () => {
    this.setState({ interval: 0 });
  };

  render() {
    const { words } = this.props;
    const { localePhone }: any = this.state;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={[
            styles.container,
            {
              backgroundColor: '#eee'
            }
          ]}
        >
          <TouchableOpacity
            style={{
              position: 'absolute',
              left: rtlos() ? undefined : 10,
              right: rtlos() ? 0 : undefined,
              top: isIphoneX() ? 40 : 20,
              zIndex: 150,
              padding: 10,
              paddingRight: 20
            }}
            onPress={() => this.props.navigation.goBack()}
          >
            <Ionicons name="ios-arrow-back" size={30} color="#636363" />
          </TouchableOpacity>
          <View
            style={{
              flex: 2,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Logo size={120} />
          </View>

          <KeyboardAvoidingView
            style={{
              flex: 2,
              justifyContent: 'flex-start',
              alignItems: 'center'
            }}
            behavior="padding"
            enabled
          >
            <Formik
              initialValues={{
                phone: localePhone
                  ? localePhone.replace(this.props.code, '')
                  : ''
              }}
              enableReinitialize={true}
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
                  <CountDownTimer
                    counter={this.state.interval}
                    cb={this.counterCllBack}
                    size={22}
                  />
                  <InputPhone
                    num
                    name="phone"
                    label={words.entermobilenumber}
                    value={values.phone}
                    onChange={setFieldValue}
                    onTouch={setFieldTouched}
                    labelStyle={styles.labelStyle}
                    error={touched.phone && errors.phone}
                    keyboardType="number-pad"
                    height={50}
                    countryCode={this.props.code}
                  />
                  <Button
                    background="#fff"
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

  labelStyle: {
    fontSize: 16,
    padding: 5,
    marginBottom: 10,
    fontFamily: 'cairo-regular',
    color: '#777'
  },
  btnStyle: {
    height: 50,
    width: 270,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    margin: 10,
    borderRadius: 25,
    shadowColor: '#999',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5
  },
  btnTextStyle: {
    color: '#7678ED',
    fontSize: 18,
    fontFamily: 'cairo-regular'
  }
});

const mapStateToProps = (state: any) => ({
  phone: state.user.phone,
  name: state.user.name,
  sms: state.user.sms,
  code: state.glob.code,
  words: state.glob.language.words
});

export default connect(
  mapStateToProps,
  {
    login,
    phoneAdded,
    phoneRemoved,
    smsSent,
    initTime,
    initCode,
    addUniquename
  }
)(
  graphql(smsRequestCode, {
    name: 'smsRequestCode'
  })(
    graphql(notificationSub, {
      name: 'notificationSub'
    })(
      graphql(smsLoginWithPhone, {
        name: 'smsLoginWithPhone'
      })(PhoneScreen)
    )
  )
);

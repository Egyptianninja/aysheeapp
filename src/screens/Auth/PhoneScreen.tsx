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
  View,
  Text,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { Logo } from '../../componenets';
import { smsTimes } from '../../constants';
import notificationSub from '../../graphql/mutation/notificationSub';
import smsLoginWithPhone from '../../graphql/mutation/smsLoginWithPhone';
import smsRequestCode from '../../graphql/mutation/smsRequestCode';
import {
  Button,
  CountDownTimer,
  InputPhone,
  Input,
  InputEmail
} from '../../lib';
import {
  addUniquename,
  initCode,
  initTime,
  login,
  phoneAdded,
  emailAdded,
  phoneRemoved,
  emailRemoved,
  smsSent
} from '../../store/actions/userAtions';
import { isIphoneX, rtlos, StyleSheet } from '../../utils';
const { width } = Dimensions.get('window');
class PhoneScreen extends React.Component<any, any> {
  subs: any;
  state = {
    localePhone: null,
    localeEmail: null,
    isEmailLogin: true,
    phone: null,
    email: null,
    name: null,
    loading: false,
    interval: 0
  };

  async componentWillMount() {
    const phone = await AsyncStorage.getItem('phone');
    const email = await AsyncStorage.getItem('email');
    await this.setState({ localePhone: phone, localeEmail: email });
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
  validSchema = ({ words }: any) => {
    if (this.state.isEmailLogin) {
      return Yup.object().shape({
        email: Yup.string()
          .email('Not valid email')
          .required(words.isrequire)
      });
    } else {
      return Yup.object().shape({
        phone: Yup.string()
          .min(6, words.notvalidmobile)
          .required(words.phoneisrequired)
      });
    }
  };

  handleCodeSubmit = async (values: any, bag: any) => {
    const directstore = this.props.navigation.getParam('directstore');
    const add = this.props.navigation.getParam('add');
    const origin = this.props.navigation.getParam('origin');
    try {
      const { phone, email } = values;

      if (this.state.isEmailLogin) {
        if (email === this.state.localeEmail) {
          const res = await this.props.smsLoginWithPhone({
            variables: { email }
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
            variables: { email }
          });
          if (res.data.smsRequestCode.ok) {
            const name = res.data.smsRequestCode.message;
            const nowTime = Math.floor(new Date().getTime() / 1000);
            const nextTime = Math.floor(nowTime + smsTimes[this.props.sms.qty]);
            await this.props.smsSent(nextTime);
            const interval = nextTime - nowTime;
            await this.setState({
              email,
              name,
              interval: interval > 0 ? interval : 0
            });
            this.props.emailAdded(email, name);
            this.props.navigation.navigate('CodeScreen', {
              email,
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
      } else {
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
            this.props.emailAdded(phoneNumber, name);
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
    const { localePhone, localeEmail }: any = this.state;
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
            <Logo size={100} />
          </View>

          <KeyboardAvoidingView
            style={{
              flex: 3,
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
                  : '',
                email: localeEmail ? localeEmail : ''
              }}
              enableReinitialize={true}
              onSubmit={this.handleCodeSubmit}
              validationSchema={this.validSchema({ words })}
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

                  {!this.state.isEmailLogin && (
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
                  )}
                  {this.state.isEmailLogin && (
                    <InputEmail
                      name="email"
                      label={words.enteremail}
                      value={values.email}
                      onChange={setFieldValue}
                      onTouch={setFieldTouched}
                      labelStyle={styles.labelStyle}
                      error={touched.email && errors.email}
                      autoCapitalize="none"
                      keyboardType="email-address"
                      autoCorrect={false}
                      height={50}
                    />
                  )}
                  <View
                    style={{
                      // width: 268,
                      width: 220,
                      height: 30,
                      marginBottom: 10,
                      flexDirection: rtlos() === 3 ? 'row-reverse' : 'row',
                      alignItems: 'center',
                      justifyContent: 'space-around'
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => this.setState({ isEmailLogin: true })}
                      style={{
                        flex: 1,
                        backgroundColor: !this.state.isEmailLogin
                          ? '#eee'
                          : '#636363',
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 30
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          color: !this.state.isEmailLogin ? '#636363' : '#fff'
                        }}
                      >
                        {words.loginwithemail}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.setState({ isEmailLogin: false })}
                      style={{
                        flex: 1,
                        backgroundColor: this.state.isEmailLogin
                          ? '#eee'
                          : '#7678ED',
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 30
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          color: this.state.isEmailLogin ? '#7678ED' : '#fff'
                        }}
                      >
                        {words.loginwithmobile}
                      </Text>
                    </TouchableOpacity>
                  </View>
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
    flex: 1,
    justifyContent: 'space-between',
    marginVertical: 5
  },
  innerStyle: {
    width: width - 60,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20
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
    emailAdded,
    phoneRemoved,
    emailRemoved,
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

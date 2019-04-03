import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as React from 'react';
import { graphql } from 'react-apollo';
import {
  AsyncStorage,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { codeTimes, smsTimes } from '../../constants';
import smsLoginWithCode from '../../graphql/mutation/smsLoginWithCode';
import smsRequestCode from '../../graphql/mutation/smsRequestCode';
import { Button, CountDownTimer, InputCode } from '../../lib';
import {
  addUniquename,
  codeSent,
  initCode,
  initTime,
  login,
  smsSent
} from '../../store/actions/userAtions';
import { StyleSheet, isIphoneX } from '../../utils';
import { Logo } from '../../componenets';

const { width } = Dimensions.get('window');

class CodeScreen extends React.Component<any, any> {
  state = {
    interval: 0,
    codeInterval: 0,
    phone: null
  };

  componentDidMount() {
    const phone = this.props.navigation.getParam('phone');
    this.setState({ phone });
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
    const codeInterval =
      this.props.code.nextTime - Math.floor(new Date().getTime() / 1000);

    if (codeInterval > 300) {
      this.props.initCode();
      this.setState({
        codeInterval: 0
      });
    } else {
      if (this.props.code.nextTime) {
        this.setState({
          codeInterval: codeInterval > 0 ? codeInterval : 0
        });
      }
    }
  }

  handleResendCode = async (bag: any) => {
    const { phone } = this.state;
    const res = await this.props.smsRequestCode({
      variables: {
        phone
      }
    });
    if (res.data.smsRequestCode.ok) {
      const nowTime = Math.floor(new Date().getTime() / 1000);
      const nextTime = Math.floor(nowTime + smsTimes[this.props.sms.qty]);
      await this.props.smsSent(nextTime);
      const interval =
        this.props.sms.nextTime - Math.floor(new Date().getTime() / 1000);
      await this.setState({
        interval: interval > 0 ? interval : 0
      });
    }
  };

  counterCllBack = () => {
    this.setState({ interval: 0 });
  };
  counterCodeCllBack = () => {
    this.setState({ codeInterval: 0 });
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

  handleLoginSubmit = async (values: any, bag: any) => {
    const directstore = this.props.navigation.getParam('directstore');
    const add = this.props.navigation.getParam('add');
    const origin = this.props.navigation.getParam('origin');

    try {
      const { code } = values;
      const res = await this.props.smsLoginWithCode({
        variables: {
          phone: this.state.phone,
          code: Number(code)
        }
      });
      if (res.data.smsLoginWithCode.ok) {
        const { token, data } = res.data.smsLoginWithCode;
        const isstore = data.isstore;
        await AsyncStorage.setItem('aysheetoken', token);
        const name = this.props.navigation.getParam('name');
        const phone = this.props.navigation.getParam('phone');
        await AsyncStorage.setItem('phone', phone);
        await AsyncStorage.setItem('name', name);
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
      } else {
        if (res.data.smsLoginWithCode.ok === false) {
          const nowTime = Math.floor(new Date().getTime() / 1000);
          const nextTime = Math.floor(nowTime + codeTimes[this.props.code.qty]);
          this.props.codeSent(nextTime);
          const codeInterval =
            this.props.code.nextTime - Math.floor(new Date().getTime() / 1000);
          this.setState({
            codeInterval: codeInterval > 0 ? codeInterval : 0
          });
        }
        bag.setErrors({ code: res.data.smsLoginWithCode.error });
      }
      bag.setSubmitting(false);
    } catch (error) {
      bag.setErrors(error);
    }
  };

  render() {
    const { words } = this.props;
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
              left: 20,
              top: isIphoneX() ? 50 : 30,
              zIndex: 150
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
            <Text style={{ fontSize: 20, color: '#636363', fontWeight: '300' }}>
              +{this.state.phone}
            </Text>
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
                code: ''
              }}
              onSubmit={this.handleLoginSubmit}
              validationSchema={Yup.object().shape({
                code: Yup.number()
                  .min(4)
                  .required(words.codeisrequire)
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
                  <InputCode
                    name="code"
                    num
                    label={words.entercode}
                    value={values.code}
                    onChange={setFieldValue}
                    onTouch={setFieldTouched}
                    outerStyle={styles.outerStyle}
                    innerStyle={styles.innerStyle}
                    labelStyle={styles.labelStyle}
                    error={touched.code && errors.code}
                    keyboardType="number-pad"
                    height={50}
                  />
                  <View style={{ flexDirection: 'row' }}>
                    <Button
                      background="#fff"
                      disabled={this.state.codeInterval > 0 ? true : false}
                      style={styles.btnStyle}
                      textStyle={styles.btnTextStyle}
                      title={words.login}
                      onPress={handleSubmit}
                      loading={isSubmitting}
                    />
                    <Button
                      background="#fff"
                      disabled={this.state.interval > 0 ? true : false}
                      style={styles.btnStyle}
                      textStyle={[styles.btnTextStyle, { color: '#636363' }]}
                      title={words.resend}
                      onPress={this.handleResendCode}
                    />
                  </View>
                </React.Fragment>
              )}
            />
            <View
              style={{
                height: 40,
                width: width - 40,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <View
                style={{
                  width: (width - 40) / 2,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <CountDownTimer
                  counter={this.state.codeInterval}
                  cb={this.counterCodeCllBack}
                />
              </View>
              <View
                style={{
                  width: (width - 40) / 2,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <CountDownTimer
                  counter={this.state.interval}
                  cb={this.counterCllBack}
                  small={true}
                />
              </View>
            </View>
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
    // marginVertical: 5
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
    marginVertical: 15,
    color: '#777'
  },
  btnStyle: {
    height: 50,
    width: 125,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
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
    fontSize: 16,
    fontFamily: 'cairo-regular'
  }
});

const mapStateToProps = (state: any) => ({
  phone: state.user.phone,
  sms: state.user.sms,
  code: state.user.code,
  words: state.glob.language.words
});

export default connect(
  mapStateToProps,
  { smsSent, login, codeSent, initCode, initTime, addUniquename }
)(
  graphql(smsLoginWithCode, {
    name: 'smsLoginWithCode'
  })(
    graphql(smsRequestCode, {
      name: 'smsRequestCode'
    })(CodeScreen)
  )
);

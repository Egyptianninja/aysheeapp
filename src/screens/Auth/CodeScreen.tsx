import * as React from 'react';
import {
  Text,
  View,
  Keyboard,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { StyleSheet } from '../../utils';
import { Button, CountDownTimer, InputCode } from '../../lib';
import {
  smsSent,
  login,
  codeSent,
  initTime,
  initCode,
  addUniquename
} from '../../store/actions/userAtions';

import smsLoginWithCode from '../../graphql/mutation/smsLoginWithCode';
import smsRequestCode from '../../graphql/mutation/smsRequestCode';
import { smsTimes, codeTimes } from '../../constants';
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

  handleLoginSubmit = async (values: any, bag: any) => {
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
        await AsyncStorage.setItem('aysheetoken', token);
        const name = this.props.navigation.getParam('name');
        await this.props.addUniquename(name);
        await this.props.login(token, data);
        await this.props.initTime();
        await this.props.initCode();
        this.props.navigation.navigate('App');
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
        <View style={styles.container}>
          <KeyboardAvoidingView
            style={{
              flex: 1,
              justifyContent: 'center',
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
                  <Text
                    style={{ fontSize: 24, color: '#555', fontWeight: '200' }}
                  >
                    +{this.state.phone}
                  </Text>
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
                  <View style={{ height: 20 }} />

                  <View style={{ flexDirection: 'row' }}>
                    <Button
                      background="#272727"
                      disabled={this.state.codeInterval > 0 ? true : false}
                      style={styles.btnStyle}
                      textStyle={styles.btnTextStyle}
                      title={words.login}
                      onPress={handleSubmit}
                      loading={isSubmitting}
                    />
                    <Button
                      background="#272727"
                      disabled={this.state.interval > 0 ? true : false}
                      style={styles.btnStyle}
                      textStyle={styles.btnTextStyle}
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
                  small={true}
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
    marginVertical: 15
  },
  btnStyle: {
    height: 40,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
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

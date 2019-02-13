import * as React from 'react';
import {
  View,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import * as Progress from 'react-native-progress';
import {
  StyleSheet,
  ImagePicker,
  UserLocation,
  registerForPushNotificationsAsync,
  uploadPhotos,
  isArabic,
  Message
} from '../../../utils';
import addClassifiedMutation from '../../../graphql/mutation/addClassified';
import notificationSub from '../../../graphql/mutation/notificationSub';

import { Input, Button, Group, CheckBox, Select, Title } from '../../../lib';

import { getPureNumber } from '../../../utils/call';
const { width } = Dimensions.get('window');

class AddRequestServiceScreen extends React.Component<any, any> {
  state = {
    selectedImage: null,
    isShowMessage: false,
    location: null,
    pushToken: null,
    bar: 0
  };

  async componentWillMount() {
    const pushToken = await registerForPushNotificationsAsync();
    await this.setState({ pushToken });
  }

  hendleSelectedImage = (selectedImage: any) => {
    this.setState({ selectedImage });
  };

  showMessage = ({ seconds, screen }: any) => {
    this.setState({ isShowMessage: true });
    if (seconds && !screen) {
      setTimeout(() => {
        this.setState({ isShowMessage: false });
      }, seconds * 1000);
    }
    if (seconds && screen) {
      setTimeout(() => {
        this.setState({ isShowMessage: false });
        this.props.navigation.navigate(screen);
      }, seconds * 1000);
    }
  };
  hideMessage = () => {
    this.setState({ isShowMessage: false });
  };

  getCurrentLocation = (location: any) => {
    this.setState({ location });
  };

  updateProgressBar = (value: any) => {
    this.setState({ bar: this.state.bar + value });
  };

  handleSubmit = async (values: any, bag: any) => {
    const photos = await uploadPhotos(
      values.photos,
      this.state.selectedImage,
      this.updateProgressBar
    );
    const category = this.props.navigation.getParam('item');
    delete category.sort;
    const { title, body, phone, service, location } = values;
    const isrtl = isArabic(title);
    const loc: any = location ? this.state.location : null;
    let trueLocation = null;

    if (loc) {
      trueLocation = {
        lat: loc.coords.latitude,
        lon: loc.coords.longitude
      };
    }
    this.updateProgressBar(1 / (3 + photos.length));
    const res = await this.props.addClassifiedMutation({
      variables: {
        title,
        body,
        category,
        photos,
        isrtl,
        phone,
        service,
        trueLocation
      }
    });

    if (res.data.createPost.ok) {
      this.updateProgressBar(1 / (3 + photos.length));
      if (this.state.pushToken) {
        this.props.notificationSub({
          variables: {
            userId: this.props.user._id,
            pushToken: this.state.pushToken
          }
        });
      }
      this.updateProgressBar(1 / (3 + photos.length));
      this.showMessage({ seconds: 2, screen: 'HomeScreen' });
    }
    if (!res.data.createPost.ok) {
      bag.setErrors({ title: res.data.createPost.error });
    }
    bag.setSubmitting(false);
  };
  render() {
    const word = this.props.words;
    const { lang, user } = this.props;
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <Message
          isVisible={this.state.isShowMessage}
          title={word.successadded}
          icon="ios-checkmark-circle"
          lang={lang}
          width={width}
          height={120}
        />
        <ScrollView>
          <View style={styles.container}>
            <Formik
              initialValues={{
                title: '',
                body: '',
                photos: [],
                phone: getPureNumber(user.phone),
                service: '',
                location: false
              }}
              onSubmit={this.handleSubmit}
              validationSchema={Yup.object().shape({
                title: Yup.string()
                  .max(100)
                  .required('Required'),
                body: Yup.string()
                  .max(1000)
                  .required('Required'),
                phone: Yup.string()
                  .max(25)
                  .required('Required')
              })}
              render={({
                values,
                handleSubmit,
                setFieldValue,
                errors,
                touched,
                setFieldTouched,
                isValid,
                isSubmitting
              }: any) => (
                <React.Fragment>
                  <Title width={width - 40}>{word.addnewad}</Title>
                  <Input
                    rtl={lang === 'ar' ? true : false}
                    name="title"
                    label={word.title}
                    value={values.title}
                    onChange={setFieldValue}
                    onTouch={setFieldTouched}
                    outerStyle={styles.outerStyle}
                    innerStyle={styles.innerStyle}
                    labelStyle={styles.labelStyle}
                    error={touched.title && errors.title}
                    autoCapitalize="none"
                    autoCorrect={false}
                    height={40}
                  />
                  <Select
                    name="service"
                    required
                    words={this.props.words}
                    data={this.props.service}
                    label={word.service}
                    value={values.service}
                    onChange={setFieldValue}
                    lang={lang}
                  />

                  <Input
                    rtl={lang === 'ar' ? true : false}
                    name="body"
                    label={word.body}
                    value={values.body}
                    onChange={setFieldValue}
                    onTouch={setFieldTouched}
                    outerStyle={styles.outerStyle}
                    innerStyle={styles.innerStyle}
                    labelStyle={styles.labelStyle}
                    error={touched.body && errors.body}
                    autoCapitalize="none"
                    autoCorrect={false}
                    multiline={true}
                    height={100}
                  />
                  <ImagePicker
                    name="photos"
                    value={values.photos}
                    label={word.photos}
                    lang={lang}
                    sublabel={word.subphotos}
                    onChange={setFieldValue}
                    hendleSelectedImage={this.hendleSelectedImage}
                  />
                  <Input
                    rtl={lang === 'ar' ? true : false}
                    num
                    name="phone"
                    label={word.phone}
                    value={values.phone}
                    onChange={setFieldValue}
                    onTouch={setFieldTouched}
                    outerStyle={styles.outerStyle}
                    innerStyle={styles.innerStyle}
                    labelStyle={styles.labelStyle}
                    error={touched.phone && errors.phone}
                    keyboardType="number-pad"
                    height={40}
                  />
                  <Group
                    color="#444"
                    size={24}
                    onChange={setFieldValue}
                    rtl={lang === 'ar' ? true : false}
                  >
                    <CheckBox
                      name="location"
                      label={word.location}
                      msg={word.locationmsg}
                      value={values.location}
                      selected={values.location}
                    />
                  </Group>
                  {values.location && (
                    <UserLocation
                      getCurrentLocation={this.getCurrentLocation}
                      width={width}
                    />
                  )}
                  <Button
                    lang={lang}
                    background="#272727"
                    style={styles.btnStyle}
                    textStyle={styles.btnTextStyle}
                    title={word.submit}
                    onPress={handleSubmit}
                    disabled={!isValid || isSubmitting}
                  />
                  {isSubmitting && (
                    <View
                      style={{
                        position: 'relative',
                        left: 65,
                        bottom: 65
                      }}
                    >
                      <Progress.Circle
                        indeterminate={this.state.bar === 0 ? true : false}
                        progress={this.state.bar}
                        size={30}
                        color="#26A65B"
                        borderColor="#eee"
                      />
                    </View>
                  )}
                </React.Fragment>
              )}
            />
          </View>
          <View style={{ height: 60 }} />
        </ScrollView>
      </KeyboardAvoidingView>
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
    flex: 1,
    justifyContent: 'space-between',
    marginVertical: 5
  },
  innerStyle: {
    width: width - 40,
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
    padding: 5
  },
  btnStyle: {
    marginTop: 30,
    height: 60,
    width: width - 80,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    borderRadius: 5
  },
  btnTextStyle: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'cairo-regular'
  }
});

const mapStateToProps = (state: any) => ({
  service: state.glob.language.service,
  lang: state.glob.languageName,
  words: state.glob.language.words,
  user: state.user.user
});

export default connect(mapStateToProps)(
  graphql(addClassifiedMutation, {
    name: 'addClassifiedMutation'
  })(
    graphql(notificationSub, {
      name: 'notificationSub'
    })(AddRequestServiceScreen)
  )
);

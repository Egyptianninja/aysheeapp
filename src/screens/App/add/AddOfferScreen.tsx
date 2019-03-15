import { Ionicons } from '@expo/vector-icons';
import { Permissions } from 'expo';
import { Formik } from 'formik';
import * as React from 'react';
import { graphql } from 'react-apollo';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import * as Progress from 'react-native-progress';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { updateQty } from '../../../store/actions/userAtions';

import addClassifiedMutation from '../../../graphql/mutation/addClassified';
import notificationSub from '../../../graphql/mutation/notificationSub';
import {
  Button,
  CheckBox,
  Group,
  Input,
  SelectDate,
  Title
} from '../../../lib';
import {
  getPureNumber,
  isArabic,
  Message,
  pickImageWithoutUpload,
  registerForPushNotificationsAsync,
  StyleSheet,
  uploadPickedImage,
  UserLocation
} from '../../../utils';

const { width } = Dimensions.get('window');

class AddServiceScreen extends React.Component<any, any> {
  state = {
    selectedImage: null,
    isShowMessage: false,
    location: null,
    pushToken: null,
    image: null,
    bar: 0
  };

  async componentWillMount() {
    const pushToken = await registerForPushNotificationsAsync();
    await this.setState({ pushToken });
  }

  onPhotoUpload = async () => {
    const permissions = Permissions.CAMERA_ROLL;
    const { status: existingStatus } = await Permissions.getAsync(permissions);
    let finalStatus = existingStatus;
    if (finalStatus !== 'granted') {
      const { status } = await Permissions.askAsync(permissions);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      return;
    }
    // this.props.addPermission('CAMERA_ROLL');
    const image = await pickImageWithoutUpload(false);

    if (image) {
      this.setState({ image });
    }
  };

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
    const { title, body, startend, location, phone } = values;
    const isrtl = isArabic(title);

    console.log(startend);

    const photo = this.state.image
      ? await uploadPickedImage(this.state.image, 1080, 0.8)
      : null;

    const start = new Date(Object.keys(startend.name[0])[0]);
    const end = new Date(
      Object.keys(startend.name[startend.name.length - 1])[0]
    );

    const loc: any = location ? this.state.location : null;
    let trueLocation = null;

    if (loc) {
      trueLocation = {
        lat: loc.coords.latitude,
        lon: loc.coords.longitude
      };
    }

    this.updateProgressBar(1 / 3);

    const res = await this.props.addClassifiedMutation({
      variables: {
        title,
        body,
        photos: photo ? [photo] : null,
        isoffer: true,
        isrtl,
        start,
        end,
        trueLocation,
        phone
      }
    });

    if (res.data.createPost.ok) {
      this.updateProgressBar(1 / 3);
      if (this.state.pushToken) {
        this.props.notificationSub({
          variables: {
            userId: this.props.user._id,
            pushToken: this.state.pushToken
          }
        });
      }
      await this.props.updateQty('offers', 1);
      this.updateProgressBar(1 / 3);
      this.showMessage({ seconds: 2, screen: 'HomeScreen' });
    }
    if (!res.data.createPost.ok) {
      bag.setErrors({ title: res.data.createPost.error });
    }
    bag.setSubmitting(false);
  };
  render() {
    const word = this.props.words;
    const { isRTL } = this.props;
    const image: any = this.state.image;
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <Message
          isVisible={this.state.isShowMessage}
          title={word.successadded}
          icon="ios-checkmark-circle"
          isRTL={isRTL}
          width={width}
          height={120}
        />
        <ScrollView>
          <View style={styles.container}>
            <Formik
              initialValues={{
                title: '',
                body: '',
                startend: '',
                phone: getPureNumber(this.props.user.phone),
                location: false
              }}
              onSubmit={this.handleSubmit}
              validationSchema={Yup.object().shape({
                title: Yup.string()
                  .max(100)
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
                    rtl={isRTL}
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
                  <Input
                    rtl={isRTL}
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

                  {!this.state.image && (
                    <React.Fragment>
                      <Text
                        style={[
                          styles.labelStyle,
                          { alignSelf: 'flex-end', paddingRight: 35 }
                        ]}
                      >
                        {word.selectphoto}
                      </Text>
                      <TouchableWithoutFeedback onPress={this.onPhotoUpload}>
                        <View
                          style={{
                            width: width - 60,
                            backgroundColor: '#eee',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginVertical: 10,
                            height: 100,
                            borderRadius: 8
                          }}
                        >
                          <Ionicons
                            name="ios-camera"
                            size={46}
                            color="#5658AD"
                          />
                        </View>
                      </TouchableWithoutFeedback>
                    </React.Fragment>
                  )}
                  {image && (
                    <TouchableWithoutFeedback onPress={this.onPhotoUpload}>
                      <Image
                        source={{ uri: image.uri }}
                        style={{
                          flex: 1,
                          width: width - 60,
                          height: (image.height / image.width) * (width - 60),
                          resizeMode: 'cover',
                          borderRadius: 8
                        }}
                      />
                    </TouchableWithoutFeedback>
                  )}
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginHorizontal: 30,
                      borderBottomWidth: 1,
                      borderBottomColor: '#bbb'
                    }}
                  >
                    <SelectDate
                      rtl={isRTL}
                      name="startend"
                      period={true}
                      label={word.startendoffer}
                      labelStyle={styles.labelStyle}
                      value={values.startend}
                      onChange={setFieldValue}
                      iconName="ios-calendar"
                    />
                  </View>
                  <Input
                    rtl={isRTL}
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
                    rtl={isRTL}
                  >
                    <CheckBox
                      name="location"
                      msg={word.locationmsg}
                      label={word.location}
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
                    isRTL={isRTL}
                    background="#7678ED"
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
    width: width - 60,
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
  isRTL: state.glob.isRTL,
  words: state.glob.language.words,
  kind: state.glob.language.kind,
  user: state.user.user
});

export default connect(
  mapStateToProps,
  { updateQty }
)(
  graphql(addClassifiedMutation, {
    name: 'addClassifiedMutation',
    options: { refetchQueries: ['getTimeLine'] }
  })(
    graphql(notificationSub, {
      name: 'notificationSub'
    })(AddServiceScreen)
  )
);

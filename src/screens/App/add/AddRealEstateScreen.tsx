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
import {
  StyleSheet,
  ImagePicker,
  UserLocation,
  registerForPushNotificationsAsync,
  uploadPhotos,
  isArabic
} from '../../../utils';
import addClassifiedMutation from '../../../graphql/mutation/addClassified';
import notificationSub from '../../../graphql/mutation/notificationSub';

import {
  Input,
  Button,
  Group,
  RadioButton,
  CheckBox,
  Select,
  Title
} from '../../../lib';

import { MessageModal } from '../../../componenets';
import { getPureNumber } from '../../../utils/call';
const { width } = Dimensions.get('window');

const roomsData = [
  { id: 1, name: '1' },
  { id: 2, name: '2' },
  { id: 3, name: '3' },
  { id: 4, name: '4' },
  { id: 5, name: '5' },
  { id: 6, name: '6' },
  { id: 7, name: '7' },
  { id: 8, name: '8' },
  { id: 9, name: '9' },
  { id: 10, name: '10' }
];

class AddRealEstateScreen extends React.Component<any, any> {
  state = {
    selectedImage: null,
    isMessageModal: false,
    location: null,
    pushToken: null
  };

  async componentWillMount() {
    const pushToken = await registerForPushNotificationsAsync();
    await this.setState({ pushToken });
  }

  hendleSelectedImage = (selectedImage: any) => {
    this.setState({ selectedImage });
  };
  showMessage = () => {
    this.setState({ isMessageModal: true });
    setTimeout(() => {
      this.setState({ isMessageModal: false });
      return true;
    }, 2000);
  };

  getCurrentLocation = (location: any) => {
    this.setState({ location });
  };

  handleSubmit = async (values: any, bag: any) => {
    const photos = await uploadPhotos(values.photos, this.state.selectedImage);
    const category = this.props.navigation.getParam('item');
    delete category.sort;
    const {
      title,
      body,
      realestate,
      price,
      issale,
      phone,
      space,
      rooms,
      bathrooms,
      isfurnishered,
      location
    } = values;

    const isrtl = isArabic(title);
    const loc: any = location ? this.state.location : null;
    let trueLocation = null;

    if (loc) {
      trueLocation = {
        lat: loc.coords.latitude,
        lon: loc.coords.longitude
      };
    }
    const vb = {
      title,
      body,
      category,
      realestate,
      photos,
      isrtl,
      issale,
      isfurnishered,
      phone,
      space: Number(space),
      rooms: Number(rooms.name),
      bathrooms: Number(bathrooms.name),
      price: Number(price),
      trueLocation
    };
    const res = await this.props.addClassifiedMutation({
      variables: {
        title,
        body,
        category,
        realestate,
        photos,
        isrtl,
        issale,
        isfurnishered,
        phone,
        space: Number(space),
        rooms: Number(rooms.name),
        bathrooms: Number(bathrooms.name),
        price: Number(price),
        trueLocation
      }
    });

    if (res.data.createPost.ok) {
      if (this.state.pushToken) {
        this.props.notificationSub({
          variables: {
            userId: this.props.user._id,
            pushToken: this.state.pushToken
          }
        });
      }
      this.showMessage();
      setTimeout(() => {
        this.props.navigation.navigate('HomeScreen');
      }, 2500);
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
        <MessageModal
          isVisible={this.state.isMessageModal}
          message={word.successadded}
          lang={lang}
          width={width}
        />
        <ScrollView>
          <View style={styles.container}>
            <Formik
              initialValues={{
                title: '',
                body: '',
                photos: [],
                price: '',
                isfurnishered: false,
                isUnfurnishered: true,
                issale: false,
                isrent: true,
                realestate: '',
                phone: getPureNumber(user.phone),
                space: '',
                rooms: '',
                bathrooms: '',
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
                price: Yup.number()
                  .positive('price must be number')
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
                    words={this.props.words}
                    required
                    lang={this.props.lang}
                    name="realestate"
                    data={this.props.realestate}
                    label={word.realestate}
                    value={values.realestate}
                    onChange={setFieldValue}
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
                  <Group
                    color="#444"
                    size={24}
                    onChange={setFieldValue}
                    rtl={lang === 'ar' ? true : false}
                  >
                    <RadioButton
                      name="issale"
                      label={word.issale}
                      value={values.issale}
                      selected={values.issale}
                    />
                    <RadioButton
                      name="isrent"
                      label={word.isrent}
                      value={values.isrent}
                      selected={values.isrent}
                    />
                  </Group>
                  <Group
                    color="#444"
                    size={24}
                    onChange={setFieldValue}
                    rtl={lang === 'ar' ? true : false}
                  >
                    <RadioButton
                      name="isfurnishered"
                      label={word.furnishered}
                      value={values.isfurnishered}
                      selected={values.isfurnishered}
                    />
                    <RadioButton
                      name="isUnfurnishered"
                      label={word.unfurnishered}
                      value={values.isUnfurnishered}
                      selected={values.isUnfurnishered}
                    />
                  </Group>
                  <Input
                    rtl={lang === 'ar' ? true : false}
                    num
                    name="space"
                    label={word.space}
                    value={values.space}
                    onChange={setFieldValue}
                    onTouch={setFieldTouched}
                    outerStyle={styles.outerStyle}
                    innerStyle={styles.innerStyle}
                    labelStyle={styles.labelStyle}
                    error={touched.space && errors.space}
                    keyboardType="number-pad"
                    height={40}
                  />
                  <Select
                    name="rooms"
                    words={this.props.words}
                    lang={this.props.lang}
                    data={roomsData}
                    label={word.rooms}
                    value={values.rooms}
                    onChange={setFieldValue}
                  />
                  <Select
                    name="bathrooms"
                    words={this.props.words}
                    lang={this.props.lang}
                    data={roomsData}
                    label={word.bathrooms}
                    value={values.bathrooms}
                    onChange={setFieldValue}
                  />
                  <Input
                    rtl={lang === 'ar' ? true : false}
                    num
                    name="price"
                    label={word.price}
                    value={values.price}
                    onChange={setFieldValue}
                    onTouch={setFieldTouched}
                    outerStyle={styles.outerStyle}
                    innerStyle={styles.innerStyle}
                    labelStyle={styles.labelStyle}
                    error={touched.price && errors.price}
                    keyboardType="number-pad"
                    height={40}
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
                    loading={isSubmitting}
                  />
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
  realestate: state.glob.language.realestate,
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
    })(AddRealEstateScreen)
  )
);

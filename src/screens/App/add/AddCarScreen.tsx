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
  uploadPhotos,
  getPureNumber,
  isArabic,
  registerForPushNotificationsAsync
} from '../../../utils';
import addClassifiedMutation from '../../../graphql/mutation/addClassified';
import notificationSub from '../../../graphql/mutation/notificationSub';

import {
  Input,
  Button,
  Group,
  CheckBox,
  Select,
  RadioButton,
  Title
} from '../../../lib';
import { MessageModal } from '../../../componenets';
const { width } = Dimensions.get('window');

class AddCarScreen extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedImage: null,
      selectedBrand: null,
      isMessageModal: false,
      location: null,
      pushToken: null
    };
  }

  async componentWillMount() {
    const pushToken = await registerForPushNotificationsAsync();
    await this.setState({ pushToken });
  }

  hendleSelectedImage = (selectedImage: any) => {
    this.setState({ selectedImage });
  };

  onSelectBrand = (id: number) => this.setState({ selectedBrand: id });

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
      price,
      issale,
      phone,
      isnew,
      iswarranty,
      year,
      km,
      color,
      brand,
      subBrand,
      kind,
      location
    } = values;
    const isrtl = isArabic(title);
    const loc = location ? this.state.location : null;

    let trueLocation = null;

    if (loc) {
      trueLocation = {
        lat: loc.coords.latitude,
        lon: loc.coords.longitude
      };
    }
    const res = await this.props.addClassifiedMutation({
      variables: {
        title,
        body,
        category,
        photos,
        isrtl,
        isnew,
        iswarranty,
        issale,
        phone,
        price: Number(price),
        year: Number(year),
        km: Number(km),
        color,
        brand,
        subBrand,
        kind,
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
    const subBrands = this.props.subBrands.filter(
      (sb: any) => sb.pid === this.state.selectedBrand
    );
    const category = this.props.navigation.getParam('item');

    const kinds = this.props.kind.filter((kn: any) => kn.pid === category.id);
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
                isnew: false,
                isold: true,
                issale: true,
                isrent: false,
                iswarranty: false,
                phone: getPureNumber(user.phone),
                year: '',
                color: '',
                km: '',
                brand: '',
                subBrand: '',
                kind: '',
                location: false
              }}
              onSubmit={this.handleSubmit}
              validationSchema={Yup.object().shape({
                kind: Yup.string().required('Required'),
                brand: Yup.string().required('Required'),
                subBrand: Yup.string().required('Required'),
                title: Yup.string()
                  .max(100)
                  .required('Required'),
                body: Yup.string()
                  .max(1000)
                  .required('Required'),
                price: Yup.number()
                  .positive('price must be number')
                  .required('Required'),
                year: Yup.number()
                  .positive('price must be number')
                  .required('Required'),
                km: Yup.number().positive('price must be number'),
                color: Yup.string().max(100),
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
                  <React.Fragment>
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
                      name="kind"
                      value={values.kind}
                      required
                      data={kinds}
                      label={word.type}
                      onChange={setFieldValue}
                      words={this.props.words}
                      values={values}
                      lang={this.props.lang}
                    />
                    <Select
                      name="brand"
                      required
                      words={this.props.words}
                      lang={this.props.lang}
                      data={this.props.brands}
                      label={word.brand}
                      value={values.brand}
                      onChange={setFieldValue}
                      onSelectBrand={this.onSelectBrand}
                    />
                    <Select
                      name="subBrand"
                      required
                      disable={this.state.selectedBrand === null}
                      words={this.props.words}
                      data={subBrands}
                      label={word.subBrand}
                      value={values.subBrand}
                      onChange={setFieldValue}
                      lang={this.props.lang}
                    />
                  </React.Fragment>

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
                    label={word.photos}
                    lang={lang}
                    sublabel={word.subphotos}
                    value={values.photos}
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
                      name="isnew"
                      label={word.isnew}
                      value={values.isnew}
                      selected={values.isnew}
                    />
                    <RadioButton
                      name="isold"
                      label={word.isold}
                      value={values.isold}
                      selected={values.isold}
                    />
                  </Group>
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

                  <Input
                    rtl={lang === 'ar' ? true : false}
                    num
                    name="year"
                    label={word.year}
                    value={values.year}
                    onChange={setFieldValue}
                    onTouch={setFieldTouched}
                    outerStyle={styles.outerStyle}
                    innerStyle={styles.innerStyle}
                    labelStyle={styles.labelStyle}
                    error={touched.year && errors.year}
                    keyboardType="number-pad"
                    height={40}
                  />
                  <Input
                    rtl={lang === 'ar' ? true : false}
                    name="color"
                    label={word.color}
                    value={values.color}
                    onChange={setFieldValue}
                    onTouch={setFieldTouched}
                    outerStyle={styles.outerStyle}
                    innerStyle={styles.innerStyle}
                    labelStyle={styles.labelStyle}
                    error={touched.color && errors.color}
                    autoCapitalize="none"
                    autoCorrect={false}
                    height={40}
                  />
                  <Input
                    rtl={lang === 'ar' ? true : false}
                    num
                    name="km"
                    label={word.km}
                    value={values.km}
                    onChange={setFieldValue}
                    onTouch={setFieldTouched}
                    outerStyle={styles.outerStyle}
                    innerStyle={styles.innerStyle}
                    labelStyle={styles.labelStyle}
                    error={touched.km && errors.km}
                    keyboardType="number-pad"
                    height={40}
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
                      onChange={setFieldValue}
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
  lang: state.glob.languageName,
  brands: state.glob.brands,
  subBrands: state.glob.subBrands,
  kind: state.glob.language.kind,
  words: state.glob.language.words,
  user: state.user.user
});

export default connect(mapStateToProps)(
  graphql(addClassifiedMutation, {
    name: 'addClassifiedMutation'
  })(
    graphql(notificationSub, {
      name: 'notificationSub'
    })(AddCarScreen)
  )
);

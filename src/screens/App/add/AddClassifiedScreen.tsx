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
  uploadPhotos,
  UserLocation,
  registerForPushNotificationsAsync,
  isArabic,
  getPureNumber
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
const { width } = Dimensions.get('window');

class AddClassifiedScreen extends React.Component<any, any> {
  state = {
    selectedImage: null,
    selectedElectronics: null,
    isElectronics: null,
    isMessageModal: false,
    location: null,
    pushToken: null,
    bar: 0
  };
  noSale = [2, 3, 7, 8, 13, 15, 17, 18];
  noNew = [18, 17];
  noPrice = [15];
  noWaranty = [18, 17, 15, 13, 12];

  async componentWillMount() {
    const pushToken = await registerForPushNotificationsAsync();
    await this.setState({ pushToken });
  }

  componentDidMount() {
    const category = this.props.navigation.getParam('item');
    if (category.id === 2) {
      this.setState({ isElectronics: true });
    }
  }
  onSelecteOption = (id: number) => this.setState({ selectedElectronics: id });

  hendleSelectedImage = (selectedImage: any) => {
    this.setState({ selectedImage });
  };

  showMessage = () => {
    this.setState({ isMessageModal: true });
    setTimeout(() => {
      this.setState({ isMessageModal: false });
      return true;
    }, 1000);
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
    const {
      title,
      body,
      kind,
      eBrand,
      price,
      isnew,
      issale,
      iswarranty,
      phone,
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
    this.updateProgressBar(1 / (3 + photos.length));
    const res = await this.props.addClassifiedMutation({
      variables: {
        title,
        body,
        category,
        kind: kind !== '' ? kind : null,
        eBrand: eBrand !== '' ? eBrand : null,
        photos,
        isrtl,
        issale,
        isnew: this.noNew.includes(category.id) ? undefined : isnew,
        price: this.noPrice.includes(category.id) ? 0 : Number(price),
        iswarranty: this.noWaranty.includes(category.id)
          ? undefined
          : iswarranty,
        phone,
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
      this.showMessage();
      setTimeout(() => {
        this.props.navigation.navigate('HomeScreen');
      }, 1500);
    }
    if (!res.data.createPost.ok) {
      bag.setErrors({ title: res.data.createPost.error });
    }
    bag.setSubmitting(false);
  };
  render() {
    const word = this.props.words;
    const { lang, user } = this.props;
    const category = this.props.navigation.getParam('item');
    const kinds = this.props.kind.filter((kn: any) => kn.pid === category.id);
    let eBrands: any;

    if (this.state.isElectronics) {
      eBrands = this.props.electroBrands.filter(
        (eb: any) => eb.pid === this.state.selectedElectronics
      );
    }
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
                kind: '',
                eBrand: '',
                photos: [],
                price: '',
                isnew: false,
                isold: true,
                issale: true,
                isrent: false,
                iswarranty: false,
                phone: getPureNumber(user.phone),
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
                  .integer('price must be number')
                  .required('Required'),
                phone: Yup.string().max(25)
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
                  {kinds.length > 0 && (
                    <Select
                      name="kind"
                      required
                      value={values.kind}
                      data={kinds}
                      label={word.type}
                      onChange={setFieldValue}
                      onSelecteOption={this.onSelecteOption}
                      words={this.props.words}
                      values={values}
                      lang={lang}
                    />
                  )}
                  {this.state.isElectronics &&
                    values.kind.id > 4 &&
                    values.kind.id < 10 && (
                      <Select
                        name="eBrand"
                        data={eBrands}
                        label={word.eBrand}
                        value={values.eBrand}
                        onChange={setFieldValue}
                        lang={lang}
                      />
                    )}
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
                  {!this.noNew.includes(category.id) && (
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
                  )}
                  {!this.noSale.includes(category.id) && (
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
                  )}

                  {!this.noPrice.includes(category.id) && (
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
                  )}
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

                  {!this.noWaranty.includes(category.id) && (
                    <Group
                      color="#444"
                      size={24}
                      onChange={setFieldValue}
                      rtl={lang === 'ar' ? true : false}
                    >
                      <CheckBox
                        name="iswarranty"
                        label={word.warranty}
                        value={values.iswarranty}
                        selected={values.iswarranty}
                      />
                    </Group>
                  )}
                  <Group
                    color="#444"
                    size={24}
                    onChange={setFieldValue}
                    rtl={lang === 'ar' ? true : false}
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
  kind: state.glob.language.kind,
  electroBrands: state.glob.language.electroBrands,
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
    })(AddClassifiedScreen)
  )
);

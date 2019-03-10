import { Formik } from 'formik';
import * as React from 'react';
import { graphql } from 'react-apollo';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View
} from 'react-native';
import * as Progress from 'react-native-progress';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import PhotoView from '../../../componenets/Add/PhotoView';
import { currencyTypes } from '../../../constants';
import addClassifiedMutation from '../../../graphql/mutation/addClassified';
import notificationSub from '../../../graphql/mutation/notificationSub';
import {
  Button,
  CheckBox,
  Group,
  Input,
  RadioButton,
  Select,
  Title
} from '../../../lib';
import { updateQty } from '../../../store/actions/userAtions';
import {
  getCurrency,
  getPureNumber,
  isArabic,
  Message,
  registerForPushNotificationsAsync,
  StyleSheet,
  uploadPhotos,
  UserLocation
} from '../../../utils';
const { width } = Dimensions.get('window');

class AddPartsScreen extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedImage: null,
      selectedBrand: null,
      isShowMessage: false,
      location: null,
      pushToken: null,
      images: [],
      bar: 0
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

  getCurrentLocation = (location: any) => {
    this.setState({ location });
  };

  updateProgressBar = (value: any) => {
    this.setState({ bar: this.state.bar + value });
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

  returnData = (imgs: any) => {
    const stateImages = this.state.images;
    const images = [...stateImages, ...imgs];
    this.setState({ images });
  };

  updateImagesList = (images: any) => {
    this.setState({ images });
  };
  pickCameraImage = () => {
    this.props.navigation.navigate('CameraScreen', {
      returnData: this.returnData,
      lang: this.props.lang,
      isRTL: this.props.isRTL,
      imgqty: this.state.images.length
    });
  };

  handleSubmit = async (values: any, bag: any) => {
    let photos;
    if (this.state.images.length > 0) {
      photos = await uploadPhotos(
        this.state.images,
        this.state.selectedImage,
        this.updateProgressBar
      );
    }
    const category = this.props.navigation.getParam('item');
    delete category.sort;
    const {
      title,
      body,
      price,
      currency,
      issale,
      phone,
      isnew,
      iswarranty,
      year,
      km,
      color,
      brand,
      subBrand,
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
    this.updateProgressBar(1 / (3 + this.state.images.length));
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
        currency: currency.name,
        year: Number(year),
        km: Number(km),
        color,
        brand,
        subBrand,
        trueLocation
      }
      // refetchQueries: ['getTimeLine'],
      // awaitRefetchQueries: true
    });
    if (res.data.createPost.ok) {
      this.updateProgressBar(1 / (3 + this.state.images.length));
      if (this.state.pushToken) {
        this.props.notificationSub({
          variables: {
            userId: this.props.user._id,
            pushToken: this.state.pushToken
          }
        });
      }
      await this.props.updateQty('online', 1);
      this.updateProgressBar(1 / (3 + this.state.images.length));
      this.showMessage({ seconds: 2, screen: 'HomeScreen' });
    }
    if (!res.data.createPost.ok) {
      bag.setErrors({ title: res.data.createPost.error });
    }
    bag.setSubmitting(false);
  };
  render() {
    const word = this.props.words;
    const { user, isRTL } = this.props;
    const subBrands = this.props.subBrands.filter(
      (sb: any) => sb.pid === this.state.selectedBrand
    );
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
                price: '',
                currency: getCurrency(),
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
                location: false
              }}
              onSubmit={this.handleSubmit}
              validationSchema={Yup.object().shape({
                brand: Yup.string().required('Required'),
                subBrand: Yup.string().required('Required'),
                title: Yup.string()
                  .max(100)
                  .required('Required'),
                body: Yup.string()
                  .max(1000)
                  .required('Required'),
                price: Yup.number()
                  .integer('price must be number')
                  .required('Required'),
                year: Yup.number()
                  .integer('price must be number')
                  .required('Required'),
                km: Yup.number().integer('price must be number'),
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
                    <Select
                      name="brand"
                      required
                      words={this.props.words}
                      isRTL={isRTL}
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
                      isRTL={isRTL}
                    />
                  </React.Fragment>

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
                  <PhotoView
                    word={word}
                    isRTL={isRTL}
                    images={this.state.images}
                    selectedImage={this.state.selectedImage}
                    returnData={this.returnData}
                    pickCameraImage={this.pickCameraImage}
                    updateImagesList={this.updateImagesList}
                    hendleSelectedImage={this.hendleSelectedImage}
                  />
                  <Group
                    color="#444"
                    size={24}
                    onChange={setFieldValue}
                    rtl={isRTL}
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
                    rtl={isRTL}
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
                    rtl={isRTL}
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
                    rtl={isRTL}
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
                  <View
                    style={{
                      flex: 1,
                      flexDirection:
                        isRTL && Platform.OS !== 'android'
                          ? 'row-reverse'
                          : 'row',
                      justifyContent: 'center',
                      alignItems: 'flex-end'
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'center'
                      }}
                    >
                      <Input
                        rtl={isRTL}
                        num
                        name="price"
                        label={word.price}
                        value={values.price}
                        onChange={setFieldValue}
                        onTouch={setFieldTouched}
                        outerStyle={[styles.outerStyle, { paddingBottom: 5 }]}
                        innerStyle={[
                          styles.innerStyle,
                          { width: (width - 40) / 2 - 20 }
                        ]}
                        labelStyle={styles.labelStyle}
                        error={touched.price && errors.price}
                        keyboardType="number-pad"
                        height={40}
                      />
                    </View>
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'center'
                      }}
                    >
                      <Select
                        name="currency"
                        nosubLabel={true}
                        width={(width - 40) / 2 - 20}
                        value={values.currency}
                        data={currencyTypes}
                        label={word.currency}
                        onChange={setFieldValue}
                        words={this.props.words}
                        isRTL={isRTL}
                      />
                    </View>
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
                    isRTL={isRTL}
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
  lang: state.glob.languageName,
  isRTL: state.glob.isRTL,
  brands: state.glob.brands,
  subBrands: state.glob.subBrands,
  kind: state.glob.language.kind,
  words: state.glob.language.words,
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
    })(AddPartsScreen)
  )
);

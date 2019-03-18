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
import { areaUnits, currencyTypes } from '../../../constants';
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
  isArabic,
  Message,
  registerForPushNotificationsAsync,
  StyleSheet,
  uploadPhotos,
  UserLocation
} from '../../../utils';
import { getPureNumber } from '../../../utils/call';
import LoadingTiny from '../../../componenets/Common/LoadingTiny';

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
    isShowMessage: false,
    location: null,
    pushToken: null,
    images: [],
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
      realestate,
      price,
      currency,
      ism,
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
    this.updateProgressBar(1 / (3 + this.state.images.length));
    const res = await this.props.addClassifiedMutation({
      variables: {
        title,
        body,
        category,
        realestate,
        photos,
        isrtl,
        issale,
        areaunit: ism ? areaUnits[0] : areaUnits[1],
        isfurnishered,
        phone,
        space: Number(space),
        rooms: Number(rooms.name),
        bathrooms: Number(bathrooms.name),
        price: Number(price),
        currency: currency.name,
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
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <Formik
              initialValues={{
                title: '',
                body: '',
                price: '',
                currency: getCurrency(),
                isfurnishered: false,
                isUnfurnishered: true,
                issale: false,
                isrent: true,
                realestate: '',
                phone: getPureNumber(user.phone),
                space: '',
                ism: true,
                isft: false,
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
                realestate: Yup.string().required('Required'),
                price: Yup.number()
                  .integer('price must be number')
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
                    words={this.props.words}
                    required
                    isRTL={isRTL}
                    name="realestate"
                    data={this.props.realestate}
                    label={word.realestate}
                    value={values.realestate}
                    onChange={setFieldValue}
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
                    rtl={isRTL}
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
                    rtl={isRTL}
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
                  <Group
                    color="#444"
                    size={24}
                    onChange={setFieldValue}
                    rtl={isRTL}
                  >
                    <RadioButton
                      name="ism"
                      label={areaUnits[0]}
                      value={values.ism}
                      selected={values.ism}
                    />
                    <RadioButton
                      name="isft"
                      label={areaUnits[1]}
                      value={values.isft}
                      selected={values.isft}
                    />
                  </Group>
                  <Select
                    name="rooms"
                    words={this.props.words}
                    isRTL={isRTL}
                    data={roomsData}
                    label={word.rooms}
                    value={values.rooms}
                    onChange={setFieldValue}
                  />
                  <Select
                    name="bathrooms"
                    words={this.props.words}
                    isRTL={isRTL}
                    data={roomsData}
                    label={word.bathrooms}
                    value={values.bathrooms}
                    onChange={setFieldValue}
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
                  {values.location && !this.state.location && <LoadingTiny />}
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
                    disabled={
                      !isValid ||
                      isSubmitting ||
                      (values.location && !this.state.location)
                    }
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
  realestate: state.glob.language.realestate,
  isRTL: state.glob.isRTL,
  lang: state.glob.languageName,
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
    })(AddRealEstateScreen)
  )
);

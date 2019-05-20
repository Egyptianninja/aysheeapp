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
  Select
} from '../../../lib';
import {
  getCurrency,
  getPureNumber,
  isArabic,
  StyleSheet,
  uploadPhotos,
  uuidv4
} from '../../../utils';
import MessageAlert from '../../../utils/message/MessageAlert';
import { updateUser } from '../../../store/actions/userAtions';
import updateMyQty from '../../../graphql/mutation/updateMyQty';
import AddLocation from '../../../utils/location/addLocation';
const { width } = Dimensions.get('window');

class AddPartsScreen extends React.Component<any, any> {
  timer: any;
  constructor(props: any) {
    super(props);
    this.state = {
      selectedImage: null,
      selectedBrand: null,
      isMessageVisible: false,
      location: null,
      images: [],
      bar: 0
    };
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  showMessageModal = async () => {
    this.setState({ isMessageVisible: true });
  };
  hideMessageModal = () => {
    this.setState({ isMessageVisible: false });
  };
  onMessageModalHide = () => {
    this.props.navigation.navigate('HomeScreen');
  };

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

  updateItemsQty = () => {
    this.timer = setTimeout(async () => {
      const res = await this.props.updateMyQty({});
      if (res.data.updateMyQty.ok) {
        const { data } = res.data.updateMyQty;
        await this.props.updateUser(data);
      }
      this.showMessageModal();
    }, 2000);
  };

  resetLocation = (name: any) => {
    if (name === 'singleLocation') {
      this.setState({ location: null });
    } else if (name === 'branchLocations') {
      this.setState({ selectedBranches: [] });
    }
  };

  getLocations = ({ stateLocation, title }: any) => {
    let oneLocation: any = null;
    if (stateLocation) {
      oneLocation = {
        name: title,
        location: {
          lat: stateLocation.coords.latitude,
          lon: stateLocation.coords.longitude
        }
      };
    }

    if (oneLocation) {
      return [oneLocation];
    } else {
      return undefined;
    }
  };

  handleSubmit = async (values: any, bag: any) => {
    const { name, about, avatar, uniquename } = this.props.user;
    const groupId = uuidv4();

    let photos: any;
    if (this.state.images.length > 0) {
      photos = await uploadPhotos(
        this.state.images,
        this.state.selectedImage,
        this.updateProgressBar
      );
    }
    const isfront = this.props.user.frontqty < this.props.user.frontLimit;
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
      color,
      brand,
      subBrand,
      location
    } = values;
    const isrtl = isArabic(title);
    const locations = this.getLocations({
      stateLocation: this.state.location,
      title: values.title
    });

    this.updateProgressBar(1 / (3 + this.state.images.length));
    const res = await this.props.addClassifiedMutation({
      variables: {
        title,
        body,
        isfront,
        category,
        kind: undefined,
        service: undefined,
        photos,
        isrtl,
        isnew,
        iswarranty,
        issale,
        phone,
        price: Number(price),
        currency: currency.name,
        color,
        brand,
        subBrand: subBrand === '' ? undefined : subBrand,
        groupId,
        userName: name,
        userUniquename: uniquename,
        userAvatar: avatar,
        userAbout: about,
        locations
      }
    });
    if (res.data.createPost.ok) {
      this.updateProgressBar(1 / (3 + this.state.images.length));
      this.updateProgressBar(1 / (3 + this.state.images.length));
      bag.setSubmitting(false);
      this.updateItemsQty();
    }
    if (!res.data.createPost.ok) {
      bag.setErrors({ title: res.data.createPost.error });
    }
  };
  render() {
    const word = this.props.words;
    const { user, isRTL } = this.props;
    const subBrands = this.props.subBrands.filter(
      (sb: any) => sb.pid === this.state.selectedBrand
    );
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <MessageAlert
          isMessageVisible={this.state.isMessageVisible}
          hideMessageModal={this.hideMessageModal}
          onMessageModalHide={this.onMessageModalHide}
          message={word.successadded}
          icon="ios-checkmark-circle"
          isRTL={isRTL}
          height={120}
        />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={{ backgroundColor: '#eee' }}
        >
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
                phone: user.phone ? getPureNumber(user.phone) : '',
                year: '',
                brand: '',
                subBrand: '',
                branchLocations: false,
                singleLocation: false
              }}
              onSubmit={this.handleSubmit}
              validationSchema={Yup.object().shape({
                brand: Yup.string().required('Required'),
                title: Yup.string()
                  .max(100)
                  .required('Required'),
                body: Yup.string()
                  .max(1000)
                  .required('Required'),
                price: Yup.number()
                  .integer('price must be number')
                  .required('Required'),
                year: Yup.number().integer('price must be number'),
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
                  <React.Fragment>
                    <PhotoView
                      width={width}
                      word={word}
                      isRTL={isRTL}
                      qty={6}
                      images={this.state.images}
                      selectedImage={this.state.selectedImage}
                      returnData={this.returnData}
                      pickCameraImage={this.pickCameraImage}
                      updateImagesList={this.updateImagesList}
                      hendleSelectedImage={this.hendleSelectedImage}
                    />
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
                        alignItems: 'center',
                        width: width - 60
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
                          { width: (width - 60) / 2 - 30 }
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
                        width={(width - 60) / 2 - 30}
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
                      name="singleLocation"
                      label={word.location}
                      value={values.singleLocation}
                      selected={values.singleLocation}
                      resetLocation={this.resetLocation}
                    />
                  </Group>
                  {values.singleLocation && (
                    <AddLocation
                      getCurrentLocation={this.getCurrentLocation}
                      onChange={setFieldValue}
                      width={width}
                      title={values.title}
                    />
                  )}
                  <Button
                    isRTL={isRTL}
                    background="#fff"
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
                        bottom: 50
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
          <View style={{ height: 50 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 30
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
    writingDirection: 'auto',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20
  },
  labelStyle: {
    fontSize: 14,
    padding: 5,
    color: '#777',
    paddingHorizontal: 15
  },
  btnStyle: {
    marginTop: 30,
    height: 50,
    width: 270,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 18
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
  { updateUser }
)(
  graphql(addClassifiedMutation, {
    name: 'addClassifiedMutation',
    options: { refetchQueries: ['getTimeLine', 'getMyPosts'] }
  })(
    graphql(notificationSub, {
      name: 'notificationSub'
    })(
      graphql(updateMyQty, {
        name: 'updateMyQty',
        options: { refetchQueries: ['getUserPosts', 'getTimeLine'] }
      })(AddPartsScreen)
    )
  )
);

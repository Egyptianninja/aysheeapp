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
import LoadingTiny from '../../../componenets/Common/LoadingTiny';
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
import { updateQty } from '../../../store/actions/userAtions';
import {
  getCurrency,
  getPureNumber,
  isArabic,
  Message,
  StyleSheet,
  uploadPhotos,
  UserLocation
} from '../../../utils';
import MessageAlert from '../../../utils/message/MessageAlert';

const { width } = Dimensions.get('window');

class AddClassifiedScreen extends React.Component<any, any> {
  state = {
    selectedImage: null,
    selectedElectronics: null,
    isElectronics: null,
    isMessageVisible: false,
    location: null,
    images: [],
    bar: 0
  };
  noClassified = [19, 1, 5, 9, 15];

  noSale = [2, 3, 5, 7, 8, 9, 13, 14, 15, 17, 18];
  noPrice = [5, 9];
  noNew = [5, 9, 17, 18];
  noWaranty = [0, 5, 9, 12, 13, 17, 18];

  noKind = [99];
  kind = [2, 3, 4, 6, 7, 8, 10, 11, 12, 13, 14, 16, 17, 18];
  eBrand = [2, 6, 14];

  acc = [8];
  componentDidMount() {
    const category = this.props.navigation.getParam('item');
    if (category.id === 2) {
      this.setState({ isElectronics: true });
    }
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

  onSelecteOption = (id: number) => this.setState({ selectedElectronics: id });

  hendleSelectedImage = (selectedImage: any) => {
    this.setState({ selectedImage });
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
    const isfront = this.props.user.frontqty < this.props.user.frontLimit;
    const category = this.props.navigation.getParam('item');
    delete category.sort;
    const {
      title,
      body,
      kind,
      eBrand,
      price,
      currency,
      isforman,
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
    this.updateProgressBar(1 / (3 + this.state.images.length));
    const res = await this.props.addClassifiedMutation({
      variables: {
        title,
        body,
        isfront,
        category,
        kind: kind !== '' ? kind : null,
        eBrand: eBrand !== '' ? eBrand : null,
        photos,
        isrtl,
        issale,
        isforman: this.acc.includes(category.id) ? isforman : undefined,
        isnew: this.noNew.includes(category.id) ? undefined : isnew,
        price: this.noPrice.includes(category.id) ? 0 : Number(price),
        currency: currency.name,
        iswarranty: this.noWaranty.includes(category.id)
          ? undefined
          : iswarranty,
        phone,
        trueLocation
      }
    });

    if (res.data.createPost.ok) {
      this.updateProgressBar(1 / (3 + this.state.images.length));
      await this.props.updateQty('online', 1);
      this.updateProgressBar(1 / (3 + this.state.images.length));

      this.showMessageModal();
    }
    if (!res.data.createPost.ok) {
      bag.setErrors({ title: res.data.createPost.error });
    }
    bag.setSubmitting(false);
  };
  render() {
    const word = this.props.words;
    const { user, isRTL } = this.props;
    const category = this.props.navigation.getParam('item');
    const kinds = this.props.kind.filter((kn: any) => kn.pid === category.id);
    let eBrands: any;

    if (this.state.isElectronics) {
      eBrands = this.props.electroBrands.filter(
        (eb: any) => eb.pid === this.state.selectedElectronics
      );
    }
    let electricalBrands: any;
    if (category.id === 6) {
      electricalBrands = this.props.electroBrands.filter(
        (eb: any) => eb.pid === 6
      );
    } else if (category.id === 14) {
      electricalBrands = this.props.electroBrands.filter(
        (eb: any) => eb.pid === 14
      );
    }
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
                kind: '',
                eBrand: '',
                price: '',
                currency: getCurrency(),
                isforman: false,
                isforwomen: true,
                isnew: false,
                isold: true,
                issale: true,
                isrent: false,
                iswarranty: false,
                phone: user.phone ? getPureNumber(user.phone) : '',
                location: false
              }}
              onSubmit={this.handleSubmit}
              validationSchema={Yup.object().shape({
                title: Yup.string()
                  .max(100)
                  .required('Required'),
                kind: this.kind.includes(category.id)
                  ? Yup.string().required('Required')
                  : Yup.string(),
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
                  <PhotoView
                    width={width}
                    word={word}
                    isRTL={isRTL}
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
                  {this.acc.includes(category.id) && (
                    <Group
                      color="#444"
                      size={24}
                      onChange={setFieldValue}
                      rtl={isRTL}
                    >
                      <RadioButton
                        name="isforwomen"
                        label={word.isforwomen}
                        value={values.isforwomen}
                        selected={values.isforwomen}
                      />
                      <RadioButton
                        name="isforman"
                        label={word.isforman}
                        value={values.isforman}
                        selected={values.isforman}
                      />
                    </Group>
                  )}
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
                      isRTL={isRTL}
                    />
                  )}
                  {this.state.isElectronics &&
                    values.kind.id > 99 &&
                    values.kind.id < 103 && (
                      <Select
                        name="eBrand"
                        data={eBrands}
                        words={this.props.words}
                        label={word.eBrand}
                        value={values.eBrand}
                        onChange={setFieldValue}
                        isRTL={isRTL}
                      />
                    )}
                  {(category.id === 6 || category.id === 14) && (
                    <Select
                      name="eBrand"
                      required
                      data={electricalBrands}
                      words={this.props.words}
                      label={word.eBrand}
                      value={values.eBrand}
                      onChange={setFieldValue}
                      isRTL={isRTL}
                    />
                  )}
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
                  {!this.noNew.includes(category.id) && (
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
                  )}
                  {!this.noSale.includes(category.id) && (
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
                  )}

                  {!this.noPrice.includes(category.id) && (
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
                  )}
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

                  {!this.noWaranty.includes(category.id) && (
                    <Group
                      color="#444"
                      size={24}
                      onChange={setFieldValue}
                      rtl={isRTL}
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
                  {values.location && !this.state.location && <LoadingTiny />}
                  {values.location && (
                    <UserLocation
                      getCurrentLocation={this.getCurrentLocation}
                      width={width}
                    />
                  )}
                  <Button
                    isRTL={isRTL}
                    background="#fff"
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
  kind: state.glob.language.kind,
  electroBrands: state.glob.language.electroBrands,
  lang: state.glob.languageName,
  isRTL: state.glob.isRTL,
  words: state.glob.language.words,
  user: state.user.user
});

export default connect(
  mapStateToProps,
  { updateQty }
)(
  graphql(addClassifiedMutation, {
    name: 'addClassifiedMutation',
    options: { refetchQueries: ['getTimeLine', 'getMyPosts'] }
  })(
    graphql(notificationSub, {
      name: 'notificationSub'
    })(AddClassifiedScreen)
  )
);

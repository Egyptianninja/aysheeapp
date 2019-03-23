import { Ionicons } from '@expo/vector-icons';
import { Permissions } from 'expo';
import { Formik } from 'formik';
import * as React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import Modal from 'react-native-modal';
import * as Yup from 'yup';
import {
  Button,
  CheckBox,
  Group,
  Input,
  RadioButton,
  SelectDate
} from '../../lib';
import {
  isArabic,
  pickImageWithoutUpload,
  uploadPickedImage,
  UserLocation
} from '../../utils';
import LoadingTiny from '../Common/LoadingTiny';

const { width, height } = Dimensions.get('window');

export default class Edit extends React.Component<any, any> {
  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (nextProps.isEditModalVisible !== prevState.isEditModalVisible) {
      return { isEditModalVisible: nextProps.isEditModalVisible };
    } else {
      return { ...prevState };
    }
  }

  noClassified = [0, 1, 5, 9, 15];

  noSale = [2, 3, 5, 7, 8, 9, 13, 14, 15, 17, 18];
  noPrice = [5, 9];
  noNew = [5, 9, 17, 18];

  noWaranty = [0, 5, 9, 12, 13, 17, 18];

  noKind = [19];
  kind = [2, 3, 4, 6, 7, 8, 10, 11, 12, 13, 14, 16, 17, 18];
  eBrand = [2, 6];

  acc = [8];

  re = [0];
  car = [1];
  job = [5];
  serv = [9];

  constructor(props: any) {
    super(props);
    this.state = {
      isEditModalVisible: false,
      location: null,
      image: null
    };
  }

  getCurrentLocation = (location: any) => {
    this.setState({ location });
  };

  onPhotoUpload = async (setFieldValue: any) => {
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
    const image = await pickImageWithoutUpload(false);

    if (image) {
      this.setState({ image });
      setFieldValue('photo', image);
    }
  };

  handleSubmit = async (values: any, bag: any) => {
    const {
      price,
      title,
      body,
      startend,
      phone,
      isnew,
      issale,
      iswarranty,
      isforman,
      isjobreq,
      isservicereq,
      space,
      rooms,
      bathrooms,
      isfurnishered,
      year,
      km,
      color,
      jobTitle,
      jobIndustry,
      isfullTime,
      education,
      experience,
      salary,
      location
    } = values;
    const photo = this.state.image
      ? await uploadPickedImage(this.state.image, 1080, 0.8)
      : null;
    const isrtl = isArabic(title);
    const loc: any = location ? this.state.location : null;
    let trueLocation = values.trueLocation;
    if (loc) {
      trueLocation = {
        lat: loc.coords.latitude,
        lon: loc.coords.longitude
      };
    }
    const start = startend
      ? new Date(Object.keys(startend.name[0])[0])
      : undefined;
    const end = startend
      ? new Date(Object.keys(startend.name[startend.name.length - 1])[0])
      : undefined;

    const res = await this.props.editClassifieds({
      variables: {
        postId: this.props.post.id,
        title,
        body,
        start,
        end,
        photos: photo ? [photo] : undefined,
        isrtl,
        price: price ? Number(price) : undefined,
        phone: phone ? phone : undefined,
        trueLocation: trueLocation ? trueLocation : undefined,
        isnew: isnew || isnew === false ? isnew : undefined,
        issale: issale || issale === false ? issale : undefined,
        iswarranty: iswarranty || iswarranty === false ? iswarranty : undefined,
        isforman: isforman || isforman === false ? isforman : undefined,
        isjobreq: isjobreq || isjobreq === false ? isjobreq : undefined,
        isservicereq:
          isservicereq || isservicereq === false ? isservicereq : undefined,
        space: space ? Number(space) : undefined,
        rooms: rooms ? Number(rooms) : undefined,
        bathrooms: bathrooms ? Number(bathrooms) : undefined,
        isfurnishered:
          isfurnishered || isfurnishered === false ? isfurnishered : undefined,
        year: year ? Number(year) : undefined,
        km: km ? Number(km) : undefined,
        color: color ? color : undefined,
        jobTitle: jobTitle ? jobTitle : undefined,
        jobIndustry: jobIndustry ? jobIndustry : undefined,
        isfullTime: isfullTime || isfullTime === false ? isfullTime : undefined,
        education: education ? education : undefined,
        experience: experience ? experience : undefined,
        salary: salary ? Number(salary) : undefined
      }
    });
    console.log(res.data);

    if (res.data.updatePost.ok) {
      this.props.hideEditModal();
      setTimeout(() => {
        this.props.showMessageModal({
          seconds: 1,
          message: this.props.word.adupdated
        });
      }, 1000);
    }
    if (!res.data.updatePost.ok) {
      bag.setErrors({ title: res.data.updatePost.error });
    }
    bag.setSubmitting(false);
  };

  getDaysArray = (s: any, e: any) => {
    const a = [];
    for (const d = s; d <= e; d.setDate(d.getDate() + 1)) {
      a.push(new Date(d));
    }
    return a.map((v: any) => v.toISOString().slice(0, 10));
  };

  periodBuild = (post: any) => {
    const prePeriod = this.getDaysArray(
      new Date(post.start),
      new Date(post.end)
    );
    const period = prePeriod.map((dy: any, i: number) => {
      if (i === 0) {
        return { [dy]: { startingDay: true, color: 'skyblue' } };
      } else if (i === prePeriod.length - 1) {
        return { [dy]: { endingDay: true, color: 'skyblue' } };
      } else {
        return { [dy]: { color: 'skyblue' } };
      }
    });
    return { name: period };
  };

  renderHeader = (title: any) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          width,
          height: 50,
          backgroundColor: '#aaa',
          paddingHorizontal: 20,
          alignSelf: 'center'
        }}
      >
        <TouchableOpacity
          onPress={() => this.props.hideEditModal()}
          style={{
            position: 'absolute',
            top: 8,
            left: 10,
            zIndex: 10,
            width: 32,
            height: 32,
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center'
            // backgroundColor: 'rgba(255, 255, 255, 0.1)'
          }}
        >
          <Text
            style={{
              color: '#fff',
              textAlign: 'center',
              fontFamily: 'cairo-regular',
              fontSize: 20
            }}
          >
            ⤬
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text
            style={{
              color: '#fff',
              textAlign: 'center',
              fontFamily: 'cairo-regular',
              fontSize: 18
            }}
          >
            {title}
          </Text>
        </View>
      </View>
    );
  };

  render() {
    const { word, isRTL, post } = this.props;
    const { categoryId } = post;
    const image: any = this.state.image;
    const period = post.isoffer ? this.periodBuild(post) : null;
    const photo =
      post.isoffer && post.photos.length > 0
        ? {
            uri: `http://res.cloudinary.com/arflon/image/upload/w_400/${post.photos[0].substring(
              0,
              20
            )}`,
            ratio: Number(post.photos[0].substring(21, 26))
          }
        : null;
    return (
      <Modal
        isVisible={this.state.isEditModalVisible}
        onBackdropPress={() => this.props.hideEditModal()}
        onBackButtonPress={() => this.props.hideEditModal()}
        backdropOpacity={0.8}
        useNativeDriver={true}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        hideModalContentWhileAnimating={true}
        style={{ margin: 0 }}
      >
        <View
          style={{
            backgroundColor: '#fff',
            position: 'absolute',
            bottom: 0,
            margin: 0,
            height: height - 100,
            width,
            justifyContent: 'space-around',
            alignItems: 'center'
          }}
        >
          {this.renderHeader(word.editadd)}

          <ScrollView>
            <Formik
              initialValues={{
                title: post.title,
                body: post.body,
                startend: period,
                photos: post.photos,
                photo: '',
                price: post.price ? post.price.toString() : post.price,
                currency: post.currency,
                phone: post.phone,
                isnew: post.isnew,
                isold: post.isnew || post.isnew === false ? !post.isnew : null,
                issale: post.issale,
                isrent:
                  post.issale || post.issale === false ? !post.issale : null,
                iswarranty: post.iswarranty,
                isforman: post.isforman,
                isforwomen:
                  post.isforman || post.isforman === false
                    ? !post.isforman
                    : null,
                isjobreq: post.isjobreq,
                isjoboffer:
                  post.isjobreq || post.isjobreq === false
                    ? !post.isjobreq
                    : null,
                isservicereq: post.isservicereq,
                isserviceoffer:
                  post.isservicereq || post.isservicereq === false
                    ? !post.isservicereq
                    : null,
                space: post.space ? post.space.toString() : post.space,
                rooms: post.rooms ? post.rooms.toString() : post.rooms,
                bathrooms: post.bathrooms
                  ? post.bathrooms.toString()
                  : post.bathrooms,
                isfurnishered: post.isfurnishered,
                isUnfurnishered:
                  post.isfurnishered || post.isfurnishered === false
                    ? !post.isfurnishered
                    : null,
                year: post.year ? post.year.toString() : post.year,
                km: post.km ? post.km.toString() : post.km,
                color: post.color,
                jobTitle: post.jobTitle,
                jobIndustry: post.jobIndustry,
                isfullTime: post.isfullTime,
                isPartTime:
                  post.isfullTime || post.isfullTime === false
                    ? !post.isfullTime
                    : null,
                education: post.education,
                experience: post.experience,
                salary: post.salary ? post.salary.toString() : post.salary,
                location: false
              }}
              onSubmit={this.handleSubmit}
              validationSchema={Yup.object().shape({
                title: Yup.string()
                  .max(100)
                  .required('Required'),
                body: Yup.string()
                  .max(1000)
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
                  {post.isoffer && (
                    <React.Fragment>
                      {!image && !photo && (
                        <React.Fragment>
                          <Text
                            style={[
                              styles.labelStyle,
                              { alignSelf: 'flex-end', paddingRight: 35 }
                            ]}
                          >
                            {word.selectphoto}
                          </Text>
                          <TouchableWithoutFeedback
                            onPress={() => this.onPhotoUpload(setFieldValue)}
                          >
                            <View
                              style={{
                                width: width - 60,
                                backgroundColor: '#eee',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginVertical: 10,
                                height: 120,
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
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        {!image && photo && (
                          <TouchableWithoutFeedback
                            onPress={() => this.onPhotoUpload(setFieldValue)}
                          >
                            <Image
                              source={{ uri: photo.uri }}
                              style={{
                                flex: 1,
                                width: width - 60,
                                height: photo.ratio * (width - 60),
                                resizeMode: 'cover',
                                borderRadius: 8
                              }}
                            />
                          </TouchableWithoutFeedback>
                        )}
                        {image && (
                          <TouchableWithoutFeedback
                            onPress={() => this.onPhotoUpload(setFieldValue)}
                          >
                            <Image
                              source={{ uri: image.uri }}
                              style={{
                                flex: 1,
                                width: width - 60,
                                height:
                                  (image.height / image.width) * (width - 60),
                                resizeMode: 'cover',
                                borderRadius: 8
                              }}
                            />
                          </TouchableWithoutFeedback>
                        )}
                      </View>

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
                    </React.Fragment>
                  )}
                  {!this.noPrice.includes(categoryId) && !post.isoffer && (
                    <Input
                      rtl={isRTL}
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
                  {this.acc.includes(categoryId) && !post.isoffer && (
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

                  {this.serv.includes(categoryId) && !post.isoffer && (
                    <Group
                      color="#444"
                      size={24}
                      onChange={setFieldValue}
                      rtl={isRTL}
                    >
                      <RadioButton
                        name="isservicereq"
                        label={word.isservicereq}
                        value={values.isservicereq}
                        selected={values.isservicereq}
                      />
                      <RadioButton
                        name="isserviceoffer"
                        label={word.isserviceoffer}
                        value={values.isserviceoffer}
                        selected={values.isserviceoffer}
                      />
                    </Group>
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
                  {!this.noNew.includes(categoryId) && !post.isoffer && (
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
                  {!this.noSale.includes(categoryId) && !post.isoffer && (
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
                  {!this.noWaranty.includes(categoryId) && !post.isoffer && (
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
                  {this.re.includes(categoryId) && !post.isoffer && (
                    <React.Fragment>
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
                    </React.Fragment>
                  )}
                  {this.car.includes(categoryId) && !post.isoffer && (
                    <React.Fragment>
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
                      <Input
                        rtl={isRTL}
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
                    </React.Fragment>
                  )}
                  {this.job.includes(categoryId) && !post.isoffer && (
                    <React.Fragment>
                      <Group
                        color="#444"
                        size={24}
                        onChange={setFieldValue}
                        rtl={isRTL}
                      >
                        <RadioButton
                          name="isjobreq"
                          label={word.isjobreq}
                          value={values.isjobreq}
                          selected={values.isjobreq}
                        />
                        <RadioButton
                          name="isjoboffer"
                          label={word.isjoboffer}
                          value={values.isjoboffer}
                          selected={values.isjoboffer}
                        />
                      </Group>
                      <Input
                        rtl={isRTL}
                        num
                        name="salary"
                        label={word.salary}
                        value={values.salary}
                        onChange={setFieldValue}
                        onTouch={setFieldTouched}
                        outerStyle={styles.outerStyle}
                        innerStyle={styles.innerStyle}
                        labelStyle={styles.labelStyle}
                        error={touched.salary && errors.salary}
                        keyboardType="number-pad"
                        height={40}
                      />
                      <Input
                        rtl={isRTL}
                        name="jobTitle"
                        label={word.jobtitle}
                        value={values.jobTitle}
                        onChange={setFieldValue}
                        onTouch={setFieldTouched}
                        outerStyle={styles.outerStyle}
                        innerStyle={styles.innerStyle}
                        labelStyle={styles.labelStyle}
                        error={touched.jobTitle && errors.jobTitle}
                        autoCapitalize="none"
                        autoCorrect={false}
                        height={40}
                      />
                      <Input
                        rtl={isRTL}
                        name="jobIndustry"
                        label={word.jobindustry}
                        value={values.jobIndustry}
                        onChange={setFieldValue}
                        onTouch={setFieldTouched}
                        outerStyle={styles.outerStyle}
                        innerStyle={styles.innerStyle}
                        labelStyle={styles.labelStyle}
                        error={touched.jobIndustry && errors.jobIndustry}
                        autoCapitalize="none"
                        autoCorrect={false}
                        height={40}
                      />
                      <Input
                        rtl={isRTL}
                        name="education"
                        label={word.education}
                        value={values.education}
                        onChange={setFieldValue}
                        onTouch={setFieldTouched}
                        outerStyle={styles.outerStyle}
                        innerStyle={styles.innerStyle}
                        labelStyle={styles.labelStyle}
                        error={touched.education && errors.education}
                        autoCapitalize="none"
                        autoCorrect={false}
                        height={40}
                      />
                      <Input
                        rtl={isRTL}
                        name="experience"
                        label={word.experience}
                        value={values.experience}
                        onChange={setFieldValue}
                        onTouch={setFieldTouched}
                        outerStyle={styles.outerStyle}
                        innerStyle={styles.innerStyle}
                        labelStyle={styles.labelStyle}
                        error={touched.experience && errors.experience}
                        autoCapitalize="none"
                        autoCorrect={false}
                        height={40}
                      />
                      <Group
                        color="#444"
                        size={24}
                        onChange={setFieldValue}
                        rtl={isRTL}
                      >
                        <RadioButton
                          name="isfullTime"
                          label={word.fullTime}
                          value={values.isfullTime}
                          selected={values.isfullTime}
                        />
                        <RadioButton
                          name="isPartTime"
                          label={word.parttime}
                          value={values.isPartTime}
                          selected={values.isPartTime}
                        />
                      </Group>
                    </React.Fragment>
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
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
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
                      loading={isSubmitting}
                    />
                  </View>
                </React.Fragment>
              )}
            />
            <View style={{ height: 60 }} />
          </ScrollView>
        </View>
      </Modal>
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
    marginTop: 20
  },
  outerStyle: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
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
    width: 200,
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

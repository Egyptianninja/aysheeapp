import * as React from 'react';
import { View, Dimensions, StyleSheet, ScrollView, Text } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Modal from 'react-native-modal';
import { Input, Button, Group, RadioButton, CheckBox, Title } from '../../lib';
import { UserLocation, isArabic } from '../../utils';
const { width } = Dimensions.get('window');

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
      location: null
    };
  }

  getCurrentLocation = (location: any) => {
    this.setState({ location });
  };

  handleSubmit = async (values: any, bag: any) => {
    const {
      price,
      title,
      body,
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
    const isrtl = isArabic(title);
    const loc: any = location ? this.state.location : null;
    let trueLocation = values.trueLocation;
    if (loc) {
      trueLocation = {
        lat: loc.coords.latitude,
        lon: loc.coords.longitude
      };
    }
    const res = await this.props.editClassifieds({
      variables: {
        postId: this.props.post.id,
        title,
        body,
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

  render() {
    const { word, isRTL, post } = this.props;
    const { categoryId } = post;
    return (
      <Modal
        isVisible={this.state.isEditModalVisible}
        onBackdropPress={() => this.props.hideEditModal()}
        backdropOpacity={0.2}
        useNativeDriver={true}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        hideModalContentWhileAnimating={true}
        style={{ flex: 1 }}
      >
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 10,
            position: 'absolute',
            bottom: 0,
            margin: 0,
            height: 500,
            paddingTop: 10,
            width: width - 40,
            justifyContent: 'space-around',
            alignItems: 'center'
          }}
        >
          <ScrollView>
            <Formik
              initialValues={{
                title: post.title,
                body: post.body,
                start: post.start,
                end: post.end,
                photos: post.photos,
                price: post.price ? post.price.toString() : post.price,
                currency: post.currency,
                phone: post.phone,
                isnew: post.isnew,
                isold: !post.isnew,
                issale: post.issale,
                isrent: !post.issale,
                iswarranty: post.iswarranty,
                isforman: post.isforman,
                isjobreq: post.isjobreq,
                isjoboffer: !post.isjobreq,
                isservicereq: post.isservicereq,
                isserviceoffer: !post.isservicereq,
                isforwomen: !post.isforman,
                space: post.space ? post.space.toString() : post.space,
                rooms: post.rooms ? post.rooms.toString() : post.rooms,
                bathrooms: post.bathrooms
                  ? post.bathrooms.toString()
                  : post.bathrooms,
                isfurnishered: post.isfurnishered,
                isUnfurnishered: !post.isfurnishered,
                year: post.year ? post.year.toString() : post.year,
                km: post.km ? post.km.toString() : post.km,
                color: post.color,
                jobTitle: post.jobTitle,
                jobIndustry: post.jobIndustry,
                isfullTime: post.isfullTime,
                isPartTime: !post.isfullTime,
                education: post.education,
                experience: post.experience,
                salary: post.salary ? post.salary.toString() : post.salary,

                trueLocation: post.trueLocation,
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
                  <Title>
                    <Text>{word.editadd}</Text>
                  </Title>
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
                  {!this.noPrice.includes(categoryId) && (
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
                  {this.acc.includes(categoryId) && (
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

                  {this.serv.includes(categoryId) && (
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
                  {!this.noNew.includes(categoryId) && (
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
                  {!this.noSale.includes(categoryId) && (
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
                  {!this.noWaranty.includes(categoryId) && (
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
                  {this.re.includes(categoryId) && (
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
                  {this.car.includes(categoryId) && (
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
                  {this.job.includes(categoryId) && (
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
                      background="#272727"
                      style={styles.btnStyle}
                      textStyle={styles.btnTextStyle}
                      title={word.submit}
                      onPress={handleSubmit}
                      disabled={!isValid || isSubmitting}
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
    width: width - 120,
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

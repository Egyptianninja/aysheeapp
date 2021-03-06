import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as React from 'react';
import { connect } from 'react-redux';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView
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
  getCameraRollPermission,
  isArabic,
  pickImageWithoutUpload
} from '../../utils';
import { Constants } from 'expo';
import AddLocation from '../../utils/location/addLocation';

const { width, height } = Dimensions.get('window');

class Edit extends React.Component<any, any> {
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
      branches: [],
      selectedBranches: []
    };
  }

  componentDidMount() {
    if (this.props.user.isstore) {
      this.setState({
        branches: this.props.user.branches
      });
    }
    if (this.props.post.locations && this.props.post.locations.length > 0) {
      const selectedNmaes = this.props.post.locations.map(
        (loc: any) => loc.name
      );
      const selectedBranches = this.props.user.branches.filter((branch: any) =>
        selectedNmaes.includes(branch.name)
      );
      this.setState({ selectedBranches });
    }
  }

  selectBranch = (branch: any) => {
    const selected: any = this.state.selectedBranches;
    if (selected.includes(branch)) {
      this.setState({
        selectedBranches: selected.filter((sel: any) => sel !== branch)
      });
    } else {
      selected.push(branch);
      this.setState({ selectedBranches: selected });
    }
  };

  getCurrentLocation = (location: any) => {
    this.setState({ location });
  };

  onPhotoUpload = async (setFieldValue: any) => {
    const getCameraRoll = await getCameraRollPermission();
    if (getCameraRoll) {
      const image = await pickImageWithoutUpload(false);
      if (image) {
        this.setState({ image });
        setFieldValue('photo', image);
      }
    }
  };

  resetLocation = (name: any) => {
    if (name === 'singleLocation') {
      this.setState({ location: null });
    } else if (name === 'branchLocations') {
      this.setState({ selectedBranches: [] });
    }
  };

  getLocations = ({ stateLocation, selectedBranches, title }: any) => {
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

    const branchLocations =
      selectedBranches.length > 0
        ? selectedBranches.map((branch: any) => {
            return {
              name: branch.name,
              location: {
                lat: branch.location.lat,
                lon: branch.location.lon
              }
            };
          })
        : null;
    if (oneLocation) {
      return [oneLocation];
    } else if (branchLocations) {
      return branchLocations;
    } else {
      return undefined;
    }
  };

  handleSubmit = async (values: any, bag: any) => {
    const selectedBranches: any = this.state.selectedBranches;

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
      salary
    } = values;

    const isrtl = isArabic(title);
    const locations = this.getLocations({
      stateLocation: this.state.location,
      selectedBranches,
      title: values.title
    });
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
        isrtl,
        price: price ? Number(price) : undefined,
        phone: phone ? phone : undefined,
        locations,
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
      this.props.showMessageModal({
        message: this.props.word.adupdated
      });
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
          backgroundColor: '#8E90F0',
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
    const selectedBranches: any = this.state.selectedBranches;

    const period = post.isoffer ? this.periodBuild(post) : null;
    return (
      <Modal
        isVisible={this.state.isEditModalVisible}
        onBackdropPress={() => this.props.hideEditModal()}
        onBackButtonPress={() => this.props.hideEditModal()}
        backdropOpacity={0.3}
        useNativeDriver={true}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        hideModalContentWhileAnimating={true}
        style={{ margin: 0 }}
      >
        <KeyboardAvoidingView
          behavior="padding"
          enabled
          style={{
            backgroundColor: '#eee',
            position: 'absolute',
            bottom: 0,
            margin: 0,
            height: height - (Constants.statusBarHeight + 40),
            width,
            justifyContent: 'space-around',
            alignItems: 'center'
          }}
        >
          {this.renderHeader(word.editadd)}

          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: '#eee' }}
            contentContainerStyle={{ paddingBottom: 30 }}
          >
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
                branchLocations:
                  this.props.user.isstore &&
                  this.props.post.locations &&
                  this.props.post.locations.length > 0,
                singleLocation:
                  !this.props.user.isstore &&
                  this.state.selectedBranches.length > 0
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
                  {!this.props.user.isstore && (
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
                  )}
                  {this.props.user.isstore && (
                    <Group
                      color="#444"
                      size={24}
                      onChange={setFieldValue}
                      rtl={isRTL}
                    >
                      <CheckBox
                        name="branchLocations"
                        label={word.brancheslocations}
                        value={values.branchLocations}
                        selected={values.branchLocations}
                        resetLocation={this.resetLocation}
                      />
                    </Group>
                  )}

                  {values.branchLocations && (
                    <Group
                      color="#444"
                      size={24}
                      onChange={setFieldValue}
                      rtl={isRTL}
                    >
                      <View
                        style={{
                          flexDirection: 'column',
                          marginHorizontal: 15,
                          borderLeftColor: '#ddd',
                          borderLeftWidth: 2
                        }}
                      >
                        {this.props.user.branches.map(
                          (branch: any, index: any) => (
                            <CheckBox
                              key={index}
                              name="location"
                              index={index}
                              branch={branch}
                              selectBranch={this.selectBranch}
                              label={branch.name}
                              selected={selectedBranches.includes(branch)}
                            />
                          )
                        )}
                      </View>
                    </Group>
                  )}
                  {values.singleLocation && (
                    <AddLocation
                      getCurrentLocation={this.getCurrentLocation}
                      onChange={setFieldValue}
                      width={width}
                      title={values.title}
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
                      background="#fff"
                      style={styles.btnStyle}
                      textStyle={styles.btnTextStyle}
                      title={word.submit}
                      onPress={handleSubmit}
                      // disabled={!isValid || isSubmitting}
                      loading={isSubmitting}
                    />
                  </View>
                </React.Fragment>
              )}
            />
          </ScrollView>
          <View style={{ height: 20 }} />
        </KeyboardAvoidingView>
      </Modal>
    );
  }
}

const mapStateToProps = (state: any) => ({
  user: state.user.user
});

export default connect(mapStateToProps)(Edit);

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
    width: width - 50,

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

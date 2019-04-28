import { Formik } from 'formik';
import * as React from 'react';
import { graphql } from 'react-apollo';
import {
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  View
} from 'react-native';
import * as Progress from 'react-native-progress';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import PhotoView from '../../../componenets/Add/PhotoView';
import addClassifiedMutation from '../../../graphql/mutation/addClassified';
import notificationSub from '../../../graphql/mutation/notificationSub';
import { Button, CheckBox, Group, Input, RadioButton } from '../../../lib';
import { isArabic, StyleSheet, uploadPhotos, uuidv4 } from '../../../utils';
import { getPureNumber } from '../../../utils/call';
import MessageAlert from '../../../utils/message/MessageAlert';
import { updateUser } from '../../../store/actions/userAtions';
import updateMyQty from '../../../graphql/mutation/updateMyQty';
import AddLocation from '../../../utils/location/addLocation';
const { width } = Dimensions.get('window');

class AddJobScreen extends React.Component<any, any> {
  timer: any;
  state = {
    selectedImage: null,
    isMessageVisible: false,
    location: null,
    images: [],
    branches: [],
    selectedBranches: [],
    bar: 0
  };
  componentDidMount() {
    if (this.props.user.isstore) {
      this.setState({
        branches: this.props.user.branches
      });
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
    const { name, about, avatar, uniquename } = this.props.user;
    const selectedBranches: any = this.state.selectedBranches;
    const groupId = uuidv4();

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
      isjobreq,
      phone,
      isfullTime,
      experience,
      salary
    } = values;
    const isrtl = isArabic(title);
    const locations = this.getLocations({
      stateLocation: this.state.location,
      selectedBranches,
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
        isjobreq,
        photos,
        isrtl,
        phone,
        isfullTime,
        experience,
        salary: Number(salary),
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
      bag.setSubmitting(false);
      this.updateProgressBar(1 / (3 + this.state.images.length));
      this.updateItemsQty();
    }
    if (!res.data.createPost.ok) {
      bag.setErrors({ title: res.data.createPost.error });
    }
  };
  render() {
    const word = this.props.words;
    const { user, isRTL } = this.props;
    const selectedBranches: any = this.state.selectedBranches;

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
                isjobreq: true,
                isjoboffer: false,
                phone: user.phone ? getPureNumber(user.phone) : '',
                isfullTime: true,
                isPartTime: false,
                experience: '',
                salary: '',
                branchLocations: false,
                singleLocation: false
              }}
              onSubmit={this.handleSubmit}
              validationSchema={Yup.object().shape({
                title: Yup.string()
                  .max(100)
                  .required('Required'),
                body: Yup.string()
                  .max(1000)
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
                    {this.props.user.isstore && (
                      <CheckBox
                        name="branchLocations"
                        label={word.brancheslocations}
                        value={values.branchLocations}
                        selected={values.branchLocations}
                        resetLocation={this.resetLocation}
                      />
                    )}
                  </Group>

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
  isRTL: state.glob.isRTL,
  lang: state.glob.languageName,
  words: state.glob.language.words,
  kind: state.glob.language.kind,
  user: state.user.user
});

export default connect(
  mapStateToProps,
  { updateUser }
)(
  graphql(addClassifiedMutation, {
    name: 'addClassifiedMutation'
  })(
    graphql(notificationSub, {
      name: 'notificationSub'
    })(
      graphql(updateMyQty, {
        name: 'updateMyQty',
        options: { refetchQueries: ['getUserPosts', 'getTimeLine'] }
      })(AddJobScreen)
    )
  )
);

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
import addClassifiedMutation from '../../../graphql/mutation/addClassified';
import notificationSub from '../../../graphql/mutation/notificationSub';
import { Button, CheckBox, Group, Input, SelectDate } from '../../../lib';
import {
  getCameraRollPermission,
  getPureNumber,
  isArabic,
  pickImageWithoutUpload,
  StyleSheet,
  uuidv4,
  getOfferStatus,
  uploadPhotos
} from '../../../utils';
import MessageAlert from '../../../utils/message/MessageAlert';
import { updateUser } from '../../../store/actions/userAtions';
import updateMyQty from '../../../graphql/mutation/updateMyQty';
import PhotoView from '../../../componenets/Add/PhotoView';
const { width } = Dimensions.get('window');

class AddServiceScreen extends React.Component<any, any> {
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

  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  componentDidMount() {
    this.setState({
      branches: this.props.user.branches,
      selectedBranches: this.props.user.branches
    });
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

  showMessageModal = async () => {
    this.setState({ isMessageVisible: true });
  };
  hideMessageModal = () => {
    this.setState({ isMessageVisible: false });
  };
  onMessageModalHide = () => {
    this.props.navigation.navigate('HomeScreen');
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

  hendleSelectedImage = (selectedImage: any) => {
    this.setState({ selectedImage });
  };

  getCurrentLocation = (location: any) => {
    this.setState({ location });
  };

  updateProgressBar = (value: any) => {
    this.setState({ bar: this.state.bar + value });
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

  returnData = (imgs: any) => {
    const stateImages = this.state.images;
    const images = [...stateImages, ...imgs];
    this.setState({ images });
  };
  updateImagesList = (images: any) => {
    this.setState({ images });
  };

  handleSubmit = async (values: any, bag: any) => {
    const { title, body, startend, phone } = values;
    const { name, about, avatar } = this.props.user;
    const selectedBranches: any = this.state.selectedBranches;
    const groupId = uuidv4();
    const isrtl = isArabic(title);

    let photos: any;
    if (this.state.images.length > 0) {
      photos = await uploadPhotos(
        this.state.images,
        this.state.selectedImage,
        this.updateProgressBar
      );
    }

    const start = new Date(Object.keys(startend.name[0])[0]);
    const end = new Date(
      Object.keys(startend.name[startend.name.length - 1])[0]
    );
    const status = getOfferStatus({ start, end });

    this.updateProgressBar(1 / 3);
    if (selectedBranches.length === 0) {
      bag.setErrors({ title: 'you should select branch' });
      return;
    }
    selectedBranches.map(async (branch: any) => {
      const res = await this.props.addClassifiedMutation({
        variables: {
          title,
          body,
          photos,
          isoffer: true,
          isfront: true,
          isrtl,
          start,
          end,
          status,
          groupId,
          userName: name,
          userAvatar: avatar,
          userAbout: about,
          branch: branch.name,
          trueLocation: {
            lat: branch.location.lat,
            lon: branch.location.lon
          },
          phone
        }
      });

      if (res.data.createPost.ok) {
        this.updateProgressBar(1 / 3);
        this.updateProgressBar(1 / 3);
      }
      if (!res.data.createPost.ok) {
        bag.setErrors({ title: res.data.createPost.error });
      }
    });
    this.updateItemsQty();
    bag.setSubmitting(false);
  };
  render() {
    const word = this.props.words;
    const { isRTL } = this.props;
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
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          <View style={styles.container}>
            <Formik
              initialValues={{
                title: '',
                body: '',
                startend: '',
                phone: this.props.user.phone
                  ? getPureNumber(this.props.user.phone)
                  : '',
                photos: ''
              }}
              onSubmit={this.handleSubmit}
              validationSchema={Yup.object().shape({
                title: Yup.string()
                  .max(100)
                  .required('Required'),
                body: Yup.string()
                  .max(1000)
                  .required('Required'),
                startend: Yup.object().required('Required'),
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
                    width={width}
                    word={word}
                    isRTL={isRTL}
                    images={this.state.images}
                    selectedImage={this.state.selectedImage}
                    returnData={this.returnData}
                    album={true}
                    qty={30}
                    updateImagesList={this.updateImagesList}
                    hendleSelectedImage={this.hendleSelectedImage}
                  />
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginHorizontal: 30
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
                    <View style={{ flexDirection: 'column' }}>
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
                      this.state.selectedBranches.length === 0
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
  service: state.glob.language.service,
  lang: state.glob.languageName,
  isRTL: state.glob.isRTL,
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
      })(AddServiceScreen)
    )
  )
);

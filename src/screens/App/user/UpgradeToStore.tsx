import * as React from 'react';
import {
  View,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Text
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import * as Progress from 'react-native-progress';
import { StyleSheet, UserLocation, Message, pickImage } from '../../../utils';
import upgradeToStore from '../../../graphql/mutation/upgradeToStore';
import { Ionicons } from '@expo/vector-icons';
import { updateUser } from '../../../store/actions/userAtions';
import { addPermission } from '../../../store/actions/globActions';
import { Input, Button, Group, CheckBox, Title } from '../../../lib';
import { Permissions } from 'expo';
import { Avatar } from '../../../componenets';
import { bindActionCreators } from 'redux';
const { width } = Dimensions.get('window');

class UpgradeToStore extends React.Component<any, any> {
  state = {
    selectedImage: null,
    isShowMessage: false,
    location: null,
    avatar: null,
    headerPhoto: null,
    bar: 0
  };

  onheaderPhotoUpload = async () => {
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
    this.props.addPermission('CAMERA_ROLL');
    const headerPhoto = await pickImage(false, 1080, 0.8);

    if (headerPhoto) {
      this.setState({ headerPhoto });
    }
  };
  onAvatarUpload = async () => {
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
    this.props.addPermission('CAMERA_ROLL');
    const avatar = await pickImage(false, 1080, 0.8);
    if (avatar) {
      this.setState({ avatar });
    }
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

  handleSubmit = async (values: any, bag: any) => {
    const {
      name,
      email,
      website,
      about,
      color,
      tel,
      fax,
      mob,
      location
    } = values;
    const loc: any = location ? this.state.location : null;
    let trueLocation = null;
    if (loc) {
      trueLocation = {
        lat: loc.coords.latitude,
        lon: loc.coords.longitude
      };
    }
    const { avatar, headerPhoto } = this.state;
    this.updateProgressBar(1 / 3);
    const res = await this.props.upgradeToStore({
      variables: {
        name,
        email,
        website,
        about,
        avatar: avatar ? avatar : undefined,
        headerPhoto: headerPhoto ? headerPhoto : undefined,
        color,
        tel,
        fax,
        mob,
        location: trueLocation
      }
    });

    if (res.data.upgradeToStore.ok) {
      this.updateProgressBar(1 / 3);
      const { data } = res.data.upgradeToStore;
      await this.props.updateUser(data);
      this.updateProgressBar(1 / 3);
      this.showMessage({ seconds: 2, screen: 'HomeScreen' });
    }
    if (!res.data.upgradeToStore.ok) {
      bag.setErrors({ name: res.data.upgradeToStore.error });
    }
    bag.setSubmitting(false);
  };
  render() {
    console.log(this.state);

    const word = this.props.words;
    const { user, isRTL } = this.props;
    const uri = this.state.headerPhoto
      ? `http://res.cloudinary.com/arflon/image/upload/w_${500}/${
          this.state.headerPhoto
        }`
      : `http://res.cloudinary.com/arflon/image/upload/w_${500}/${
          user.headerPhoto
        }`;
    const avataruri = this.state.avatar
      ? `http://res.cloudinary.com/arflon/image/upload/w_${100}/${
          this.state.avatar
        }`
      : `http://res.cloudinary.com/arflon/image/upload/w_${100}/${user.avatar}`;

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
                name: '',
                email: '',
                website: '',
                about: '',
                color: '',
                tel: '',
                fax: '',
                mob: '',
                location: false
              }}
              onSubmit={this.handleSubmit}
              validationSchema={Yup.object().shape({
                name: Yup.string()
                  .max(100)
                  .required(word.nameisrequire),
                email: Yup.string()
                  .email('Not valid email')
                  .required(word.emailisrequired)
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
                  <Title width={width - 40}>{word.apdateaccount}</Title>
                  <View style={[styles.container, { zIndex: 10 }]}>
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        right: isRTL ? undefined : 20,
                        left: isRTL ? 20 : undefined,
                        top: 140,
                        zIndex: 200
                      }}
                      onPress={this.onAvatarUpload}
                    >
                      {!user.avatar && !this.state.avatar && (
                        <Avatar
                          name={user.name ? user.name : user.uniquename}
                          size={80}
                        />
                      )}
                      <Image
                        style={{
                          height: 80,
                          width: 80,
                          borderRadius: 40
                        }}
                        source={{ uri: avataruri }}
                      />
                    </TouchableOpacity>
                    {!user.headerPhoto && !this.state.headerPhoto && (
                      <TouchableWithoutFeedback
                        onPress={this.onheaderPhotoUpload}
                      >
                        <View
                          style={{
                            width,
                            height: 175,
                            backgroundColor: '#6FA7D5'
                          }}
                        />
                      </TouchableWithoutFeedback>
                    )}
                    {user.headerPhoto ||
                      (this.state.headerPhoto && (
                        <TouchableWithoutFeedback
                          onPress={this.onheaderPhotoUpload}
                        >
                          <Image
                            source={{ uri }}
                            style={{
                              flex: 1,
                              width,
                              height: 175,
                              resizeMode: 'cover'
                            }}
                          />
                        </TouchableWithoutFeedback>
                      ))}
                    <View style={{ position: 'absolute', left: 20, top: 40 }}>
                      <TouchableOpacity
                        onPress={() => this.props.navigation.goBack()}
                      >
                        <Ionicons
                          name="ios-arrow-back"
                          size={33}
                          style={{ padding: 10 }}
                          color="#fff"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Input
                    rtl={isRTL}
                    name="name"
                    label={word.name}
                    value={values.name}
                    onChange={setFieldValue}
                    onTouch={setFieldTouched}
                    outerStyle={styles.outerStyle}
                    innerStyle={styles.innerStyle}
                    labelStyle={styles.labelStyle}
                    error={touched.name && errors.name}
                    autoCapitalize="none"
                    autoCorrect={false}
                    height={40}
                  />
                  <Input
                    rtl={isRTL}
                    name="email"
                    label={word.email}
                    value={values.email}
                    onChange={setFieldValue}
                    onTouch={setFieldTouched}
                    outerStyle={styles.outerStyle}
                    innerStyle={styles.innerStyle}
                    labelStyle={styles.labelStyle}
                    error={touched.email && errors.email}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    autoCorrect={false}
                    height={40}
                  />
                  <Input
                    rtl={isRTL}
                    name="website"
                    label={word.website}
                    value={values.website}
                    onChange={setFieldValue}
                    onTouch={setFieldTouched}
                    outerStyle={styles.outerStyle}
                    innerStyle={styles.innerStyle}
                    labelStyle={styles.labelStyle}
                    error={touched.website && errors.website}
                    autoCapitalize="none"
                    autoCorrect={false}
                    height={40}
                  />

                  <Input
                    rtl={isRTL}
                    name="about"
                    label={word.about}
                    value={values.about}
                    onChange={setFieldValue}
                    onTouch={setFieldTouched}
                    outerStyle={styles.outerStyle}
                    innerStyle={styles.innerStyle}
                    labelStyle={styles.labelStyle}
                    error={touched.about && errors.about}
                    autoCapitalize="none"
                    autoCorrect={false}
                    multiline={true}
                    height={100}
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
                    name="tel"
                    label={word.tel}
                    value={values.tel}
                    onChange={setFieldValue}
                    onTouch={setFieldTouched}
                    outerStyle={styles.outerStyle}
                    innerStyle={styles.innerStyle}
                    labelStyle={styles.labelStyle}
                    error={touched.tel && errors.tel}
                    keyboardType="number-pad"
                    height={40}
                  />
                  <Input
                    rtl={isRTL}
                    num
                    name="fax"
                    label={word.fax}
                    value={values.fax}
                    onChange={setFieldValue}
                    onTouch={setFieldTouched}
                    outerStyle={styles.outerStyle}
                    innerStyle={styles.innerStyle}
                    labelStyle={styles.labelStyle}
                    error={touched.fax && errors.fax}
                    keyboardType="number-pad"
                    height={40}
                  />
                  <Input
                    rtl={isRTL}
                    num
                    name="mob"
                    label={word.mob}
                    value={values.mob}
                    onChange={setFieldValue}
                    onTouch={setFieldTouched}
                    outerStyle={styles.outerStyle}
                    innerStyle={styles.innerStyle}
                    labelStyle={styles.labelStyle}
                    error={touched.mob && errors.mob}
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
                      width={width}
                    />
                  )}
                  <Button
                    isRTL={isRTL}
                    background="#272727"
                    style={styles.btnStyle}
                    textStyle={styles.btnTextStyle}
                    title={word.save}
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
  isRTL: state.glob.isRTL,
  lang: state.glob.languageName,
  words: state.glob.language.words,
  kind: state.glob.language.kind,
  user: state.user.user
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      updateUser,
      addPermission
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  graphql(upgradeToStore, {
    name: 'upgradeToStore',
    options: { refetchQueries: ['getTimeLine'] }
  })(UpgradeToStore)
);

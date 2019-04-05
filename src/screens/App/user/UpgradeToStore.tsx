import { Formik } from 'formik';
import * as React from 'react';
import { graphql } from 'react-apollo';
import {
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native';
import * as Progress from 'react-native-progress';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Yup from 'yup';
import { AvatarCircle } from '../../../componenets';
import LoadingTiny from '../../../componenets/Common/LoadingTiny';
import { colors } from '../../../constants';
import upgradeToStore from '../../../graphql/mutation/upgradeToStore';
import { Button, CheckBox, Group, Input } from '../../../lib';
import { addPermission } from '../../../store/actions/globActions';
import { updateUser } from '../../../store/actions/userAtions';
import {
  ColorPicker,
  getCameraRollPermission,
  Message,
  pickImageWithoutUpload,
  StyleSheet,
  uploadPickedImage,
  UserLocation
} from '../../../utils';
const { width } = Dimensions.get('window');

class UpgradeToStore extends React.Component<any, any> {
  state = {
    selectedImage: null,
    isShowMessage: false,
    location: null,
    avatar: null,
    bar: 0
  };

  onAvatarUpload = async () => {
    const getCameraRoll = await getCameraRollPermission();
    if (getCameraRoll) {
      const avatar = await pickImageWithoutUpload(true);

      if (avatar) {
        this.setState({ avatar });
      }
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
        this.props.navigation.navigate(screen, { user: this.props.user });
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
      about,
      color,
      email,
      website,
      addressCountry,
      addressCity,
      tel,
      fax,
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
    const avatar = this.state.avatar
      ? await uploadPickedImage(this.state.avatar, 400, 0.8, false)
      : null;
    this.updateProgressBar(1 / 3);
    const res = await this.props.upgradeToStore({
      variables: {
        name,
        about,
        avatar: avatar ? avatar : undefined,
        color,
        email,
        website,
        addressCountry,
        addressCity,
        tel,
        fax,
        location: trueLocation
      }
    });

    if (res.data.upgradeToStore.ok) {
      this.updateProgressBar(2 / 3);
      const { data } = res.data.upgradeToStore;
      await this.props.updateUser(data);
      this.updateProgressBar(3 / 3);
      this.showMessage({ seconds: 1, screen: 'HomeScreen' });
    }
    if (!res.data.upgradeToStore.ok) {
      bag.setErrors({ name: res.data.upgradeToStore.error });
    }
    bag.setSubmitting(false);
  };
  render() {
    const word = this.props.words;
    const { user, isRTL } = this.props;
    const avatar: any = this.state.avatar;

    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <Message
          isVisible={this.state.isShowMessage}
          title={word.accountupdated}
          icon="ios-checkmark-circle"
          isRTL={isRTL}
          width={width}
          height={100}
        />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={{ backgroundColor: '#eee' }}
        >
          <View style={styles.container}>
            <Formik
              initialValues={{
                name: user.name,
                about: user.about,
                color: user.color,
                email: user.email,
                website: user.website,
                addressCountry: user.addressCountry,
                addressCity: user.addressCity,
                tel: user.tel,
                fax: user.fax,
                mob: user.mob,
                location: false
              }}
              onSubmit={this.handleSubmit}
              validationSchema={Yup.object().shape({
                name: Yup.string()
                  .max(100)
                  .required(word.isrequire),
                about: Yup.string()
                  .max(1000)
                  .required(word.isrequire),
                email: Yup.string()
                  .email('Not valid email')
                  .required(word.isrequire),
                addressCountry: Yup.string()
                  .max(50)
                  .required(word.isrequire),
                addressCity: Yup.string()
                  .max(50)
                  .required(word.isrequire),
                tel: Yup.string()
                  .max(50)
                  .required(word.isrequire),
                fax: Yup.string()
                  .max(50)
                  .required(word.isrequire)
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
                  <View>
                    <TouchableOpacity
                      style={{
                        padding: 20
                      }}
                      onPress={this.onAvatarUpload}
                    >
                      <AvatarCircle
                        user={user}
                        size={100}
                        image={avatar ? avatar : null}
                      />
                    </TouchableOpacity>
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
                    name="addressCountry"
                    label={word.country}
                    value={values.addressCountry}
                    onChange={setFieldValue}
                    onTouch={setFieldTouched}
                    outerStyle={styles.outerStyle}
                    innerStyle={styles.innerStyle}
                    labelStyle={styles.labelStyle}
                    error={touched.addressCountry && errors.addressCountry}
                    autoCapitalize="none"
                    autoCorrect={false}
                    height={40}
                  />
                  <Input
                    rtl={isRTL}
                    name="addressCity"
                    label={word.city}
                    value={values.addressCity}
                    onChange={setFieldValue}
                    onTouch={setFieldTouched}
                    outerStyle={styles.outerStyle}
                    innerStyle={styles.innerStyle}
                    labelStyle={styles.labelStyle}
                    error={touched.addressCity && errors.addressCity}
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
                    keyboardType="email-address"
                    autoCorrect={false}
                    height={40}
                  />

                  <Input
                    rtl={isRTL}
                    name="color"
                    color={values.color}
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
                  <ColorPicker
                    onChange={(color: any) => setFieldValue('color', color)}
                    defaultColor={values.color}
                    colors={colors}
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
                    background="#fff"
                    style={styles.btnStyle}
                    textStyle={styles.btnTextStyle}
                    title={word.save}
                    disabled={
                      !isValid ||
                      isSubmitting ||
                      (values.location && !this.state.location)
                    }
                    onPress={handleSubmit}
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
    fontSize: 18,
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

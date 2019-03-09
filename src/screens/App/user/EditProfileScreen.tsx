import { Ionicons } from '@expo/vector-icons';
import { Permissions } from 'expo';
import { Formik } from 'formik';
import * as React from 'react';
import { graphql } from 'react-apollo';
import {
  AsyncStorage,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Avatar } from '../../../componenets';
import updateProfile from '../../../graphql/mutation/updateProfile';
import { Button, Input } from '../../../lib';
import { addPermission } from '../../../store/actions/globActions';
import { updateUser } from '../../../store/actions/userAtions';
import { parseJwt, pickImage, StyleSheet } from '../../../utils';
const { width } = Dimensions.get('window');

class ProfileScreen extends React.Component<any, any> {
  static navigationOptions = {
    header: null
  };
  tokenData: any;

  async componentDidMount() {
    const token = await AsyncStorage.getItem('aysheetoken');
    this.tokenData = parseJwt(token);
  }

  onPhotoUpload = async () => {
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
    const headerPhoto = await pickImage(false, 960, 0.8);
    if (headerPhoto) {
      const res = await this.props.updateProfile({
        variables: {
          headerPhoto
        }
      });
      if (res.data.updateProfile.ok) {
        this.props.updateUser({ headerPhoto });
        return true;
      }
      if (!res.data.updateProfile.ok) {
        console.log('Error', res.data.updateProfile.error);
        return false;
      }
    }
  };

  handleSubmit = async (values: any, bag: any) => {
    const { name, about, addressCountry, addressCity, email, website } = values;
    const res = await this.props.updateProfile({
      variables: {
        name,
        about,
        addressCountry,
        addressCity,
        email,
        website
      }
    });

    if (res.data.updateProfile.ok) {
      this.props.updateUser({
        name,
        about,
        addressCountry,
        addressCity,
        email,
        website
      });
    }
    if (!res.data.updateProfile.ok) {
      bag.setErrors({ title: res.data.updateProfile.error });
    }
    bag.setSubmitting(false);
  };

  render() {
    const userData = this.props.user;
    const uri = `http://res.cloudinary.com/arflon/image/upload/w_${500}/${
      userData.headerPhoto
    }`;
    const avataruri = userData.avatar
      ? `http://res.cloudinary.com/arflon/image/upload/w_${100}/${
          userData.avatar
        }`
      : 'https://res.cloudinary.com/arflon/image/upload/v1541759172/logo_q1vzrp.png';
    const { words, isRTL } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <View style={[styles.container, { zIndex: 10 }]}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: isRTL ? undefined : 20,
              left: isRTL ? 20 : undefined,
              top: 140,
              zIndex: 200
            }}
            onPress={async () => {
              const permissions = Permissions.CAMERA_ROLL;
              const { status: existingStatus } = await Permissions.getAsync(
                permissions
              );
              let finalStatus = existingStatus;
              if (finalStatus !== 'granted') {
                const { status } = await Permissions.askAsync(permissions);
                finalStatus = status;
              }
              if (finalStatus !== 'granted') {
                return;
              }
              this.props.addPermission('CAMERA_ROLL');
              const avatar = await pickImage(true, 400, 0.8);
              if (avatar) {
                const res = await this.props.updateProfile({
                  variables: {
                    avatar
                  }
                });
                if (res.data.updateProfile.ok) {
                  this.props.updateUser({ avatar });
                }
                if (!res.data.updateProfile.ok) {
                  console.log('Error', res.data.updateProfile.error);
                }
              }
            }}
          >
            {!userData.avatar && (
              <Avatar
                name={userData.name ? userData.name : userData.uniquename}
                size={80}
              />
            )}
            {userData.avatar && (
              <Image
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 40
                }}
                source={{ uri: avataruri }}
              />
            )}
          </TouchableOpacity>
          {!userData.headerPhoto && (
            <TouchableWithoutFeedback onPress={this.onPhotoUpload}>
              <View
                style={{ width, height: 175, backgroundColor: '#6FA7D5' }}
              />
            </TouchableWithoutFeedback>
          )}
          {userData.headerPhoto && (
            <TouchableWithoutFeedback onPress={this.onPhotoUpload}>
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
          )}
          <View style={{ position: 'absolute', left: 20, top: 40 }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Ionicons
                name="ios-arrow-back"
                size={33}
                style={{ padding: 10 }}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
          <View style={{ position: 'absolute', alignSelf: 'center', top: 75 }}>
            {!userData.name && (
              <Text
                style={{
                  fontFamily: 'cairo-regular',
                  color: '#fff',
                  fontSize: 22
                }}
              >
                + {userData.phone}
              </Text>
            )}
            {userData.name !== '' && (
              <Text
                style={{
                  fontFamily: 'cairo-regular',
                  color: '#fff',
                  fontSize: 22
                }}
              >
                {userData.name}
              </Text>
            )}
          </View>
        </View>
        <KeyboardAvoidingView behavior="padding" enabled>
          <ScrollView>
            <Formik
              initialValues={{
                name: userData.name,
                about: userData.about,
                addressCountry: userData.addressCountry,
                addressCity: userData.addressCity,
                email: userData.email,
                website: userData.website
              }}
              onSubmit={this.handleSubmit}
              render={({
                values,
                handleSubmit,
                setFieldValue,
                errors,
                touched,
                setFieldTouched,
                isSubmitting
              }: any) => (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 40
                  }}
                >
                  <Input
                    rtl={isRTL}
                    name="name"
                    label={words.name}
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
                    label={words.about}
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
                    label={words.country}
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
                    label={words.city}
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
                    label={words.email}
                    value={values.email}
                    onChange={setFieldValue}
                    onTouch={setFieldTouched}
                    outerStyle={styles.outerStyle}
                    innerStyle={styles.innerStyle}
                    labelStyle={styles.labelStyle}
                    error={touched.email && errors.email}
                    autoCapitalize="none"
                    autoCorrect={false}
                    height={40}
                  />
                  <Input
                    rtl={isRTL}
                    name="website"
                    label={words.website}
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

                  <Button
                    isRTL={isRTL}
                    background="#272727"
                    style={styles.btnStyle}
                    textStyle={styles.btnTextStyle}
                    title={words.save}
                    onPress={handleSubmit}
                    disabled={isSubmitting}
                    loading={isSubmitting}
                  />
                </View>
              )}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      updateUser,
      addPermission
    },
    dispatch
  );

const mapStateToProps = (state: any) => ({
  isRTL: state.glob.isRTL,
  isAuthenticated: state.user.isAuthenticated,
  user: state.user.user,
  words: state.glob.language.words
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  graphql(updateProfile, {
    name: 'updateProfile'
  })(ProfileScreen)
);

const styles = StyleSheet.create({
  container: {
    height: 175,
    width,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
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
    borderRadius: 5,
    zIndex: 1
  },
  labelStyle: {
    color: '#6FA7D5',
    fontSize: 18,
    padding: 5
  },
  btnStyle: {
    marginTop: 30,
    height: 40,
    width: 120,
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

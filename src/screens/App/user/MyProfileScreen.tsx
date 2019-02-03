import * as React from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  AsyncStorage,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { graphql } from 'react-apollo';
import { Permissions } from 'expo';
import { StyleSheet, pickImage, parseJwt } from '../../../utils';
import addHeaderPhoto from '../../../graphql/mutation/addHeaderPhoto';
import updateProfile from '../../../graphql/mutation/updateProfile';
import addAvatar from '../../../graphql/mutation/addAvatar';
import { updateUser } from '../../../store/actions/userAtions';
import { Ionicons } from '@expo/vector-icons';
import { Input, Button } from '../../../lib';
import { Formik } from 'formik';
import { Avatar } from '../../../componenets';
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

    const headerPhoto = await pickImage(false, 960, 0.8);
    if (headerPhoto) {
      const res = await this.props.addHeaderPhoto({
        variables: {
          headerPhoto
        }
      });
      if (res.data.addHeaderPhoto.ok) {
        this.props.updateUser({ headerPhoto });
        return true;
      }
      if (!res.data.addHeaderPhoto.ok) {
        console.log('Error', res.data.addHeaderPhoto.error);
        return false;
      }
    }
  };

  handleSubmit = async (values: any, bag: any) => {
    const { name, about, country, city, email, website } = values;
    const res = await this.props.updateProfile({
      variables: {
        name,
        about,
        country,
        city,
        email,
        website
      }
    });

    if (res.data.updateProfile.ok) {
      this.props.updateUser({ name, about, country, city, email, website });
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
    const { lang, words } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <View style={[styles.container, { zIndex: 10 }]}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: lang === 'ar' ? undefined : 20,
              left: lang === 'ar' ? 20 : undefined,
              top: 140,
              zIndex: 200
            }}
            onPress={async () => {
              const avatar = await pickImage(true, 400, 0.8);
              if (avatar) {
                const res = await this.props.addAvatar({
                  variables: {
                    avatar
                  }
                });
                if (res.data.addAvatar.ok) {
                  this.props.updateUser({ avatar });
                }
                if (!res.data.addAvatar.ok) {
                  console.log('Error', res.data.addAvatar.error);
                }
              }
            }}
          >
            {!userData.avatar && <Avatar name={userData.name} />}
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
            {userData.name && (
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
                country: userData.country,
                city: userData.city,
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
                    rtl={lang === 'ar' ? true : false}
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
                    rtl={lang === 'ar' ? true : false}
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
                    rtl={lang === 'ar' ? true : false}
                    name="country"
                    label={words.country}
                    value={values.country}
                    onChange={setFieldValue}
                    onTouch={setFieldTouched}
                    outerStyle={styles.outerStyle}
                    innerStyle={styles.innerStyle}
                    labelStyle={styles.labelStyle}
                    error={touched.country && errors.country}
                    autoCapitalize="none"
                    autoCorrect={false}
                    height={40}
                  />
                  <Input
                    rtl={lang === 'ar' ? true : false}
                    name="city"
                    label={words.city}
                    value={values.city}
                    onChange={setFieldValue}
                    onTouch={setFieldTouched}
                    outerStyle={styles.outerStyle}
                    innerStyle={styles.innerStyle}
                    labelStyle={styles.labelStyle}
                    error={touched.city && errors.city}
                    autoCapitalize="none"
                    autoCorrect={false}
                    height={40}
                  />
                  <Input
                    rtl={lang === 'ar' ? true : false}
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
                    rtl={lang === 'ar' ? true : false}
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
                    lang={lang}
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
      updateUser
    },
    dispatch
  );

const mapStateToProps = (state: any) => ({
  lang: state.glob.languageName,
  isAuthenticated: state.user.isAuthenticated,
  user: state.user.user,
  words: state.glob.language.words
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  graphql(addHeaderPhoto, {
    name: 'addHeaderPhoto'
  })(
    graphql(updateProfile, {
      name: 'updateProfile'
    })(
      graphql(addAvatar, {
        name: 'addAvatar'
      })(ProfileScreen)
    )
  )
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

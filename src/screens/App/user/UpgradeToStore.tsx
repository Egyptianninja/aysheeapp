import { Formik } from 'formik';
import * as React from 'react';
import { graphql } from 'react-apollo';
import {
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  View,
  Text
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
  uploadPickedImage
} from '../../../utils';
import BranchesModal from '../../../componenets/ProfileScreen/BranchesModal';
const { width, height } = Dimensions.get('window');

class UpgradeToStore extends React.Component<any, any> {
  timer: any;
  state = {
    selectedImage: null,
    isShowMessage: false,
    isMapModalVisible: false,
    location: null,
    avatar: null,
    branches: [],
    bar: 0
  };

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

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
      this.timer = setTimeout(() => {
        this.setState({ isShowMessage: false });
      }, seconds * 1000);
    }
    if (seconds && screen) {
      this.timer = setTimeout(() => {
        this.setState({ isShowMessage: false });
        this.props.navigation.navigate(screen, { user: this.props.user });
      }, seconds * 1000);
    }
  };
  hideMessage = () => {
    this.setState({ isShowMessage: false });
  };
  showMapModal = async () => {
    this.setState({ isMapModalVisible: true });
  };
  hideMapModal = () => {
    this.setState({ isMapModalVisible: false });
  };

  getCurrentLocation = (location: any) => {
    this.setState({ location });
  };

  updateProgressBar = (value: any) => {
    this.setState({ bar: this.state.bar + value });
  };

  addLocations = (markers: any) => {
    const branches = markers.map((marker: any) => {
      return {
        name: marker.name,
        location: {
          lat: marker.coordinate.latitude,
          lon: marker.coordinate.longitude
        }
      };
    });
    this.setState({ branches });
  };

  handleSubmit = async (values: any, bag: any) => {
    const {
      name,
      about,
      color,
      website,
      addressEmail,
      addressCountry,
      addressCity,
      tel,
      fax,
      mob
    } = values;
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
        addressEmail,
        website,
        addressCountry,
        addressCity,
        tel,
        fax,
        mob,
        branches: this.state.branches
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
                name: user.name ? user.name : '',
                about: user.about ? user.about : '',
                color: user.color ? user.color : colors[0],
                website: user.website ? user.website : '',
                addressEmail: user.addressEmail
                  ? user.addressEmail
                  : user.email
                  ? user.email
                  : '',
                addressCountry: user.addressCountry ? user.addressCountry : '',
                addressCity: user.addressCity ? user.addressCity : '',
                tel: user.tel ? user.tel : '',
                fax: user.fax ? user.fax : '',
                mob: user.mob ? user.mob : ''
                // location: false,
                // branches: false
              }}
              onSubmit={this.handleSubmit}
              validationSchema={Yup.object().shape({
                name: Yup.string()
                  .max(100)
                  .required(word.isrequire),
                about: Yup.string()
                  .max(1000)
                  .required(word.isrequire),
                addressEmail: Yup.string()
                  .email('Not valid email')
                  .required(word.isrequire),
                addressCountry: Yup.string().max(50),
                addressCity: Yup.string().max(50),
                tel: Yup.string()
                  .max(50)
                  .required(word.isrequire),
                fax: Yup.string().max(50),
                mob: Yup.string().max(50),
                branches: Yup.boolean().oneOf([true], 'Must have main branch')
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
                    name="addressEmail"
                    label={word.email}
                    value={values.addressEmail}
                    onChange={setFieldValue}
                    onTouch={setFieldTouched}
                    outerStyle={styles.outerStyle}
                    innerStyle={styles.innerStyle}
                    labelStyle={styles.labelStyle}
                    error={touched.addressEmail && errors.addressEmail}
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
                    label={word.profilecolor}
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

                  <TouchableOpacity
                    onPress={() => this.setState({ isMapModalVisible: true })}
                    style={{
                      backgroundColor: '#fff',
                      padding: 10,
                      alignSelf: 'flex-start',
                      marginHorizontal: 35,
                      marginTop: 20,
                      borderRadius: 20,
                      borderColor: '#7678ED',
                      borderWidth: 1
                    }}
                  >
                    <Text style={{ color: '#7678ED' }}>Add Locations</Text>
                  </TouchableOpacity>
                  {this.state.isMapModalVisible && (
                    <BranchesModal
                      isMapModalVisible={this.state.isMapModalVisible}
                      getCurrentLocation={this.getCurrentLocation}
                      hideMapModal={this.hideMapModal}
                      addLocations={this.addLocations}
                      branches={this.state.branches}
                      width={width}
                      height={height}
                    />
                  )}
                  <View
                    style={{
                      flex: 1,
                      width: width - 70,
                      marginHorizontal: 35,
                      marginTop: 10
                    }}
                  >
                    {this.state.branches.map((branch: any) => (
                      <View
                        style={{
                          paddingHorizontal: 10,

                          paddingTop: 15,
                          paddingBottom: 5,
                          width: width - 70,
                          borderBottomColor: '#ddd',
                          borderBottomWidth: 1
                        }}
                        key={branch.name}
                      >
                        <Text
                          style={{
                            alignSelf: this.props.isRTL
                              ? 'flex-end'
                              : 'flex-start'
                          }}
                        >
                          {branch.name}
                        </Text>
                      </View>
                    ))}
                  </View>
                  <Button
                    isRTL={isRTL}
                    background="#fff"
                    style={styles.btnStyle}
                    textStyle={styles.btnTextStyle}
                    title={word.save}
                    disabled={
                      !isValid ||
                      isSubmitting ||
                      this.state.branches.length === 0
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
    name: 'upgradeToStore'
  })(UpgradeToStore)
);

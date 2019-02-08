import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StyleSheet
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import { getLocation } from '../../utils';
import { Button, InputPhone } from '../../lib';

const { width } = Dimensions.get('window');

export default class Menu extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isModalVisible: false,
      isEditModalVisible: false,
      isPriceModalVisible: false
    };
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };
  toggleEditModal = () => {
    this.setState({ isEditModalVisible: !this.state.isEditModalVisible });
  };
  togglePriceModal = () => {
    this.setState({ isPriceModalVisible: !this.state.isPriceModalVisible });
  };

  renderOptions = (data: any) => {
    return data.map((da: any) => {
      return (
        <Option
          key={da.id}
          toggleModal={this.toggleModal}
          toggleEditModal={this.toggleEditModal}
          togglePriceModal={this.togglePriceModal}
          width={width}
          itemData={da}
          {...this.props}
        />
      );
    });
  };

  handleSubmit = async (values: any, bag: any) => {
    const res = await this.props.editClassifieds({
      variables: {
        postId: this.props.post.id,
        phone: values.phone
      }
    });
    if (res.data.updatePost.ok) {
      this.toggleEditModal();
    }
    if (!res.data.updatePost.ok) {
      bag.setErrors({ title: res.data.updatePost.error });
    }
    bag.setSubmitting(false);
  };
  handlePriceSubmit = async (values: any, bag: any) => {
    const res = await this.props.editClassifieds({
      variables: {
        postId: this.props.post.id,
        price: Number(values.price)
      }
    });
    if (res.data.updatePost.ok) {
      this.togglePriceModal();
    }
    if (!res.data.updatePost.ok) {
      bag.setErrors({ title: res.data.updatePost.error });
    }
    bag.setSubmitting(false);
  };

  render() {
    const { isrtl, post, word, lang, offline } = this.props;
    return (
      <React.Fragment>
        <TouchableOpacity
          onPress={() => this.toggleModal()}
          style={{
            position: 'absolute',
            left: post.imageWidth - 40,
            paddingHorizontal: 5,
            paddingLeft: isrtl ? undefined : 15,
            paddingRight: isrtl ? 15 : undefined,
            zIndex: 100
          }}
        >
          <Ionicons name="md-more" size={26} color="#aaa" />
        </TouchableOpacity>

        <Modal
          isVisible={this.state.isModalVisible}
          onBackdropPress={() => this.setState({ isModalVisible: false })}
          backdropOpacity={0.2}
          useNativeDriver={true}
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
              height: 350,
              paddingTop: 10,
              width: width - 40,
              justifyContent: 'space-around',
              alignItems: 'center'
            }}
          >
            <ScrollView>
              {this.renderOptions(
                offline ? word.offlinepostmenu : word.postmenu
              )}
            </ScrollView>
          </View>
        </Modal>
        <Modal
          isVisible={this.state.isEditModalVisible}
          onBackdropPress={() => this.setState({ isEditModalVisible: false })}
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
              height: 350,
              paddingTop: 10,
              width: width - 40,
              justifyContent: 'space-around',
              alignItems: 'center'
            }}
          >
            <Formik
              initialValues={{
                phone: post.phone
              }}
              onSubmit={this.handleSubmit}
              validationSchema={Yup.object().shape({
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
                  <InputPhone
                    rtl={lang === 'ar' ? true : false}
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

                  <Button
                    lang={lang}
                    background="#272727"
                    style={styles.btnStyle}
                    textStyle={styles.btnTextStyle}
                    title={word.submit}
                    onPress={handleSubmit}
                    disabled={!isValid || isSubmitting}
                    loading={isSubmitting}
                  />
                </React.Fragment>
              )}
            />
          </View>
        </Modal>
        <Modal
          isVisible={this.state.isPriceModalVisible}
          onBackdropPress={() => this.setState({ isPriceModalVisible: false })}
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
              height: 350,
              paddingTop: 10,
              width: width - 40,
              justifyContent: 'space-around',
              alignItems: 'center'
            }}
          >
            <Formik
              initialValues={{
                price: post.price ? post.price.toString() : ''
              }}
              onSubmit={this.handlePriceSubmit}
              validationSchema={Yup.object().shape({
                price: Yup.number()
                  .positive('price must be number')
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
                  <InputPhone
                    rtl={lang === 'ar' ? true : false}
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

                  <Button
                    lang={lang}
                    background="#272727"
                    style={styles.btnStyle}
                    textStyle={styles.btnTextStyle}
                    title={word.submit}
                    onPress={handleSubmit}
                    disabled={!isValid || isSubmitting}
                    loading={isSubmitting}
                  />
                </React.Fragment>
              )}
            />
          </View>
        </Modal>
      </React.Fragment>
    );
  }
}

const Option = ({
  itemData,
  toggleModal,
  toggleEditModal,
  togglePriceModal,
  lang,
  editClassifieds,
  post,
  deletePost
}: any) => {
  return (
    <TouchableOpacity
      onPress={async () => {
        if (itemData.id === 1) {
          if (post.updates) {
            editClassifieds({
              variables: {
                postId: post.id,
                updates: post.updates + 1
              }
            });
          } else {
            editClassifieds({
              variables: {
                postId: post.id,
                updates: 1
              }
            });
          }

          toggleModal();
        } else if (itemData.id === 2) {
          editClassifieds({
            variables: {
              postId: post.id,
              islive: !post.islive
            }
          });
          toggleModal();
        } else if (itemData.id === 3) {
          const location: any = await getLocation();
          const trueLocation = {
            lat: location.coords.latitude.toFixed(6),
            lon: location.coords.longitude.toFixed(6)
          };
          editClassifieds({
            variables: {
              postId: post.id,
              trueLocation
            }
          });
          toggleModal();
        } else if (itemData.id === 4) {
          toggleModal();
          setTimeout(() => {
            toggleEditModal();
          }, 500);
        } else if (itemData.id === 5) {
          toggleModal();
          setTimeout(() => {
            togglePriceModal();
          }, 500);
        } else if (itemData.id === 6) {
          deletePost({
            variables: {
              postId: post.id
            }
          });
          toggleModal();
        }
      }}
      style={{
        flex: 1,
        width: width - 80,
        padding: 3,
        margin: 7,
        backgroundColor: '#eee',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontFamily: 'cairo-regular',
          textAlign: lang === 'ar' ? 'right' : 'left',
          paddingHorizontal: 10
        }}
      >
        {itemData.name}
      </Text>
    </TouchableOpacity>
  );
};

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

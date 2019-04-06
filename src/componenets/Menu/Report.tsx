import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import Modal from 'react-native-modal';
import * as Yup from 'yup';
import { Button, Group, Input, RadioButton } from '../../lib';

const { width } = Dimensions.get('window');

class Report extends React.Component<any, any> {
  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (nextProps.isReportModalVisible !== prevState.isReportModalVisible) {
      return { isReportModalVisible: nextProps.isReportModalVisible };
    } else {
      return { ...prevState };
    }
  }
  constructor(props: any) {
    super(props);
    this.state = {
      isReportModalVisible: false
    };
  }

  repostMessageShow = () => {
    this.props.showMessageModal({
      seconds: 1,
      message: this.props.word.successadded
    });
  };

  handleSubmit = async (values: any, bag: any) => {
    const { spam, fake, content, other, body } = values;

    const data = spam
      ? 'Spam'
      : fake
      ? 'Fake content'
      : content
      ? 'Violence or harmful'
      : other
      ? body
      : body;

    const res = await this.props.createReport({
      variables: {
        postId: this.props.post.id,
        postOwnerId: this.props.post.userId,
        body: data
      }
    });
    if (res.data.createReport.ok) {
      this.props.hideReportModal();
    }
    if (!res.data.createReport.ok) {
      bag.setErrors({ title: res.data.createReport.error });
      this.props.hideReportModal();
    }
    bag.setSubmitting(false);
  };

  render() {
    const { word, isRTL } = this.props;
    return (
      <Modal
        isVisible={this.state.isReportModalVisible}
        onBackdropPress={() => this.props.hideReportModal()}
        onBackButtonPress={() => this.props.hideReportModal()}
        onModalHide={() => this.repostMessageShow()}
        backdropOpacity={0.2}
        useNativeDriver={true}
        animationIn="slideInDown"
        animationOut="slideOutUp"
        hideModalContentWhileAnimating={true}
        style={{ margin: 0 }}
      >
        <View
          style={{
            backgroundColor: '#eee',
            borderRadius: 10,
            position: 'absolute',
            top: 0,
            margin: 0,
            height: 500,
            paddingTop: 30,
            width,
            justifyContent: 'space-around',
            alignItems: 'center'
          }}
        >
          <ScrollView>
            <Formik
              initialValues={{
                body: '',
                spam: false,
                fake: false,
                content: false,
                other: false
              }}
              onSubmit={this.handleSubmit}
              validationSchema={Yup.object().shape({
                body: Yup.string().max(200)
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
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <TouchableOpacity
                    onPress={() => this.props.hideReportModal()}
                    style={{
                      position: 'absolute',
                      right: isRTL ? undefined : -20,
                      left: isRTL ? 20 : undefined,
                      top: 10,
                      alignItems: 'center',
                      paddingVertical: 7,
                      paddingLeft: 5,
                      paddingRight: 20,
                      zIndex: 120
                    }}
                  >
                    <View
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 16,
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <Ionicons
                        name="ios-close-circle"
                        size={30}
                        color="#636363"
                      />
                    </View>
                  </TouchableOpacity>

                  <Group
                    color="#444"
                    size={24}
                    onChange={setFieldValue}
                    rtl={isRTL}
                    column={true}
                  >
                    <RadioButton
                      name="spam"
                      label={word.spam}
                      value={values.spam}
                      selected={values.spam}
                    />
                    <RadioButton
                      name="fake"
                      label={word.fake}
                      value={values.fake}
                      selected={values.fake}
                    />
                    <RadioButton
                      name="content"
                      label={word.content}
                      value={values.content}
                      selected={values.content}
                    />
                    <RadioButton
                      name="other"
                      label={word.other}
                      value={values.other}
                      selected={values.other}
                    />
                  </Group>
                  <Input
                    rtl={isRTL}
                    name="body"
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

                  <Button
                    isRTL={isRTL}
                    background="#fff"
                    style={styles.btnStyle}
                    textStyle={styles.btnTextStyle}
                    title={word.submit}
                    onPress={handleSubmit}
                    disabled={!isValid || isSubmitting}
                    loading={isSubmitting}
                  />
                </View>
              )}
            />
          </ScrollView>
        </View>
      </Modal>
    );
  }
}

export default Report;

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
    width: width - 100,

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

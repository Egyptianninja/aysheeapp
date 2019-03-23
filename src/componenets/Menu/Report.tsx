import { Formik } from 'formik';
import * as React from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import * as Yup from 'yup';
import { Button, Input, Group, RadioButton } from '../../lib';

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
      setTimeout(() => {
        this.props.showMessageModal({
          seconds: 1,
          message: this.props.word.successadded
        });
      }, 1000);
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
            height: 500,
            paddingTop: 10,
            width: width - 40,
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
                  <Group
                    color="#444"
                    size={24}
                    onChange={setFieldValue}
                    rtl={isRTL}
                    column={true}
                  >
                    <RadioButton
                      name="spam"
                      label="Spam"
                      value={values.spam}
                      selected={values.spam}
                    />
                    <RadioButton
                      name="fake"
                      label="Fake content"
                      value={values.fake}
                      selected={values.fake}
                    />
                    <RadioButton
                      name="content"
                      label="Violence or harmful"
                      value={values.content}
                      selected={values.content}
                    />
                    <RadioButton
                      name="other"
                      label="Other"
                      value={values.other}
                      selected={values.other}
                    />
                  </Group>
                  <Input
                    rtl={isRTL}
                    name="body"
                    // label="Other"
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
                    background="#7678ED"
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
    width: width - 80,
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

import * as React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Modal from 'react-native-modal';
import { Button, InputPhone } from '../../lib';

const { width } = Dimensions.get('window');

export default class Report extends React.Component<any, any> {
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
    this.props.hideReportModal();
    // const res = await this.props.editClassifieds({
    //   variables: {
    //     postId: this.props.post.id,
    //     phone: values.phone
    //   }
    // });
    // if (res.data.updatePost.ok) {
    //   this.toggleReportModal();
    // }
    // if (!res.data.updatePost.ok) {
    //   bag.setErrors({ title: res.data.updatePost.error });
    // }
    // bag.setSubmitting(false);
  };

  render() {
    const { word, lang } = this.props;
    return (
      <Modal
        isVisible={this.state.isReportModalVisible}
        onBackdropPress={() => this.props.hideReportModal()}
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
          <Formik
            initialValues={{
              body: ''
            }}
            onSubmit={this.handleSubmit}
            validationSchema={Yup.object().shape({
              body: Yup.string()
                .max(200)
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

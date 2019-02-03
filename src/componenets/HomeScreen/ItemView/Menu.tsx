import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StyleSheet
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import { Button, InputPhone } from "../../../lib";
import { onShare } from "../../../utils";

const { width } = Dimensions.get("window");

export default class Menu extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isModalVisible: false,
      isReportModalVisible: false
    };
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };
  toggleReportModal = () => {
    this.setState({ isReportModalVisible: !this.state.isReportModalVisible });
  };

  renderOptions = (data: any) => {
    return data.map((da: any) => {
      return (
        <Option
          key={da.id}
          toggleModal={this.toggleModal}
          toggleReportModal={this.toggleReportModal}
          favoritePost={this.props.favoritePost}
          width={width}
          itemData={da}
          {...this.props}
        />
      );
    });
  };

  handleSubmit = async (values: any, bag: any) => {
    this.toggleReportModal();
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
    const { isrtl, post, word, lang } = this.props;
    return (
      <React.Fragment>
        <TouchableOpacity
          onPress={() => this.toggleModal()}
          style={{
            position: "absolute",
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
              backgroundColor: "#fff",
              borderRadius: 10,
              position: "absolute",
              bottom: 0,
              margin: 0,
              height: 350,
              paddingTop: 10,
              width: width - 40,
              justifyContent: "space-around",
              alignItems: "center"
            }}
          >
            <ScrollView>{this.renderOptions(word.itemmenu)}</ScrollView>
          </View>
        </Modal>
        <Modal
          isVisible={this.state.isReportModalVisible}
          onBackdropPress={() => this.setState({ isReportModalVisible: false })}
          backdropOpacity={0.2}
          useNativeDriver={true}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          hideModalContentWhileAnimating={true}
          style={{ flex: 1 }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 10,
              position: "absolute",
              bottom: 0,
              margin: 0,
              height: 350,
              paddingTop: 10,
              width: width - 40,
              justifyContent: "space-around",
              alignItems: "center"
            }}
          >
            <Formik
              initialValues={{
                body: ""
              }}
              onSubmit={this.handleSubmit}
              validationSchema={Yup.object().shape({
                body: Yup.string()
                  .max(200)
                  .required("Required")
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
                    rtl={lang === "ar" ? true : false}
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
      </React.Fragment>
    );
  }
}

const Option = ({
  itemData,
  toggleModal,
  toggleReportModal,
  lang,
  favoritePost,
  post
}: any) => {
  return (
    <TouchableOpacity
      onPress={async () => {
        if (itemData.id === 1) {
          favoritePost({
            variables: { postId: post.id }
          });
          toggleModal();
        } else if (itemData.id === 2) {
          const message = `
          ${post.title}

          ${post.body}

          ${post.price}`;
          onShare(message, toggleModal);
        } else if (itemData.id === 3) {
          toggleModal();
          setTimeout(() => {
            toggleReportModal();
          }, 500);
        }
      }}
      style={{
        flex: 1,
        width: width - 80,
        padding: 3,
        margin: 7,
        backgroundColor: "#eee",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontFamily: "cairo-regular",
          textAlign: lang === "ar" ? "right" : "left",
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    marginTop: 20,
    width: "100%"
  },
  outerStyle: {
    flex: 1,
    justifyContent: "space-between",
    marginVertical: 5
  },
  innerStyle: {
    width: width - 40,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    writingDirection: "auto",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
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
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    borderRadius: 5
  },
  btnTextStyle: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "cairo-regular"
  }
});

import * as React from "react";
import {
  View,
  Keyboard,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Text
} from "react-native";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import { Formik } from "formik";
import * as Yup from "yup";
import { StyleSheet } from "../../utils";
import { Button, InputName } from "../../lib";
import addUniqueName from "../../graphql/mutation/addUniqueName";
import isUniqueName from "../../graphql/mutation/isUniqueName";

const { width } = Dimensions.get("window");

class NameScreen extends React.Component<any, any> {
  static navigationOptions = { header: null };

  state = {
    name: null,
    valid: true,
    loading: false
  };

  componentDidMount() {
    if (this.props.phone) {
      const name = this.props.navigation.getParam("name");
      this.setState({ name });
    }
  }

  handleNameSubmit = async (values: any, bag: any) => {
    if (!this.state.valid) {
      bag.setErrors({ name: this.props.words.namenotvalid });
      return;
    }
    try {
      const res = await this.props.addUniqueName({
        variables: {
          uniquename: this.state.name
        }
      });
      if (res.data.addUniqueName.ok) {
        this.props.navigation.navigate("App");
      } else {
        bag.setErrors({ name: res.data.addUniqueName.error });
      }
      bag.setSubmitting(false);
    } catch (error) {
      bag.setErrors(error);
    }
  };

  handleUniqueName = async (name: string) => {
    this.setState({ loading: true });
    if (name !== "") {
      const isUnique = await this.props.isUniqueName({
        variables: { name }
      });
      if (
        isUnique &&
        isUnique.data.isUniqueName &&
        name.length > 5 &&
        name.length < 25 &&
        /^[a-z0-9\-\_]+$/.test(name)
      ) {
        this.setState({ name, valid: true, loading: false });
      } else {
        this.setState({ name, valid: false, loading: false });
      }
    }
  };

  setLoading = () => {
    this.setState({ loading: true });
  };

  render() {
    const { lang, words } = this.props;
    const name = this.props.navigation.getParam("name");

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <KeyboardAvoidingView
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
            behavior="padding"
            enabled
          >
            <Formik
              initialValues={{
                name
              }}
              onSubmit={this.handleNameSubmit}
              validationSchema={Yup.object().shape({
                name: Yup.string()
                  .min(4, words.min4)
                  .max(25, words.max25)
                  .required(words.nameisrequire)
              })}
              render={({
                values,
                handleSubmit,
                setFieldValue,
                errors,
                touched,
                setFieldTouched,
                isSubmitting
              }: any) => (
                <React.Fragment>
                  <View>
                    <InputName
                      rtl={lang === "ar" ? true : false}
                      name="name"
                      label={words.uniquename}
                      value={values.name}
                      handleUniqueName={this.handleUniqueName}
                      setLoading={this.setLoading}
                      onChange={setFieldValue}
                      onTouch={setFieldTouched}
                      outerStyle={styles.outerStyle}
                      innerStyle={styles.innerStyle}
                      labelStyle={styles.labelStyle}
                      valid={this.state.valid}
                      loading={this.state.loading}
                      error={touched.name && errors.name}
                      autoCapitalize="none"
                      autoCorrect={false}
                      height={40}
                    />
                  </View>
                  <View
                    style={{
                      height: 20,
                      justifyContent: "center",
                      alignItems: "flex-start"
                    }}
                  >
                    <Text style={{ fontSize: 12, color: "#999" }}>
                      {words.validnamemessage}
                    </Text>
                  </View>
                  <View style={{ height: 20 }} />
                  <Button
                    background="#272727"
                    style={styles.btnStyle}
                    textStyle={styles.btnTextStyle}
                    title={words.continue}
                    onPress={handleSubmit}
                    loading={isSubmitting}
                  />
                </React.Fragment>
              )}
            />
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

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
    justifyContent: "flex-start"
    // marginVertical: 5
  },
  innerStyle: {
    width: width - 80,
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
    padding: 5,
    marginVertical: 15
  },
  btnStyle: {
    height: 40,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    borderRadius: 5
  },
  btnTextStyle: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "cairo-regular"
  }
});

const mapStateToProps = (state: any) => ({
  phone: state.user.phone,
  lang: state.glob.languageName,
  words: state.glob.language.words
});

export default connect(mapStateToProps)(
  graphql(addUniqueName, {
    name: "addUniqueName"
  })(
    graphql(isUniqueName, {
      name: "isUniqueName"
    })(NameScreen)
  )
);

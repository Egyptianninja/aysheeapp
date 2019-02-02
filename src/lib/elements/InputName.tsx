import * as React from "react";
import { View, Text, TextInput, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ErrorMessage from "./ErrorMessage";
class InputName extends React.PureComponent<any, any> {
  state = {
    valid: true,
    loading: false
  };

  componentDidMount() {
    this.setState({ valid: this.props.valid, loading: this.props.loading });
  }

  componentWillReceiveProps(nextProps: any) {
    if (
      nextProps.valid !== this.state.valid ||
      nextProps.loading !== this.state.loading
    ) {
      this.setState({ valid: nextProps.valid, loading: nextProps.loading });
    }
  }

  handleChange = (value: any) => {
    this.props.setLoading();
    this.props.onChange(this.props.name, value);
    this.props.handleUniqueName(value);
  };

  handleTouch = () => {
    this.props.onTouch(this.props.name);
  };

  render() {
    const { label, countryCode, placeholder, error, ...rest } = this.props;
    return (
      <View style={[this.props.outerStyle, { alignItems: "center" }]}>
        <Text style={this.props.labelStyle}>{label}</Text>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderBottomWidth: 1,
            borderBottomColor: "#aaa",
            marginVertical: 20
          }}
        >
          <Text
            style={{
              fontSize: 32,
              fontWeight: "bold",
              color: "#aaa",
              height: 50,
              paddingVertical: 10,
              paddingLeft: 10,
              paddingRight: 5
            }}
          >
            @
          </Text>

          <TextInput
            onChangeText={this.handleChange}
            placeholder="your_name"
            placeholderTextColor="#eee"
            onBlur={this.handleTouch}
            // autoFocus
            style={[
              {
                width: 250,
                paddingTop: 10,
                backgroundColor: "#fff",
                writingDirection: "auto",
                letterSpacing: 1,
                fontSize: 22,
                color: "#777",
                fontWeight: "bold"
              }
            ]}
            {...rest}
          />
          {this.state.valid && (
            <View
              style={{
                width: 40,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 10
              }}
            >
              {this.state.loading && (
                <ActivityIndicator
                  style={{ marginHorizontal: 23, marginTop: 10 }}
                />
              )}
              {!this.state.loading && (
                <Ionicons
                  name={"ios-checkmark-circle"}
                  size={28}
                  color="#26A65B"
                />
              )}
            </View>
          )}
          {!this.state.valid && (
            <View
              style={{
                width: 40,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 10
              }}
            >
              {this.state.loading && (
                <ActivityIndicator
                  style={{ marginHorizontal: 23, marginTop: 10 }}
                />
              )}
              {!this.state.loading && (
                <Ionicons name={"ios-close-circle"} size={28} color="tomato" />
              )}
            </View>
          )}
        </View>
      </View>
    );
  }
}

export default InputName;

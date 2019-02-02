import * as React from "react";
import { TextInput } from "react-native";

export default class AutogrowInput extends React.PureComponent<any, any> {
  inputRef: any;
  state = {
    height: 35
  };

  componentWillMount() {
    const { defaultHeight } = this.props;

    if (defaultHeight) {
      this.setState({
        height: defaultHeight
      });
    }
  }

  onContentSizeChange = (event: any) => {
    if (this.state.height !== event.nativeEvent.contentSize.height) {
      this.setState({
        height: Math.max(
          this.props.defaultHeight,
          event.nativeEvent.contentSize.height
        )
      });
    }
  };

  resetInputText = () => {
    if (this.inputRef) {
      this.inputRef.setNativeProps({ text: "" });
      this.setState({
        height: this.props.defaultHeight
      });
    }
  };

  focus = () => {
    if (this.inputRef && this.inputRef.focus) {
      this.inputRef.focus();
    }
  };

  render() {
    return (
      <TextInput
        ref={ref => (this.inputRef = ref)}
        multiline
        {...this.props}
        style={[this.props.style, { height: this.state.height }]}
        onContentSizeChange={this.onContentSizeChange}
      />
    );
  }
}

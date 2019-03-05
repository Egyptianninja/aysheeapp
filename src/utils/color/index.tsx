import * as React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  StyleSheet
} from 'react-native';

const { width } = Dimensions.get('window');

export default class ColorPicker extends React.Component<any, any> {
  static getContrastColor(hex: any) {
    return parseInt(hex.substring(1), 16) > 0xffffff / 2 ? 'black' : 'white';
  }

  constructor(props: any) {
    super(props);
    const { defaultColor, value, colors } = props;
    this.state = { color: defaultColor || value || colors[0] };
    this.renderIcon = this.renderIcon.bind(this);
    this.onColorChange = this.onColorChange.bind(this);
    this.renderColorOption = this.renderColorOption.bind(this);
  }

  componentWillReceiveProps(nextProps: any) {
    const { value } = this.props;
    if (nextProps.value !== value) {
      this.setState({ color: nextProps.value });
    }
  }

  onColorChange(color: any) {
    const { onChange } = this.props;
    this.setState({ color }, () => onChange(color));
  }

  renderIcon() {
    const { icon } = this.props;
    const { color } = this.state;
    if (icon) {
      return icon;
    }
    return (
      <Text
        style={{ color: ColorPicker.getContrastColor(color), fontSize: 60 }}
        adjustsFontSizeToFit
      >
        ✔︎
      </Text>
    );
  }

  renderColorOption(c: any) {
    const { color } = this.state;
    const { scaleToWindow } = this.props;
    const scaledWidth = width * 0.025;
    return (
      <TouchableOpacity
        key={c}
        onPress={() => this.onColorChange(c)}
        style={[
          styles.colorOption,
          { backgroundColor: c },
          scaleToWindow && {
            width: width * 0.07,
            height: width * 0.07,
            marginHorizontal: scaledWidth,
            marginVertical: scaledWidth,
            borderRadius: scaledWidth * 2
          }
        ]}
      >
        {color === c && this.renderIcon()}
      </TouchableOpacity>
    );
  }

  render() {
    const { title, paletteStyles, colors, titleStyles } = this.props;
    return (
      <View style={styles.container}>
        <Text style={[styles.titleStyles, { ...titleStyles }]}>{title}</Text>
        <View style={[styles.colorContainer, { ...paletteStyles }]}>
          {colors.map((c: any) => this.renderColorOption(c))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleStyles: {
    color: 'black'
  },
  colorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  },
  colorOption: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 15,
    elevation: 5,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.25
  }
});

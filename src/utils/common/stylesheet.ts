import {
  ImageStyle,
  StyleSheet as RnStyleSheet,
  TextStyle,
  ViewStyle
} from 'react-native';

type StyleProps = Partial<ViewStyle | TextStyle | ImageStyle>;

export const StyleSheet = {
  create(styles: { [className: string]: StyleProps }) {
    return RnStyleSheet.create(styles);
  }
};

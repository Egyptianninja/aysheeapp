import { Dimensions, StyleSheet } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  animationContainer: {
    width: SCREEN_WIDTH,
    position: 'absolute',
    zIndex: 100,
    marginBottom: 48
  },
  roundedEdges: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  shadow: {
    shadowColor: '#CECDCD',
    shadowRadius: 3,
    shadowOpacity: 5
  }
});

export default styles;

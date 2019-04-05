import * as React from 'react';
import { Dimensions, Image, TouchableHighlight, View } from 'react-native';
const { width } = Dimensions.get('window');

class ImageTile extends React.PureComponent<any, any> {
  render() {
    const { item, index, selected, selectImage } = this.props;
    if (!item) {
      return null;
    }
    return (
      <TouchableHighlight
        style={{ opacity: selected ? 0.8 : 1 }}
        underlayColor="transparent"
        onPress={() => selectImage(index)}
      >
        <View>
          {selected && (
            <View
              style={{
                position: 'absolute',
                right: 8,
                top: 8,
                width: 16,
                height: 16,
                borderRadius: 8,
                backgroundColor: '#e0364f',
                borderWidth: 2,
                borderColor: '#fff',
                zIndex: 100,
                opacity: 1
              }}
            />
          )}
          <Image
            style={{
              width: width / 3 - 25,
              height: width / 3 - 25,
              margin: 5
            }}
            source={{ uri: item }}
          />
        </View>
      </TouchableHighlight>
    );
  }
}
export default ImageTile;

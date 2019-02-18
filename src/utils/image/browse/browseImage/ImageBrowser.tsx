import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  CameraRoll,
  FlatList,
  Dimensions,
  Button
} from 'react-native';
import { FileSystem } from 'expo';
import ImageTile from './ImageTile';
const { width } = Dimensions.get('window');

export default class ImageBrowser extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      photos: [],
      selected: {},
      after: null,
      has_next_page: true
    };
  }

  componentDidMount() {
    this.getPhotos();
  }

  selectImage = (index: any) => {
    let newSelected = { ...this.state.selected };
    if (newSelected[index]) {
      delete newSelected[index];
    } else {
      newSelected[index] = true;
    }
    if (Object.keys(newSelected).length > this.props.max) {
      return;
    }
    if (!newSelected) {
      newSelected = {};
    }
    this.setState({ selected: newSelected });
  };

  getPhotos = () => {
    const params: any = { first: 50, mimeTypes: ['image/jpeg'] }; // TODO: Android
    // const params: any = { first: 300, mimeTypes: ['image/jpeg'] };
    if (this.state.after) {
      params.after = this.state.after;
    }
    if (!this.state.has_next_page) {
      return;
    }
    CameraRoll.getPhotos(params).then(this.processPhotos);
  };

  processPhotos = (r: any) => {
    if (this.state.after === r.page_info.end_cursor) {
      return;
    }
    const uris = r.edges
      .map((i: any) => i.node)
      .map((i: any) => i.image)
      .map((i: any) => i.uri);
    this.setState({
      photos: [...this.state.photos, ...uris],
      after: r.page_info.end_cursor,
      has_next_page: r.page_info.has_next_page
    });
  };

  getItemLayout = (data: any, index: any) => {
    const length = width / 4;
    return { length, offset: length * index, index };
  };

  prepareCallback() {
    const { selected, photos } = this.state;
    const selectedPhotos = photos.filter((item: any, index: any) => {
      return selected[index];
    });
    const files = selectedPhotos.map(
      // (i: any) => FileSystem.getInfoAsync(i, { md5: "true", size: true })
      (i: any) => FileSystem.getInfoAsync(i, { md5: true, size: true }) // TODO: Android
    );
    const callbackResult = Promise.all(files).then(imageData => {
      return imageData.map((data, i) => {
        return { file: selectedPhotos[i], ...data };
      });
    });
    this.props.callback(callbackResult);
  }

  renderHeader = () => {
    const selectedCount = Object.keys(this.state.selected).length;
    let headerText = ' محدد ' + selectedCount;
    if (selectedCount === this.props.max) {
      headerText = headerText + ' (الحد الاقصى)';
    }
    return (
      <View style={styles.header}>
        <Button
          title="عودة"
          onPress={() => this.props.callback(Promise.resolve([]))}
        />
        <Text>{headerText}</Text>
        <Button title="اضافة" onPress={() => this.prepareCallback()} />
      </View>
    );
  };

  renderImageTile = ({ item, index }: any) => {
    const selected = this.state.selected[index] ? true : false;
    return (
      <ImageTile
        item={item}
        index={index}
        selected={selected}
        selectImage={this.selectImage}
      />
    );
  };
  renderImages() {
    return (
      <FlatList
        data={this.state.photos}
        numColumns={3}
        renderItem={this.renderImageTile}
        keyExtractor={(_, index) => index.toString()}
        // keyExtractor={(_, index) => index} // TODO: Android
        onEndReached={() => {
          this.getPhotos();
        }}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={<Text>Loading...</Text>}
        initialNumToRender={24}
        getItemLayout={this.getItemLayout}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderImages()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 40,
    backgroundColor: '#fff'
  },
  header: {
    padding: 10,
    height: 60,
    width: width - 40,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10
  }
});

import * as React from 'react';
import {
  View,
  Dimensions,
  Text,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';
import Modal from 'react-native-modal';
import { images, icons } from '../../load';
import CategoryModalIcon from './CategoryModalIcon';

const { width, height } = Dimensions.get('window');

export default class CategoriesModal extends React.Component<any, any> {
  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (
      nextProps.isCategoriesModalVisible !== prevState.isCategoriesModalVisible
    ) {
      return { isCategoriesModalVisible: nextProps.isCategoriesModalVisible };
    } else {
      return { ...prevState };
    }
  }
  constructor(props: any) {
    super(props);
    this.state = {
      isCategoriesModalVisible: false
    };
  }

  renderOfferShop = () => {
    return (
      <View
        style={{
          width: width - 40,
          height: 75,
          flexDirection: 'row'
        }}
      >
        <TouchableOpacity
          onPress={async () => {
            this.props.navigation.navigate('OfferScreen');
            this.props.hideCategoriesModal();
          }}
          style={{
            flex: 1,
            backgroundColor: '#eee',
            marginRight: 5,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Image
            style={[
              {
                flex: 1,
                width: '100%',
                height: '100%'
              }
            ]}
            source={images.offers}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log('shops');
          }}
          style={{
            flex: 1,
            marginLeft: 5,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Image
            style={[
              {
                flex: 1,
                width: '100%',
                height: '100%'
              }
            ]}
            source={images.shops}
          />
        </TouchableOpacity>
      </View>
    );
  };

  renderCategories = (categories: any) => {
    categories.sort((a: any, b: any) =>
      a.sort > b.sort ? 1 : b.sort > a.sort ? -1 : 0
    );
    return categories.map((item: any) => {
      const iconFunc = icons.category.filter(ic => ic.id === item.id);
      const icon = iconFunc[0].icon();

      return (
        <CategoryModalIcon
          icon={icon}
          addFilter={this.props.addFilter}
          removeAllFilters={this.props.removeAllFilters}
          hideCategoriesModal={this.props.hideCategoriesModal}
          iconColor="#777"
          textColor="#777"
          width={width}
          height={height}
          item={item}
          key={item.id}
        />
      );
    });
  };

  renderCategoryRow = (start: any, end: any) => {
    return (
      <View
        style={{
          flexDirection: this.props.isRTL ? 'row-reverse' : 'row'
        }}
      >
        {this.renderCategories(this.props.categories.slice(start, end))}
      </View>
    );
  };

  render() {
    const { word, isRTL } = this.props;
    return (
      <Modal
        isVisible={this.state.isCategoriesModalVisible}
        onBackdropPress={() => this.props.hideCategoriesModal()}
        backdropOpacity={0.2}
        useNativeDriver={true}
        animationIn="zoomIn"
        animationOut="zoomOut"
        hideModalContentWhileAnimating={true}
        style={{ flex: 1, margin: 0 }}
      >
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 10,
            position: 'absolute',
            bottom: 0,
            margin: 10,
            height: height - 80,
            paddingTop: 10,
            width: width - 20,
            justifyContent: 'space-around',
            alignItems: 'center'
          }}
        >
          <ScrollView>
            <View
              style={{
                width: width - 20,
                justifyContent: 'flex-start',
                alignItems: 'center'
              }}
            >
              {this.renderOfferShop()}
              <View
                style={{
                  width: width - 20,
                  paddingTop: 10
                }}
              >
                {this.renderCategoryRow(0, 4)}
                {this.renderCategoryRow(4, 8)}
                {this.renderCategoryRow(8, 12)}
                {this.renderCategoryRow(12, 16)}
                {this.renderCategoryRow(16, 20)}
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  }
}

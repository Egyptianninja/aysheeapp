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
      <View>
        <View
          style={{
            width: width - 40,
            height: (width - 20) / 3 - 15,
            flexDirection: 'row'
          }}
        >
          <TouchableOpacity
            onPress={async () => {
              this.props.navigation.navigate('OffersScreen');
              this.props.hideCategoriesModal();
            }}
            style={{
              flex: 1,
              backgroundColor: '#eee',
              marginRight: 7,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
              borderColor: '#aaa',
              borderWidth: 1,
              overflow: 'hidden'
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
              source={images.offersphoto}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('ShopsScreen', {
                title: this.props.word.storesection
              });
              this.props.hideCategoriesModal();
            }}
            style={{
              flex: 1,
              marginLeft: 7,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
              borderColor: '#aaa',
              borderWidth: 1,
              overflow: 'hidden'
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
        <View
          style={{
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row'
          }}
        >
          <Text
            style={{
              color: '#171717',
              textAlign: 'center',
              fontFamily: 'cairo-regular',
              fontSize: 12
            }}
          >
            {this.props.word.offersection}
          </Text>
          <Text
            style={{
              color: '#171717',
              textAlign: 'center',
              fontFamily: 'cairo-regular',
              fontSize: 12
            }}
          >
            {this.props.word.storesection}
          </Text>
        </View>
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
          flexDirection: this.props.isRTL ? 'row-reverse' : 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 10
        }}
      >
        {this.renderCategories(this.props.categories.slice(start, end))}
      </View>
    );
  };

  renderHeader = (title: any) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          width: width - 20,
          height: 50
        }}
      >
        <TouchableOpacity
          onPress={() => this.props.hideCategoriesModal()}
          style={{
            position: 'absolute',
            top: 5,
            left: 20,
            zIndex: 10,
            width: 32,
            height: 32,
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
          }}
        >
          <Text
            style={{
              color: '#777',
              textAlign: 'center',
              fontFamily: 'cairo-regular',
              fontSize: 18
            }}
          >
            ⤬
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text
            style={{
              color: '#777',
              textAlign: 'center',
              fontFamily: 'cairo-regular',
              fontSize: 18
            }}
          >
            {title}
          </Text>
        </View>
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
          {this.renderHeader(this.props.word.allcategories)}
          <ScrollView showsVerticalScrollIndicator={false}>
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
                {this.renderCategoryRow(0, 3)}
                {this.renderCategoryRow(3, 6)}
                {this.renderCategoryRow(6, 9)}
                {this.renderCategoryRow(9, 12)}
                {this.renderCategoryRow(12, 15)}
                {this.renderCategoryRow(15, 18)}
                {this.renderCategoryRow(18, 20)}
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  }
}

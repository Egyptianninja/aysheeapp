import { Platform } from 'expo-core';
import * as React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Modal from 'react-native-modal';
import { icons, images } from '../../load';
import CategoryModalIcon from './CategoryModalIcon';
import { Constants } from 'expo';

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
            width,
            height: 70,
            flexDirection: 'row',
            marginTop: 10
          }}
        >
          <TouchableOpacity
            onPress={async () => {
              this.props.navigation.navigate('OffersScreen');
              this.props.hideCategoriesModal();
            }}
            style={{
              flex: 1,
              margin: 5,
              height: 70,
              marginRight: 12,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
              borderColor: '#aaa',
              borderWidth: 1
            }}
          >
            <Image
              style={[
                {
                  flex: 1,
                  borderRadius: 8,
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
              margin: 5,
              height: 70,
              marginRight: 12,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
              borderColor: '#aaa',
              borderWidth: 1
            }}
          >
            <Image
              style={[
                {
                  flex: 1,
                  borderRadius: 8,
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
            flexDirection: 'row',
            paddingTop: 5
          }}
        >
          <Text
            style={{
              color: '#171717',
              textAlign: 'center',
              // fontFamily: 'cairo-regular',
              fontSize: 14
            }}
          >
            {this.props.word.offersection}
          </Text>
          <Text
            style={{
              color: '#171717',
              textAlign: 'center',
              fontSize: 14
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
          navigation={this.props.navigation}
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
          width,
          height: 40,
          backgroundColor: '#A7A9F3',
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15
        }}
      >
        <TouchableOpacity
          onPress={() => this.props.hideCategoriesModal()}
          style={{
            position: 'absolute',
            top: 0,
            zIndex: 10,
            width: 60,
            height: 40,
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text
            style={{
              color: '#fff',
              textAlign: 'center',
              fontSize: Platform.OS === 'android' ? 30 : 18,
              paddingHorizontal: 15
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
              color: '#fff',
              textAlign: 'center',
              fontFamily: 'cairo-regular',
              fontSize: 15
            }}
          >
            {title}
          </Text>
        </View>
      </View>
    );
  };

  render() {
    return (
      <Modal
        isVisible={this.state.isCategoriesModalVisible}
        onBackdropPress={() => this.props.hideCategoriesModal()}
        onBackButtonPress={() => this.props.hideCategoriesModal()}
        backdropOpacity={0.4}
        useNativeDriver={true}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        hideModalContentWhileAnimating={true}
        style={{ flex: 1, margin: 0 }}
      >
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            height: height - (Constants.statusBarHeight + 40),
            width,
            justifyContent: 'space-around',
            alignItems: 'center'
          }}
        >
          {this.renderHeader(this.props.word.allcategories)}
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ paddingTop: 10, backgroundColor: '#fff' }}
            contentContainerStyle={{
              paddingBottom: 30,
              backgroundColor: '#fff'
            }}
          >
            <View
              style={{
                width,
                justifyContent: 'flex-start',
                alignItems: 'center'
              }}
            >
              {this.renderOfferShop()}
              <View
                style={{
                  width,
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

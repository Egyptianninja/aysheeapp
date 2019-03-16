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
              margin: 5,
              marginRight: 7,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
              borderColor: '#aaa',
              borderWidth: 1,
              shadowColor: '#555',
              shadowOffset: {
                width: 0,
                height: 5
              },
              shadowOpacity: 0.4,
              shadowRadius: 5,
              elevation: 5
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
              marginRight: 7,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
              borderColor: '#aaa',
              borderWidth: 1,
              shadowColor: '#555',
              shadowOffset: {
                width: 0,
                height: 5
              },
              shadowOpacity: 0.4,
              shadowRadius: 5,
              elevation: 5
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
            flexDirection: 'row'
          }}
        >
          <Text
            style={{
              color: '#171717',
              textAlign: 'center',
              fontFamily: 'cairo-regular',
              fontSize: 14
            }}
          >
            {this.props.word.offersection}
          </Text>
          <Text
            style={{
              color: '#171717',
              textAlign: 'center',
              fontFamily: 'cairo-regular',
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
          height: 50,
          backgroundColor: '#ddd',
          shadowColor: '#555',
          shadowOffset: {
            width: 0,
            height: 5
          },
          shadowOpacity: 0.4,
          shadowRadius: 5,
          elevation: 5
        }}
      >
        <TouchableOpacity
          onPress={() => this.props.hideCategoriesModal()}
          style={{
            position: 'absolute',
            top: 0,
            zIndex: 10,
            width: 60,
            height: 50,
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text
            style={{
              color: '#171717',
              textAlign: 'center',
              fontFamily: 'cairo-regular',
              fontSize: 18,
              paddingHorizontal: 15,
              paddingVertical: 10
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
              color: '#171717',
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
        backdropOpacity={0.4}
        useNativeDriver={true}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        hideModalContentWhileAnimating={true}
        style={{ flex: 1, margin: 0 }}
      >
        <View
          style={{
            backgroundColor: '#fff',
            position: 'absolute',
            bottom: 0,
            margin: 10,
            height: height - 80,
            width: width - 20,
            justifyContent: 'space-around',
            alignItems: 'center'
          }}
        >
          {this.renderHeader(this.props.word.allcategories)}
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ paddingTop: 10 }}
            contentContainerStyle={{ paddingBottom: 30 }}
          >
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

import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { filterOptions, rtlos } from '../../utils';
const { width } = Dimensions.get('window');

const iconNames = [
  { id: 1, name: 'New Ad', icon: 'ios-megaphone' },
  { id: 2, name: 'New Offer', icon: 'ios-bookmark' },
  { id: 3, name: 'Cancel', icon: 'ios-close-circle-outline' }
];

export default class OfferAdChoise extends React.Component<any, any> {
  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (
      nextProps.isOfferAdChoiseModalVisible !==
      prevState.isOfferAdChoiseModalVisible
    ) {
      return {
        isOfferAdChoiseModalVisible: nextProps.isOfferAdChoiseModalVisible
      };
    } else {
      return { ...prevState };
    }
  }
  constructor(props: any) {
    super(props);
    this.state = {
      isOfferAdChoiseModalVisible: false
    };
  }

  renderOptions = (data: any) => {
    return data.map((da: any) => {
      return (
        <Option
          key={da.id}
          showOfferAdChoiseModal={this.props.showOfferAdChoiseModal}
          hideOfferAdChoiseModal={this.props.hideOfferAdChoiseModal}
          navigation={this.props.navigation}
          word={this.props.word}
          width={width}
          itemData={da}
          {...this.props}
        />
      );
    });
  };

  render() {
    const options = filterOptions(this.props.word.addmenu, [1, 2, 3]);

    return (
      <Modal
        isVisible={this.state.isOfferAdChoiseModalVisible}
        onBackdropPress={() => this.props.hideOfferAdChoiseModal()}
        onBackButtonPress={() => this.props.hideOfferAdChoiseModal()}
        backdropOpacity={0.5}
        // useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        onSwipeComplete={() => this.props.hideOfferAdChoiseModal()}
        swipeDirection="down"
        style={{ margin: 0 }}
      >
        <View
          style={{
            backgroundColor: '#fff',
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            position: 'absolute',
            bottom: 0,
            margin: 0,
            height: 3 * 55 + 70,
            paddingTop: 20,
            width
          }}
        >
          {this.renderOptions(options)}
        </View>
      </Modal>
    );
  }
}

const Option = ({
  itemData,
  navigation,
  hideOfferAdChoiseModal,
  isRTL,
  word
}: any) => {
  return (
    <TouchableOpacity
      onPress={async () => {
        if (itemData.id === 1) {
          hideOfferAdChoiseModal();
          navigation.navigate('ChoiseScreen', {
            title: word.addnewad
          });
        } else if (itemData.id === 2) {
          hideOfferAdChoiseModal();
          navigation.navigate('AddOfferScreen', {
            title: word.addnewoffer
          });
        } else if (itemData.id === 3) {
          hideOfferAdChoiseModal();
        }
      }}
      style={{
        width,
        marginVertical: 5,
        paddingVertical: 5
      }}
    >
      <View
        style={{
          flexDirection: rtlos() === 3 ? 'row' : isRTL ? 'row-reverse' : 'row',
          paddingHorizontal: 20,
          justifyContent: 'flex-start',
          alignItems: 'center'
        }}
      >
        <Ionicons
          name={
            iconNames.filter((icon: any) => icon.id === itemData.id)[0].icon
          }
          size={30}
          color="#555"
          style={{ paddingHorizontal: 10, width: 50, textAlign: 'center' }}
        />
        <Text
          style={{
            fontSize: 18,
            textAlign: isRTL ? 'right' : 'left',
            paddingHorizontal: 10
          }}
        >
          {itemData.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

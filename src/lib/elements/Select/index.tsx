import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import {
  Dimensions,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput
} from 'react-native';
import Modal from 'react-native-modal';
import { icons } from '../../../load';
import { rtlos, getLang } from '../../../utils';
import { Option } from './Option';

const { width, height } = Dimensions.get('window');

export default class Select extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isModalVisible: false,
      data: null
    };
  }
  componentDidMount() {
    this.setState({ data: this.props.data });
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  renderOptions = (data: any) => {
    return (
      data &&
      data.map((da: any) => {
        const iconFunc = da.icon
          ? icons.brands.filter(ic => ic.id === da.id)
          : null;
        const icon = iconFunc ? iconFunc[0].icon() : null;

        return (
          <Option
            key={da.id}
            isRTL={this.props.isRTL}
            initSearch={this.initSearch}
            icon={icon}
            toggleModal={this.toggleModal}
            onChange={this.props.onChange}
            itemData={da}
            {...this.props}
          />
        );
      })
    );
  };

  renderlabel = (value: any, label: any, required: any, isRTL: any) => {
    if (required && value === '') {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            flexDirection:
              isRTL && Platform.OS !== 'android' ? 'row-reverse' : 'row'
          }}
        >
          <Text style={{ fontSize: 14, paddingHorizontal: 10, color: '#777' }}>
            {label}
          </Text>
          <Text
            style={{
              top: 5,
              fontSize: 12,
              paddingHorizontal: 10,
              color: 'rgba(255, 89, 89, 0.7)'
            }}
          >
            {this.props.words.require}
          </Text>
        </View>
      );
    } else if (value === '') {
      return (
        <Text style={{ fontSize: 14, paddingHorizontal: 10, color: '#777' }}>
          {label}
        </Text>
      );
    } else if (value !== '') {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            flexDirection: isRTL && rtlos() !== 3 ? 'row-reverse' : 'row'
          }}
        >
          <Text style={{ fontSize: 16, paddingHorizontal: 10 }}>
            {value.name && !value.en ? value.name : isRTL ? value.ar : value.en}
          </Text>
          {!this.props.nosubLabel && (
            <Text
              style={{
                fontSize: 16,
                paddingHorizontal: 10,
                color: '#ababab'
              }}
            >
              {label}
            </Text>
          )}
        </View>
      );
    }
  };

  filterList = (lang: any) => {
    const { data } = this.props;
    const { q } = this.state;
    if (q === '') {
      this.setState({ data });
    } else {
      let updatedData;
      if (lang === 'ar') {
        updatedData =
          data &&
          data.filter(
            (item: any) => item.ar.toLowerCase().search(q.toLowerCase()) !== -1
          );
      } else {
        updatedData = data.filter(
          (item: any) => item.en.toLowerCase().search(q.toLowerCase()) !== -1
        );
      }
      this.setState({ data: updatedData });
    }
  };

  initSearch = () => {
    this.setState({ q: '' });
  };

  render() {
    const {
      value,
      label,
      required,
      isRTL,
      values,
      data,
      name,
      words
    } = this.props;
    const lang = getLang();

    return (
      <View>
        <TouchableOpacity
          style={{
            flexDirection: isRTL && rtlos() !== 3 ? 'row-reverse' : 'row',
            width: this.props.width ? this.props.width : width - 60,
            height: 40,
            marginTop: 10,
            marginVertical: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 15,
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 20,
            backgroundColor: '#fff'
          }}
          onPress={() => this.toggleModal()}
        >
          {this.renderlabel(value, label, required, isRTL)}
          <Ionicons
            style={{ top: 3 }}
            name="ios-arrow-down"
            size={24}
            color="#999"
          />
        </TouchableOpacity>
        <Modal
          isVisible={this.state.isModalVisible}
          onBackdropPress={() => this.setState({ isModalVisible: false })}
          onBackButtonPress={() => this.setState({ isModalVisible: false })}
          backdropOpacity={0.2}
          useNativeDriver={true}
          hideModalContentWhileAnimating={true}
          style={{ margin: 0 }}
        >
          <View
            style={{
              backgroundColor: '#fff',
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              position: 'absolute',
              bottom: 0,
              top: name === 'brand' ? 70 : undefined,
              margin: 0,
              height:
                name === 'brand'
                  ? height - 70
                  : this.props.data < 7
                  ? this.props.data.length * 55
                  : 450,
              paddingTop: 20,
              width
            }}
          >
            {name === 'brand' && (
              <React.Fragment>
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    top: 30,
                    left: rtlos() === 3 ? undefined : isRTL ? 25 : 15,
                    right: rtlos() === 3 ? 25 : undefined,
                    zIndex: 101
                  }}
                  onPress={() => this.setState({ isModalVisible: false })}
                >
                  <Text style={{ color: '#7678ED', fontSize: 16 }}>
                    {words.cancel}
                  </Text>
                </TouchableOpacity>
                <TextInput
                  style={{
                    backgroundColor: '#eee',
                    paddingLeft: rtlos() === 3 ? 40 : 15,
                    paddingRight: rtlos() === 3 ? 15 : 40,
                    marginHorizontal: 10,
                    marginLeft: rtlos() === 3 ? undefined : 80,
                    marginRight: rtlos() === 3 ? 80 : undefined,
                    borderRadius: 20,
                    height: 40,
                    writingDirection: lang === 'ar' ? 'rtl' : 'ltr'
                  }}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={this.state.q}
                  onChangeText={async e => {
                    {
                      await this.setState({ q: e });
                      this.filterList(lang);
                    }
                  }}
                />
                <View
                  style={{
                    position: 'absolute',
                    right: rtlos() === 3 ? undefined : 20,
                    left: rtlos() === 3 ? 20 : undefined,
                    top: 25
                  }}
                >
                  <Ionicons
                    style={{
                      color: '#7678ED'
                    }}
                    name="ios-search"
                    size={30}
                  />
                </View>
              </React.Fragment>
            )}
            <ScrollView keyboardShouldPersistTaps="handled">
              {this.renderOptions(
                name === 'brand' ? this.state.data : this.props.data
              )}
            </ScrollView>
          </View>
        </Modal>
      </View>
    );
  }
}

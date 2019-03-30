import * as React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  PanResponder,
  Animated,
  Dimensions,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image
} from 'react-native';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import CategoryModalIcon from './CategoryModalIcon';
import { icons, images } from '../../load';
import { isIphoneX } from '../../utils/platform/iphonex';
export default class BottomDrawer extends React.Component<any, any> {
  static propTypes = {
    /**
     * Height of the drawer.
     */
    containerHeight: PropTypes.number.isRequired,

    /**
     * The amount of offset to apply to the drawer's position.
     * If the app uses a header and tab navigation, offset should equal
     * the sum of those two components' heights.
     */
    offset: PropTypes.number,

    /**
     * Set to true to have the drawer start in up position.
     */
    startUp: PropTypes.bool,

    /**
     * How much the drawer's down display falls beneath the up display.
     * Ex: if set to 20, the down display will be 20 points underneath the up display.
     */
    downDisplay: PropTypes.number,

    /**
     * The background color of the drawer.
     */
    backgroundColor: PropTypes.string,

    /**
     * Set to true to give the top of the drawer rounded edges.
     */
    roundedEdges: PropTypes.bool,

    /**
     * Set to true to give the drawer a shadow.
     */
    shadow: PropTypes.bool
  };

  static defaultProps = {
    offset: 0,
    startUp: true,
    // backgroundColor: '#ffffff',
    roundedEdges: true,
    shadow: true
  };
  TOGGLE_THRESHOLD: any;
  DOWN_DISPLAY: any;
  UP_POSITION: any;
  DOWN_POSITION: any;
  position: any;
  panResponder: any;

  constructor(props: any) {
    super(props);

    /**
     * TOGGLE_THRESHOLD is how much the user has to swipe the drawer
     * before its position changes between up / down.
     */
    this.TOGGLE_THRESHOLD = this.props.containerHeight / 11;
    this.DOWN_DISPLAY =
      this.props.downDisplay || this.props.containerHeight / 1.5;

    /**
     * UP_POSITION and DOWN_POSITION calculate the two (x,y) values for when
     * the drawer is swiped into up position and down position.
     */
    this.UP_POSITION = {
      x: 0,
      y: SCREEN_HEIGHT - (this.props.containerHeight + this.props.offset)
    };
    this.DOWN_POSITION = {
      x: 0,
      y: this.UP_POSITION.y + this.DOWN_DISPLAY
    };

    this.state = {
      currentPosition: this.props.startUp
        ? this.UP_POSITION
        : this.DOWN_POSITION
    };

    this.position = new Animated.ValueXY(this.state.currentPosition);

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderRelease
    });
  }
  renderOfferShop = () => {
    return (
      <View>
        <View
          style={{
            width: SCREEN_WIDTH - 40,
            height: (SCREEN_WIDTH - 20) / 3 - 15,
            flexDirection: 'row'
          }}
        >
          <TouchableOpacity
            onPress={async () => {
              this.props.navigation.navigate('OffersScreen');
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
          navigation={this.props.navigation}
          iconColor="#777"
          textColor="#777"
          width={SCREEN_WIDTH}
          height={SCREEN_HEIGHT}
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
          width: SCREEN_WIDTH - 20,
          height: 50,
          backgroundColor: '#fefefe',
          shadowOffset: { width: 2, height: 2 },
          shadowColor: '#666',
          shadowOpacity: 0.25
        }}
      >
        <TouchableOpacity
          onPress={() => this.transitionToDown()}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
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
              fontSize: Platform.OS === 'android' ? 40 : 22,
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
  renderX = () => {
    return (
      <TouchableOpacity
        onPress={() => this.transitionToDown()}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
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
            fontSize: Platform.OS === 'android' ? 40 : 22,
            paddingHorizontal: 15
          }}
        >
          ⤬
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <Animated.View
        style={[
          this.position.getLayout(),
          {
            width: SCREEN_WIDTH,
            position: 'absolute',
            zIndex: 240
          },
          this.props.roundedEdges
            ? { borderTopLeftRadius: 10, borderTopRightRadius: 10 }
            : null,
          this.props.shadow
            ? { shadowColor: '#CECDCD', shadowRadius: 3, shadowOpacity: 5 }
            : null,
          {
            height: this.props.containerHeight + Math.sqrt(SCREEN_HEIGHT),
            backgroundColor: this.props.backgroundColor
          }
        ]}
        {...this.panResponder.panHandlers}
      >
        <View
          style={{ backgroundColor: 'transparent', justifyContenr: 'center' }}
        >
          <View
            style={{
              width: 60,
              alignSelf: 'center',
              backgroundColor: 'rgba(238, 238, 238, 0.8)',
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8
            }}
            hitSlop={{
              top: 10,
              bottom: 10,
              left: 20,
              right: 20
            }}
          >
            <View
              style={{
                borderBottomColor: '#aaa',
                borderBottomWidth: 2,
                marginHorizontal: 10,
                height: 13,
                marginBottom: 12
              }}
            />
            <View
              style={{
                backgroundColor: '#fff',
                height: SCREEN_HEIGHT,
                width: SCREEN_WIDTH,
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <View
                style={{
                  backgroundColor: '#fff',
                  position: 'absolute',
                  bottom: 0,
                  margin: 10,
                  height: SCREEN_HEIGHT - 40,
                  width: SCREEN_WIDTH - 20,
                  justifyContent: 'space-around',
                  alignItems: 'center'
                }}
              >
                {this.renderHeader(this.props.word.allcategories)}
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={{ paddingTop: 10 }}
                  contentContainerStyle={{
                    paddingBottom: isIphoneX() ? 150 : 100
                  }}
                >
                  <View
                    style={{
                      width: SCREEN_WIDTH - 20,
                      justifyContent: 'flex-start',
                      alignItems: 'center'
                    }}
                  >
                    {this.renderOfferShop()}
                    <View
                      style={{
                        width: SCREEN_WIDTH - 20,
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
            </View>
          </View>
        </View>

        <View
          style={{
            height: Math.sqrt(SCREEN_HEIGHT),
            backgroundColor: this.props.backgroundColor
          }}
        />
      </Animated.View>
    );
  }

  _handlePanResponderMove = (e: any, gesture: any) => {
    if (this.swipeInBounds(gesture)) {
      this.position.setValue({ y: this.state.currentPosition.y + gesture.dy });
    } else {
      this.position.setValue({
        y: this.UP_POSITION.y - this.calculateEase(gesture)
      });
    }
  };

  _handlePanResponderRelease = (e: any, gestureState: any) => {
    if (
      (gestureState.dy > 50 && gestureState.vy > 0.7) ||
      gestureState.dy > (SCREEN_HEIGHT - 100) / 2
    ) {
      this.transitionTo(this.DOWN_POSITION);
    } else if (
      (-gestureState.dy > 50 && -gestureState.vy > 0.7) ||
      -gestureState.dy > (SCREEN_HEIGHT - 100) / 2
    ) {
      this.transitionTo(this.UP_POSITION);
    } else {
      this.resetPosition();
    }
  };

  // returns true if the swipe is within the height of the drawer.
  swipeInBounds(gesture: any) {
    return this.state.currentPosition.y + gesture.dy > this.UP_POSITION.y;
  }

  // when the user swipes the drawer above its height, this calculates
  // the drawer's slowing upward ease.
  calculateEase(gesture: any) {
    return Math.min(Math.sqrt(gesture.dy * -1), Math.sqrt(SCREEN_HEIGHT));
  }

  transitionTo(position: any) {
    Animated.spring(this.position, {
      toValue: position
    }).start();
    this.setState({ currentPosition: position });
  }
  transitionToDown() {
    Animated.spring(this.position, {
      toValue: this.DOWN_POSITION
    }).start();
    this.setState({ currentPosition: this.DOWN_POSITION });
  }

  resetPosition() {
    Animated.spring(this.position, {
      toValue: this.state.currentPosition
    }).start();
  }
}

import * as React from 'react';
import { View, Text, Platform, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FullTimeView from './FullTimeView';
import PriceView from './PriceView';
import BodyView from './BodyView';
import Properties from './Properties';
import { getDate, call, rtlos } from '../../utils';
import { code } from '../../store/getStore';

export const Details = (props: any) => {
  const {
    word,
    post,
    fulltimeObject,
    newObject,
    saleObject,
    furntObject,
    warrantyObject,
    isRTL,
    pdata,
    jdata
  } = props;
  const phone = post.phone.replace(code(), '');
  const callargs = { number: phone, prompt: false };
  return (
    <View>
      <BodyView
        title={post.title}
        body={post.body}
        isrtl={post.isrtl}
        time={post.time}
        word={word}
      />
      {(post.isfullTime === true || post.isfullTime === false) && (
        <FullTimeView words={word} fulltimeObject={fulltimeObject} />
      )}
      {(post.price || post.price === 0) && (
        <PriceView
          words={word}
          price={post.price}
          currency={post.currency}
          newObject={newObject}
          saleObject={saleObject}
          furntObject={furntObject}
          warrantyObject={warrantyObject}
        />
      )}
      {post.start && (
        <View
          style={{
            flex: 1,
            paddingVertical: 10,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text
            style={{
              color: '#7678ED',
              fontSize: 14
            }}
          >
            {getDate(post.start)} - {getDate(post.end)}
          </Text>
        </View>
      )}

      <Properties
        android={Platform.OS === 'android'}
        isRTL={isRTL}
        words={word}
        data={pdata}
      />
      <View style={{ height: 20 }} />

      {(post.categoryId === 5 || post.categoryId === 6) && (
        <Properties
          android={Platform.OS === 'android'}
          isRTL={isRTL}
          words={word}
          data={jdata}
        />
      )}
      <View
        style={{
          flex: 1,
          alignItems: rtlos() === 3 ? 'flex-start' : 'flex-end',
          justifyContent: 'center',
          paddingBottom: 10
        }}
      >
        <TouchableOpacity
          onPress={() => call(callargs)}
          style={{
            width: 85,
            height: 34,
            borderRadius: 18,
            justifyContent: 'center',
            backgroundColor: '#fff',
            alignItems: 'center',
            flexDirection: rtlos() === 3 ? 'row-reverse' : 'row',
            borderWidth: 1,
            borderColor: '#9B9CF1'
          }}
        >
          <Ionicons
            name="ios-call"
            size={26}
            style={{ paddingRight: 10 }}
            color="#9B9CF1"
          />

          <Text
            style={{
              fontSize: 14,
              color: '#9B9CF1'
            }}
          >
            {word.calladvertiser}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

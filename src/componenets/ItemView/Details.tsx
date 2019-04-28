import * as React from 'react';
import { View, Text, Platform } from 'react-native';
import FullTimeView from './FullTimeView';
import PriceView from './PriceView';
import BodyView from './BodyView';
import Properties from './Properties';
import { getDate } from '../../utils';

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
    </View>
  );
};

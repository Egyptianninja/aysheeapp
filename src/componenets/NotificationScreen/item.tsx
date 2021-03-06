import * as React from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity
} from 'react-native';
import { isArabic, rtlos, since } from '../../utils';
import { AvatarCircle } from '../Avatar';

const Item = (props: any) => {
  const { item, lang, navigation, isRTL } = props;
  const time = since(item.createdAt, lang);
  const { postId, user } = JSON.parse(item.data);
  const rtl = isArabic(item.body);
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems:
          rtlos() === 3 ? 'flex-start' : isRTL ? 'flex-end' : 'flex-start',

        padding: 5,
        marginHorizontal: 16,
        marginVertical: 5,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 10
      }}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ProfileScreen', { userId: user.id, user });
        }}
        style={{
          flexDirection: isRTL && rtlos() !== 3 ? 'row-reverse' : 'row',
          alignItems: 'center',
          padding: 5
        }}
      >
        {user && <AvatarCircle user={user} size={40} />}
        <Text style={{ paddingHorizontal: 10, fontWeight: 'bold' }}>
          {user.name}
        </Text>
      </TouchableOpacity>

      <TouchableWithoutFeedback
        onPress={() =>
          navigation.navigate('ItemScreen', {
            postId,
            word: props.words,
            lang,
            isRTL
          })
        }
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            marginHorizontal: 10,
            alignItems:
              rtlos() === 3 ? 'flex-start' : isRTL ? 'flex-end' : 'flex-start',
            width: '100%'
          }}
        >
          <Text
            style={{
              padding: 5,
              paddingBottom: 10
            }}
          >
            {item.title}
          </Text>
          <View
            style={{
              flex: 1,
              padding: 10,
              marginBottom: 5,
              backgroundColor: '#f8f8f8',
              borderRadius: 5,
              width: '94%'
            }}
          >
            <Text
              style={{
                alignSelf: rtl && rtlos() !== 3 ? 'flex-end' : undefined
              }}
            >
              {item.body}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View
        style={{
          position: 'absolute',
          top: 5,
          right: rtlos() === 2 ? undefined : 0,
          left: rtlos() === 2 ? 0 : undefined
        }}
      >
        <Text
          style={{
            color: '#999',
            fontSize: 12,
            paddingHorizontal: 15
          }}
        >
          {time}
        </Text>
      </View>
    </View>
  );
};

export default Item;

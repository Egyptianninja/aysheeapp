import * as React from 'react';
import { Image, Text, View } from 'react-native';
import { nameToColor } from '../../utils';

export const AvatarCircle = ({ user, size, image, bwidth = 2 }: any) => {
  const dburi = user.avatar
    ? `http://res.cloudinary.com/arflon/image/upload/w_${100}/${user.avatar}`
    : null;
  const name = user.name ? user.name : user.uniquename;
  const color = user.color ? user.color : nameToColor(name);

  const letter = !dburi ? name.substring(0, 1).toUpperCase() : null;
  const uri = image ? image.uri : dburi ? dburi : false;
  const bw = 4 * bwidth;
  return (
    <React.Fragment>
      {!uri && (
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            borderColor: color,
            borderWidth: bwidth,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <View
            style={{
              width: size - bw,
              height: size - bw,
              borderRadius: (size - bw) / 2,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: color
            }}
          >
            <Text style={{ fontSize: size / 2, color: '#fff' }}>{letter}</Text>
          </View>
        </View>
      )}
      {uri && (
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            borderColor: '#373737',
            borderWidth: bwidth,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Image
            style={{
              height: size - bw,
              width: size - bw,
              borderRadius: (size - bw) / 2
            }}
            source={{ uri }}
          />
        </View>
      )}
    </React.Fragment>
  );
};

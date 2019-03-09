import * as React from 'react';
import { Text, View, Image } from 'react-native';

export const AvatarCircle = ({ user, size, image }: any) => {
  const uri = user.avatar
    ? `http://res.cloudinary.com/arflon/image/upload/w_${100}/${user.avatar}`
    : null;
  const color = user.color ? user.color : '#7678ED';

  const name = user.name ? user.name : user.uniquename;
  const letter = !uri ? name.substring(0, 1).toUpperCase() : null;
  const imageUri = image ? image.uri : uri ? uri : false;
  return (
    <React.Fragment>
      {!imageUri && (
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            borderColor: color,
            borderWidth: 2,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <View
            style={{
              width: size - 8,
              height: size - 8,
              borderRadius: (size - 8) / 2,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: color
            }}
          >
            <Text style={{ fontSize: size / 2, color: '#fff' }}>{letter}</Text>
          </View>
        </View>
      )}
      {imageUri && (
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            borderColor: color,
            borderWidth: 2,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Image
            style={{
              height: size - 8,
              width: size - 8,
              borderRadius: (size - 8) / 2
            }}
            source={{ uri: imageUri }}
          />
        </View>
      )}
    </React.Fragment>
  );
};

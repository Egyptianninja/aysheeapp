import * as React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import { icons } from '../../load';
import { telecode } from '../../constants';

export const Choise = ({ country, city, action, width }: any) => {
  let icon;
  if (country) {
    const countryISO = telecode.filter((cu: any) => cu.name === country)[0].iso;
    const iconFunc = icons.flag.filter(ic => ic.id === countryISO);
    icon = iconFunc.length > 0 ? iconFunc[0].icon() : icons.mainmenu.icon();
  }

  return (
    <TouchableOpacity
      onPress={async () => {
        action({ country, city });
      }}
      style={{
        flexDirection: 'row',
        margin: 7,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: width - 80,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#eee',
        borderRadius: 10,
        shadowOffset: { width: 3, height: 3 },
        shadowColor: '#555',
        shadowOpacity: 0.3
      }}
    >
      <View
        style={{
          width: 52,
          height: 52,
          borderRadius: 26,
          overflow: 'hidden',
          opacity: 0.8,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 3,
          backgroundColor: '#fff',
          borderColor: '#fff'
        }}
      >
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            overflow: 'hidden',
            marginHorizontal: 10
          }}
        >
          <Image
            style={{
              flex: 1,
              width: '100%',
              height: '100%'
            }}
            source={icon}
          />
        </View>
      </View>
      <Text
        style={{
          fontSize: 18,
          fontFamily: 'cairo-regular',
          textAlign: 'right',
          paddingHorizontal: 10,
          color: '#000'
        }}
      >
        {country}
      </Text>
    </TouchableOpacity>
  );
};

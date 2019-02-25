import * as React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import { icons } from '../../load';
import { telecode } from '../../constants';

export const Choise = ({ name, action, hideModal }: any) => {
  let icon;
  if (name) {
    const countryISO = telecode.filter((cu: any) => cu.name === name)[0].iso;
    const iconFunc = icons.flag.filter(ic => ic.id === countryISO);
    icon = iconFunc ? iconFunc[0].icon() : icons.mainmenu.icon();
  }

  return (
    <TouchableOpacity
      onPress={async () => {
        action(name);
      }}
      style={{
        flexDirection: 'row-reverse',
        margin: 7,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontFamily: 'cairo-regular',
          textAlign: 'right',
          paddingHorizontal: 10,
          color: '#000'
        }}
      >
        {name}
      </Text>
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          overflow: 'hidden',
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 2,
          backgroundColor: '#fff',
          borderColor: '#7678ED'
        }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
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
    </TouchableOpacity>
  );
};

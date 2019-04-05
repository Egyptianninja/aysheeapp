import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { icons } from '../../load';
import { category, isRTL } from '../../store/getStore';
import { Choise } from './Choise';

const renderChoices = (
  items: any,
  navigation: any,
  iconsize: any,
  addcategory: any,
  showSearch: any
) => {
  return items.map((item: any) => {
    const iconFunc = icons.category.filter(ic => ic.id === item.id);
    const icon = iconFunc[0].icon();
    return (
      <Choise
        item={item}
        icon={icon}
        navigation={navigation}
        key={item.id}
        isRTL={isRTL()}
        iconsize={iconsize}
        addcategory={addcategory}
        showSearch={showSearch}
      />
    );
  });
};

const ChoiseCategory = (props: any) => {
  const categories = category();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: '#fff',
        paddingHorizontal: 30
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: '100%' }}
        contentContainerStyle={{
          paddingTop: 10,
          paddingBottom: 20
        }}
      >
        {renderChoices(
          categories,
          props.navigation,
          props.iconsize,
          props.addcategory,
          props.showSearch
        )}
      </ScrollView>
    </View>
  );
};

export default ChoiseCategory;

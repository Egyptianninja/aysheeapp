import * as React from 'react';
import { Picker, View } from 'react-native';

const PickerUI = ({
  itemKind,
  addFilter,
  removeFilter,
  data,
  propsValue,
  width = 95,
  height = 80,
  innerStyle
}: any) => {
  const allItem = { id: '-1', name: data.label };
  const newdata = [allItem, ...data.buckets];

  const pickervalue =
    propsValue || propsValue === 0
      ? itemKind === 'realestateId' || itemKind === 'kindId'
        ? propsValue
        : propsValue.toString()
      : undefined;

  return (
    <View
      style={{
        height: 100,
        marginHorizontal: 10,
        backgroundColor: '#eee',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5
      }}
    >
      <Picker
        selectedValue={pickervalue}
        style={[
          {
            height,
            width,
            justifyContent: 'center'
          },
          innerStyle
        ]}
        onValueChange={(value: any) => {
          if (value === '-1') {
            removeFilter(itemKind);
          } else {
            isNaN(value)
              ? addFilter(itemKind, value)
              : addFilter(itemKind, Number(value));
          }
        }}
        itemStyle={{
          height: 120,
          width: 80,
          fontSize: 16,
          alignSelf: 'center'
          // backgroundColor: 'red'
        }}
      >
        {newdata.map((item: any) => {
          return (
            <Picker.Item key={item.id} label={item.name} value={item.id} />
          );
        })}
      </Picker>
    </View>
  );
};

export default PickerUI;

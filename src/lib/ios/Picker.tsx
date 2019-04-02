import * as React from 'react';
import { Picker, View } from 'react-native';

const PickerUI = ({
  itemKind,
  addFilter,
  removeFilter,
  data,
  propsValue,
  width = 80,
  height = 80,
  innerStyle
}: any) => {
  if (!data || data.buckets.length === 0) {
    return null;
  }

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
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#e3e3e3',
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 10,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: '#666',
        shadowOpacity: 0.25
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
          alignSelf: 'center',
          color: '#363636'
        }}
        mode="dropdown"
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

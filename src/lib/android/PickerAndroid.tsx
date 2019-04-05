import * as React from 'react';
import { Picker, Text, View } from 'react-native';

const PickerAndroid = ({
  itemKind,
  addFilter,
  removeFilter,
  data,
  propsValue
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        marginBottom: 20
      }}
    >
      {(propsValue || propsValue === 0) && (
        <View style={{ position: 'absolute', left: 20, top: -30 }}>
          <Text>{data.label}</Text>
        </View>
      )}
      <Picker
        selectedValue={pickervalue}
        style={{
          width: 100,
          height: 40,
          alignSelf: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          paddingHorizontal: 10,
          shadowColor: '#999',
          shadowOffset: {
            width: 0,
            height: 5
          },
          shadowOpacity: 0.3,
          shadowRadius: 5,
          elevation: 5
        }}
        onValueChange={(value: any) => {
          if (value === '-1') {
            removeFilter(itemKind);
          } else {
            isNaN(value)
              ? addFilter(itemKind, value)
              : addFilter(itemKind, Number(value));
          }
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

export default PickerAndroid;

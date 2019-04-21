import * as React from 'react';
import { Dimensions, Platform, View } from 'react-native';
const { width } = Dimensions.get('window');

const Group = (props: any) => {
  const { children, ...rest } = props;
  const group = React.Children.map(children, (child: any) => child.props.name);
  const childrenWithProps = React.Children.map(children, (child: any) =>
    React.cloneElement(child, { group, ...rest })
  );
  return (
    <View
      style={[
        props.nostyle
          ? {}
          : {
              width: props.column ? width - 80 : width - 40,
              alignItems: props.rtl
                ? 'flex-end'
                : props.column
                ? 'flex-start'
                : 'center',
              flexDirection: props.column
                ? 'column'
                : props.rtl && Platform.OS !== 'android'
                ? 'row-reverse'
                : 'row',
              marginVertical: 5,
              padding: 10,
              borderColor: '#eee',
              borderWidth: 1,
              borderRadius: 5
            }
      ]}
    >
      {childrenWithProps}
    </View>
  );
};
export default Group;

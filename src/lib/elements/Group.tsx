import * as React from "react";
import { View, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

const Group = (props: any) => {
  const { children, ...rest } = props;
  const group = React.Children.map(children, (child: any) => child.props.name);
  const childrenWithProps = React.Children.map(children, (child: any) =>
    React.cloneElement(child, { group, ...rest })
  );
  return (
    <View
      style={{
        width: width - 40,
        alignItems: "center",
        flexDirection: props.rtl ? "row-reverse" : "row",
        marginVertical: 5,
        padding: 10,
        borderColor: "#eee",
        borderWidth: 1,
        borderRadius: 5
      }}
    >
      {childrenWithProps}
    </View>
  );
};
export default Group;

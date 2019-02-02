import * as React from "react";
import { View, Image } from "react-native";

const ImageIcon = ({ icon, size, tintColor = "#171717", margin }: any) => (
  <View
    style={{
      marginTop: margin ? 3 : undefined,
      padding: 2,
      width: size,
      height: size
    }}
  >
    <Image
      style={[
        {
          flex: 1,
          width: "100%",
          height: "100%"
        },
        { tintColor }
      ]}
      source={icon}
    />
  </View>
);

export default ImageIcon;

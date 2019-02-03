import * as React from "react";
import { View, Image } from "react-native";

export const PostImage = ({ uri, width, height }: any) => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: width - 2,
          height,
          overflow: "hidden",
          borderTopLeftRadius: 7,
          borderTopRightRadius: 7
        }}
      >
        <Image
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "cover"
          }}
          source={{ uri }}
        />
      </View>
    </View>
  );
};

import * as React from "react";
import { TouchableOpacity, Text } from "react-native";

export const Option = ({
  itemData,
  toggleModal,
  onChange,
  name,
  width,
  lang,
  onSelectBrand,
  onSelecteOption
}: any) => {
  return (
    <TouchableOpacity
      onPress={() => {
        const langName = lang === "ar" ? itemData.ar : itemData.en;

        if (name === "kind") {
          onChange("brand", "");
          onChange("subBrand", "");
          onChange("eBrand", "");
          onSelecteOption ? onSelecteOption(itemData.id) : undefined;
        }
        if (name === "brand") {
          onSelectBrand(itemData.id);
          onChange("subBrand", "");
        }
        if (name === "brand" || name === "subBrand") {
          onChange(name, {
            id: itemData.id,
            name: langName,
            nameGlob: `${itemData.ar} ${itemData.en}`
          });
        } else {
          onChange(name, {
            id: itemData.id,
            name: itemData.name,
            nameGlob: itemData.nameGlob
          });
        }
        toggleModal();
      }}
      style={{
        flex: 1,
        width: width - 80,
        padding: 3,
        margin: 7,
        backgroundColor: "#eee",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontFamily: "cairo-regular",
          textAlign: lang === "ar" ? "right" : "left",
          paddingHorizontal: 10
        }}
      >
        {itemData.name && !itemData.en
          ? itemData.name
          : lang === "ar"
          ? itemData.ar
          : itemData.en}
      </Text>
    </TouchableOpacity>
  );
};

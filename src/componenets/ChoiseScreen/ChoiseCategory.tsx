import * as React from "react";
import { View, ScrollView } from "react-native";
import { category, theme, languageName } from "../../store/getStore";
import { icons } from "../../load";
import { Choise } from "./Choise";

const renderChoices = (items: any, color: any, navigation: any) => {
  return items.map((item: any) => {
    const iconFunc = icons.category.filter(ic => ic.id === item.id);
    const icon = iconFunc[0].icon();
    return (
      <Choise
        item={item}
        icon={icon}
        color={color}
        navigation={navigation}
        key={item.id}
        lang={languageName()}
      />
    );
  });
};

const ChoiseCategory = (props: any) => {
  const { color } = theme();
  const categories = category();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-end",
        backgroundColor: "#fff",
        paddingHorizontal: 30
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: "100%" }}
      >
        {renderChoices(categories, color, props.navigation)}
      </ScrollView>
    </View>
  );
};

export default ChoiseCategory;

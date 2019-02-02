import * as React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { StyleSheet } from "../../utils";
import { Ionicons } from "@expo/vector-icons";

const CategoryIcon = ({
  item,
  icon,
  iconColor,
  textColor,
  addFilter,
  removeAllFilters,
  categoryId
}: any) => {
  const active = categoryId === item.id;
  return (
    <TouchableOpacity
      onPress={async () => {
        // addFilter("categoryId", item.id);
        if (categoryId === item.id) {
          removeAllFilters();
        } else {
          await removeAllFilters();
          addFilter("categoryId", item.id);
        }
      }}
    >
      <View style={[active ? styles.activeContainer : styles.container]}>
        {active && (
          <View style={{ position: "absolute", right: 7, top: -3 }}>
            <Ionicons name="ios-close" size={28} color="#6FA7D5" />
          </View>
        )}
        <View style={styles.iconView}>
          <View style={styles.imageView}>
            <Image
              style={[
                {
                  flex: 1,
                  width: "100%",
                  height: "100%"
                },
                { tintColor: active ? "#6FA7D5" : iconColor }
              ]}
              source={icon}
            />
          </View>
        </View>
        <View style={styles.textView}>
          <Text
            style={[styles.text, { color: active ? "#6FA7D5" : textColor }]}
          >
            {item.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    paddingTop: 5,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 5,
    marginHorizontal: 4,
    backgroundColor: "#fff",
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "#666",
    shadowRadius: 3,
    shadowOpacity: 0.2
  },
  activeContainer: {
    padding: 5,
    paddingTop: 5,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 5,
    marginHorizontal: 4,
    backgroundColor: "#eee"
  },
  iconView: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20
  },
  imageView: {
    width: 24,
    height: 24
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  textView: {
    paddingTop: 5
  },
  text: {
    textAlign: "center",
    fontFamily: "cairo-regular",
    paddingHorizontal: 5,
    fontSize: 14
  }
});

export default CategoryIcon;

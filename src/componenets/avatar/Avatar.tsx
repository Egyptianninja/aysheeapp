import * as React from "react";
import { Text, View } from "react-native";
import seedrandom from "seedrandom";
const colours = [
  "#3498db",
  "#9b59b6",
  "#34495e",
  "#16a085",
  "#27ae60",
  "#2980b9",
  "#2c3e50",
  "#f1c40f",
  "#e74c3c",
  "#7f8c8d"
];

export const Avatar = ({ name }: any) => {
  let fletters;
  let rdm = seedrandom("name")();

  if (name) {
    fletters = name.substring(0, 1).toUpperCase();
    rdm = seedrandom(name)();
  }
  const bgcolor = colours[Math.floor(rdm * 10)];
  return (
    <View
      style={{
        width: 80,
        height: 80,
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: bgcolor
      }}
    >
      <Text style={{ fontSize: 40, color: "#fff" }}>{fletters}</Text>
    </View>
  );
};

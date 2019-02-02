import * as React from "react";
import { View } from "react-native";
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

export const AvatarPhone = ({ phone }: any) => {
  let rdm = seedrandom("name")();

  if (phone) {
    rdm = seedrandom(phone)();
  }
  const bgcolor = colours[Math.floor(rdm * 10)];
  return (
    <View
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: bgcolor
      }}
    />
  );
};

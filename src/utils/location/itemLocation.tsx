import * as React from "react";
import { View } from "react-native";
import { StyleSheet } from "../common";
import { MapView } from "expo";

const { Marker }: any = MapView;

export default class ItemLocation extends React.Component<any, any> {
  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={{
            alignSelf: "stretch",
            height: 200,
            width: this.props.width - 40
          }}
          region={{
            latitude: this.props.latitude,
            longitude: this.props.longitude,
            latitudeDelta: 0.0062,
            longitudeDelta: 0.0041
          }}
          showsUserLocation={true}
        >
          <Marker
            coordinate={{
              latitude: this.props.latitude,
              longitude: this.props.longitude
            }}
            title={this.props.title}
            description={this.props.body}
          >
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: "rgba(223, 57, 66,0.1)",
                justifyContent: "center",
                alignItems: "center",
                borderColor: "rgba(223, 57, 66, 0.5)",
                borderWidth: 1
              }}
            >
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: "rgba(223, 57, 66, 1)"
                }}
              />
            </View>
          </Marker>
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 5,
    overflow: "hidden"
  }
});

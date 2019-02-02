import {
  createMaterialTopTabNavigator,
  createStackNavigator
} from "react-navigation";
import { MyPostsScreen, MyFavScreen } from "../../screens";
const PostTabs = createMaterialTopTabNavigator(
  {
    UserPostsScreen: {
      screen: MyPostsScreen,
      navigationOptions: ({ navigation }: any) => ({
        title: "posts",
        headerStyle: { backgroundColor: "#fff" },
        headerTintColor: "#777",
        headerTitleStyle: { fontSize: 20, color: "#000" }
      })
    },
    UserFavScreen: {
      screen: MyFavScreen,
      navigationOptions: ({ navigation }: any) => ({
        title: "favorite",
        headerStyle: { backgroundColor: "#fff" },
        headerTintColor: "#777",
        headerTitleStyle: { fontSize: 20, color: "#000" }
      })
    }
  },
  {
    lazy: true,
    tabBarOptions: {
      activeTintColor: "#6FA7D5",
      inactiveTintColor: "#777",
      labelStyle: {
        fontSize: 16
      },
      indicatorStyle: {
        backgroundColor: "#6FA7D5"
      },
      style: {
        backgroundColor: "#efefef"
      }
    }
  }
);

export default createStackNavigator({
  PostTabs: {
    screen: PostTabs,
    navigationOptions: ({ navigation, tintColor }: any) => ({
      header: null
    })
  }
});

import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";
import * as React from "react";
import AllArticle from "components/AllArticle";
import Article from "components/Article";
import ArticleList from "components/AllArticle/ArticleList";
import theme from "theme";
import { HeaderIconStyles } from "./base";

const Stack = createStackNavigator();

export default function AllArticleStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="AllArticle"
      screenOptions={{
        headerStyle: {
          backgroundColor: `${theme.colors.ligthGrey}`,
        },
        headerTitle: "",
        headerTintColor: `${theme.colors.black}`,
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },
        headerTitleAlign: "left",
        headerBackImage: () => (
          <MaterialIcons style={HeaderIconStyles.materialIcons} name="arrow-back" size={theme.size.headerIconSize} />
        ),
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen name="AllArticle" component={AllArticle} />
      <Stack.Screen name="ArticleList" component={ArticleList} />
      <Stack.Screen name="Article" component={Article} />
    </Stack.Navigator>
  );
}

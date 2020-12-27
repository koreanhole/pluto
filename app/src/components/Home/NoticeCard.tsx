import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Ripple from "react-native-material-ripple";
import Divider from "modules/Divider";
// @ts-ignore
import TextAvatar from "react-native-text-avatar";
import { useNavigation } from "@react-navigation/native";
import theme from "theme";
import randomColor from "randomcolor";
import { getDescriptiveDateDifference } from "./util";
import { MaterialIcons } from "@expo/vector-icons";
import { NoticeArticle } from "components/Article/redux/types";

export const NoticeCardHeader = ({ createdDate, favoriteCount }: { createdDate: string; favoriteCount?: number }) => {
  return (
    <View style={NoticeCardStyle.header}>
      <Text style={NoticeCardStyle.headerText}>{`#${getDescriptiveDateDifference(createdDate)}`}</Text>
      {typeof favoriteCount !== "undefined" && favoriteCount > 0 && (
        <View style={NoticeCardStyle.favoriteContainer}>
          <MaterialIcons name="favorite-border" color={theme.colors.darkGrey} />
          <Text style={NoticeCardStyle.favoriteCounterText}>{favoriteCount}</Text>
        </View>
      )}
    </View>
  );
};

const NoticeCardItemTitle = ({ deptName, title }: { deptName: string; title: string }) => {
  return (
    <View style={NoticeCardItemStyles.titleContainer}>
      <TextAvatar
        backgroundColor={randomColor({
          seed: deptName,
          luminosity: "bright",
          alpha: 1,
        })}
        textColor={theme.colors.white}
        size={34}
        type={"circle"}>
        {`${deptName}`}
      </TextAvatar>
      <Text style={NoticeCardItemStyles.titleText}>{title}</Text>
    </View>
  );
};

const NoticeCardItemSubtitle = ({
  createdDate,
  authorName,
  authorDept,
}: {
  createdDate: string;
  authorName: string;
  authorDept: string;
}) => {
  return (
    <View style={NoticeCardItemStyles.subtitleContainer}>
      <Text style={NoticeCardItemStyles.subtitleText}>
        {`${authorName}`}
        {authorDept && ` / ${authorDept}`}
      </Text>
      <Text style={NoticeCardItemStyles.subtitleText}>{`${createdDate}`}</Text>
    </View>
  );
};

export default function NoticeCard(props: NoticeArticle) {
  const { deptCode, deptName, authorDept, title, createdDate, authorName, listId, favoriteCount } = props;
  const navigation = useNavigation();

  const handleNoticeCardItemClick = React.useCallback(() => {
    navigation.navigate("Article", { deptCode: deptCode, listId: listId });
  }, []);

  return (
    <Ripple onPress={handleNoticeCardItemClick}>
      <View style={NoticeCardStyle.container}>
        <NoticeCardHeader createdDate={createdDate} favoriteCount={favoriteCount} />
        <NoticeCardItemTitle deptName={deptName} title={title} />
        <NoticeCardItemSubtitle createdDate={createdDate} authorName={authorName} authorDept={authorDept} />
        <Divider />
      </View>
    </Ripple>
  );
}

const NoticeCardStyle = StyleSheet.create({
  container: {
    paddingVertical: 0,
    paddingHorizontal: 16,
  },
  header: {
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    color: theme.colors.darkGrey,
    fontSize: 12,
  },
  favoriteContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  favoriteCounterText: {
    marginLeft: 2,
    color: theme.colors.darkGrey,
    fontSize: 12,
  },
});

const NoticeCardItemStyles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    marginBottom: 8,
    alignItems: "center",
  },
  subtitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  titleText: {
    paddingLeft: 8,
    fontSize: 15,
    alignSelf: "center",
    flex: 1,
  },
  subtitleText: {
    fontSize: 12,
    color: theme.colors.darkGrey,
  },
});

import React, { useMemo } from "react";
import { View, FlatList } from "react-native";
import { useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import createStyles from "./HomeScreen.style";
import CardItem from "./components/card-item/CardItem";

import Text from "@shared-components/text-wrapper/TextWrapper";
import fonts from "@fonts";
import { localStrings } from "shared/localization";


interface HomeScreenProps {
  userData: any
  handleItemPress : () => void

}

const HomeScreen =  (props:HomeScreenProps) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const List = () => (
    <View style={styles.listContainer}>
      <FlatList
        data={props.userData.userData}
        renderItem={({ item }) => (
          <CardItem data={item} onPress={props.handleItemPress} />
        )}
      />
    </View>
  );

  const Welcome = () => (
    <>
      <Text h1 bold color={colors.text}>
      {localStrings.getString('boilerPlateHeader')}
      </Text>
      <Text
        fontFamily={fonts.montserrat.lightItalic}
        color={colors.placeholder}
      >
        {localStrings.getString('welcomeBack')}
      </Text>
    </>
  );

  const Content = () => (
    <View style={styles.contentContainer}>
      <Welcome />
      <List />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Content />
    </SafeAreaView>
  );
};

export default HomeScreen;

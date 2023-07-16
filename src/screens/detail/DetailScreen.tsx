import React, { useMemo } from "react";
import { View } from "react-native";
import { useTheme } from "@react-navigation/native";
import * as NavigationService from "react-navigation-helpers";
/**
 * ? Local Imports
 */
import createStyles from "./DetailScreen.style";
import Text from "@shared-components/text-wrapper/TextWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setAppTheme } from "redux/actions/ThemeAction";
import RNBounceable from "lib/bounceable/RNBounceable";
import { RootState } from "redux/store/Store";

interface DetailScreenProps {}

const DetailScreen: React.FC<DetailScreenProps> = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const dispatch = useDispatch();
  const isDarkMode  = useSelector((state: RootState) => state.themeReducer.isDarkMode);


  return (
    <View style={styles.container}>
      <Text h1 color={colors.text}>
        Detail Screen
      </Text>
      <RNBounceable
        style={styles.buttonStyle}
        onPress={() => { 
          NavigationService.goBack()}}
      >
        <Text color={colors.white}>Go back to Home</Text>
      </RNBounceable>
      <RNBounceable
        style={styles.buttonStyle}
        onPress={() =>   dispatch(setAppTheme(!isDarkMode))}  >
        <Text color={colors.white}>Change Theme</Text>
      </RNBounceable>
    </View>
  );
};

export default DetailScreen;

import React, { useMemo } from "react";
import {
  View,
  Image,
  TextInput,
  Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import { localStrings } from "shared/localization";
import Glyphs from "assets/Glyphs";
import createStyles from "./styles/SignInStyle";
import * as NavigationService from "@navigation";
import { SCREENS } from "@shared-constants";
import RNText from "components/RNText/RNText";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store/Store";
import { setAppTheme } from "redux/actions/ThemeAction";
import Button from "components/button";

const SignInScreen = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const dispatch = useDispatch();
  const isDarkMode = useSelector(
    (state: RootState) => state.themeReducer.isDarkMode,
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.logoStyle} source={Glyphs.Logo} />
        </View>
        <View style={styles.fieldsContainer}>
          <View style={styles.fieldsSubContainer}>
            <TextInput
              style={styles.input}
              placeholderTextColor={colors.text}
              placeholder={localStrings.getString("placeholderEmail")}
            />
            <TextInput
              style={styles.password}
              placeholderTextColor={colors.text}
              placeholder={localStrings.getString("placeholderPassword")}
            />
            <RNText
              h3
              color={colors.text}
              style={styles.forgotPasswordText}
              onPress={() => Alert.alert("Hi")}
            >
              {localStrings.getString("forgotPassword")}
            </RNText>
          </View>
        </View>

      </View>
      <Button
        text={localStrings.getString("login")}
        onPress={() => NavigationService.navigate(SCREENS.HOME)}
      ></Button>
      <Button
        text={localStrings.getString("changeTheme")}
        onPress={() => dispatch(setAppTheme(!isDarkMode))}
      ></Button>
       <Button
        text={localStrings.getString("changeLanguage")}
        onPress={() =>  localStrings.setLanguage("en")}
      ></Button>
    </SafeAreaView>
  );
};

export default SignInScreen;

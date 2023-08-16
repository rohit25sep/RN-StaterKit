import React, { useMemo } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import { localStrings } from "shared/localization";
import Glyphs from "assets/Glyphs";
import createStyles from "./styles/SignInStyle";
import * as NavigationService from "@navigation";
import { SCREENS } from "@shared-constants";

const SignInScreen = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
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
            <Text
              style={styles.forgotPasswordText}
              onPress={() => Alert.alert("Hi")}
            >
              {localStrings.getString("forgotPassword")}
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => NavigationService.navigate(SCREENS.HOME)}
            style={styles.submitButton}
          >
            <Text style={styles.submitText}>
              {localStrings.getString("login")}
            </Text>
          </TouchableOpacity>
        </View>
       
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;

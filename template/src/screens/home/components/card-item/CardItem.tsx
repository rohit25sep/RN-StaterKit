import React, { useMemo } from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-dynamic-vector-icons";
/**
 * ? Local Imports
 */
import createStyles from "./CardItem.style";
import { ICardItem } from "models";
import Text from "@shared-components/text-wrapper/TextWrapper";
import RNBounceable from "lib/bounceable/RNBounceable";
import { User } from "models/UserModel";

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;

interface ICardItemProps {
  style?: CustomStyleProp;
  data:any
  onPress: () => void;
}

const CardItem: React.FC<ICardItemProps> = ({ style, data, onPress }) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { name, email } = data;

  const Header = () => (
    <>
      <Text h4 bold color={colors.text}>
        {name}
      </Text>
      <Text h5 color={colors.placeholder} style={styles.descriptionTextStyle}>
        {email}
      </Text>
    </>
  );

  return (
    <RNBounceable style={[styles.container, style]}  onPress={onPress}>
      <Header />
      <View style={styles.contentContainer}>
      </View>
    </RNBounceable>
  );
};

export default CardItem;

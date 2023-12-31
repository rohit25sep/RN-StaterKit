import React, { useMemo } from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./CardItem.style";
import CustomText from "components/TextWrapper";
import RNBounceable from "lib/bounceable/RNBounceable";

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;

interface ICardItemProps {
  style?: CustomStyleProp;
  data: any;
  onPress: () => void;
}

const CardItem: React.FC<ICardItemProps> = ({ style, data, onPress }) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { name, email } = data;

  const Header = () => (
    <>
      <CustomText h4 bold color={colors.text}>
        {name}
      </CustomText>
      <CustomText h5 color={colors.placeholder} style={styles.descriptionTextStyle}>
        {email}
      </CustomText>
    </>
  );

  return (
    <RNBounceable style={[styles.container, style]} onPress={onPress}>
      <Header />
      <View style={styles.contentContainer} />
    </RNBounceable>
  );
};

export default CardItem;

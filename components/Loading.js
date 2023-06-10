import { ActivityIndicator, StyleSheet, View } from "react-native";
import { SPACING } from "../config/constants";
import { useTheme } from "@react-navigation/native";

const Loading = ({ c, s }) => {
  let COLORS = useTheme().colors;
  let STYLES = useTheme().styles;

  // If the theme is not accessible, use props
  if (!COLORS || !STYLES) {
    COLORS = c;
    STYLES = s;
  }

  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
    },
    indicator: {
      marginTop: SPACING.normal,
      marginBottom: SPACING.normal,
    },
  });

  return (
    <View style={[STYLES.container, styles.container]}>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );
};

export default Loading;

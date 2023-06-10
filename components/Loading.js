import { ActivityIndicator, StyleSheet, View } from "react-native";
import { SPACING } from "../config/constants";
import { useTheme } from "@react-navigation/native";

const Loading = () => {
  const COLORS = useTheme().colors;
  const STYLES = useTheme().styles;

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

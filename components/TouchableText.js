import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";

const TouchableText = ({ onPress, label }) => {
  const COLORS = useTheme().colors;
  const STYLES = useTheme().styles;

  const styles = StyleSheet.create({
    forgotPassword: {
      color: COLORS.primary,
      textAlign: "center",
    },
  });

  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[STYLES.bodyLarge, styles.forgotPassword]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TouchableText;

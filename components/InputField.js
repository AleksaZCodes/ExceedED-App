import { useTheme } from "@react-navigation/native";
import { View, StyleSheet, Text } from "react-native";
import { SPACING } from "../config/constants";
import Input from "./Input";

const InputField = ({ formikProps, field, title, input }) => {
  const COLORS = useTheme().colors;
  const STYLES = useTheme().styles;

  const styles = StyleSheet.create({
    headlineSmall: {
      color: COLORS.text,
      textAlign: "left",
      marginBottom: SPACING.normal,
    },
    error: {
      color: COLORS.red,
      marginBottom: SPACING.normal,
      left: 30,
    },
  });

  return (
    <View>
      <Text style={[STYLES.headlineSmall, styles.headlineSmall]}>{title}</Text>
      <Input
        onChangeText={formikProps.handleChange(field)}
        onBlur={formikProps.handleBlur(field)}
        value={formikProps.values[field]}
        {...input}
      />
      <Text style={[STYLES.bodyLarge, styles.error]}>
        {formikProps.errors[field]}
      </Text>
    </View>
  );
};

export default InputField;

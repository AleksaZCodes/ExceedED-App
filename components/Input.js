import { useTheme } from "@react-navigation/native";
import { StyleSheet, TextInput } from "react-native";

const Input = (props) => {
  const COLORS = useTheme().colors;
  const STYLES = useTheme().styles;

  const styles = StyleSheet.create({
    container: {
      height: 50,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      paddingLeft: 30,
      paddingRight: 30,
      backgroundColor: COLORS.background,
      borderColor: COLORS.gray,
      borderWidth: 3,
      borderBottomWidth: 5,
      borderRightWidth: 5,
    },
    label: {
      textAlign: "left",
      color: COLORS.text,
    },
  });

  return (
    <TextInput
      {...props}
      cursorColor={COLORS.primary}
      selectionColor={COLORS.primary}
      placeholderTextColor={COLORS.gray}
      style={[
        styles.container,
        STYLES.titleMedium,
        styles.label,
        { ...props.style },
      ]}
    />
  );
};

export default Input;

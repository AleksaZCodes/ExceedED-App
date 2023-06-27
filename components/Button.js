import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SIZES } from "../config/constants";
import { useTheme } from "@react-navigation/native";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

const Button = ({
  type,
  label,
  onPress,
  style,
  iconType,
  iconName,
  iconColor,
  textColor,
}) => {
  const COLORS = useTheme().colors;
  const STYLES = useTheme().styles;

  const styles = StyleSheet.create({
    container: {
      height: 50,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
    containerFull: {
      backgroundColor: COLORS.primary,
    },
    containerOutline: {
      backgroundColor: COLORS.background,
      borderColor: COLORS.gray,
      borderWidth: 3,
      borderBottomWidth: 5,
      borderRightWidth: 5,
    },
    label: {
      textAlign: "center",
    },
    labelFull: {
      color: COLORS.background,
    },
    labelOutline: {
      color: COLORS.primary,
    },
    gradient: {
      width: "100%",
    },
  });

  if (type === "full") {
    return (
      <TouchableOpacity
        style={[
          styles.container,
          type === "full" ? styles.containerFull : styles.containerOutline,
          { ...style },
        ]}
        onPress={onPress}
      >
        {iconType === "ANT" ? (
          <AntDesign
            name={iconName}
            size={SIZES.headlineSmall}
            color={iconColor}
            style={{ marginRight: 5 }}
          />
        ) : (
          <MaterialCommunityIcons
            name={iconName}
            size={SIZES.headlineSmall}
            color={iconColor}
            style={{ marginRight: 5 }}
          />
        )}

        <Text
          style={[
            STYLES.titleMedium,
            styles.label,
            type === "full" ? styles.labelFull : styles.labelOutline,
            textColor !== undefined ? { color: textColor } : {},
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.container, styles.containerOutline, { ...style }]}
      onPress={onPress}
    >
      {iconType === "ANT" ? (
        <AntDesign
          name={iconName}
          size={SIZES.headlineSmall}
          color={iconColor}
          style={{ marginRight: 5 }}
        />
      ) : (
        <MaterialCommunityIcons
          name={iconName}
          size={SIZES.headlineSmall}
          color={iconColor}
          style={{ marginRight: 5 }}
        />
      )}

      <Text
        style={[
          STYLES.titleMedium,
          styles.label,
          styles.labelOutline,
          textColor !== undefined ? { color: textColor } : {},
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

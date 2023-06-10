import { useTheme } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";

const ProgressBar = ({ progress, color, height = 30, borderRadius = 30 }) => {
  const COLORS = useTheme().colors;

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
    background: {
      flex: 1,
      flexDirection: "row",
      height,
      borderColor: COLORS.gray,
      borderRadius,
      borderWidth: 3,
      borderBottomWidth: 5,
      borderRightWidth: 5,
      backgroundColor: COLORS.background,
    },
    progressBar: {
      height: "100%",
      backgroundColor: color,
      borderRadius,
      width: `${progress * 100}%`,
    },
    progressText: {
      marginLeft: 10,
      textAlignVertical: "center",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <View style={styles.progressBar} />
      </View>
    </View>
  );
};

export default ProgressBar;

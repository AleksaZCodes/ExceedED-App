import { useTheme } from "@react-navigation/native";
import { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Text } from "react-native";

const ProgressBar = ({
  progress,
  color,
  width = "100%",
  height = 25,
  borderRadius = 25,
}) => {
  const COLORS = useTheme().colors;
  const STYLES = useTheme().styles;

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      width,
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
    bar: {
      height: "100%",
      backgroundColor: color,
      borderRadius,
      width: `${progress * 100}%`,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  const w = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(w, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const animatedStyle = {
    width: w.interpolate({
      inputRange: [0, 1],
      outputRange: ["0%", "100%"],
    }),
  };

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Animated.View style={[styles.bar, animatedStyle]} />
      </View>
    </View>
  );
};

export default ProgressBar;

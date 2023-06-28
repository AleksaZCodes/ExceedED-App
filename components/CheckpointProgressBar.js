import { useTheme } from "@react-navigation/native";
import { View, StyleSheet, Animated, Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { SIZES } from "../config/constants";
import { useEffect, useRef } from "react";

const CheckpointProgressBar = ({
  progress,
  color,
  checkpointNumber = 4,
  width = "100%",
  height = 25,
  borderRadius = 25,
  style,
}) => {
  const COLORS = useTheme().colors;

  const styles = StyleSheet.create({
    container: {
      width,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    background: {
      flexDirection: "row",
      width: "100%",
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
    },
    starsContainer: {
      flexDirection: "row",
      position: "absolute",
      width: "100%",
      zIndex: 1,
      borderColor: COLORS.text,
    },
    starContainer: {
      justifyContent: "center",
      alignItems: "center",
      margin: -3,
    },
    star: {
      position: "absolute",
    },
  });

  const w = useRef(new Animated.Value(0)).current;
  const starOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(w, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();

    Animated.timing(starOpacity, {
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

  // Calculate the last index of a filled star
  const segmentWidthPercents = 1 / (checkpointNumber + 1);
  const epsilon = 0.000001; // For compensating floating point precision
  const lastIndex = Math.floor((progress + epsilon) / segmentWidthPercents);

  // Calculate margin value
  const windowWidth = Dimensions.get("window").width;
  const barWidth = windowWidth * (Number(width.split("%")[0]) / 100);
  const segmentWidth = segmentWidthPercents * barWidth;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.starsContainer}>
        {Array(checkpointNumber)
          .fill()
          .map((_, index) => {
            const isFilled = index < lastIndex;
            const starColor = isFilled ? color : COLORS.background;

            return (
              <View
                key={index}
                style={[
                  styles.starContainer,
                  {
                    marginLeft:
                      (index === 0 ? segmentWidth : segmentWidth / 2) -
                      SIZES.displayMedium / 2,
                    marginRight:
                      (index + 1 === checkpointNumber
                        ? segmentWidth
                        : segmentWidth / 2) -
                      SIZES.displayMedium / 2,
                  },
                ]}
              >
                <AntDesign
                  name={isFilled ? "star" : "staro"}
                  size={SIZES.displayMedium}
                  color={COLORS.gray}
                />
                <Animated.View
                  style={[
                    styles.star,
                    {
                      opacity: starOpacity.interpolate({
                        inputRange: [
                          segmentWidthPercents * index,
                          segmentWidthPercents * (index + 1),
                        ],
                        outputRange: [0, isFilled ? 1 : 0],
                        extrapolate: "clamp",
                      }),
                    },
                  ]}
                >
                  <AntDesign
                    name="star"
                    size={SIZES.displaySmall}
                    color={starColor}
                  />
                </Animated.View>
              </View>
            );
          })}
      </View>
      <View style={styles.background}>
        <Animated.View style={[styles.bar, animatedStyle]} />
      </View>
    </View>
  );
};

export default CheckpointProgressBar;

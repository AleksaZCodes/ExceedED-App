import { Image, StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import { useTheme } from "@react-navigation/native";
import { SPACING } from "../config/constants";

const WelcomeScreen = ({ navigation }) => {
  const COLORS = useTheme().colors;
  const STYLES = useTheme().styles;

  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
    },
    container1: {
      justifyContent: "space-between",
      alignItems: "center",
    },
    logo: {
      width: 1920 / 7,
      height: 272 / 7,
      marginBottom: SPACING.normal * 2,
    },
    slogan: {
      color: COLORS.text,
      textAlign: "center",
    },
    buttons: {
      width: "100%",
      alignItems: "center",
    },
    button: {
      marginBottom: SPACING.normal,
      width: "90%",
    },
  });

  return (
    <View style={[STYLES.container, styles.container1]}>
      <View style={[STYLES.container, styles.container]}>
        <Image
          source={require("../assets/logo-foreground.png")}
          resizeMode="contain"
          style={styles.logo}
        />
        <Text style={[STYLES.titleMedium, styles.slogan]}>
          Nauči da učiš i nadmaši sebe.
        </Text>
      </View>

      <View style={styles.buttons}>
        <Button
          type="full"
          style={styles.button}
          label="NAPRAVI NALOG"
          onPress={() => navigation.navigate("Signup")}
        />
        <Button
          type="outline"
          style={styles.button}
          label="VEĆ IMAM NALOG"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </View>
  );
};

export default WelcomeScreen;

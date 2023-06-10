import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";

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
      width: "80%",
      aspectRatio: 5,
      marginBottom: SPACING.normal,
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
    },
  });

  return (
    <View style={[STYLES.container, styles.container1]}>
      <View style={[STYLES.container, styles.container]}>
        <Image
          style={styles.logo}
          source={require("../assets/logo-foreground.svg")}
          contentFit="contain"
          transition={100}
        />
        <Text style={[STYLES.titleLarge, styles.slogan]}>
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

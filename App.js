import { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Alert, StyleSheet, useColorScheme } from "react-native";
import { DARK_COLORS, LIGHT_COLORS, SIZES, SPACING } from "./config/constants";
import { createTextStyle } from "./config/helpers";
import { useGlobalState } from "./config/globalState";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import NetInfo from "@react-native-community/netinfo";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./screens/WelcomeScreen";
import { customFonts } from "./config/constants";
import TabsNavigator from "./screens/TabNavigator";
import SignupScreen from "./screens/SignupScreen";

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
  // Local state
  const [ready, setReady] = useState(false);

  // Global state
  const account = useGlobalState("account")[0];
  const colorScheme = useGlobalState("colorScheme")[0];

  // Color scheme based on device's or setting
  const deviceScheme = useColorScheme();
  const COLORS =
    colorScheme || deviceScheme === "light" ? LIGHT_COLORS : DARK_COLORS;

  // Global styles
  const STYLES = StyleSheet.create({
    // Regular styles
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    background: {
      backgroundColor: COLORS.background,
    },
    card: {
      backgroundColor: COLORS.background,
      borderWidth: 3,
      borderRadius: 20,
      borderColor: COLORS.gray,
      marginTop: SPACING.normal,
      padding: SPACING.normal,
      borderBottomWidth: 5,
      borderRightWidth: 5,
    },

    // Text styles
    ...Object.fromEntries(
      Object.entries(SIZES).map(([key, size]) => {
        const style = createTextStyle(size, COLORS);
        return [key, style];
      })
    ),
  });

  // Theme used later in other components
  const THEME = { colors: COLORS, styles: STYLES };

  // Check for internet connection
  const connectionUnsubscribe = NetInfo.addEventListener((state) => {
    if (!state.isConnected) {
      Alert.alert(
        "Nema internet konekcije",
        "Neophodno je da imate internet konekciju kako biste koristili aplikaciju. Povežite se i pokušajte ponovo."
      );
    }
  });

  // Prepare everything on loading
  useEffect(() => {
    async function prepare() {
      try {
        // Load the fonts from constants
        await Font.loadAsync(customFonts);
      } catch (e) {
        alert(e);
      } finally {
        setReady(true);
      }
    }

    prepare();
  }, []);

  // Hide the splashscreen when the app loads
  const onLayoutRootView = useCallback(async () => {
    if (ready) {
      await SplashScreen.hideAsync();
    }
  }, [ready]);

  if (!ready) return null;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={STYLES.container} onLayout={onLayoutRootView}>
        {!account ? (
          <NavigationContainer theme={THEME}>
            <Stack.Navigator
              initialRouteName="Welcome"
              screenOptions={{ headerShown: false, animation: "none" }}
            >
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
              <Stack.Screen name="Signup" component={SignupScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        ) : (
          <NavigationContainer theme={THEME}>
            <Stack.Navigator
              initialRouteName="Tabs"
              screenOptions={{ headerShown: false, animation: "none" }}
            >
              <Stack.Screen name="Tabs" component={TabsNavigator} />
            </Stack.Navigator>
          </NavigationContainer>
        )}

        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

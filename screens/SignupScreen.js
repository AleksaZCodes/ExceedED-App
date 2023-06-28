import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as Linking from "expo-linking";
import { useTheme } from "@react-navigation/native";
import { Formik } from "formik";
import { AUTH_SCHEMA, SPACING } from "../config/constants";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { supabase } from "../config/supabase";
import * as WebBrowser from "expo-web-browser";
import TouchableText from "../components/TouchableText";
import CheckpointProgressBar from "../components/CheckpointProgressBar";

const SignupScreen = ({ navigation }) => {
  const COLORS = useTheme().colors;
  const STYLES = useTheme().styles;

  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
    container1: {
      width: "90%",
      justifyContent: "center",
    },
    text: {
      marginTop: SPACING.normal,
      marginBottom: SPACING.normal,
    },
    button: {
      marginBottom: SPACING.normal,
    },
    progressBar: {
      marginTop: SPACING.normal * 2,
    },
  });

  // Local state
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);

  // Keyboard shown listeners for the progress bar
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setTyping(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setTyping(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // Signs the user up with email and password
  const signUpWithEmail = async ({ email, password }) => {
    setLoading(true);

    // Wait for supabase to process the request
    const authentication = await supabase.auth.signUp({
      email,
      password,
    });

    // Display errors if any
    if (authentication.error) alert(authentication.error.message);

    console.log(authentication.data.user.id);

    setLoading(false);
  };

  // Signs the user up with Google OAuth
  const signInWithGoogle = async () => {
    setLoading(true);

    // Fetch the authentication from supabase
    const authentication = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    const redirectUrl = Linking.makeUrl("auth-callback");
    console.log(redirectUrl);

    const result = await WebBrowser.openAuthSessionAsync(
      authentication.data.url,
      redirectUrl
    );

    if (result.type === "success" && !result.errorCode) {
      // Retrieve the access token from the authentication result
      const access_token = result.url.split("access_token=")[1].split("&")[0];

      // Use the access token to sign in with Supabase
      const { user, error } = await supabase.auth.signIn({
        provider: "google",
        access_token,
      });

      if (error) {
        console.error("Error signing in with Google:", error);
      } else {
        console.log("Successfully signed in with Google:", user);
      }
    }

    setLoading(false);
  };

  if (loading) return <Loading c={COLORS} s={STYLES} />;

  return (
    <View style={[STYLES.container, styles.container]}>
      {!typing && (
        <CheckpointProgressBar
          style={styles.progressBar}
          color={COLORS.primary}
          width="90%"
          checkpointNumber={3}
          progress={6 / 8}
        />
      )}
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={AUTH_SCHEMA}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={async (values) => {
          await signUpWithEmail(values);
        }}
      >
        {(formikProps) => (
          <KeyboardAvoidingView
            style={[STYLES.container, styles.container1]}
            behavior="padding"
          >
            <InputField
              formikProps={formikProps}
              field="email"
              title="Napravi nalog mejlom"
              input={{
                placeholder: "Email",
                autoComplete: "email",
                keyboardType: "email-address",
              }}
            />

            <InputField
              formikProps={formikProps}
              field="password"
              title="i (novom) lozinkom"
              input={{
                placeholder: "Lozinka",
                autoComplete: "password-new",
                secureTextEntry: true,
              }}
            />

            <Button
              type="full"
              label="NASTAVI"
              onPress={() => formikProps.handleSubmit()}
            />

            <Text style={[STYLES.headlineSmall, styles.text]}>ili</Text>

            <Button
              type="outline"
              iconType="ANT"
              iconName="google"
              iconColor={COLORS.primary}
              style={styles.button}
              label="KORISTEĆI GOOGLE"
            />

            <TouchableText label="NASTAVI ANONIMNO" />
          </KeyboardAvoidingView>
        )}
      </Formik>
    </View>
  );
};

export default SignupScreen;

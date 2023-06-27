import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Formik } from "formik";
import { EMAIL_SCHEMA, SPACING } from "../config/constants";
import Input from "../components/Input";
import Button from "../components/Button";
import { supabase } from "../config/supabase";
import { useState } from "react";

const PasswordResetScreen = ({ navigation, route }) => {
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
    headlineSmall: {
      color: COLORS.text,
      textAlign: "left",
      marginBottom: SPACING.normal,
    },
    input: {
      width: "100%",
    },
    button: {
      width: "100%",
    },
    error: {
      color: COLORS.red,
      marginBottom: SPACING.normal,
      left: 30,
    },
  });

  // Local state
  const [loading, setLoading] = useState(false);

  // Resets the user's password using supabase
  const resetPassword = async (email) => {
    setLoading(true);

    supabase.auth
      .resetPasswordForEmail(email)
      .then(() => {
        // Notify the user about the email being sent
        alert("Poslali smo vam mejl za reset");

        navigation.navigate("Login");
      })
      .catch((error) => {
        // Display errors if any
        alert(error);
      });

    setLoading(false);
  };

  return (
    <View style={[STYLES.container, styles.container]}>
      <Formik
        initialValues={{ email: route.params.email }}
        validationSchema={EMAIL_SCHEMA}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={async (values) => {
          await resetPassword(values.email);
        }}
      >
        {(formikProps) => (
          <KeyboardAvoidingView
            style={[STYLES.container, styles.container1]}
            behavior="padding"
          >
            <Text style={[STYLES.headlineSmall, styles.headlineSmall]}>
              Ukucaj mejl tvog naloga:
            </Text>
            <Input
              placeholder="Email"
              style={styles.input}
              autoComplete="email"
              keyboardType="email-address"
              onChangeText={formikProps.handleChange("email")}
              onBlur={formikProps.handleBlur("email")}
              value={formikProps.values.email}
            />
            <Text style={[STYLES.bodyLarge, styles.error]}>
              {formikProps.errors.email}
            </Text>

            <Button
              type="full"
              label="NASTAVI"
              style={styles.button}
              onPress={() => formikProps.handleSubmit()}
            />
          </KeyboardAvoidingView>
        )}
      </Formik>
    </View>
  );
};

export default PasswordResetScreen;

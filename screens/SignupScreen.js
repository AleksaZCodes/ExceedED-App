import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import Input from "../components/Input";
import { Formik } from "formik";
import { AUTH_SCHEMA, SPACING } from "../config/constants";
import Button from "../components/Button";
import InputField from "../components/InputField";

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
  });

  return (
    <View style={[STYLES.container, styles.container]}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={AUTH_SCHEMA}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={async (values) => {
          await signup(values);
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
          </KeyboardAvoidingView>
        )}
      </Formik>
    </View>
  );
};

export default SignupScreen;

import * as Yup from "yup";
import { changeHue } from "./colors";

// Colors
const primary = "#3DCCAD";
const accent_colors = {
  primary,

  white: "#EEEEEE",
  red: changeHue(primary, 0 - 167),
  orange: changeHue(primary, 30 - 167),
  yellow: changeHue(primary, 60 - 167),
  green: changeHue(primary, 140 - 167),
  purple: changeHue(primary, 300 - 167),
};

// Light theme
export const LIGHT_COLORS = {
  background: accent_colors.white,
  gray: "#D7D8DB",
  text: "#42394D",

  ...accent_colors,
};

// Dark theme
export const DARK_COLORS = {
  background: "#302A38",
  gray: "#55505C",
  text: accent_colors.white,

  ...accent_colors,
};

// Font sizes according to MD3
export const SIZES = {
  displayLarge: 57,
  displayMedium: 45,
  displaySmall: 36,
  headlineLarge: 32,
  headlineMedium: 28,
  headlineSmall: 24,
  titleLarge: 22,
  titleMedium: 16,
  titleSmall: 14,
  bodyLarge: 16,
  bodyMedium: 14,
  bodySmall: 12,
  labelLarge: 14,
  labelMedium: 12,
  labelSmall: 11,
};

// Spacing between elements
export const SPACING = {
  normal: 15,
};

// Shorts for font names
export const FONTS = {
  bold: "Signika-Bold",
  semiBold: "Signika-SemiBold",
  medium: "Signika-Medium",
  regular: "Signika-Regular",
  light: "Signika-Light",
};

// Font files for loading
export const customFonts = {
  "Signika-Regular": require("../assets/fonts/Signika-Regular.ttf"),
  "Signika-Bold": require("../assets/fonts/Signika-Bold.ttf"),
  "Signika-SemiBold": require("../assets/fonts/Signika-SemiBold.ttf"),
  "Signika-Light": require("../assets/fonts/Signika-Light.ttf"),
  "Signika-Medium": require("../assets/fonts/Signika-Medium.ttf"),
};

// Verification schema for email and password auth
export const AUTH_SCHEMA = Yup.object({
  email: Yup.string()
    .required("Email je obavezan!")
    .email("Email mora biti validan!"),
  password: Yup.string()
    .required("Lozinka je obavezna!")
    .min(6, "Lozinka mora imati najmanje 6 karaktera!"),
});

// Verification schema for password reset
export const EMAIL_SCHEMA = Yup.object({
  email: Yup.string().required("Obavezno polje!").email("Mora biti validan!"),
});

// Verification schema for name setup
export const NAME_SCHEMA = Yup.object({
  name: Yup.string()
    .required("Obavezno polje!")
    .max(20, "Može da sadrži najviše 20 karaktera!")
    .matches(
      /^[abvgdđežzijklmnoprstćufhcčšqwxyABVGDĐEŽZIJKLMNOPRSTĆUFHCČŠQWXY 0123456789]*$/,
      "Može da sadrži samo slova i brojeve!"
    ),
});

// Verification schema for username setup
export const USERNAME_SCHEMA = Yup.object({
  username: Yup.string()
    .required("Obavezno polje!")
    .matches(
      /^[abvgdđežzijklmnoprstćufhcčšABVGDĐEŽZIJKLMNOPRSTĆUFHCČŠ0123456789]*$/,
      "Može da sadrži samo slova i brojeve!"
    )
    .max(25, "Može da sadrži najviše 25 karaktera!"),
});

// Verification schema for grade setup
export const GRADE_SCHEMA = Yup.object({
  grade: Yup.number("Mora biti broj!")
    .typeError("Mora biti broj!")
    .required("Obavezno polje!")
    .integer("Mora biti ceo broj!")
    .lessThan(9, "Mora biti broj od 5 do 8!")
    .moreThan(4, "Mora biti broj od 5 do 8!"),
});

// Verification schema for account details change
export const ACCOUNT_SCHEMA = Yup.object({
  name: Yup.string()
    .required("Obavezno polje!")
    .max(20, "Može da sadrži najviše 20 karaktera!")
    .matches(
      /^[abvgdđežzijklmnoprstćufhcčšqwxyABVGDĐEŽZIJKLMNOPRSTĆUFHCČŠQWXY 0123456789]*$/,
      "Može da sadrži samo slova i brojeve!"
    ),
  username: Yup.string()
    .required("Obavezno polje!")
    .matches(
      /^[abvgdđežzijklmnoprstćufhcčšABVGDĐEŽZIJKLMNOPRSTĆUFHCČŠ0123456789]*$/,
      "Može da sadrži samo slova i brojeve!"
    )
    .max(25, "Može da sadrži najviše 25 karaktera!"),
  grade: Yup.number("Mora biti broj!")
    .typeError("Mora biti broj!")
    .required("Obavezno polje!")
    .integer("Mora biti ceo broj!")
    .lessThan(9, "Mora biti broj od 5 do 8!")
    .moreThan(4, "Mora biti broj od 5 do 8!"),
});

// Verification schema for referrer username
export const REFERRER_SCHEMA = Yup.object({
  referrer: Yup.string()
    .matches(
      /^[abvgdđežzijklmnoprstćufhcčšABVGDĐEŽZIJKLMNOPRSTĆUFHCČŠ0123456789]*$/,
      "Može da sadrži samo slova i brojeve!"
    )
    .max(25, "Može da sadrži najviše 25 karaktera!"),
});

// Verification schema for course codes
export const CODE_SCHEMA = Yup.object({
  code: Yup.string()
    .required("Obavezno polje!")
    .max(6, "Mora biti kod od tačno 6 karaktera!")
    .min(6, "Mora biti kod od tačno 6 karaktera!"),
});

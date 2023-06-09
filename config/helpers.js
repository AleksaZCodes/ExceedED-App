import { FONTS } from "./constants";

// Checks if the dates are exactly 1 day apart
export const isOneDayApart = (dateString1, dateString2) => {
  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);
  const diffInMs = Math.abs(date2.getTime() - date1.getTime());
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  return diffInDays === 1;
};

// Used for condensing the code in STYLES
export const createTextStyle = (size, COLORS) => ({
  fontFamily: FONTS.semiBold,
  color: COLORS.text,
  fontSize: size,
});

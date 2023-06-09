import { createGlobalState } from "react-hooks-global-state";

// Creates a global state object with important keys
const { setGlobalState, useGlobalState } = createGlobalState({
  // App state
  account: false,
  tutorial: false,
  scheme: null,
  headerExplanation: "",

  // User's data
  uid: "",
  name: "",
  username: "",
  grade: 0,
  experience: 0,
  pfp: 0,
  energy: 0,
  currency: 0,
  streak: 0,

  // Courses
  courses: {},
  current: "",

  // Leaderboard
  place: 0,

  // Bonuses
  bonus: 0,
  new_energy: 0,
  lost_streak: false,
});

export { setGlobalState, useGlobalState };

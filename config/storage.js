import AsyncStorage from "@react-native-async-storage/async-storage";

// Loads a string to storage
export const setString = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    alert(e);
  }
};

// Fetches a string from storage
export const getString = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    alert(e);
  }
};

// Loads a JSON object to storage
export const setJSON = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    alert(e);
  }
};

// Fetches a string from storage and parses it to JSON
export const getJSON = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    alert(e);
  }
};

// Deletes an item from storage
export const deleteItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    alert(e);
  }
};

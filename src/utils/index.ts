import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUserID = async () => {
  const userString = await AsyncStorage.getItem("@user");
  if (userString) {
    const user = JSON.parse(userString);
    return user.accountID as string;
  }
  return "";
};

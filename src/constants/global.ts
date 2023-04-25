import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const global = {
  styles: StyleSheet.create({
    mainPageText: {
      fontFamily: "Poppins_600SemiBold",
      fontSize: 28,
      marginVertical: 25,
    },
    container: {
      borderBottomColor: colors.highlight,
      borderBottomWidth: 1,
      paddingBottom: 15,
    },
  }),
};

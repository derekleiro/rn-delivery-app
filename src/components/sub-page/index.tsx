import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { global } from "../../constants/global";
import Authorized from "../authrized";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type SubPageProps = {
  navigation: any;
  name: string;
  children: any;
  backPress: any;
};
const SubPage = (props: SubPageProps) => {
  const { navigation, name, children, backPress } = props;
  const insets = useSafeAreaInsets();

  return (
    <View style={{...styles.subpage, paddingTop: insets.top + 25}}>
      <Authorized navigation={navigation}>
        <View style={{ width: "100%" }}>
          <View>
            <TouchableOpacity onPress={backPress}>
              <Ionicons
                style={{ marginRight: 15 }}
                name="arrow-back-sharp"
                size={28}
                color="black"
              />
            </TouchableOpacity>

            <Text style={{...global.styles.mainPageText, marginVertical: 0}}>{name}</Text>
          </View>
          {children}
        </View>
      </Authorized>
    </View>
  );
};

export const styles = StyleSheet.create({
  subpage: {
    zIndex: 9999999999999,
    height: "100%",
    width: "100%",
    position: "absolute",
    backgroundColor: "#f0f0f0",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default SubPage;

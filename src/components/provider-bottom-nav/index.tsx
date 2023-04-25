import { View, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { colors } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { navigate } from "../../store/slices/bottom-nav";

const ProviderBottomNav = (props: any) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state.nav.nav);
  const icons: any = {
    ProviderHome: {
      active: "home" as string,
      default: "home-outline" as string,
    },
    ProviderInventory: {
      active: "grid" as string,
      default: "grid-outline" as string,
    },
    ProviderReports: {
      active: "albums" as string,
      default: "albums-outline" as string,
    },
    ProviderProfile: {
      active: "person" as string,
      default: "person-outline" as string,
    },
  };

  const setIcon = (name: string) => {
    return state === name
      ? [icons[name].active, colors.primary]
      : [icons[name].default, "#000"];
  };

  const handleNavigation = (route: string) => {
    navigation.navigate(route);
    dispatch(navigate(route))
  };
  return (
    <SafeAreaView style={styles.safeViewContainer}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => handleNavigation("ProviderHome")}
          style={styles.button}
        >
          <Ionicons
            name={setIcon("ProviderHome")[0]}
            size={28}
            color={setIcon("ProviderHome")[1]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleNavigation("ProviderInventory")}
          style={styles.button}
        >
          <Ionicons
            name={setIcon("ProviderInventory")[0]}
            size={28}
            color={setIcon("ProviderInventory")[1]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleNavigation("ProviderReports")}
          style={styles.button}
        >
          <Ionicons
            name={setIcon("ProviderReports")[0]}
            size={28}
            color={setIcon("ProviderReports")[1]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleNavigation("ProviderProfile")}
          style={styles.button}
        >
          <Ionicons
            name={setIcon("ProviderProfile")[0]}
            size={28}
            color={setIcon("ProviderProfile")[1]}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 15,
  },
  safeViewContainer: {
    width: "100%",
    display: "flex",
    position: "absolute",
    backgroundColor: `#e1def4`,
    bottom: 0,
    zIndex: 0,
    borderTopColor: "#ddd",
    borderTopWidth: 1,
  },

  button: {
    alignItems: "center",
    flex: 1,
  },
});

export default ProviderBottomNav;

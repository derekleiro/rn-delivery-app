import { View, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { colors } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { navigate } from "../../store/slices/bottom-nav";
//import { useMaterialYou, defaultPalette } from '@assembless/react-native-material-you';

const BottomNav = (props: any) => {
  const { navigation } = props;
  //const { palette } = useMaterialYou({ fallbackPalette: defaultPalette });
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state.nav.nav);
  const icons: any = {
    Home: { active: "home" as string, default: "home-outline" as string },
    Orders: { active: "grid" as string, default: "grid-outline" as string },
    Profile: {
      active: "person" as string,
      default: "person-outline" as string,
    },
  };

  const setIcon = (name: string) => {
    return state === name ? [icons[name].active, colors.primary] : [icons[name].default, "#000"];
  };

  const handleNavigation = (route: string) => {
    navigation.navigate(route);
    dispatch(navigate(route))
  };
  return (
    <SafeAreaView style={{...styles.safeViewContainer}}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => handleNavigation("Home")}
          style={styles.button}
        >
          <Ionicons name={setIcon("Home")[0]} size={28} color={setIcon("Home")[1]} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleNavigation("Orders")}
          style={styles.button}
        >
          <Ionicons name={setIcon("Orders")[0]} size={28} color={setIcon("Orders")[1]} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleNavigation("Profile")}
          style={styles.button}
        >
          <Ionicons
            name={setIcon("Profile")[0]}
            size={28}
            color={setIcon("Profile")[1]}
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
    backgroundColor: colors.highlight,
    bottom: 0,
    flex: 1,
    height: 60,
    borderTopColor: "#ddd",
    borderTopWidth: 1,
  },

  button: {
    alignItems: "center",
    flex: 1,
  },
});

export default BottomNav;

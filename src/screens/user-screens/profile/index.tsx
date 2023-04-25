import { View, StyleSheet, Text } from "react-native";
import Authorized from "../../../components/authrized";
import BottomNav from "../../../components/bottom-nav";
import { global } from "../../../constants/global";
import { useDispatch } from "react-redux";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { fetchProfile, handleLogout } from "../../login-and-signup/function";
import { colors } from "../../../constants/colors";
import { AntDesign } from "@expo/vector-icons";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useEffect, useState } from "react";

const ProfileScreen = (props: { navigation: any }) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const [data, setData] = useState<any>({
    name: "",
    email: "",
    phoneNumber: "",
    dob: "",
    role_type: "",
  });
  const [atTheTop, setAtTheTop] = useState<boolean>(true);

  const logout = async () => {
    handleLogout({ dispatch, navigation });
  };

  useEffect(() => {
    fetchProfile({ dispatch, setData });
  }, []);

  return (
    <>
      <View
        style={
          atTheTop
            ? { ...styles.defaultNavStyle, paddingTop: insets.top }
            : {
                ...styles.defaultNavStyle,
                ...styles.shadowStyle,
                paddingTop: insets.top,
              }
        }
      >
        <Text style={{ ...global.styles.mainPageText, marginVertical: 0 }}>
          Profile
        </Text>
      </View>
      <Authorized
        atTheTop={(value: number) => {
          if (value > 25) {
            setAtTheTop(false);
          } else {
            setAtTheTop(true);
          }
        }}
        navigation={navigation}
      >
        <View>
          <View style={styles.inputContainer}>
            <AntDesign style={styles.icon} name="user" size={24} />
            <TextInput
              style={styles.textInput}
              autoCapitalize={"none"}
              value={data.name}
              editable={false}
            ></TextInput>
          </View>
          <View style={styles.inputContainer}>
            <AntDesign style={styles.icon} name="phone" size={24} />
            <TextInput
              style={styles.textInput}
              autoCapitalize={"none"}
              value={data.phoneNumber.toString()}
              editable={false}
            ></TextInput>
          </View>
          <View style={styles.inputContainer}>
            <AntDesign style={styles.icon} name="staro" size={24} />
            <TextInput
              style={styles.textInput}
              autoCapitalize={"none"}
              value={data.dob}
              editable={false}
            ></TextInput>
          </View>
          <View style={styles.inputContainer}>
            <AntDesign style={styles.icon} name="mail" size={24} />
            <TextInput
              style={styles.textInput}
              autoCapitalize={"none"}
              value={data.email}
              editable={false}
            ></TextInput>
          </View>
          <View style={styles.inputContainer}>
            <AntDesign style={styles.icon} name="contacts" size={24} />
            <TextInput
              style={styles.textInput}
              autoCapitalize={"none"}
              value={data.role_type}
              editable={false}
            ></TextInput>
          </View>
        </View>

        <TouchableOpacity onPress={logout} style={styles.btn}>
          <View style={{ flexDirection: "row" }}>
            <AntDesign
              style={styles.icon}
              name="logout"
              size={24}
              color={"white"}
            />
            <Text
              style={{
                color: "white",
                fontFamily: "Poppins_600SemiBold",
                textAlign: "center",
                fontSize: 16,
              }}
            >
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </Authorized>
      <BottomNav navigation={navigation} />
    </>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: "100%",
    padding: 12.5,
    backgroundColor: colors.error,
    borderRadius: 15,
    alignItems: "center",
    bottom: 0,
    flexDirection: "row",
  },
  icon: {
    marginRight: 10,
  },
  defaultNavStyle: {
    width: "100%",
    paddingLeft: 25,
    paddingBottom: 10,
    justifyContent: "flex-end",
    height: 125,
    top: 0,
    zIndex: 90,
    backgroundColor: "#f0f0f0",
  },
  shadowStyle: {
    borderBottomColor: colors.highlight,
    borderBottomWidth: 1,
  },
  inputContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: colors.highlight,
    alignItems: "center",
    marginVertical: 10,
  },
  textInput: {
    padding: 10,
    fontSize: 16,
    flex: 1,
    fontFamily: "Poppins_400Regular",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ProfileScreen;

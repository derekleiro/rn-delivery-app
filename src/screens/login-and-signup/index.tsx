import { useEffect, useState } from "react";
import { Image, View, StyleSheet, ScrollView } from "react-native";
import LoginJSX from "./components/login";
import icon from "../../assets/imgs/icon.png";
import RegisterJSX from "./components/register";
import ProviderRegisterJSX from "./components/provider-register";
import AsyncStorage from "@react-native-async-storage/async-storage";

type T = "userLogin" | "userRegister" | "providerLogin" | "providerRegister";

const AuthScreen = (props: { navigation: any }) => {
  const { navigation } = props;
  const [accountType, setAccountType] = useState<T>("userLogin");

  const getAuth = async () => {
    const value = await AsyncStorage.getItem("@user");
    if (value) {
      const jsonValue = JSON.parse(value);
      if (jsonValue.role === "Provider") {
        navigation.navigate("ProviderHome");
      } else {
        navigation.navigate("Home");
      }
    }
  };
  useEffect(() => {
    getAuth();
  }, []);

  const render = () => {
    switch (accountType) {
      case "userLogin":
        return (
          <LoginJSX
          state={accountType}
            navigation={navigation}
            setAccountType={(type: T) => setAccountType(type)}
          />
        );
      case "userRegister":
        return (
          <RegisterJSX
            navigation={navigation}
            setAccountType={(type: T) => setAccountType(type)}
          />
        );
      case "providerLogin":
        return (
          <LoginJSX
          state={accountType}
            navigation={navigation}
            setAccountType={(type: T) => setAccountType(type)}
          />
        );
      default:
        return (
          <ProviderRegisterJSX
            navigation={navigation}
            setAccountType={(type: T) => setAccountType(type)}
          />
        );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ width: "100%" }}>
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={icon} />
        </View>
        {render()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 25,
    paddingVertical: 50,
    zIndex: -1,
  },
  imgContainer: {
    width: "100%",
    alignItems: "center",
  },
  img: {
    width: 250,
    height: 250,
  },
});

export default AuthScreen;

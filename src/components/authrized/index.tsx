import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

export const Authorized = (props: {
  children: any;
  navigation: any;
  customStyle?: object;
  atTheTop?: Function;
}) => {
  const { children, navigation, atTheTop, customStyle } = props;

  const getAuth = async () => {
    const value = await AsyncStorage.getItem("@user");
    if (!value) {
      navigation.navigate("Auth");
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {

    if(atTheTop){
      atTheTop(event.nativeEvent.contentOffset.y)
    }
    
  };

  useEffect(() => {
    getAuth();
  }, []);

  return (
    <ScrollView
      onScroll={handleScroll}
      contentContainerStyle={{ ...styles.container, ...customStyle,}}
    >
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 25,
    paddingBottom: 125,
  },
});

export default Authorized;

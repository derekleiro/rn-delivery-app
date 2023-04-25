import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../../../constants/colors";
import { useState } from "react";
import { handleRegister, resetFields } from "../../function";
import { hideModal, showModal } from "../../../../store/slices/modal";

const ProviderRegisterJSX = (props: {
  setAccountType: Function;
  navigation: any;
}) => {
  const { setAccountType, navigation } = props;
  const dispatch = useDispatch();
  const [providerName, setProviderName] = useState("");
  const [providerContact, setProviderContact] = useState("");
  const [providerEmail, setProviderEmail] = useState("");
  const [providerPassword, setProviderPassword] = useState("");

  const handleRegisterPress = () => {
    setTimeout(() => {
      handleRegister({
        dispatch,
        showModal,
        email: providerEmail,
        password: providerPassword,
        role: "Provider",
        phoneNumber: providerContact,
        name: providerName,
        navigation,
      });
    }, 1000);
  };

  return (
    <View style={{ width: "100%" }}>
      <Text style={styles.titleText}>Provider sign up</Text>
      <View>
        {/* Provider name input */}
        <View style={styles.inputContainer}>
          <AntDesign
            style={styles.icon}
            name="mail"
            size={24}
          />
          <TextInput
            style={styles.textInput}
            value={providerName}
            placeholder="Provider name e.g. Quencher ltd."
            autoCapitalize={"none"}
            onChange={(e) => setProviderName(e.nativeEvent.text)}
          ></TextInput>
        </View>

        {/* Provider email input */}
        <View style={styles.inputContainer}>
          <AntDesign
            style={styles.icon}
            name="user"
            size={24}
          />
          <TextInput
            style={styles.textInput}
            value={providerEmail}
            placeholder="Your email e.g johndoe@email.com"
            autoCapitalize={"none"}
            onChange={(e) => setProviderEmail(e.nativeEvent.text)}
          ></TextInput>
        </View>

        {/* Provider contact input */}
        <View style={styles.inputContainer}>
          <AntDesign
            style={styles.icon}
            name="phone"
            size={24}
          />
          <TextInput
            style={styles.textInput}
            value={providerContact}
            maxLength={10}
            keyboardType="numeric"
            placeholder="Your phone number e.g 0700123234"
            onChange={(e) => setProviderContact(e.nativeEvent.text)}
            secureTextEntry={false}
          ></TextInput>
        </View>

        {/* Provider password input */}
        <View style={styles.inputContainer}>
          <AntDesign
            style={styles.icon}
            name="lock"
            size={24}
          />
          <TextInput
            style={styles.textInput}
            onChange={(e) => setProviderPassword(e.nativeEvent.text)}
            value={providerPassword}
            placeholder="Password"
            secureTextEntry={true}
          ></TextInput>
        </View>
      </View>

      <Text style={styles.greyText}>
        By signing up you agree to our terms and conditions and privacy policy
      </Text>
      <TouchableOpacity style={styles.blueBtn} onPress={handleRegisterPress}>
        <View style={{ flexDirection: "row" }}>
          <AntDesign
            style={styles.icon}
            name="login"
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
            Continue
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setAccountType("providerLogin");
          dispatch(hideModal());
          resetFields({
            setEmail: setProviderEmail,
            setPhoneNumber: setProviderContact,
            setPassword: setProviderPassword,
          });
        }}
      >
        <Text style={{ ...styles.accountText, color: colors.primary }}>
          Already have a provider account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "lightgrey",
    alignItems: "center",
    marginVertical: 10,
  },
  imgContainer: {
    width: "100%",
    alignItems: "center",
  },
  img: {
    width: 250,
    height: 250,
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    padding: 10,
    fontSize: 16,
    flex: 1,
    fontFamily: "Poppins_400Regular",
    flexDirection: "row",
    alignItems: "center",
  },
  blueBtn: {
    padding: 12.5,
    backgroundColor: colors.primary,
    borderRadius: 15,
    marginVertical: 5,
    alignItems: "center",
  },
  greyBtn: {
    padding: 12.5,
    backgroundColor: colors.secondary,
    borderRadius: 15,
    marginVertical: 5,
    alignItems: "center",
  },
  titleText: {
    fontSize: 36,
    fontFamily: "Poppins_600SemiBold",
    marginVertical: 15,
    textAlign: "left",
  },
  greyText: {
    color: "grey",
    marginVertical: 15,
    textAlign: "left",
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
  accountText: {
    textAlign: "center",
    marginVertical: 15,
    color: colors.primary,
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
  },
});

export default ProviderRegisterJSX;

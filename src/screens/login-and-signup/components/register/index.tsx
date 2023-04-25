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
import { useEffect, useState } from "react";
import { handleRegister, resetFields } from "../../function";
import { hideModal, showModal } from "../../../../store/slices/modal";
import DateTimePicker from "@react-native-community/datetimepicker";
import { navigate } from "../../../../store/slices/bottom-nav";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const RegisterJSX = (props: { setAccountType: Function; navigation: any }) => {
  const { setAccountType, navigation } = props;
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [date, setDate] = useState("");
  const [modalDateOpen, setDateModalOpen] = useState<boolean>(false);

  const handleRegisterPress = () => {
    setTimeout(() => {
      handleRegister({
        dispatch,
        showModal,
        email,
        password,
        role,
        phoneNumber,
        name,
        date,
        navigation,
      });
    }, 1000);
  };

  useEffect(() => {
    dispatch(navigate("Auth"));
  }, []);

  return (
    <View style={{ width: "100%" }}>
      <Text style={styles.titleText}>User sign up</Text>
      <View>
        <View style={styles.inputContainer}>
          <AntDesign style={styles.icon} name="mail" size={24} />
          <TextInput
            style={styles.textInput}
            value={name}
            placeholder="Your full names e.g Jone Doe"
            autoCapitalize={"none"}
            onChange={(e) => setName(e.nativeEvent.text)}
          ></TextInput>
        </View>

        <View style={styles.inputContainer}>
          <AntDesign style={styles.icon} name="user" size={24} />
          <TextInput
            style={styles.textInput}
            value={email}
            placeholder="Your email e.g johndoe@email.com"
            autoCapitalize={"none"}
            onChange={(e) => setEmail(e.nativeEvent.text)}
          ></TextInput>
        </View>

        <View style={styles.inputContainer}>
          <AntDesign style={styles.icon} name="phone" size={24} />
          <TextInput
            style={styles.textInput}
            value={phoneNumber}
            placeholder="Your phone number e.g 0700123234"
            onChange={(e) => setPhoneNumber(e.nativeEvent.text)}
            secureTextEntry={false}
          ></TextInput>
        </View>

        <View style={styles.inputContainer}>
          <AntDesign style={styles.icon} name="calendar" size={24} />
          <TextInput
            style={styles.textInput}
            value={date}
            placeholder="Select your date of birth"
            onChange={(e) => setDateModalOpen(true)}
            secureTextEntry={false}
          ></TextInput>
          {modalDateOpen && (
            <RNDateTimePicker
              value={new Date()}
              onChange={(event, date) => {
                setDate(new Date(date!).toJSON().slice(0,10).split('-').reverse().join('/'));
                setDateModalOpen(false);
              }}
              dateFormat="day month year"
            />
          )}
        </View>

        <View style={styles.inputContainer}>
          <AntDesign style={styles.icon} name="lock" size={24} />
          <TextInput
            style={styles.textInput}
            onChange={(e) => setPassword(e.nativeEvent.text)}
            value={password}
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
          setAccountType("userLogin");
          dispatch(hideModal());
          resetFields({ setEmail, setPhoneNumber, setPassword });
        }}
      >
        <Text style={{ ...styles.accountText, color: colors.primary }}>
          I already have a user account
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

export default RegisterJSX;

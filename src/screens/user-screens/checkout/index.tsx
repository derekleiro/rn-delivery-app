import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Authorized from "../../../components/authrized";
import BottomNav from "../../../components/bottom-nav";
import MessageBox from "../../../components/message-box";
import { colors } from "../../../constants/colors";
import { global } from "../../../constants/global";
import { handleCheckout } from "./functions";
import CheckoutItem from "./components/CheckoutItem";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { hideModal, showModal } from "../../../store/slices/modal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Device from "expo-device";
import * as NavigationBar from "expo-navigation-bar";
import { removeFromCart } from "../../../store/slices/cart";

const CheckoutScreen = (props: { navigation: any }) => {
  const { navigation } = props;

  const cart = useSelector((state: any) => state.cart.data.items);
  const insets = useSafeAreaInsets();
  const [deliveryAddress, setDeliveryAddress] = useState<string>("");
  const [atTheTop, setAtTheTop] = useState<boolean>(true);

  const orderTotal = cart.reduce(
    (total: number, curr: any) => total + curr.productPrice,
    0
  );
  const dispatch = useDispatch();

  const validInputs = () => {
    return deliveryAddress.trim() !== "";
  };

  const CartNotEmptyJSX = (
    <>
      {cart.map((item: any, index: number) => {
        return (
          <CheckoutItem
            key={index}
            item={item}
            onRemovePress={() => dispatch(removeFromCart(item.inventoryID))}
          />
        );
      })}
      <View style={global.styles.container}>
        <View style={styles.inputContainer}>
          <AntDesign
            style={styles.icon}
            name="pushpino"
            size={24}
            color={colors.primary}
          />
          <TextInput
            maxLength={250}
            multiline={true}
            style={styles.textInput}
            onChange={(e) => setDeliveryAddress(e.nativeEvent.text)}
            autoCapitalize={"none"}
            value={deliveryAddress}
            placeholder="Delivery Address e.g. Ole-Sangale Link Road, Strathmore"
          ></TextInput>
        </View>
      </View>

      <Text style={{ ...styles.bigFont, color: colors.secondary }}>
        Total{" "}
        {cart.reduce(
          (total: number, curr: any) => total + curr.productPrice,
          0
        )}
      </Text>
      <TouchableOpacity
        onPress={() => {
          if (validInputs()) {
            handleCheckout({
              dispatch,
              navigation,
              items: cart,
              orderDetails: deliveryAddress,
              orderTotal,
            });
          } else {
            dispatch(
              showModal({
                type: "error",
                messages: ["Make sure you have added your delivery details"],
              })
            );
            setTimeout(() => dispatch(hideModal()), 3000);
          }
        }}
        style={validInputs() ? styles.btnActive : styles.btn}
      >
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
            Place Order
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );

  useEffect(() => {
    if (Device.osName === "Android") {
      NavigationBar.setBackgroundColorAsync("#f0f0f0");
    }

    return () => {
      if (Device.osName === "Android") {
        NavigationBar.setBackgroundColorAsync(colors.highlight);
      }
    };
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
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <AntDesign
            style={styles.icon}
            name="back"
            size={24}
            color={"black"}
          />
        </TouchableOpacity>
        <Text style={{ ...global.styles.mainPageText, marginVertical: 0 }}>
          Checkout
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
        {cart.length !== 0 ? (
          CartNotEmptyJSX
        ) : (
          <MessageBox
            title="No items in your cart"
            description="Go back to the home page and add some items to your cart"
          />
        )}
      </Authorized>
    </>
  );
};

const styles = StyleSheet.create({
  bigFont: {
    color: colors.secondary,
    marginVertical: 10,
    fontSize: 24,
    fontFamily: "Poppins_600SemiBold",
  },
  icon: {
    marginRight: 10,
  },
  btnActive: {
    padding: 12.5,
    backgroundColor: colors.secondary,
    borderRadius: 15,
    marginVertical: 5,
    alignItems: "center",
    marginHorizontal: 25,
    position: "absolute",
    width: "100%",
    bottom: 30,
  },
  btn: {
    padding: 12.5,
    backgroundColor: colors.info,
    borderRadius: 15,
    marginVertical: 5,
    alignItems: "center",
    marginHorizontal: 25,
    position: "absolute",
    width: "100%",
    bottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "lightgrey",
    marginVertical: 10,
  },
  textInput: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    minHeight: 100,
    fontFamily: "Poppins_400Regular",
    flexDirection: "row",
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
});

export default CheckoutScreen;

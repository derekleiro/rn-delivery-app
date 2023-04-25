import { View, StyleSheet, Text } from "react-native";
import Authorized from "../../../components/authrized";
import BottomNav from "../../../components/bottom-nav";
import { global } from "../../../constants/global";
import { colors } from "../../../constants/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchInventory } from "./function";
import Item from "../../../components/item";
import { AntDesign } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MessageBox from "../../../components/message-box";
import { addToCart, removeFromCart } from "../../../store/slices/cart";

interface keyable {
  [key: string]: any;
}
const HomeScreen = (props: { navigation: any }) => {
  const { navigation } = props;
  const insets = useSafeAreaInsets();

  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart.data.items);
  const [inventory, setInventoryItems] = useState<keyable[]>([]);
  const [atTheTop, setAtTheTop] = useState<boolean>(true);

  useEffect(() => {
    fetchInventory({ dispatch, setInventoryItems });
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
          Home
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
        customStyle={{ marginBottom: 50 }}
        navigation={navigation}
      >
        {inventory.length === 0 && (
          <MessageBox
            title="No products yet"
            description="Provider's have not yet added products. Check back later or become a provider"
          />
        )}

        {inventory.length !== 0 &&
          inventory.map((item, index) => {
            return (
              <Item
                key={index}
                item={item}
                onAddPress={(addedToCart: boolean) => {
                  if (!addedToCart) {
                    dispatch(addToCart(item));
                  } else {
                    dispatch(removeFromCart(item.inventoryID));
                  }
                }}
              />
            );
          })}
      </Authorized>
      <View style={styles.btn}>
        <TouchableOpacity
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("Checkout")}
        >
          <View style={{ flexDirection: "row", marginLeft: 15 }}>
            <AntDesign
              style={styles.icon}
              name="login"
              size={24}
              color={"black"}
            />
            <Text
              style={{
                color: "black",
                fontFamily: "Poppins_600SemiBold",
                textAlign: "center",
                fontSize: 16,
              }}
            >
              Checkout
            </Text>
          </View>
          <View style={styles.itemsInCartView}>
            <Text style={{ fontFamily: "Poppins_600SemiBold", fontSize: 18 }}>
              {cart.length}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <BottomNav navigation={navigation} />
    </>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: "100%",
    padding: 12.5,
    flex: 1,
    backgroundColor: colors.highlight,
    position: "absolute",
    bottom: 60,
  },
  icon: {
    marginRight: 10,
  },
  itemsInCartView: {
    right: 15,
    borderRadius: 15,
    backgroundColor: "white",
    paddingVertical: 5,
    paddingHorizontal: 15,
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

export default HomeScreen;

import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import Authorized from "../../../components/authrized";
import BottomNav from "../../../components/bottom-nav";
import MessageBox from "../../../components/message-box";
import { colors } from "../../../constants/colors";
import { global } from "../../../constants/global";
import { navigate } from "../../../store/slices/bottom-nav";
import OrderItem from "./components/OrderItem";
import { fetchOrders } from "./function";

const OrdersScreen = (props: { navigation: any }) => {
  const { navigation } = props;

  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const [orders, setOrders] = useState<Array<object>>([]);
  const [atTheTop, setAtTheTop] = useState<boolean>(true);

  const handlePress = () => {};

  useEffect(() => {
    fetchOrders({ dispatch, setOrders });
  }, []);

  return (
    <>
        <View
          style={
            atTheTop
              ? {...styles.defaultNavStyle, paddingTop: insets.top}
              : { ...styles.defaultNavStyle, ...styles.shadowStyle, paddingTop: insets.top }
          }
        >
          <Text style={{ ...global.styles.mainPageText, marginVertical: 0 }}>
            Orders
          </Text>
        </View>
      <Authorized atTheTop={(value: number) => {
          if(value > 25){
            setAtTheTop(false)
          }else{
            setAtTheTop(true)
          } 
        }} navigation={navigation}>
          {orders.length !== 0 ? (
            orders.map((item: any, index: number) => {
              return (
                <OrderItem key={index} item={item} onPress={handlePress} />
              );
            })
          ) : (
            <MessageBox title="No past orders" description="There are no past orders. Once you make an order, your orders will appear here" />
          )}
      </Authorized>

      <BottomNav navigation={navigation} />
    </>
  );
};

const styles = StyleSheet.create({
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
    borderBottomWidth: 1
  },
});

export default OrdersScreen;

import { View, StyleSheet, Text } from "react-native";
import { global } from "../../../constants/global";
import Authorized from "../../../components/authrized";
import ProviderBottomNav from "../../../components/provider-bottom-nav";
import { useEffect, useState } from "react";
import MessageBox from "../../../components/message-box";
import { useDispatch } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../../constants/colors";
import { fetchProviderOrders, updateOrderStatus } from "./function";
import OrderItem from "./components/OrderItem";

interface keyable {
  [key: string]: any;
}
const ProviderHome = (props: { navigation: any }) => {
  const { navigation } = props;
  const [orders, setOrders] = useState<keyable[]>([]);
  const [fullOrders, setFullOrders] = useState<keyable[]>([]);
  const dispatch = useDispatch();

  const insets = useSafeAreaInsets();
  const [atTheTop, setAtTheTop] = useState<boolean>(true);

  useEffect(() => {
    fetchProviderOrders({ dispatch, setOrders, setFullOrders });
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
        navigation={navigation}
      >
        {orders.length === 0 && (
          <MessageBox
            title="No orders yet"
            description="When a user places an order, they will show up here"
          />
        )}
        {orders.length !== 0 &&
          orders.map((item, index) => {
            return (
              <OrderItem
                key={index}
                item={item}
                onPress={(orderItemIndex: number, newStatus: string) => {
                  updateOrderStatus({
                    dispatch,
                    fullOrders,
                    orderIndex: index,
                    orderItemIndex,
                    newStatus,
                  });
                }}
              />
            );
          })}
      </Authorized>
      <ProviderBottomNav navigation={navigation} />
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
    borderBottomWidth: 1,
  },
});

export default ProviderHome;

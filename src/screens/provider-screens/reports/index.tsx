import ProviderBottomNav from "../../../components/provider-bottom-nav";
import { View, Text, StyleSheet } from "react-native";
import Authorized from "../../../components/authrized";
import { global } from "../../../constants/global";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { colors } from "../../../constants/colors";
import Card from "./components/Card";
import { fetchInventory, fetchOrders } from "./function";
import { useDispatch } from "react-redux";

const ProviderReports = (props: { navigation: any }) => {
  const { navigation } = props;
  const dispatch = useDispatch();

  const insets = useSafeAreaInsets();
  const [atTheTop, setAtTheTop] = useState<boolean>(true);
  const [orderReport, setOrdersReport] = useState({
    numOfOrders: 0,
    moneyMade: 0,
  });
  const [inventoryReport, setInventoryReport] = useState({ inventoryItems: 0 });

  useEffect(() => {
    fetchOrders({ dispatch, setOrdersReport });
    fetchInventory({ dispatch, setInventoryReport });
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
          Reports
        </Text>
      </View>
      <Authorized
      customStyle={{paddingHorizontal: 15}}
        atTheTop={(value: number) => {
          if (value > 25) {
            setAtTheTop(false);
          } else {
            setAtTheTop(true);
          }
        }}
        navigation={navigation}
      >
        <Card
          title="Revenue"
          data={orderReport.moneyMade}
          description="The amount of money you have received"
        />
        <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
          <Card
            title="Inventory Items"
            data={inventoryReport.inventoryItems}
            description="Item's in your inventory"
          />
          <Card
            title="Orders"
            data={orderReport.numOfOrders}
            description="The amount of orders you have received"
          />
        </View>
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

export default ProviderReports;

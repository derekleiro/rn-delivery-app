import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import Authorized from "../../../components/authrized";
import Button from "../../../components/button";
import MessageBox from "../../../components/message-box";
import ProviderBottomNav from "../../../components/provider-bottom-nav";
import { colors } from "../../../constants/colors";
import { global } from "../../../constants/global";
import Item from "./components/inventory-item";
import AddInventory from "./components/provider-add-inventory";
import UpdateInventory from "./components/provider-update-inventory";
import {
  deleteProviderInventoryItem,
  fetchProviderInventory,
} from "./function";

interface keyable {
  [key: string]: any;
}
const ProviderInventory = (props: { navigation: any }) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const [inventory, setInventoryItems] = useState<keyable[]>([]);
  const [state, setState] = useState(false);
  
  const [product, setProduct] = useState<keyable>({});
  const [updateState, setUpdateState] = useState<boolean>(false);

  const insets = useSafeAreaInsets();
  const [atTheTop, setAtTheTop] = useState<boolean>(true);

  useEffect(() => {
    fetchProviderInventory({ dispatch, setInventoryItems });
  }, [state, updateState]);
  return (
    <>
      {updateState && !state && (
        <UpdateInventory
          item={product}
          navigation={navigation}
          backPress={() => {
            setUpdateState((curr) => !curr)
            setProduct({});
          }}
        />
      )}
      {state && !updateState && (
        <AddInventory
          navigation={navigation}
          backPress={() => setState((curr) => !curr)}
        />
      )}

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
          Inventory
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
        {inventory.length === 0 && (
          <MessageBox
            title="No Inventory"
            description="Add Items to your inventory using the plus button below"
          />
        )}
        {inventory.length !== 0 &&
          inventory.map((item, index) => {
            return (
              <Item
                onDelete={() => {
                  deleteProviderInventoryItem({
                    dispatch,
                    setInventoryItems,
                    inventoryID: item.inventoryID,
                  });
                }}
                onUpdate={() => {
                  setUpdateState(true);
                  setProduct(item);
                }}
                key={index}
                item={item}
              />
            );
          })}
      </Authorized>
      <Button type="plus" onPress={() => setState((curr) => !curr)} />
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

export default ProviderInventory;

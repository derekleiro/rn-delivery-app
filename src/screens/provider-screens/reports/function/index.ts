import AsyncStorage from "@react-native-async-storage/async-storage";
import { hideModal, showModal } from "../../../../store/slices/modal";

type fetchInventoryType = {
  dispatch: Function;
  setInventoryReport: Function;
};
export const fetchInventory = async (props: fetchInventoryType) => {
  const { dispatch, setInventoryReport } = props;

  AsyncStorage.getItem("@user")
    .then((value: any) => JSON.parse(value))
    .then(async (user: any) => {
      try {
        const res = await fetch(
          `http://10.0.2.2:3000/inventory/${user.accountID}`
        );
        const JsonRes = await res.json();

        if (res.ok) {
          setInventoryReport({inventoryItems: JsonRes.resp.length});
        }
      } catch (e) {
        dispatch(showModal({
          type: "error",
          messages: [e],
        }));
        setTimeout(() => dispatch(hideModal()), 3000);
      }
    })
    .catch((e) => {
      dispatch(showModal({
        type: "error",
        messages: [
          typeof e === "string" ? e : "Error reading user data from memory",
        ],
      }));
      setTimeout(() => dispatch(hideModal()), 3000);
    });
};

type fetchOrdersType = {
  dispatch: Function;
  setOrdersReport: Function;
};
export const fetchOrders = async (props: fetchOrdersType) => {
  const { dispatch, setOrdersReport } = props;

  AsyncStorage.getItem("@user")
    .then((value: any) => JSON.parse(value))
    .then(async (user: any) => {
      try {
        const res = await fetch(
          `http://10.0.2.2:3000/provider/orders/${user.accountID}`
        );
        const JsonRes = await res.json();

        if (res.ok) {
          const numOfOrders = JsonRes.resp.length;
          const moneyMade = JsonRes.resp.reduce(
            (acc: number, res: any) => acc + res.orderTotal, 0
          );

          setOrdersReport({ numOfOrders, moneyMade: `KES ${moneyMade}` });
        }
      } catch (e) {
        dispatch(showModal({
          type: "error",
          messages: [e],
        }));
        setTimeout(() => dispatch(hideModal()), 3000);
      }
    })
    .catch((e) => {
      dispatch(showModal({
        type: "error",
        messages: [
          typeof e === "string" ? e : "Error reading user data from memory",
        ],
      }));
      setTimeout(() => dispatch(hideModal()), 3000);
    });
};

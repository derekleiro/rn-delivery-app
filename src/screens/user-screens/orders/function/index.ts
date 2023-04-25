import AsyncStorage from "@react-native-async-storage/async-storage";
import { hideModal, showModal } from "../../../../store/slices/modal";

type fetchOrdersType = {
  dispatch: Function;
  setOrders: Function;
};
export const fetchOrders = async (props: fetchOrdersType) => {
  const { dispatch, setOrders } = props;

  AsyncStorage.getItem("@user")
    .then((value: any) => JSON.parse(value))
    .then(async (user: any) => {
      try {
        const res = await fetch(
          `http://10.0.2.2:3000/orders/${user.accountID}`
        );
        const JsonRes = await res.json();

        if (res.ok) {
          setOrders(JsonRes.resp);
        } 
      } catch (e) {
        dispatch(showModal({
          type: "error",
          messages: [e],
        }));
        setTimeout(() => dispatch(hideModal()), 3000);
      }
    });
};

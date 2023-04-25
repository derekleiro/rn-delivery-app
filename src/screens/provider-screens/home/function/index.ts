import AsyncStorage from "@react-native-async-storage/async-storage";
import { hideModal, showModal } from "../../../../store/slices/modal";

type fetchOrdersType = {
  dispatch: Function;
  setOrders: Function;
  setFullOrders: Function;
};
export const fetchProviderOrders = async (props: fetchOrdersType) => {
  const { dispatch, setOrders, setFullOrders } = props;

  AsyncStorage.getItem("@user")
    .then((value: any) => JSON.parse(value))
    .then(async (user: any) => {
      try {
        const res = await fetch(
          `http://10.0.2.2:3000/provider/orders/${user.accountID}`
        );
        const JsonRes = await res.json();

        if (res.ok) {
          setOrders(JsonRes.resp.result);
          setFullOrders(JsonRes.resp.fullOrders);
        }
      } catch (e) {
        dispatch(
          showModal({
            type: "error",
            messages: [e],
          })
        );
        setTimeout(() => dispatch(hideModal()), 3000);
      }
    });
};

type updateOrderStatusType = {
  dispatch: Function;
  fullOrders: any;
  orderIndex: number;
  orderItemIndex: number;
  newStatus: string;
};
export const updateOrderStatus = async (props: updateOrderStatusType) => {
  const { dispatch, fullOrders, orderIndex, orderItemIndex, newStatus } = props;

  const orderItems = JSON.parse(fullOrders[orderIndex].orderItems);
  orderItems[orderItemIndex].orderStatus = newStatus;

  console.log({
    orderIndex,
    orderItemIndex,
    updatedItem: orderItems,
  });

  try {
    const res = await fetch(
      `http://10.0.2.2:3000/provider/update/order/${fullOrders[orderIndex].orderID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderItems }),
      }
    );

    const JsonRes = await res.json();

    if (res.ok) {
      dispatch(
        showModal({
          type: "success",
          messages: [JsonRes.message],
        })
      );
      setTimeout(() => dispatch(hideModal()), 3000);
    } else {
      dispatch(
        showModal({
          type: "error",
          messages: [JsonRes.message],
        })
      );
      setTimeout(() => dispatch(hideModal()), 3000);
    }
  } catch (e) {
    dispatch(
      showModal({
        type: "error",
        messages: [e],
      })
    );
    setTimeout(() => dispatch(hideModal()), 3000);
  }
};

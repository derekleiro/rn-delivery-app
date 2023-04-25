import AsyncStorage from "@react-native-async-storage/async-storage";
import { clearCart } from "../../../../store/slices/cart";
import { hideModal, showModal } from "../../../../store/slices/modal";

function onlyUnique(value: any, index: number, array: any) {
  return array.indexOf(value) === index;
}

type handleCheckoutType = {
  dispatch: Function;
  navigation: any;
  items: Array<object>;
  orderDetails: string;
  orderTotal: number;
};
export const handleCheckout = async (props: handleCheckoutType) => {
  const { dispatch, navigation, items, orderDetails, orderTotal } = props;

  let providerIDs: Array<string> = [];

  items.forEach((item: any) => {
    providerIDs.push(item.providerID);
  });

  const sanitisedProviderIds = providerIDs.filter(onlyUnique);

  AsyncStorage.getItem("@user")
    .then((value: any) => JSON.parse(value))
    .then(async (user: any) => {
      try {
        const res = await fetch("http://10.0.2.2:3000/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items,
            userID: user.accountID,
            orderDetails,
            orderTotal,
            providerIDs: sanitisedProviderIds,
            customerName: user.name,
            customerContact: user.phoneNumber,
          }),
        });
        const JsonRes = await res.json();

        if (res.ok) {
          dispatch(clearCart());
          dispatch(
            showModal({
              type: "success",
              messages: [JsonRes.message],
            })
          );
          setTimeout(() => dispatch(hideModal()), 3000);
          navigation.navigate("Home");
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
    });
};

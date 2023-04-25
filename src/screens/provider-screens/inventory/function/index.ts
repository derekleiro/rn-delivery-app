import { hideModal, showModal } from "../../../../store/slices/modal";
import AsyncStorage from "@react-native-async-storage/async-storage";

type handleInventorySubmitType = {
  productTitle: string;
  productDescription: string;
  productCategory: string;
  productPrice: number;
  backPress: Function;
  dispatch: Function;
};
export const handleInventorySubmit = async (
  props: handleInventorySubmitType
) => {
  const {
    productTitle,
    productDescription,
    productCategory,
    productPrice,
    backPress,
    dispatch,
  } = props;

  const sanitisedTitle = productTitle.replace("'", "");
  const sanitisedDescription = productDescription.replace("'", "");

  AsyncStorage.getItem("@user")
    .then((value: any) => JSON.parse(value))
    .then(async (user: any) => {
      try {
        const res = await fetch("http://10.0.2.2:3000/inventory/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productTitle: sanitisedTitle,
            productDescription: sanitisedDescription,
            productCategory,
            productPrice,
            user,
          }),
        });
        const JsonRes = await res.json();

        if (res.ok) {
          dispatch(
            showModal({
              type: "success",
              messages: [JsonRes.message],
            })
          );
          setTimeout(() => dispatch(hideModal()), 3000);
          backPress();
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
    })
    .catch((e) => {
      dispatch(
        showModal({
          type: "error",
          messages: [
            typeof e === "string" ? e : "Error reading user data from memory",
          ],
        })
      );
      setTimeout(() => dispatch(hideModal()), 3000);
    });
};

type handleInventoryUpdateType = {
  inventoryID: string;
  productTitle: string;
  productDescription: string;
  productCategory: string;
  productPrice: number;
  backPress: Function;
  dispatch: Function;
};
export const handleInventoryUpdate = async (
  props: handleInventoryUpdateType
) => {
  const {
    inventoryID,
    productTitle,
    productDescription,
    productCategory,
    productPrice,
    backPress,
    dispatch,
  } = props;

  const sanitisedTitle = productTitle.replace("'", "");
  const sanitisedDescription = productDescription.replace("'", "");

  AsyncStorage.getItem("@user")
    .then((value: any) => JSON.parse(value))
    .then(async (user: any) => {
      try {
        const res = await fetch(
          `http://10.0.2.2:3000/inventory/update/${inventoryID}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              productTitle: sanitisedTitle,
              productDescription: sanitisedDescription,
              productCategory,
              productPrice,
              user,
            }),
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
          backPress();
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
    })
    .catch((e) => {
      dispatch(
        showModal({
          type: "error",
          messages: [
            typeof e === "string" ? e : "Error reading user data from memory",
          ],
        })
      );
      setTimeout(() => dispatch(hideModal()), 3000);
    });
};

type fetchProviderInventoryType = {
  dispatch: Function;
  setInventoryItems: Function;
};
export const fetchProviderInventory = async (
  props: fetchProviderInventoryType
) => {
  const { dispatch, setInventoryItems } = props;

  AsyncStorage.getItem("@user")
    .then((value: any) => JSON.parse(value))
    .then(async (user: any) => {
      try {
        const res = await fetch(
          `http://10.0.2.2:3000/inventory/${user.accountID}`
        );
        const JsonRes = await res.json();

        if (res.ok) {
          setInventoryItems(JsonRes.resp);
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
    })
    .catch((e) => {
      dispatch(
        showModal({
          type: "error",
          messages: [
            typeof e === "string" ? e : "Error reading user data from memory",
          ],
        })
      );
      setTimeout(() => dispatch(hideModal()), 3000);
    });
};

type deleteProviderInventoryItemType = {
  dispatch: Function;
  setInventoryItems: Function;
  inventoryID: string;
};
export const deleteProviderInventoryItem = async (
  props: deleteProviderInventoryItemType
) => {
  const { dispatch, setInventoryItems, inventoryID } = props;

  AsyncStorage.getItem("@user")
    .then((value: any) => JSON.parse(value))
    .then(async (user: any) => {
      try {
        const res = await fetch(
          `http://10.0.2.2:3000/provider/${user.accountID}/inventory/${inventoryID}`,
          {
            method: "DELETE",
          }
        );
        const JsonRes = await res.json();

        if (res.ok) {
          setInventoryItems((currItems: any) =>
            currItems.filter((val: any) => val.inventoryID !== inventoryID)
          );
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
    })
    .catch((e) => {
      dispatch(
        showModal({
          type: "error",
          messages: [
            typeof e === "string" ? e : "Error reading user data from memory",
          ],
        })
      );
      setTimeout(() => dispatch(hideModal()), 3000);
    });
};

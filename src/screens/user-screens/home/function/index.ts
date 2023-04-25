import { hideModal, showModal } from "../../../../store/slices/modal";

type fetchInventoryType = {
  dispatch: Function;
  setInventoryItems: Function;
};
export const fetchInventory = async (
  props: fetchInventoryType
) => {
  const { dispatch, setInventoryItems } = props;

  try {
    const res = await fetch('http://10.0.2.2:3000/inventory');
    const JsonRes = await res.json();

    if (res.ok) {
      setInventoryItems(JsonRes.resp);
    } 
  } catch (e) {
    dispatch(showModal({
      type: "error",
      messages: [e],
    }));
    setTimeout(() => dispatch(hideModal()), 3000);
  }
};

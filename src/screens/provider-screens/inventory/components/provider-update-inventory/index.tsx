import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import SubPage from "../../../../../components/sub-page";
import { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../../../../constants/colors";
import { useDispatch } from "react-redux";
import { hideModal, showModal } from "../../../../../store/slices/modal";
import RNPickerSelect from "react-native-picker-select";
import { handleInventoryUpdate } from "../../function";
import * as Device from "expo-device";
import * as NavigationBar from "expo-navigation-bar";

const UpdateInventory = (props: {
  navigation: any;
  backPress: any;
  item: any;
}) => {
  const { navigation, backPress, item } = props;
  const dispatch = useDispatch();

  const [productTitle, setProductTitle] = useState<string>(item.productTitle);
  const [productDescription, setProductDescription] = useState<string>(
    item.productDescription
  );
  const [productCategory, setProductCategory] = useState<string>(
    item.productCategory
  );
  const [productPrice, setProductPrice] = useState<number>(item.productPrice);

  const noEmptyFields = () => {
    return (
      productTitle.trim() !== "" &&
      productDescription.trim() !== "" &&
      productCategory.trim() !== "" &&
      productPrice !== 0
    );
  };

  const handleSubmit = () => {
    const payload = {
      inventoryID: item.inventoryID,
      productTitle,
      productDescription,
      productCategory,
      productPrice,
      backPress,
      dispatch,
    };

    if (noEmptyFields()) {
      handleInventoryUpdate(payload);
    } else {
      dispatch(
        showModal({
          type: "error",
          messages: ["Please fill out all the fields"],
        })
      );
      setTimeout(() => dispatch(hideModal()), 3000);
    }
  };

  useEffect(() => {
    if (Device.osName === "Android") {
      NavigationBar.setBackgroundColorAsync("#f0f0f0");
    }

    return () => {
      if (Device.osName === "Android") {
        NavigationBar.setBackgroundColorAsync(colors.highlight);
      }
    };
  }, []);

  return (
    <>
      <SubPage
        backPress={backPress}
        name="Update Inventory"
        navigation={navigation}
      >
        <View style={styles.card}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.textTitle}>Product Title</Text>
          </View>
          <TextInput
            multiline
            maxLength={50}
            onChangeText={(text) => setProductTitle(text)}
            style={styles.textInput}
            value={productTitle}
            placeholder="e.g. 10,000 litre water truck"
          />
        </View>

        <View style={styles.card}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.textTitle}>Product Description</Text>
          </View>
          <TextInput
            multiline
            maxLength={100}
            onChangeText={(text) => setProductDescription(text)}
            style={{ ...styles.textInput, height: 50 }}
            value={productDescription}
            placeholder="e.g. Get 10,000 litres of water delivered around Nairobi"
          />
        </View>

        <View style={styles.card}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.textTitle}>Product Category</Text>
          </View>
          <RNPickerSelect
            placeholder={{ label: "Select product category" }}
            items={[
              { label: "Water bowser", value: "bowser" },
              { label: "20 Litres", value: "20l" },
              { label: "Water bottle", value: "handheld" },
            ]}
            onValueChange={(value: any) => {
              setProductCategory(value);
            }}
            style={pickerSelectStyles}
            value={productCategory}
            useNativeAndroidPickerStyle={false}
          />
        </View>

        <View style={styles.card}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.textTitle}>Product Price</Text>
          </View>
          <TextInput
            maxLength={5}
            keyboardType="number-pad"
            onChangeText={(text) => setProductPrice(Number(text))}
            style={styles.textInput}
            value={productPrice.toString()}
            placeholder="e.g. 5000"
          />
        </View>
        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            ...styles.blueBtn,
            marginTop: 20,
            backgroundColor: noEmptyFields() ? colors.primary : colors.info,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: "white",
                fontFamily: "Poppins_600SemiBold",
                textAlign: "center",
                fontSize: 16,
              }}
            >
              Done
            </Text>
            <AntDesign
              style={styles.icon}
              name="arrowright"
              size={24}
              color={"white"}
            />
          </View>
        </TouchableOpacity>
      </SubPage>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    padding: 10,
  },
  textTitle: {
    fontSize: 20,
    fontFamily: "Poppins_400Regular",
    marginVertical: 10,
  },
  textInput: {
    fontFamily: "Poppins_400Regular",
  },
  icon: {
    marginRight: 10,
  },
  blueBtn: {
    padding: 12.5,
    backgroundColor: colors.info,
    borderRadius: 15,
    marginVertical: 5,
    alignItems: "center",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default UpdateInventory;

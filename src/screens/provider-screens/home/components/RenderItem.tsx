import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../../../constants/colors";
import RNPickerSelect from "react-native-picker-select";

const RenderItem = (props: { item: any; onStatusChange: Function }) => {
  const { item, onStatusChange } = props;
  const [status, setStatus] = useState(item.orderStatus);

  return (
    <View style={styles.renderItem}>
      <Text style={styles.textTitle}>{item.productTitle}</Text>
      <Text style={styles.text}>{item.productDescription}</Text>
      <Text style={{ color: "grey", fontSize: 22, marginBottom: 10 }}>
        KES {item.productPrice}
      </Text>

      <RNPickerSelect
        placeholder={{ label: `CURRENT STATUS: ${status}` }}
        items={[
          { label: "pending", value: "pending" },
          { label: "in-transit", value: "in-tranit" },
          { label: "delivered", value: "delivered" },
        ]}
        onValueChange={(status: any) => {
          setStatus(status);
          onStatusChange(item.orderIndex, status);
        }}
        style={pickerSelectStyles}
        value={status}
        useNativeAndroidPickerStyle={false}
      />
    </View>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  renderItem: {
    paddingLeft: "10%",
    marginTop: 25,
  },
  text: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
  textTitle: {
    fontSize: 22,
    fontFamily: "Poppins_600SemiBold",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    color: colors.primary,
    backgroundColor: colors.highlight,
    borderRadius: 15,
    width: 100,
    textAlign: "center",
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    color: colors.primary,
    backgroundColor: colors.highlight,
    borderRadius: 15,
    width: 85,
    textAlign: "center",
  },
});

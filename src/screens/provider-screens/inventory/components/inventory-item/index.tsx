import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign, Ionicons } from "@expo/vector-icons";

import waterTruckImg from "../../../../../assets/imgs/water-truck.png";
import waterBottleImg from "../../../../../assets/imgs/water-bottle.png";
import water20lBottleImg from "../../../../../assets/imgs/water-bottle-20l.png";
import { global } from "../../../../../constants/global";
import { colors } from "../../../../../constants/colors";

const Item = (props: { item: any; onDelete: Function; onUpdate: Function }) => {
  const { item, onDelete, onUpdate } = props;

  const handleEditPress = () => {
    onUpdate();
  };

  const handleDelete = () => {
    onDelete();
  };

  const renderProductImage = (imageType: "bowser" | "20l" | "handheld") => {
    switch (imageType) {
      case "bowser":
        return waterTruckImg;
      case "20l":
        return water20lBottleImg;
      default:
        return waterBottleImg;
    }
  };

  return (
    <View
      style={{
        ...global.styles.container,
        flexDirection: "row",
        paddingVertical: 15,
      }}
    >
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={styles.smallText}>Sold by YOU</Text>

        <Text style={styles.textTitle}>{item.productTitle}</Text>
        <Text style={styles.text}>{item.productDescription}</Text>
        <Text style={{ color: "grey", fontSize: 22 }}>
          KES {item.productPrice}
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              ...styles.touch,
              backgroundColor: colors.highlight,
            }}
            onPress={handleEditPress}
          >
            <AntDesign name="edit" size={28} color={colors.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              ...styles.touch,
              backgroundColor: `${colors.error}22`,
            }}
            onPress={handleDelete}
          >
            <Ionicons name="trash" size={28} color={colors.error} />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Image
          style={{ width: 75, height: 75 }}
          source={renderProductImage(item.productCategory)}
        />
      </View>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  smallText: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    marginVertical: 5,
    textTransform: "uppercase",
    color: "grey",
  },
  text: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    marginVertical: 5,
  },
  textTitle: {
    fontSize: 22,
    fontFamily: "Poppins_600SemiBold",
  },
  touch: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 15,
    borderRadius: 15,
  },
});

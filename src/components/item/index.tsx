import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../constants/colors";
import { global } from "../../constants/global";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

import waterTruckImg from "../../assets/imgs/water-truck.png";
import waterBottleImg from "../../assets/imgs/water-bottle.png";
import water20lBottleImg from "../../assets/imgs/water-bottle-20l.png";

const Item = (props: { item: any; onAddPress?: Function }) => {
  const { item, onAddPress } = props;
  const [addedToCart, setAddedToCart] = useState<boolean>(false);

  const handlePress = () => {
    if (onAddPress) {
      onAddPress(addedToCart);
      setAddedToCart((curr) => !curr);
    }
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
      <View style={{ flex: 1, marginRight: 10 }}>
        <Text style={styles.smallText}>Sold by {item.providerName}</Text>

        <Text style={styles.textTitle}>{item.productTitle}</Text>
        <Text style={styles.text}>{item.productDescription}</Text>
        <Text style={{ color: "grey", fontSize: 22 }}>
          KES {item.productPrice}
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            zIndex: -1,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              ...styles.touch,
              backgroundColor: !addedToCart ? colors.highlight : colors.info,
            }}
            onPress={handlePress}
          >
            {!addedToCart ? (
              <Ionicons
                style={{ marginRight: 7.5 }}
                name="cart-outline"
                size={28}
                color={colors.primary}
              />
            ) : (
              <Ionicons
                style={{ marginRight: 7.5 }}
                name="cart"
                size={28}
                color="white"
              />
            )}
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
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginRight: 10,
    borderRadius: 15,
  },
});

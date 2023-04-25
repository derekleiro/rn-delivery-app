import { View, Text, StyleSheet, Image } from "react-native";

import notFoundImg from "../../assets/imgs/not-found.png"

const MessageBox = (props: {title: string, description: string}) => {
  const {title, description} = props;
  return (
      <View style={styles.container}>
        <Image source={notFoundImg}/>
        <Text style={{fontSize: 20, textAlign: "center", fontWeight: "bold", marginVertical: 15}}>{title}</Text>
        <Text style={{fontSize: 18, textAlign: "center"}}>{description}</Text>
      </View>
  );
};

export default MessageBox;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingVertical: 50,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
  },
});

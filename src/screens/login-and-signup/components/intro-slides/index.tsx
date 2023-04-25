import { useState } from "react";
import { Text, View, Image, StyleSheet, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../../../constants/colors";
import AppIntroSlides from "react-native-app-intro-slider";

import slide1 from "../../../../assets/imgs/slide1.png";
import slide2 from "../../../../assets/imgs/slide2.png";
import slide3 from "../../../../assets/imgs/slide3.png";

const IntroSlides = (props: { onDone: any }) => {
  const { onDone } = props;
  
  const slides = [
    {
      key: 1,
      title: "School assistant",
      text: "Say hello to your very own \nschool assistant",
      image: slide1,
      backgroundColor: "white",
    },
    {
      key: 2,
      title: "Planner",
      text: "Plan your day\nSet agendas\nCreate timetables",
      image: slide2,
      backgroundColor: "white",
    },
    {
      key: 3,
      title: "Take off",
      text: "Are you ready to take charge of you academic life?\nLet's go!",
      image: slide3,
      backgroundColor: "white",
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.slideTitleText}>{item.title}</Text>
        <Image style={styles.slideImg} source={item.image} />
        <Text style={styles.slideText}>{item.text}</Text>
      </View>
    );
  };

  const renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <AntDesign
          name="arrowright"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
  };
  const renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <AntDesign name="check" color="rgba(255, 255, 255, .9)" size={24} />
      </View>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={{
        width: "100%",
        height: "100%",
        backgroundColor: "#f0f0f0",
      }}
    >
      <AppIntroSlides
        renderDoneButton={renderDoneButton}
        renderNextButton={renderNextButton}
        renderItem={renderItem}
        data={slides}
        activeDotStyle={{ backgroundColor: colors.primary }}
        onDone={onDone}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  slide: {
    paddingHorizontal: 25,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  slideImg: {
    width: "100%",
    height: 250,
  },
  slideText: {
    textAlign: "center",
    marginVertical: 15,
    color: "black",
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
  },
  slideTitleText: {
    fontSize: 32,
    fontFamily: "Poppins_600SemiBold",
    marginVertical: 15,
    textAlign: "center",
    color: colors.primary,
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: colors.primary,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default IntroSlides;

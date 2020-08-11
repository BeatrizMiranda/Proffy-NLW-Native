import React from "react";
import { View, ImageBackground, Text } from "react-native";
import styles from "./styles";

import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import giveClassesBack from "../../assets/images/give-classes-background.png";

function GiveClasses() {
  const { goBack } = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="contain"
        source={giveClassesBack}
        style={styles.content}
      >
        <Text style={styles.title}>Quer ser um Proffy? </Text>
        <Text style={styles.description}>So no desktop :D</Text>
      </ImageBackground>
      <RectButton onPress={goBack} style={styles.okButton}>
        <Text style={styles.okButtonText}>OK</Text>
      </RectButton>
    </View>
  );
}

export default GiveClasses;

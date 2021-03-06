import React, { useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";

import landingImage from "../../assets/images/landing.png";
import studyIcon from "../../assets/images/icons/study.png";
import giveClasses from "../../assets/images/icons/give-classes.png";
import hartIcon from "../../assets/images/icons/heart.png";
import api from "../../services/api";

function Landing() {
  const { navigate } = useNavigation();
  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    api.get("connections").then((response) => {
      const { total } = response.data;

      setTotalConnections(total);
    });
  }, []);

  function handleNavigateGiveClasses() {
    navigate("GiveClasses");
  }

  function handleNavigateToStudy() {
    navigate("Study");
  }

  return (
    <View style={styles.container}>
      <Image source={landingImage} style={styles.banner} />
      <Text style={styles.title}>
        Seja bem-vindo, {"\n"}
        <Text style={styles.titleBold}>O que deseja fazer? </Text>
      </Text>

      <View style={styles.buttonsContainer}>
        <RectButton
          onPress={handleNavigateToStudy}
          style={[styles.button, styles.buttonPrimary]}
        >
          <Image source={studyIcon} />
          <Text style={styles.buttonText}>Estudar</Text>
        </RectButton>
        <RectButton
          onPress={handleNavigateGiveClasses}
          style={[styles.button, styles.buttonSecondary]}
        >
          <Image source={giveClasses} />
          <Text style={styles.buttonText}>Dar Aulas</Text>
        </RectButton>
      </View>
      <Text style={styles.totalConnections}>
        <Text>
          Total de {totalConnections} conexões já realizadas{"  "}
        </Text>
        <Image source={hartIcon} />
      </Text>
    </View>
  );
}

export default Landing;

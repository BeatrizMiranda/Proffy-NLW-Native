import React, { useState } from "react";
import { View, ScrollView, AsyncStorage } from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import styles from "./styles";
import PageHeader from "../../components/PageHeader";
import TeacherItem, { Teacher } from "../../components/TeacherItem";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  function loadFavorites() {
    console.log("load");
    AsyncStorage.getItem("favorites").then((response) => {
      if (response) {
        console.log("JSON.parse(response)", JSON.parse(response));
        setFavorites(JSON.parse(response));
      }
    });
  }

  useFocusEffect(() => {
    loadFavorites();
  });

  return (
    <View style={styles.container}>
      <PageHeader title="Meus Proffys favoritos" />
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {favorites.map((teacher: Teacher) => {
          return <TeacherItem key={teacher?.id} teacher={teacher} favorited />;
        })}
      </ScrollView>
    </View>
  );
}

export default Favorites;

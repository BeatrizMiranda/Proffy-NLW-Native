import React, { useState, useEffect } from "react";
import { View, ScrollView, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

import PageHeader from "../../components/PageHeader";
import TeacherItem, { Teacher } from "../../components/TeacherItem";
import {
  TextInput,
  BorderlessButton,
  RectButton,
} from "react-native-gesture-handler";

import AsyncStorage from "@react-native-community/async-storage";
import api from "../../services/api";
import styles from "./styles";

function TeacherList() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [teachers, setTeachers] = useState([]);
  const [FilterVisible, setFilterVisible] = useState(false);
  const [subject, setSubject] = useState("");
  const [week_day, setWeekDay] = useState("");
  const [time, setTime] = useState("");

  function loadFavorites() {
    AsyncStorage.getItem("favorites").then((response) => {
      if (response) {
        const favoritesProf = JSON.parse(response);

        const favoritesProfId = favoritesProf.map(
          (teacher: Teacher) => teacher?.id
        );

        setFavorites(favoritesProfId);
      }
    });
  }

  useEffect(() => {
    loadFavorites();
  }, []);

  const handleFilterSubmit = async () => {
    loadFavorites();
    const body = {
      subject,
      week_day,
      time,
    };

    const response = await api.get("classes", { params: body });

    setTeachers(response.data);

    setFilterVisible(false);
  };

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys Disponiveis"
        headerRight={
          <BorderlessButton onPress={() => setFilterVisible(!FilterVisible)}>
            <Feather name="filter" size={20} color="#fff"></Feather>
          </BorderlessButton>
        }
      >
        {FilterVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              value={subject}
              onChangeText={(text) => setSubject(text)}
              placeholderTextColor="#c1bccc"
              style={styles.input}
              placeholder="Qual a Matéria?"
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <View style={styles.searchForm}>
                  <Text style={styles.label}>Dia da Semana</Text>
                  <TextInput
                    value={week_day}
                    onChangeText={(text) => setWeekDay(text)}
                    placeholderTextColor="#c1bccc"
                    style={styles.input}
                    placeholder="Qual dia? "
                  />
                </View>
              </View>

              <View style={styles.inputBlock}>
                <View style={styles.searchForm}>
                  <Text style={styles.label}>Horário</Text>
                  <TextInput
                    value={time}
                    onChangeText={(text) => setTime(text)}
                    placeholderTextColor="#c1bccc"
                    style={styles.input}
                    placeholder="Qual horario?"
                  />
                </View>
              </View>
            </View>
            <RectButton
              onPress={handleFilterSubmit}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.map((teacher: Teacher) => {
          return (
            <TeacherItem
              key={teacher?.id}
              teacher={teacher}
              favorited={favorites.includes(teacher?.id)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

export default TeacherList;

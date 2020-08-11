import React, { useState } from "react";
import { View, Image, Text, Linking } from "react-native";

import styles from "./styles";
import { RectButton } from "react-native-gesture-handler";

import unfavorite from "../../assets/images/icons/unfavorite.png";
import heartOutlineIcon from "../../assets/images/icons/heart-outline.png";
import whatsappIcon from "../../assets/images/icons/whatsapp.png";
import AsyncStorage from "@react-native-community/async-storage";
import api from "../../services/api";

interface TeacherItemProps {
  teacher: Teacher;
  favorited: boolean;
}

export interface Teacher {
  id: number;
  avatar: string;
  subject: string;
  cost: number;
  user_id: number;
  name: string;
  whatsapp: string;
  bio: string;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {
  const [isFavorited, setIsFavorited] = useState(favorited);
  const handleLinkWpp = () => {
    api.post("connection", {
      user_id: teacher.id,
    });
    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
  };

  async function handleToogleFavorite() {
    const favorites = await AsyncStorage.getItem("favorites");

    let favoritesArray = [];

    if (favorites) {
      favoritesArray = JSON.parse(favorites);
    }

    if (isFavorited) {
      const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher) => {
        return (teacherItem.id = teacher.id);
      });

      favoritesArray.splice(favoriteIndex, 1);
    } else {
      favoritesArray.push(teacher);
    }
    await AsyncStorage.setItem(
      "favorites",
      JSON.stringify(favoritesArray)
    ).then(() => {
      setIsFavorited(!isFavorited);
    });
  }

  return (
    <View style={styles.container} key={teacher?.id}>
      <View style={styles.profile}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={{ uri: teacher.avatar }}
            resizeMode="contain"
          />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>
      <Text style={styles.bio}>{teacher.bio}</Text>
      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {"   "}
          <Text style={styles.priceValue}>R$ {teacher.cost}</Text>
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        <RectButton
          onPress={handleToogleFavorite}
          style={[styles.favoriteButton, isFavorited ? styles.favorited : {}]}
        >
          {isFavorited ? (
            <Image source={unfavorite} />
          ) : (
            <Image source={heartOutlineIcon} />
          )}
        </RectButton>

        <RectButton style={styles.contactButton} onPress={handleLinkWpp}>
          <Image source={whatsappIcon} />
          <Text style={styles.contactButtonText}>Entrar em contato</Text>
        </RectButton>
      </View>
    </View>
  );
};

export default TeacherItem;

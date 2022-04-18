import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Button,
} from "react-native";
import Home from "./Home";
import {
  NavigationContainer,
  NavigationEvents,
  apiCall,
  useIsFocused,
  addListener,
} from "@react-navigation/native";

export default function AnimePage({ route }) {
  const isFocused = useIsFocused();

  const navigationOptions = {
    title: "AnimePage",
  };
  const [animeInfo, setAnimeInfo] = useState([]);
  const [img, setImg] = useState();
  const { id } = route.params;
  const { setId } = route.params;

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/anime/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setAnimeInfo(data.data);
        setImg(data.data.images.webp.large_image_url);
      })
      .catch((err) => Alert.alert("something went wrong", err));
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: 500,
          }}
        >
          <Image style={styles.headerImg} resizeMode="cover" source={img} />
          <Text style={styles.headerImgText}>{animeInfo.title}</Text>
        </View>
        <View>
          <Text>Episodes: {animeInfo.episodes}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerImg: {
    // paddingTop: 50,
    // width: "100%",
    height: undefined,
    aspectRatio: " auto 354 / 544",
    resizeMode: "contain",
    marginTop: 20,
    marginBottom: 20,
    flex: 1,
  },
  headerImgText: {
    fontSize: 20,
    color: "#000",
    lineHeight: 40,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});

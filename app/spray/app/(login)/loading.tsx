import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Tabs, router } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import db from "@react-native-firebase/database";

const Page = () => {
  const navigator = useNavigation<NativeStackNavigationProp<any>>();
  const Separator = () => <View style={styles.separator} />;

  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setTimeout(() => {
      if (user) {
        Alert.alert("user is signed in.");
        //Alert.alert(user.uid);
        router.push("/(login)/login");
        //navigator.replace("climb");
        //router.push("/(tabs)/climb");
      } else {
        Alert.alert("user is not signed in, please sign in.");
        //navigator.replace("login");
        router.push("/(login)/login");
      }
    }, 1000);
  }

  useEffect(() => {
    const sub = auth().onAuthStateChanged(onAuthStateChanged);
    return sub;
  }, []);

  return (
    <View style={styles.container}>
      <Separator />
      <Text style={styles.title}>Loading</Text>
      <Separator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
    fontWeight: "bold",
    fontSize: 20,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Page;

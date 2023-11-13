import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Tabs } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import db from "@react-native-firebase/database";

const Page = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login_username, setLoginUsername] = useState("");
  const [login_password, setLoginPassword] = useState("");

  const navigator = useNavigation<NativeStackNavigationProp<any>>();
  const Separator = () => <View style={styles.separator} />;

  const Login = async () => {
    //login
    console.log("Log in:: ", login_username, login_password);
    if (login_username && login_password) {
      try {
        const response = await auth().signInWithEmailAndPassword(
          login_username,
          login_password
        );
        if (response.user) {
          Alert.alert("logged in");
          navigator.replace("(tabs)");
        }
      } catch (e) {
        Alert.alert("error with login");
      }
    }
    // TODO: if username is given, get email from db
  };
  const SignUp = async () => {
    //signup
    console.log("Sign up:: ", username, email, password);
    if (email && password && username) {
      try {
        const response = await auth().createUserWithEmailAndPassword(
          email,
          password
        );
        if (response.user) {
          await CreateUserProfile(response);
          // TODO: change page to main page
        }
      } catch (e) {
        Alert.alert("error with account creation");
      }
    }
  };

  const database =
    "https://spray-6bde7-default-rtdb.europe-west1.firebasedatabase.app/";
  const CreateUserProfile = async (
    response: FirebaseAuthTypes.UserCredential
  ) => {
    db().ref(`${database}/users/${response.user.uid}`).set({ username });
    // other db information
    Alert.alert("account created");
  };
  // const SignUp = () => {
  //   console.log("Sign up:: ", username, email, password);
  // }

  return (
    <View>
      <Separator />
      <Text style={styles.title}>Spray</Text>
      <Separator />
      <Text style={styles.title}>login</Text>
      <TextInput
        onChangeText={setLoginUsername}
        placeholder="username or email"
        value={login_username}
        style={styles.input}
      />
      <TextInput
        onChangeText={setLoginPassword}
        placeholder="password"
        value={login_password}
        style={styles.input}
      />
      <Button title="Login" onPress={Login} />
      <Separator />
      <Text style={styles.title}>Sign up</Text>
      <TextInput
        onChangeText={setUsername}
        placeholder="username"
        value={username}
        style={styles.input}
      />
      <TextInput
        onChangeText={setEmail}
        placeholder="email"
        value={email}
        style={styles.input}
      />
      <TextInput
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <Separator />
      <Button title="Sign Up" onPress={SignUp} />
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

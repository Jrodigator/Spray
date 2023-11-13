import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Tabs } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import auth, { FirebaseAuthTypes, firebase } from "@react-native-firebase/auth";
import db from "@react-native-firebase/firestore";

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
      var login = login_username;
      // check if login is username and if so get email.
      const snapshot = await todoRef.where("username", "==", login).get();
      
      if (!snapshot.empty) {
        // get email from db
        const doc = snapshot.docs[0];
        const data = doc.data();
        const email = data.email;
        console.log("email: ", email);
        login = email;
      }
      
      try {
        const response = await auth().signInWithEmailAndPassword(
          login,
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
  
  
  const todoRef = db().collection("users"); 
  
  const SignUp = async () => {
    //signup
    console.log("Sign up:: ", username, email, password);
    if (email && password && username) {
      
      const snapshot = await todoRef.where("username", "==", username).get();
      
      // check if username is taken
      if (!snapshot.empty) {
        Alert.alert("username taken, pick a new one");
        return;
      }

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
        Alert.alert("Email invalid or already in use. Please try again.");
      }
    }
  };

  const CreateUserProfile = async (
    response: FirebaseAuthTypes.UserCredential
  ) => {
    // create user profile
    const timestamp = firebase.firestore.FieldValue.serverTimestamp;
    const data = {
      username: username,
      email: email,
      createdAt: timestamp(),
      updatedAt: timestamp(),
    };
    
    await todoRef.add(data)
    //todoRef.doc(response.user?.uid).set({

    // other db information
    Alert.alert("aaccount created");
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

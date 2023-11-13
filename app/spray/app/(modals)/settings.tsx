import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Tabs } from 'expo-router';
import Colors from '@/constants/Colors';



const Page = () => {
  
  const navigator = useNavigation<NativeStackNavigationProp<any>>();
  
  const Login = async () => {
    await navigator.replace("(login)/login");
  }
  
  const Separator = () => <View style={styles.separator} />;
  return (
    <View>
      <Text>Settings</Text>
      <Separator />
      <Text style={styles.title}>Settings</Text>
      <Separator />
      <Button title="logout" onPress={Login}/> 
    </View>
  );
}


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
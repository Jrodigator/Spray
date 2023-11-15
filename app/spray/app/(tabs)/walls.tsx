import { View, Text } from "react-native";
import React, { useState } from "react";
import { Tabs } from "expo-router";
import styles from "components/styles";
import ListContainer from "components/ListContainer";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import test from "node:test";

const Page = () => {
  const testdata = [
    { id: 1, text: "test1" },
    { id: 2, text: "test2" },
    { id: 3, text: "line's climbing wall" },
    { id: 4, text: "bloc12" },
    { id: 5, text: "test5" },
    { id: 6, text: "JRODWALL" },
    { id: 7, text: "MatiesClimbing" },
    { id: 8, text: "bloc11" },
  ];
  const [listValue, setListValue] = useState(testdata);
  const [list, setList] = useState(testdata);
  const [filteredList, setFilteredList] = useState<typeof testdata>(testdata);
  const [searchValue, setSearchValue] = useState("");

  const testImage = require("@/assets/images/favicon.png");

  const searchFilterFunction = (text: string) => {
    if (text) {
      console.log("text: ", text);
      const newData = list.filter(function (item) {
        const itemData = item.text ? item.text.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredList(newData);
      setSearchValue(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredList(list);
      setSearchValue(text);
    }
  };

  return (
    <View>
      <Text style={styles.topbar}>Select a wall from the list below</Text>
      <TextInput
        style={styles.input}
        placeholder="Search"
        onChangeText={searchFilterFunction}
        value={searchValue}
      />
      <ScrollView>
        {filteredList.map((item) => (
          <ListContainer
            key={item.id} // Add the key prop here
            title={item.text}
            subtitle="sub"
            imageSource={testImage}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Page;

import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

interface ItemContainerProps {
  imageSource: any; // replace 'any' with the appropriate type for your image source
  title: string;
  subtitle: string;
}

const ItemContainer: React.FC<ItemContainerProps> = ({
  imageSource,
  title,
  subtitle,
}) => {

  const handlePress = () => {
    console.log("Item Pressed");
    // wall click logic here.. maybe import a function from the parent component?
  }

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <View style={styles.container}>
        <Image source={imageSource} style={styles.image} />
        <View style={styles.separator} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff", // or any color of your choice
    borderRadius: 10,
    borderColor: "#000",
    borderWidth: 0,
    width: screenWidth * 0.9,
    height: screenHeight * 0.1,
    margin: 15,
    padding: 10,
    shadowColor: "#000", // shadow color
    shadowOffset: { width: 0, height: 2 }, // shadow offset
    shadowOpacity: 0.25, // shadow opacity
    shadowRadius: 3.84, // shadow radius
    elevation: 5, // for Android
  },
  image: {
    width: 50, // adjust as needed
    height: 50, // adjust as needed
    borderRadius: 25, // making the image circular
    marginRight: 10,
  },
  textContainer: {
    flexDirection: "column",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "grey",
  },
   separator: {
    height: '80%', // adjust as needed
    width: 1,
    backgroundColor: 'black', // color of the separator
    marginHorizontal: 10,
  },
});

export default ItemContainer;

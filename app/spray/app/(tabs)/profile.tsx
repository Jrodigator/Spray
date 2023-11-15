import { View, Text, StyleSheet, ListRenderItem, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect, useRef } from 'react';
import { Tabs, Link } from 'expo-router';
import test from 'node:test';

const Page = () => {
  const [listValue, setListValue] = useState();
  const [list, setList] = useState([]);

  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
}

export default Page;
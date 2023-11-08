// climb / walls page 

import { View, Text } from 'react-native';
import React from 'react';
import { Tabs, Link } from 'expo-router';

const Page = () => {
  return (
    <View>
      <Link href={'/(modals)/login'}>Login</Link>
      <Link href={'/(modals)/settings'}>Settings</Link>
      <Text>climb</Text>
    </View>
  );
}

export default Page;
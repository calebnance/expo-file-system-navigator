import * as React from 'react';
import { View } from 'react-native';
import { gStyle } from '../constants';

// components
import FileSystemNavigator from '../components/FileSystemNavigator';

const Home = () => (
  <View style={gStyle.flex1}>
    <FileSystemNavigator />
  </View>
);

export default Home;

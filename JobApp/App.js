// App.js
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import JobsScreen from './screens/jobscreen';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <JobsScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
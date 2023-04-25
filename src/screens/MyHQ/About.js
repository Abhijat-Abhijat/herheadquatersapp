import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
// utils
import { getApplicationVersion } from '../../modules/core/core.utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  infoContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  h1Text: {
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0,
    fontFamily: 'lato-bold',
    marginBottom: 10,
  },
  label: {
    fontFamily: 'lato-bold',
    lineHeight: 18,
    letterSpacing: 0,
  },
  text: {
    lineHeight: 18,
    letterSpacing: 0,
  },
});

const About = () => {
  const version = getApplicationVersion();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.h1Text}>HerHeadquarters</Text>
        <Text style={styles.label}>Version</Text>
        <Text style={styles.text}>{version}</Text>
      </View>
    </ScrollView>
  );
}

export const screenOptions = {
  title: 'About',
};

export default About;

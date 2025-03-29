import React from "react";
import { Text, View } from 'react-native';
import styles from "./styles";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.containerRow}>
        <View style={styles.containerColumn}>
          <View style={styles.box}>
            <Text style={styles.boxText}>#1</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.boxText}>#2</Text>
          </View>
        </View>
        <View style={styles.containerColumn}>
          <View style={styles.box}>
            <Text style={styles.boxText}>#3</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.boxText}>#4</Text>
          </View>
        </View>
      </View>
      <View style={styles.containerRow}>
        <View style={styles.containerColumn}>
          <View style={styles.box}>
            <Text style={styles.boxText}>#5</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.boxText}>#6</Text>
          </View>
        </View>
        <View style={styles.containerColumn}>
          <View style={styles.box}>
            <Text style={styles.boxText}>#7</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.boxText}>#8</Text>
          </View>
        </View>
      </View>
      <View style={styles.containerRow}>
        <View style={styles.containerColumn}>
          <View style={styles.box}>
            <Text style={styles.boxText}>#9</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.boxText}>#10</Text>
          </View>
        </View>
        <View style={styles.containerColumn}>
          <View style={styles.box}>
            <Text style={styles.boxText}>#11</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.boxText}>#12</Text>
          </View>
        </View>
      </View>
    </View>
  );
}



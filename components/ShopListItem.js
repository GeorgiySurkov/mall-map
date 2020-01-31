import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';

function ShopListItem(props) {
  return (
    <TouchableOpacity
      onPress={props.onClick}
      activeOpacity={0.6}
      style={styles.container}>
      <Text>{props.shopName}</Text>
    </TouchableOpacity>
  );
}

export default ShopListItem;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
});

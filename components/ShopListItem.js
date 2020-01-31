import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

function ShopListItem(props) {
  return (
    <TouchableOpacity
      onPress={props.onClick}
      activeOpacity={0.6}
      style={styles.container}>
      <Text style={styles.text}>{props.shopName}</Text>
    </TouchableOpacity>
  );
}

export default ShopListItem;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
  },
  text: {
    fontSize: 24,
  },
});

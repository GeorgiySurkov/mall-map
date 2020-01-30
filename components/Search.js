import React, {Component} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import SearchIcon from './svg/SearchIcon';

class Search extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SearchIcon style={styles.icon} />
        <TextInput
          placeholder={this.props.placeholder}
          style={styles.textinput}
        />
      </View>
    );
  }
}

export default Search;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#888888',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textinput: {
    paddingLeft: 15,
  },
  icon: {
    paddingLeft: 15,
  },
});

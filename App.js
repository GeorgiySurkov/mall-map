import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput,
} from 'react-native';
import ZoomableSvg from './components/ZoomableSvg';
import BottomDrawer from 'rn-bottom-drawer';
import SearchIcon from './components/svg/SearchIcon';
import MoreIcon from './components/svg/MoreIcon';

const {width, height} = Dimensions.get('window');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchItems: {
        'Синема парк': 0,
        'Gap Kids': 1,
      },
    };
  }

  render() {
    const listItems = [];
    for (let i = 0; i < 50; i++) {
      listItems.push('Some text text text');
    }
    return (
      <View style={styles.container}>
        <ZoomableSvg width={width} height={height} minZoom={1} maxZoom={3.5} />
        <BottomDrawer
          offset={0}
          startUp={false}
          containerHeight={500}
          downDisplay={420}>
          <View style={header.container}>
            <View style={header.icon}>
              <MoreIcon />
            </View>
            <Text style={header.text}>Список магазинов</Text>
          </View>
          <View style={search.container}>
            <View style={search.icon}>
              <SearchIcon />
            </View>
            <View style={search.textInput}>
              <TextInput placeholder="Найти магазин" />
            </View>
          </View>
          {/* <View style={styles.searchBox}>
            <TextInput placeholder="Найти магазин" />
          </View> */}
          <ScrollView>
            <TouchableOpacity activeOpacity={1}>
              {listItems.map(item => {
                return (
                  <View style={{padding: 5}}>
                    <Text>{item}</Text>
                  </View>
                );
              })}
            </TouchableOpacity>
          </ScrollView>
        </BottomDrawer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ecf0f1',
  },
});

const search = StyleSheet.create({
  container: {
    margin: 10,
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#888888',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    paddingLeft: 10,
  },
  textInput: {
    marginLeft: 10,
    flex: 1,
  },
});

const header = StyleSheet.create({
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    margin: 10,
  },
  container: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    paddingLeft: 15,
  },
});

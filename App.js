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
import BottomDrawer from 'rn-bottom-drawer';

import ZoomableSvg from './components/ZoomableSvg';
import SearchIcon from './components/svg/SearchIcon';
import MoreIcon from './components/svg/MoreIcon';
import CrossIcon from './components/svg/CrossIcon';
import ShopListItem from './components/ShopListItem';
import {graph, shopNodes} from './data/data';

const {width, height} = Dimensions.get('window');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchShopList: [...Object.keys(shopNodes)],
      searchText: '',
      toShop: null,
      ribList: [],
    };
    this.findRouteToShop = this.findRouteToShop.bind(this);
  }

  findRouteToShop(shopName) {
    let toNode = shopNodes[shopName];
    console.log('toNode: ', toNode);
    let fromNode = 1;
    const nodesToVisit = [fromNode];
    const visited = Array.from({length: 10}, () => false);
    const ribList = [];
    const backRefNodes = {};

    while (nodesToVisit.length > 0) {
      console.log('nodesToVisit: ', nodesToVisit);
      let nowNode = nodesToVisit.shift();
      console.log('nowNode: ', nowNode);
      const neighbors = Object.keys(graph[nowNode].neighbors);
      console.log('neighbors: ', neighbors);
      for (let i = 0; i < neighbors.length; i++) {
        let neighbor = parseInt(neighbors[i], 10);
        if (neighbor === toNode) {
          console.log('found route!');
          backRefNodes[neighbor] = [
            nowNode,
            graph[nowNode].neighbors[neighbor.toString()],
          ];
          let nextNode = toNode;
          while (nextNode !== fromNode) {
            ribList.push(backRefNodes[nextNode][1]);
            nextNode = backRefNodes[nextNode][0];
          }
          this.setState({
            ribList: [...ribList],
          });
          return;
        }
        if (!visited[neighbor] && !nodesToVisit.includes(neighbor)) {
          visited[neighbor] = true;
          nodesToVisit.push(neighbor);
          backRefNodes[neighbor] = [
            nowNode,
            graph[nowNode].neighbors[neighbor.toString()],
          ];
        }
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ZoomableSvg
          width={width}
          height={height}
          minZoom={1}
          maxZoom={3.5}
          ribList={this.state.ribList}
        />
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
            <View style={search.textInputContainer}>
              <TextInput
                autoGrow={false}
                style={search.textInput}
                placeholder="Найти магазин"
                value={this.state.searchText}
                onChangeText={value => {
                  this.setState({
                    searchShopList: [
                      ...Object.keys(shopNodes).filter(shopName =>
                        shopName.toLowerCase().includes(value.toLowerCase()),
                      ),
                    ],
                    searchText: value,
                  });
                }}
              />
            </View>
            {this.state.searchText.length !== 0 && (
              <TouchableOpacity
                style={search.crossIcon}
                activeOpacity={0.6}
                onPress={() =>
                  this.setState({
                    searchText: '',
                    searchShopList: [...Object.keys(shopNodes)],
                  })
                }>
                <CrossIcon />
              </TouchableOpacity>
            )}
          </View>
          {/* <View style={styles.searchBox}>
            <TextInput placeholder="Найти магазин" />
          </View> */}
          <ScrollView>
            <TouchableOpacity activeOpacity={1}>
              {this.state.searchShopList.map(shopName => {
                return (
                  <ShopListItem
                    shopName={shopName}
                    onClick={() => {
                      this.setState({
                        toShop: shopName,
                      });
                      this.findRouteToShop(shopName);
                    }}
                    key={shopName}
                  />
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
    // backgroundColor: '#888888',
    borderColor: '#a6a6a6',
    borderWidth: 2,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    paddingLeft: 10,
  },
  crossIcon: {
    paddingHorizontal: 10,
  },
  textInputContainer: {
    marginLeft: 10,
    flex: 1,
    // justifyContent: 'center',
    // backgroundColor: '#FF0000',
  },
  textInput: {
    fontSize: 24,
    // backgroundColor: '#00FF00',
    padding: 0,
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

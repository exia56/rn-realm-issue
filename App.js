/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import CostsRes from './realm-costs-respository';

type Props = {};
export default class App extends Component<Props> {
  state = {
    datas: [],
  };

  update = () => {
    CostsRes.pull().then(datas => {
      this.setState({ datas });
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={() => {
          let day = Math.round(Math.random() * 30);
          let month = Math.round(Math.random() * 12);
          let year = 2019;
          CostsRes.insert({
            id: 'id' + Date.now(),
            amount: Math.round(Math.random() * 100),
            dateStamp: +(`${year}` + `${month}`.padStart(2, '0') + `${day}`.padStart(2, '0')),
            day,
            detail: 'asdasd' + Date.now(),
            month,
            year,
            type: 1,
          }).then(this.update);
        }}>
          <Text>insert</Text>
        </TouchableHighlight>
        {this.state.datas.map(cost)}
      </View >
    );
  }
}

function cost(c) {
  return (
    <Text key={c.id}>
      {JSON.stringify(c)}
    </Text>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

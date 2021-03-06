import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  AsyncStorage,
  Button
} from 'react-native';
import { List, Snackbar } from 'react-native-paper';

import ShoppingCartView from './ShoppingCartView';

/**
 * Wrapper for ShoppingCartView, this was introduced to make
 * the snackbar notification work.
 */
export default class ShoppingCartViewWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  render() {
    const { components, clearAsyncStorage } = this.props;
    const mappedItems = [];
    return (
      <View style={styles.container}>
        <ShoppingCartView
          components={components}
          clearAsyncStorage={clearAsyncStorage}
          showSnack={() => {this.setState({ visible: true })}}
        />
        <Snackbar
          visible={this.state.visible}
          onDismiss={() => this.setState({ visible: false })}
          action={{
            label: 'Close',
            onPress: () => {
              this.setState({ visible: false });
            }
          }}
          style={styles.position}
        >
          Thank you for your purchase!
        </Snackbar>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  margin: { margin: 35 },
  h1: { fontSize: 28 },
  center: { alignItems: 'center' },
  small: { fontSize: 10 },
  heading: { margin: 10 },
  body: { color: 'white' },
  container: {
    flex: 1,
    justifyContent: 'space-between'
  }
});

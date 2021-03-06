import React from 'react';
import {
  Text, Modal, View, StyleSheet, TextInput
} from 'react-native';
import { Button, Checkbox } from 'react-native-paper';
import DropDown from './Dropdown';

/**
 * This component handles most of the building of the query
 * string that will be sent to the backend. It has options for 
 * entering some text to search by name, to filter by category
 * or producer, and to sort. It builds the query, and then calls a 
 * function (setQuery) it gets from parent component to send the query string 
 * up the class hierarchy.
 */
export default class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: { checked1: false, checked2: false },
      producerFilter: '',
      categoryFilter: '',
      priceSort: '',
      ascSort: false,
      active: true,
      text: '',
      query: '',
      value: ''
    };
  }

  onChangeText = (text) => {
    this.setState({
      value: text
    });
  };

  createQueryFromParams = () => {
    const { setQuery } = this.props;

    // Build the query based on state
    const filterField = this.state.producerFilter ? 'producer' : 'category';
    const filterVal = this.state.producerFilter
      ? this.state.producerFilter
      : this.state.categoryFilter;
    const isAsc = this.state.checked.checked2;
    const sortBy = this.state.checked.checked1;
    const objectsPerPage = '';
    const pageNum = '';
    const nameSearch = this.state.value;

    const queryTmp = (filterVal ? `filterVal=${filterVal}&` : '')
      + (nameSearch ? `nameSearch=${nameSearch}&` : '')
      + (filterField ? `filterField=${filterField}&` : '')
      + (pageNum ? `pageNum=${pageNum}&` : '')
      + (objectsPerPage ? `objectsPerPage=${objectsPerPage}&` : '')
      + (sortBy ? 'sortBy=price&' : '')
      + (isAsc ? 'isAsc=false&' : '');

    this.setState({
      query: queryTmp,
      active: !this.state.active
    });
    setQuery(queryTmp);
  };

  render() {
    const {
      checked,
      active,
      query,
      producerFilter,
      categoryFilter,
      priceSort,
      ascSort,
      text,
      value
    } = this.state;
    const { filter } = this.props;
    return (
      <Modal visible={filter === active} animationType="slide">
        <View style={{ alignItems: 'center', marginTop: 50 }}>
          <Text style={{ fontSize: 28 }}>eCatalog</Text>
          <Text style={{ fontSize: 10 }}>home for electronics</Text>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            marginTop: 10,
            padding: 20,
            backgroundColor: '#D0D3F4'
          }}
        >
          <Text style={{ fontSize: 25, marginBottom: 10, marginTop: 2 }}>
            {' '}
            Filter by ...
            {' '}
          </Text>

          <View style={{ width: 300, border: 3 }}>
            <TextInput
              style={{
                height: 40,
                borderColor: 'grey',
                borderWidth: 1.5,
                borderRadius: 2,
                padding: 10
              }}
              onChangeText={(text) => this.onChangeText(text)}
              value={value}
              placeholder="By name ... "
            />
          </View>

          <View>
            <View>
              <DropDown
                name="category"
                data={category}
                onChangeText={(text) => {
                  this.setState({ categoryFilter: text });
                }}
              />
              <DropDown
                name="Producer"
                data={producer}
                onChangeText={(text) => {
                  this.setState({ producerFilter: text });
                }}
              />
            </View>

            <Text style={{ fontSize: 25, marginBottom: 20, marginTop: 50 }}>
              {' '}
              Sort by ...
              {' '}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.checkbox}>
                <Checkbox
                  color="blue"
                  status={checked.checked1 ? 'checked' : 'unchecked'}
                  onPress={() => {
                    this.setState({
                      checked: { ...checked, checked1: !checked.checked1 }
                    });
                  }}
                />
              </View>
              <Text style={styles.chectext}>Price</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={styles.checkbox}>
                <Checkbox
                  color="blue"
                  status={checked.checked2 ? 'checked' : 'unchecked'}
                  onPress={() => {
                    this.setState({
                      checked: { ...checked, checked2: !checked.checked2 },
                      ascSort: checked.checked2
                    });
                  }}
                />
              </View>
              <Text style={styles.chectext}>Descending sort </Text>
            </View>

            <Button
              mode="contained"
              style={{ marginTop: 25 }}
              onPress={this.createQueryFromParams}
            >
              Submit
            </Button>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  checkbox: {
    height: 40,
    width: 40,
    borderWidth: 1.5,
    borderColor: 'grey',
    borderRadius: 3,
    marginBottom: 12
  },
  chectext: { margin: 8, fontSize: 18 }
});

const producer = [
  {
    value: 'Apple'
  },
  {
    value: 'Microsoft'
  },
  {
    value: 'Samsung'
  },
  {
    value: 'LG'
  },
  {
    value: 'Philips'
  },
  {
    value: 'Lenovo'
  },
  {
    value: 'Logitech'
  },
  {
    value: 'Nokia'
  },
  {
    value: 'Amazon'
  },
  {
    value: 'Bosch'
  },
  {
    value: 'Bose'
  },
  {
    value: 'AMD'
  },
  {
    value: 'Intel'
  }
];

const category = [
  {
    value: 'Laptop'
  },
  {
    value: 'Smartphone'
  },
  {
    value: 'TV'
  },
  {
    value: 'Game Console'
  },
  {
    value: 'Tablet'
  },
  {
    value: 'Headphones'
  },
  {
    value: 'Smart Watch'
  },
  {
    value: 'Camera'
  },
  {
    value: 'Home and Leisure'
  },
  {
    value: 'Processor'
  }
];

import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

import ModalDropdown from 'react-native-modal-dropdown';
import { Icon } from "react-native-elements";
import { sizeWidth, sizeHeight, sizeFont } from "../../helpers/size.helper";
import { strings } from '../../locate/I18n';

export default class Dropdown extends Component {
  state = {
    option: undefined
  }

  // componentWillReceiveProps(nextProps) {
  //   if(JSON.stringify(nextProps.options[0]) != JSON.stringify(this.state.props)) {
  //     this.setState({option: nextProps.options[0]})
  //   }
  // }

  onSelect = (index) => {
    const rowData = this.props.options[index];
    this.setState({option: rowData})
    this.props.onSelect(index, rowData)
  }

  render() {
    return (
      <ModalDropdown
        {...this.props}
        style={[styles.modal, this.props.style]}
        dropdownStyle={[this.props.dropdownStyle, {borderWidth: 1}]}
        defaultIndex={0}
        renderRow={this.renderRow}
        onSelect={this.onSelect}
      >
        <View style={styles.content} >
          <Text style={styles.text}>{this.state.option ? this.state.option.value : strings('select_an_item')}</Text>
          <Icon
            iconStyle={styles.icon}
            name={"triangle-down"}
            type="octicon"
            color="#888888"
            size={sizeFont(4.46)}
          />
        </View>
      </ModalDropdown>
    )
  }

  renderRow = (rowData, index, isSelected) => {
    const {key, value} = rowData
    return (
      <TouchableOpacity style={{padding: 10, justifyContent: 'center'}}>
        <Text>{value}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5
  },
  content: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
    padding: 10
  },
  text: {
    flex: 1,
    marginRight: 10,
    color: 'black'
  },
  icon: {
    marginLeft: sizeWidth(1)
  },
})

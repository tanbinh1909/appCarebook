import React, { Component } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { sizeWidth } from "../../helpers/size.helper";

export default class Input extends Component {
  render() {
    const {
      style,
      placeholder,
      value,
      onChangeText,
      secureTextEntry,
      textStyle,
      multiline,
      rightIcon,
      keyboardType,
      editable,
      maxLength,
      selectTextOnFocus,
      onFocus,
      defaultValue
    } = this.props;
    return (
      <View style={[styles.container, style]}>
        <TextInput
          multiline={multiline}
          placeholder={placeholder}
          value={value}
          autoCapitalize="none"
          secureTextEntry={secureTextEntry}
          onChangeText={onChangeText}
          underlineColorAndroid="transparent"
          placeholderTextColor="#888888"
          style={[styles.input, textStyle]}
          keyboardType={keyboardType}
          editable={editable}
          maxLength={maxLength}
          selectTextOnFocus={selectTextOnFocus}
          onFocus={onFocus}
          defaultValue = {defaultValue}
        />
        {rightIcon}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: sizeWidth(9.06),
    backgroundColor: "white",
    alignItems: "center",
    marginVertical: sizeWidth(1),
    paddingHorizontal: sizeWidth(2.13),
    borderRadius: sizeWidth(1),
    borderWidth: 1,
    borderColor: "#888888",
  },
  input: {
    fontSize: sizeWidth(3),
    flex: 1,
    textAlign: "left",
    color: "black",
    fontWeight: "bold",
    height: sizeWidth(9.06),
    padding: 0
  }
});

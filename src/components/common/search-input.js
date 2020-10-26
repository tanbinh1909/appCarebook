import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import PropTypes from "prop-types";
import { sizeFont, sizeHeight, sizeWidth } from "../../helpers/size.helper";
import { Icon } from "react-native-elements";

export default class SearchInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      placeholder,
      onFocus,
      style,
      inputStyle,
      value,
      onChangeText,
      onSubmitEditing,
      isArea,
      isNormal,
      onClearText,
    } = this.props;
    return (
      <View>
        {isNormal && <View  style={[styles.container, style]}>
          <Icon
            name={"search"}
            style={styles.icon}
            type="font-awesome"
            color="#888888"
            size={sizeFont(4.46)}
          />
          <TextInput
            style={[styles.textInput, inputStyle]}
            value={value}
            underlineColorAndroid="transparent"
            onFocus={onFocus}
            placeholder={placeholder}
            returnKeyType="search"
            onSubmitEditing={onSubmitEditing}
            onChangeText={onChangeText}
            placeholderTextColor="#888888"
            ref={input => (this.input = input)}
          />
          </View>}
        {isArea && <View style = {styles.position}>
          <Icon
            iconStyle={styles.iconArea}
            name={"map-marker"}
            type="font-awesome"
            color="rgb(243, 88, 92)"
            size={sizeFont(4.46)}
          />
          <TextInput
            style={[styles.textInput, inputStyle]}
            value={value}
            underlineColorAndroid="transparent"
            onFocus={onFocus}
            placeholder={placeholder}
            // returnKeyType="search"
            onSubmitEditing={onSubmitEditing}
            onChangeText={onChangeText}
            placeholderTextColor="#888888"
            ref={input => (this.input = input)}
          />
          {value !== '' && 
            (<Icon
            iconStyle={styles.iconArea}
            name={"times"}
            type="font-awesome"
            color="#c9cdd4"
            size={sizeFont(4.46)}
            onPress={onClearText}
            />
          )}
          </View>}
      </View>
    );
  }

  focus = () => {
    this.input.focus();
  };
}

SearchInput.propTypes = {
  placeholder: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#888888",
    height: sizeWidth(9),
    alignItems: "center",
    backgroundColor: "white",
    flexDirection: "row",
    paddingHorizontal: sizeWidth(2.13),
    justifyContent: "center",
    borderRadius: sizeWidth(1)
  },
  textInput: {
    height: sizeHeight(9),
    fontSize: sizeFont(3.4),
    flex: 1,
    color: "#888888",
    alignItems: "center",
    padding: 0
  },
  icon: {},
  clearText: {
    width: sizeWidth(3),
    height: sizeWidth(3),
    marginRight: sizeWidth(5)
  },
  iconArea: {
    marginHorizontal: sizeWidth(2.13)
  },
  position: {
    width: sizeWidth(55),
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#888888",
    borderRadius: sizeWidth(1),
    height: sizeWidth(9),
    alignItems: "center"
  },
});

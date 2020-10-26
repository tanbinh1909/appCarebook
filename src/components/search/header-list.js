import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Text from "../common/text";
import { Icon, Header } from "react-native-elements";
import { sizeFont, sizeWidth } from "../../helpers/size.helper";
import { secondary_bg_color } from "../../constants/app.constant";
import { connect } from "react-redux";
import { strings } from '../../locate/I18n';

const mapStateToProps = state => ({
  search: state.search
});

class HeaderList extends Component {
  render() {
    const { onFilterPress, search } = this.props;
    const { totalRecord } = search;
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>
            {strings('component_search.search_result', {number: totalRecord})}
          </Text>
        </View>
        <TouchableOpacity onPress={onFilterPress} style={styles.filter}>
          <Icon
            name="filter"
            type="font-awesome"
            color={secondary_bg_color}
            size={sizeFont(4.46)}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(HeaderList);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  text: {
    fontSize: sizeFont(4.2),
    color: "black",
    fontWeight: "bold"
  },
  total: {
    fontSize: sizeFont(4.2),
    color: "red",
    fontWeight: "bold"
  },
  filter: {
    borderWidth: 1,
    borderColor: "#888888",
    width: sizeWidth(7),
    height: sizeWidth(7),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: sizeWidth(5)
  }
});

import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Switch
} from "react-native";
import PropTypes from "prop-types";
import Text from "../common/text";
import { Icon } from "react-native-elements";
import { sizeFont, sizeWidth } from "../../helpers/size.helper";
import HeaderList from "./header-list";
import MedicalCenterItem from "./medical-center-item";
import HospitalItem from "./hospital-item";
import DrugstoreItem from "./drugstore-item";
import Rate from "../common/rate";
import FilterAction from "./filter-action";
import { strings } from '../../locate/I18n';
export default class DrugstoreList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFilter: false,
      byGovernment: false,
      byPrivate: false
    };
  }

  refreshFilter = () => {
    this.setState({
      byGovernment: false,
      byPrivate: false
    });
  };

  getDefaultFilter = () => {
    return {
      searchType: ["3"]
    };
  };

  getFilter = () => {
    const { byGovernment, byPrivate } = this.state;
    const owned = [];
    byGovernment && owned.push("2");
    byPrivate && owned.push("1");
    return {
      owned,
      searchType: ["3"]
    };
  };

  renderFilter = () => {
    return (
      <View style={styles.filter}>
        <View style={styles.filterRow}>
          <Text style={styles.filterText}>{strings('component_search.government')}</Text>
          <Switch
            value={this.state.byGovernment}
            onValueChange={value => this.setState({ byGovernment: value })}
            style={styles.switch}
            onTintColor="#3AAF00"
            thumbTintColor="rgb(93, 177, 74)"
          />
        </View>
        <View style={styles.filterRow}>
          <Text style={styles.filterText}>{strings('component_search.privately')}</Text>
          <Switch
            value={this.state.byPrivate}
            onValueChange={value => this.setState({ byPrivate: value })}
            style={styles.switch}
            onTintColor="#3AAF00"
            thumbTintColor="rgb(93, 177, 74)"
          />
        </View>

        <FilterAction
          onBackPress={() => this.setState({ showFilter: false })}
          onFilterPress={this.onFilterPress}
          onRefreshPress={this.refreshFilter}
        />
      </View>
    );
  };

  onFilterPress = () => {
    this.setState({ showFilter: false });
    this.props.onFilterPress();
  };

  render() {
    const { showFilter } = this.state;
    return (
      <View style={styles.container}>
        <HeaderList
          onFilterPress={() => this.setState({ showFilter: !showFilter })}
        />
        {showFilter && this.renderFilter()}
        <FlatList
          // onMomentumScrollBegin={this.props.onScroll}
          bounces={false}
          style={styles.list}
          onEndReached={this.props.onEndReached}
          onEndReachedThreshold={0.2}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={this.props.elements}
          renderItem={this.renderDrugstoreItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }

  renderDrugstoreItem = ({ item, index }) => {
    return <DrugstoreItem item={item} />;
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: sizeWidth(5),
    paddingVertical: sizeWidth(2.13)
  },
  list: {
    marginTop: sizeWidth(2)
  },
  filter: {
    marginVertical: sizeWidth(1)
  },
  filterRow: {
    marginVertical: sizeWidth(1),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  filterText: {
    fontSize: sizeFont(3.4),
    fontWeight: "bold"
  },
  switch: {}
});

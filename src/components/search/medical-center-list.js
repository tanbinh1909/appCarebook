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
import Rate from "../common/rate";
import Button from "../common/button";
import FilterAction from "./filter-action";
import RatePicker from "../common/rate-picker";
import lodash from "lodash";
import { strings } from '../../locate/I18n';

export default class MedicalCenterList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFilter: false,
      hasInsurance: false,
      noInsurance: false,
      byGovernment: false,
      byPrivate: false,
      rating: 5
    };
  }

  refreshFilter = () => {
    this.setState({
      hasInsurance: false,
      noInsurance: false,
      byGovernment: false,
      byPrivate: false,
      rating: 5
    });
  };

  getDefaultFilter = () => {
    return {
      searchType: ["5"]
    };
  };

  getFilter = () => {
    const { hasInsurance,noInsurance, byGovernment, byPrivate } = this.state;
    const insurance = [];
    hasInsurance && insurance.push("1");
    noInsurance && insurance.push("2");
    const owned = [];
    byGovernment && owned.push("2");
    byPrivate && owned.push("1");
    const rating = [this.state.rating.toString()];
    return {
      owned,
      insurance,
      rating,
      searchType: ["5"]
    };
  };

  renderFilter = () => {
    return (
      <View style={styles.filter}>
        <View style={styles.filterRow}>
          <Text style={styles.filterText}>{strings('component_search.insu')}</Text>
          <Switch
            value={this.state.hasInsurance}
            onValueChange={value => this.setState({ hasInsurance: value })}
            style={styles.switch}
            onTintColor="#3AAF00"
            thumbTintColor="rgb(93, 177, 74)"
          />
        </View>
        <View style={styles.filterRow}>
          <Text style={styles.filterText}>{strings('component_search.no_insu')}</Text>
          <Switch
            value={this.state.noInsurance}
            onValueChange={value => this.setState({ noInsurance: value })}
            style={styles.switch}
            onTintColor="#3AAF00"
            thumbTintColor="rgb(93, 177, 74)"
          />
        </View>
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
        <View style={styles.filterRow}>
          <Text style={styles.filterText}>{strings('component_search.star_rating')}</Text>
          <RatePicker
            rate={this.state.rating}
            onRateChange={rating => this.setState({ rating })}
            size={sizeFont(5)}
            maxRate={5}
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
          style={styles.list}
          bounces={false}
          // onMomentumScrollBegin={this.props.onScroll}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          onEndReached={this.props.onEndReached}
          onEndReachedThreshold={0.2}
          data={this.props.elements}
          renderItem={this.renderMedicalCenterItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }

  renderMedicalCenterItem = ({ item, index }) => {
    return <MedicalCenterItem item={item} />;
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

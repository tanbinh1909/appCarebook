import React, { Component } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Switch
} from "react-native";
import Text from "../common/text";
import { sizeFont, sizeWidth } from "../../helpers/size.helper";
import HeaderList from "./header-list";
import ClinicItem from "./clinic-item";
import FilterAction from "./filter-action";
import RatePicker from "../common/rate-picker";
import { strings } from '../../locate/I18n';

export default class ClinicList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFilter: false,
      hasInsurance: false,
      noInsurance: false,
      rating: 5
    };
  }

  refreshFilter = () => {
    this.setState({
      hasInsurance: false,
      noInsurance: false,
      rating: 5
    });
  };

  getDefaultFilter = () => {
    return {
      searchType: ["1"]
    };
  };

  getFilter = () => {
    const { hasInsurance, noInsurance } = this.state;
    const insurance = [];
    hasInsurance && insurance.push("1");
    noInsurance && insurance.push("2");
    const rating = [this.state.rating.toString()];
    return {
      insurance,
      rating,
      searchType: ["1"]
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
          // onMomentumScrollBegin={this.props.onScroll}
          bounces={false}
          style={styles.list}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={this.props.elements}
          onEndReached={this.props.onEndReached}
          onEndReachedThreshold={0.2}
          renderItem={this.renderClinicItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }

  renderClinicItem = ({ item, index }) => {
    return <ClinicItem item={item} />;
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

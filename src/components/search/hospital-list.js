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
import Rate from "../common/rate";
import FilterAction from "./filter-action";
import lodash from "lodash";
import RatePicker from "../common/rate-picker";
import { strings } from '../../locate/I18n';
export default class HospitalList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFilter: false,
      hasInsurance: false,
      noInsurance: false,
      byGovernment: false,
      byPrivate: false,
      byCenter: false,
      byLocal: false,
      rating: 5
    };
  }

  refreshFilter = () => {
    this.setState({
      hasInsurance: false,
      noInsurance: false,
      byGovernment: false,
      byPrivate: false,
      byCenter: false,
      byLocal: false,
      rating: 5
    });
  };

  getFilter = () => {
    const {
      hasInsurance,
      noInsurance,
      byGovernment,
      byPrivate,
      byCenter,
      byLocal
    } = this.state;
    const insurance = [];
    hasInsurance && insurance.push("1");
    noInsurance && insurance.push("2");
    const level = [];
    byCenter && level.push("1");
    byLocal && level.push("2");
    const owned = [];
    byGovernment && owned.push("2");
    byPrivate && owned.push("1");
    const rating = [this.state.rating.toString()];
    return {
      level,
      owned,
      insurance,
      rating,
      searchType: ["4"]
    };
  };

  getDefaultFilter = () => {
    return {
      searchType: ["4"]
    };
  };

  renderFilter = () => {
    return (
      <View style={styles.filter}>
        <View style={styles.filterRow}>
          <Text style={styles.filterText}>{strings('component_search.has_insu')}</Text>
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
          <Text style={styles.filterText}>{strings('component_search.central')}</Text>
          <Switch
            value={this.state.byCenter}
            onValueChange={value => this.setState({ byCenter: value })}
            style={styles.switch}
            onTintColor="#3AAF00"
            thumbTintColor="rgb(93, 177, 74)"
          />
        </View>
        <View style={styles.filterRow}>
          <Text style={styles.filterText}>{strings('component_search.local')}</Text>
          <Switch
            value={this.state.byLocal}
            onValueChange={value => this.setState({ byLocal: value })}
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
          style={styles.list}
          bounces={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={this.props.elements}
          onEndReached={this.props.onEndReached}
          onEndReachedThreshold={0.2}
          renderItem={this.renderHospitalItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }

  renderHospitalItem = ({ item, index }) => {
    return <HospitalItem item={item} />;
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

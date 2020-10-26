import React, { Component } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Switch,
  Dimensions
} from "react-native";
import Text from "../common/text";
import { sizeFont, sizeWidth, sizeHeight } from "../../helpers/size.helper";
import HeaderList from "./header-list";
import DoctorItem from "./doctor-item";
import FilterAction from "./filter-action";
import RatePicker from "../common/rate-picker";
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import FormatHelper from '../../helpers/format.helper';
import { strings } from '../../locate/I18n';

export default class DoctorList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFilter: false,
      byProfessor: false,
      byPhd: false,
      byMaster: false,
      byDoctor: false,
      rating: 5,
      values: [0, 100000000]
    };
  }

  getDefaultFilter = () => {
    return {
      searchType: ["1"]
    };
  };
  
  multiSliderValuesChange = (values) => {
          this.setState({
              values,
          });
      };
  getFilter = () => {
    const {
      byProfessor,
      byPhd,
      byMaster,
      byDoctor
    } = this.state;
    const price1 = this.state.values[0];
    const price2 = this.state.values[1];
    const certificate = [];
    const rating = [this.state.rating.toString()];

    byProfessor && certificate.push("1");
    byPhd && certificate.push("2");
    byMaster && certificate.push("3");
    byDoctor && certificate.push("4");

    return {
      certificate,
      price1,
      price2,
      rating,
      searchType: ["1"]
    };
  };

  renderFilter = () => {
    return (
      <View style={styles.filter}>

        <View style={styles.filterRow}>
          <Text style={styles.filterText}>{strings('component_search.pr_apr')}</Text>
          <Switch
            style={styles.switch}
            value={this.state.byProfessor}
            onValueChange={value => this.setState({ byProfessor: value })}
            onTintColor="#3AAF00"
            thumbTintColor="rgb(93, 177, 74)"
          />
        </View>

        <View style={styles.filterRow}>
          <Text style={styles.filterText}>{strings('component_search.phd')}</Text>
          <Switch
            style={styles.switch}
            value={this.state.byPhd}
            onValueChange={value => this.setState({ byPhd: value })}
            onTintColor="#3AAF00"
            thumbTintColor="rgb(93, 177, 74)"
          />
        </View>
        <View style={styles.filterRow}>
          <Text style={styles.filterText}>{strings('component_search.master')}</Text>
          <Switch
            style={styles.switch}
            value={this.state.byMaster}
            onValueChange={value => this.setState({ byMaster: value })}
            onTintColor="#3AAF00"
            thumbTintColor="rgb(93, 177, 74)"
          />
        </View>
        <View style={styles.filterRow}>
          <Text style={styles.filterText}>{strings('component_search.doctor')}</Text>
          <Switch
            style={styles.switch}
            value={this.state.byDoctor}
            onValueChange={value => this.setState({ byDoctor: value })}
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
        <View style={styles.priceWrap}>
          <Text style={styles.filterText}>{strings('component_search.service_price')}</Text>
          <View style={styles.price}>
          <MultiSlider
                    values={[this.state.values[0], this.state.values[1]]}
                    sliderLength={Dimensions.get('screen').width-90}
                    onValuesChange={this.multiSliderValuesChange}
                    min={0}
                    max={100000000}
                    step={1000}
                />
          </View>
          <View  style={styles.toolbar}>
            <Text style={{flex: 1, textAlign: 'left', fontSize: 12}}>Từ: {FormatHelper.formatNumberCurrency(this.state.values[0])} VNĐ</Text>
            <Text style={{flex: 1, textAlign: 'right', fontSize: 12}}>Đến: {FormatHelper.formatNumberCurrency(this.state.values[1])} VNĐ</Text>
          </View>

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

  refreshFilter = () => {
    this.setState({
      byProfessor: false,
      byPhd: false,
      byMaster: false,
      byDoctor: false,
      rating: 5,
      values: [0, 100000000]
    });
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
          scrollEventThrottle={16}
          bounces={false}
          style={styles.list}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={this.props.elements}
          renderItem={this.renderDoctorItem}
          onEndReached={this.props.onEndReached}
          onEndReachedThreshold={0.2}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }

  renderDoctorItem = ({ item, index }) => {
    return <DoctorItem item={item} />;
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
  priceWrap: {
    marginVertical: sizeWidth(1)
  },
  filterText: {
    fontSize: sizeFont(3.4),
    fontWeight: "bold"
  },
  switch: {},
  price: {
    marginTop: sizeWidth(1),

    flexDirection: "row",
    borderColor: "#888888",
    height: sizeWidth(6.5),
    justifyContent: "center",
    alignItems: "center"
  },
  textPrice: {},
  textSeparator: {
    marginHorizontal: sizeWidth(3)
  },
  priceInput: {
    height: sizeHeight(9),
    fontSize: sizeFont(3.4),
    flex: 1,
    color: "#888888",
    textAlign: "center",
    alignItems: "center",
    marginHorizontal: sizeWidth(1.13),
    padding: 0
  },
  toolbar:{
        flexDirection:'row'
    },

});

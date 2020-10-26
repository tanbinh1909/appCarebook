import React, { Component } from "react";
import {
  View, StyleSheet, Keyboard, Dimensions,
  TouchableWithoutFeedback, ScrollView,
  TouchableOpacity, ActivityIndicator,
} from "react-native";
import { resetPage } from "../actions/nav.action";
import { connect } from "react-redux";
import Text from "../components/common/text";
import AppHeader from "../components/app-header";
import Button from "../components/common/button";
import SearchInput from "../components/common/search-input";
import { text } from "../constants/app.constant";
import { sizeWidth, sizeFont, sizeHeight } from "../helpers/size.helper";
import { Icon } from "react-native-elements";
import ModalDropdown from "react-native-modal-dropdown";
import MedicalCenterList from "../components/search/medical-center-list";
import ClinicList from "../components/search/clinic-list";
import HospitalList from "../components/search/hospital-list";
import DrugstoreList from "../components/search/drugstore-list";
import BookingModal from "../screens/booking-modal.screen";
import DoctorList from "../components/search/doctor-list";
import LaboratoryList from "../components/search/laboratory-list";
import {
  SEARCH_REQUESTED,
  SEARCH_TYPE_CHANGED,
  SEARCH_MORE_REQUESTED
} from "../actions/search.action";
import { strings } from '../locate/I18n';
import { secondary_bg_color } from "../constants/app.constant";
import { appConfig } from '../config/app.config';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;


class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionIndex: 0,
      keyword: [text.empty_string],
      filterType: strings('search.doctor'),
      address: text.empty_string,
      showFilter: true,
      dataSearchLocation: [],
    };
  }

  render() {
    const { showFilter } = this.state;
    const { booking } = this.props.bookingModal;
    const { loading } = this.props.search;

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <AppHeader isMain={true} />
          <View style={styles.line} />
          {showFilter && this.renderFilters()}
          {showFilter && <View style={styles.line} />}
          {loading && <ActivityIndicator size="large" color={secondary_bg_color} style={styles.activityIndicator} /> }
          {!loading && this.renderList()}
          <BookingModal />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  renderList = () => {
    const { filterType } = this.state;
    const { elements } = this.props.search;
    switch (filterType) {
      case strings('search.hospital'):
        return (
          <ClinicList
            // onScroll={this.onScroll}
            onEndReached={this.onEndReached}
            onFilterPress={this.filter}
            ref={list => (this.list = list)}
            elements={elements}
          />
        );
      case strings('search.clinic'):
        return (
          <HospitalList
            // onScroll={this.onScroll}
            onEndReached={this.onEndReached}
            onFilterPress={this.filter}
            ref={list => (this.list = list)}
            elements={elements}
          />
        );
      case strings('search.medical_center'):
        return (
          <MedicalCenterList
            // onScroll={this.onScroll}
            onEndReached={this.onEndReached}
            onFilterPress={this.filter}
            ref={list => (this.list = list)}
            elements={elements}
          />
        );
      case strings('search.drugstore'):
        return (
          <DrugstoreList
            // onScroll={this.onScroll}
            onEndReached={this.onEndReached}
            onFilterPress={this.filter}
            ref={list => (this.list = list)}
            elements={elements}
          />
        );
      case strings('search.doctor'):
        return (
          <DoctorList
            // onScroll={this.onScroll}
            onEndReached={this.onEndReached}
            onFilterPress={this.filter}
            ref={list => (this.list = list)}
            elements={elements}
          />
        );
      case strings('search.laboratory'):
        return (
          <LaboratoryList
            onEndReached={this.onEndReached}
            onFilterPress={this.filter}
            ref={list => (this.list = list)}
            elements={elements}
          />
        );
    }
  };

  renderFilterRow = (option, index, isSelected) => {
    return (
      <TouchableOpacity>
        <Text style={styles.filterText}>{option}</Text>
      </TouchableOpacity>
    )
  };

  onEndReached = () => {
    const {
      loading,
      refreshing,
      loadingMore,
      maxResult,
      totalRecord
    } = this.props.search;
    const { lastParams } = this.state;
    if (!loading && !refreshing && !loadingMore && maxResult < totalRecord) {
      this.props.searchAndFilterMore(lastParams);
    }
  };

  onSelectFilterType = (index, value) => {
    this.props.changeSearchType();
    this.setState({
      optionIndex: index,
      filterType: value,
      address: text.empty_string,
      keyword: [text.empty_string]
    });
  };

  handleSearchLocation = async text => {
    this.setState({
      address: text,
    });
    if (text !== '' && text !== null) {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${text}&key=${appConfig.GOOGLE_API_KEY}`
      );
      const dataResponse = await response.json();
      if (Object.prototype.hasOwnProperty.call(dataResponse, 'results') && dataResponse.results.length > 0 ) {
        const { results } = dataResponse;
        this.setState({
          dataSearchLocation: results
        })
      }
    } else {
      this.setState({
        dataSearchLocation: [],
      })
    }
  };

  handleClickItemSearch = address => {
    this.setState({
      address,
      dataSearchLocation: [],
    });
    this.search();
  }

  renderFilters = () => {
    const { keyword, filterType, address, dataSearchLocation } = this.state;
    let htmlAutocompleteContainer = [];
    if (dataSearchLocation.length > 0) {
      dataSearchLocation.forEach((item, index) => {
        const htmlItem = (
          <TouchableOpacity key={index} onPress={() => this.handleClickItemSearch(item.formatted_address)}>
            <Text style={styles.itemSearch}>{item.formatted_address}</Text>
          </TouchableOpacity>
        );
        htmlAutocompleteContainer.push(htmlItem)
      });
    }
    return (
      <View style={styles.body}>
        <View style={styles.topFilter}>
          <ModalDropdown
            style={styles.filterType}
            onSelect={this.onSelectFilterType}
            renderRow={this.renderFilterRow}
            options={[
              strings('search.doctor'),
              strings('search.clinic'),
              strings('search.laboratory'),
              strings('search.drugstore'),
              strings('search.hospital'),
              strings('search.medical_center'),
            ]}
          >
            <View style={styles.filterWrap}>
              <Icon
                iconStyle={styles.icon}
                name={"home"}
                type="font-awesome"
                color="#888888"
                size={sizeFont(4.46)}
              />
              <Text style={styles.typeText}>{filterType}</Text>
            </View>
          </ModalDropdown>
          <SearchInput
            value={address}
            onChangeText={text => this.handleSearchLocation(text)}
            onClearText={() => this.handleClickItemSearch('')}
            placeholder={strings('search.msg1')}
            isNormal = {false}
            isArea = {true}
          />
        </View>
        {htmlAutocompleteContainer .length > 0 && (
          <View style={styles.autocompleteContainer}>
            <ScrollView>
              {htmlAutocompleteContainer}
            </ScrollView>
          </View>
        )}
        <SearchInput
          value={keyword[0]}
          onSubmitEditing={this.search}
          onChangeText={text => this.setState({ keyword: [text] })}
          placeholder={strings('search.msg2')}
          inputStyle={{marginLeft: 10}}
          isNormal = {true}
          isArea = {false}
        />
        <Button
          onPress={this.search}
          style={styles.buttonSearch}
          text={strings('search.search')}
        />
      </View>
    );
  };

  search = async () => {
    const { optionIndex, keyword, address } = this.state;
    const { location } = this.props;
    let addressRequest = address;
    if (address === '' && location !== null) {
      addressRequest = `lat:${location.latitude ? location.latitude : ''}, long:${location.longitude ? location.longitude : ''}`;
    }
    const params = {
      searchType: [optionIndex],
      keyword,
      address: addressRequest,
    };
    this.setState({ lastParams: params });
    this.props.searchAndFilter(params);
  };

  filter = () => {
    const { keyword, address} = this.state;
    const { location } = this.props;
    let params = this.list.getFilter();
    let addressRequest = address;
    if (address === '' && location !== null) {
      addressRequest = `lat:${location.latitude ? location.latitude : ''}, long:${location.longitude ? location.longitude : ''}`;
    }
    params = {
      ...params,
      keyword,
      address: addressRequest,
    };
    this.setState({ lastParams: params,showFilter: true });
    this.props.searchAndFilter(params);
  };
}

const mapStateToProps = state => ({
  search: state.search,
  bookingModal: state.bookingModal,
  location: state.userInfo.location,
});

const mapDispatchToProps = dispatch => {
  return {
    resetPage,
    searchAndFilter: params => {
      dispatch({ type: SEARCH_REQUESTED, params });
    },
    searchAndFilterMore: params => {
      dispatch({ type: SEARCH_MORE_REQUESTED, params });
    },
    changeSearchType: () => {
      dispatch({ type: SEARCH_TYPE_CHANGED });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonSearch: {
    width: sizeWidth(95.74),
    alignSelf: "center",
    height: sizeWidth(9),
    marginVertical: sizeWidth(2.13)
  },
  searchAround: {
    width: sizeWidth(90),
    alignSelf: "center"
  },
  body: {
    padding: sizeWidth(2.13),
  },
  icon: {
    marginHorizontal: sizeWidth(2.13)
  },
  filterText: {
    fontSize: sizeFont(3.4),
    color: "black",
    width: sizeWidth(40),
    padding: sizeWidth(2.13)
  },
  line: {
    height: 1,
    backgroundColor: "#888888",
    width: "100%"
  },
  separator: {
    width: sizeWidth(2)
  },
  filterType: {
    width: sizeWidth(40),
    borderColor: "#888888",
    borderRadius: sizeWidth(1),
    borderWidth: 1,
    height: sizeWidth(9),
    justifyContent: "center"
  },
  typeText: {
    fontSize: sizeFont(3.4),
    color: "black",
    width: sizeWidth(40)
  },
  position: {
    width: sizeWidth(47),
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#888888",
    borderRadius: sizeWidth(1),
    height: sizeWidth(9),
    alignItems: "center"
  },
  topFilter: {
    flexDirection: "row",
    marginBottom: sizeWidth(1.88),
    justifyContent: "space-between"
  },
  positionText: {
    height: sizeHeight(9),
    fontSize: sizeFont(3.4),
    flex: 1,
    color: "#888888",
    alignItems: "center",
    marginLeft: sizeWidth(2.13),
    padding: 0
  },
  filterWrap: {
    flexDirection: "row"
  },
  activityIndicator: {
    marginTop: 10
  },
  itemSearch: {
    paddingVertical: 10,
    color: "black",
    borderBottomColor: '#c9cdd4',
    borderBottomWidth: 1,
  },
  autocompleteContainer:{
    position: 'absolute',
    top: 50,
    width: windowWidth,
    paddingHorizontal: sizeWidth(2.13),
    backgroundColor: "white",
    borderRadius: 10,
    maxHeight: windowHeight * 0.8,
    zIndex: 999999,
  },
});

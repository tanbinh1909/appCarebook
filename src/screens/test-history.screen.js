import React, { Component } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";
import AppHeader from "../components/app-header";
import Toolbar from "../components/common/toolbar";
import Text from "../components/common/text";
import { sizeWidth, sizeFont,sizeHeight } from "../helpers/size.helper";
//import Button from "../components/common/button";
import Panel from "../components/common/panel";
import { navigateBack, navigateToPage } from "../actions/nav.action";
import { connect } from "react-redux";
import { resetPage } from "../actions/nav.action";
import { LOAD_TESTHISTORIES } from "../actions/test-history.action";
import FormatHelper from "../helpers/format.helper";
import { strings } from '../locate/I18n';

class TestHistoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [{}, {}, {}, {}],
    };
  }

  renderHeader = () => {
    return (
      <View style={styles.itemRow}>
        <Text style={[styles.header, styles.require]}>{strings('test_history.exa_request')}</Text>
        <Text style={[styles.header, styles.resultTest]}>{strings('test_history.result_exa')}</Text>
        <Text style={[styles.header, styles.argument]}>{strings('test_history.ref_num')}</Text>
        <Text style={[styles.header, styles.unit]}>{strings('test_history.unit')}</Text>
      </View>
    );
  };

  renderTestDetailItem = (item, index) => {
    return (
      <View style={styles.itemRow} key={index}>
        <Text style={styles.require}>{item.name}</Text>
        <Text style={styles.resultTest}>{item.value}</Text>
        <Text style={styles.argument}>{item.standardValue}</Text>
        <Text style={styles.unit}>{item.dataType}</Text>
      </View>
    );
  };

  _renderItem = ({ item }) => (
    <View style = {styles.item}>
    <Panel title={item.tenXetNghiem} style={styles.panel}>
      <TouchableOpacity onPress={() => {this.props.navigateToPage("TestDetail", {testDetails: item})}}>
      <View style = {styles.container1}>
          <View style={styles.row}>
            <Text style={styles.textTop}>
              {strings('test_history.doctor_appointed')}{" "}
            <Text style={styles.highlight}>{item.doctorName}</Text>
            </Text>
            <Text style={styles.textTop}>
              {strings('test_history.unit')} <Text style={styles.highlight}>{item.donViKham}</Text>
            </Text>
          </View>
          <Text style={styles.resultTitle}>{strings('test_history.conclusion_disease')}</Text>
          <View style={styles.resultRow}>
            <View style={styles.adviseWrap}>
              <Text style={styles.result}>{FormatHelper.text_truncate(item.ketLuan,108)}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.date}>{strings('test_history.date')} {item.ngayChiDinh}</Text>
      </TouchableOpacity>
    </Panel>
    </View>
  );

  gotoTestHistoryImages = (images) => {
    this.props.navigateToPage("TestHistoryImages", {
      images
    });
  }

  render() {
    const { testHistories, testHistoriesLoading } = this.props;
    return (
      <ScrollView style={styles.container}>
        <AppHeader isMain={true} />
        <Toolbar title={strings('test_history.test_history')} />
        <View style={styles.body}>
          {testHistoriesLoading ? (
            <ActivityIndicator size="large" color="#3AAF00" />
          ) : testHistories.length > 0 ? (
            <FlatList
              data={testHistories}
              keyExtractor={(item, index) => index.toString()}
              renderItem={this._renderItem}
            />
          ) : (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text
                style={{
                  fontSize: sizeFont(5),
                  fontWeight: "bold",
                  color: "gray",
                  marginTop: sizeWidth(5)
                }}
              >
                {strings('test_history.no_record')}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    );
  }

  componentDidMount = async () => {
    this.props.loadTestHistories();
  };
}

const mapStateToProps = state => {
  return state.testHistory;
};

const mapDispatchToProps = dispatch => {
  return {
    resetPage,
    loadTestHistories: () => {
      dispatch({ type: LOAD_TESTHISTORIES });
    },
    navigateToPage: (route, data) => dispatch(navigateToPage(route, data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestHistoryScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    flex: 1,
    padding: sizeWidth(2)
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 10
  },
  image: {
    flex: 1,
    height: sizeWidth(30),
    width: 100,
  },
  row: {
    flexDirection: "row",
    marginBottom: sizeWidth(1),
    alignItems: "center",
    justifyContent: "space-between"
  },
  date: {
    fontSize: sizeFont(3),
    marginTop: sizeWidth(2),
    alignSelf: "flex-end"
  },
  textTop: {
    flex: 1,
    fontSize: sizeFont(3)
  },
  resultRow: {
    borderRadius:sizeWidth(1),
    borderWidth: 0.5,
    flexDirection: "row",
    borderColor: "#rgb(93, 177, 74)",
    marginBottom: sizeWidth(0.5),
    height:sizeHeight(6)
  },
  result: {
    fontSize: sizeFont(3),
    marginLeft:sizeWidth(1),
    color: "red",
    marginTop:sizeWidth(2),
  },
  adviseWrap: {
    flex: 1,
    marginLeft: sizeWidth(1)
  },
  resultTitle: {
    fontSize: sizeFont(3),
    // marginRight:sizeHeight(1)
  },
  unit: {
    flex: 0.5,
    fontSize: sizeFont(3)
  },
  require: {
    flex: 1,
    fontSize: sizeFont(3)
  },
  resultTest: {
    flex: 1,
    fontSize: sizeFont(3)
  },
  argument: {
    flex: 1,
    fontSize: sizeFont(3)
  },
  itemRow: {
    flexDirection: "row",
    marginVertical: sizeWidth(1)
  },
  header: {
    fontWeight: "bold"
  },
  testDetails: {
    marginBottom: sizeWidth(1)
  },
  highlight: {
    fontSize: sizeFont(3),
    fontWeight: "bold"
  },
  detail: {
    fontStyle: 'italic',
    fontSize: sizeFont(3),
    textDecorationLine: 'underline',
    color: "blue"
  },
  item:{
    marginVertical: sizeWidth(1),
    borderRadius:sizeWidth(1),
    borderWidth: 1,
    borderColor: "#888888",
    // height:sizeHeight(16)
  },
  panel: {
    fontWeight: "bold",
  },
  container1:{
    height:sizeHeight(12)
  }
});

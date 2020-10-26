import React, { Component } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import AppHeader from "../components/app-header";
import Toolbar from "../components/common/toolbar";
import Text from "../components/common/text";
import { sizeWidth, sizeFont, sizeHeight } from "../helpers/size.helper";
import Panel from "../components/common/panel";
import { connect } from "react-redux";
import { resetPage } from "../actions/nav.action";
import { navigateToPage } from "../actions/nav.action";
import { LOAD_PAYMENTHISTORIES } from "../actions/payment-history.action";
import FormatHelper from "../helpers/format.helper";
import Moment from "moment";
import {date_format} from "../constants/app.constant";
import { strings } from '../locate/I18n';

class PaymentHistoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { paymentHistories, paymentHistoriesLoading } = this.props;
    return (
      <View style={styles.container}>
        <AppHeader isMain={true}/>
        <Toolbar title={strings('payment_history.payment_history')} />
          <ScrollView>
            <View style={styles.body}>
              {paymentHistoriesLoading ? (
                <ActivityIndicator size="large" color="#000" />
                ) : paymentHistories && paymentHistories.length > 0 ? (
                <FlatList
                  data={paymentHistories}
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
                    {strings('payment_history.no_record')}
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
      </View>
    );
  }

  _renderItem = ({ item }) => {
    return (
        <View style = {styles.item}>
          <Panel title={item.billName} style={styles.panel}>
          <TouchableOpacity onPress={() => {this.props.navigateToPage("PaymentDetail", {paymentDetails: item})}}>
            <View style = {styles.container1}>
            <View style={styles.row}>
                <Text style={styles.textTop}>
                  {strings('payment_history.date')}{" "}
                  <Text style={styles.highlight}>
                  {Moment(item.datecreate).format(date_format.dd_mm_yyyy)}
                  </Text>
                </Text>
                {
                  item.shopName !== null && <Text style={styles.textTop}>
                  {strings('payment_history.unit')} <Text style={styles.highlight}>{FormatHelper.text_truncate(item.shopName,22)}</Text>
                </Text>
                }
              </View>
              <View style={styles.resultRow}>
                <View style={styles.adviseWrap}>
                {
                  item.baohiem !== null &&
                  <Text style={styles.resultTitle}>{strings('payment_history.object')} {FormatHelper.text_truncate(item.baohiem,35)}</Text>
                }
                <Text style={styles.result}>{strings('payment_history.total')} {FormatHelper.formatNumberCurrency(item.tongTien)} VNĐ</Text>
                </View>
              </View>
            </View>
            </TouchableOpacity>
        </Panel>
        </View>
    );
  };

  componentDidMount = async () => {
    this.props.loadPaymentHistories();
  };
}

const mapStateToProps = state => {
  return state.paymentHistory;
};

const mapDispatchToProps = dispatch => {
  return {
    resetPage,
    loadPaymentHistories: () => {
      dispatch({ type: LOAD_PAYMENTHISTORIES });
    },
    navigateToPage: (route, data) => dispatch(navigateToPage(route, data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentHistoryScreen);

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
    marginRight: sizeWidth(1)
  },
  row: {
    flexDirection: "row",
    marginBottom: sizeWidth(1),
    alignItems: "center",
    justifyContent: "space-between"
  },
  date: {
    fontSize: sizeFont(3),
  },
  textTop: {
    flex: 1,
    fontSize: sizeFont(3),
  },
  result: {
    fontSize: sizeFont(3),
    color: "red"
  },
  adviseWrap: {
    flex: 1,
    alignSelf: "flex-end"
  },
  resultTitle: {
    fontSize: sizeFont(3),
    marginTop:sizeHeight(1.5),
    marginLeft:sizeWidth(1)
  },
  resultRow: {
    borderRadius:sizeWidth(1),
    borderWidth: 0.5,
    flexDirection: "row",
    borderColor: "#rgb(93, 177, 74)",
    marginBottom: sizeWidth(0.5),
    height:sizeHeight(8)
  },
  result: {
    fontSize: sizeFont(3),
    marginLeft:sizeWidth(1),
    color: "red",
    marginTop:sizeWidth(2),
    marginBottom:sizeWidth(2),
  },
  adviseWrap: {
    flex: 1,
    marginLeft: sizeWidth(1)
  },
  highlight: {
    fontSize: sizeFont(3),
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
    height:sizeHeight(11)
  }
});

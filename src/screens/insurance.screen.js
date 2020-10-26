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
import { navigateToPage } from "../actions/nav.action";
import moment from "moment";
import { connect } from "react-redux";
import { resetPage } from "../actions/nav.action";
import { secondary_bg_color } from "../constants/app.constant";
import { Icon } from "react-native-elements";
import { LOAD_INSURANCES } from "../actions/insurance.action";
import {date_format} from "../constants/app.constant";
import { Button} from 'native-base';
import { strings } from '../locate/I18n';

class InsuranceScreen extends Component {
  componentDidMount = () => {
    this.props.loadInsurances();
  };

  renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}>
      <View style={styles.content}>
        <View style={styles.resultRow}>
          <Text style={styles.highlight}>
            {strings('insurance.insu_number')} <Text style={styles.text}>{item.insurranceCode}</Text>
          </Text>
          <Text style={styles.highlight}>
            {strings('insurance.register_place')}{" "}
            <Text style={styles.text}>{item.subscribePlace}</Text>
          </Text>
          <Text style={styles.highlight}>
            {strings('insurance.time_use')}{" "}
            <Text style={styles.text}>
              {item.createdDate}{" "}
            </Text>
            {strings('insurance.to')}{" "}
            <Text style={styles.text}>
              {item.endDate}
            </Text>
          </Text>
          <Text style={styles.highlight}>
            {strings('insurance.end_day')}{" "}
            <Text style={styles.text}>
              {moment(item.createdDate, date_format.ddmmyyyy).add('years', 5).format(date_format.dd_mm_yyyy)}
            </Text>
          </Text>
        </View>
      </View>
      <View style={styles.level} />
    </TouchableOpacity>
  );

  render() {
    const { insurances, insurancesLoading } = this.props;
    return (
      <View  style={styles.container}>
        <AppHeader isMain={true} />
        <Toolbar title={strings('insurance.insurance')}/>
        <ScrollView>
          <View style={styles.body}>
            <View style={styles.actionRow}>
              <Button success
                onPress={this._navigateToQRScanner}
                style = {styles.button}
              >
              <Icon
                name="qrcode"
                type="font-awesome"
                size={sizeWidth(5)}
                color="#FFF"
                style={styles.icon}
              />
              <Text style = {{color:"white"}}> {strings('insurance.scan_qr')}</Text>
              </Button>
            </View>

            {1 > 0 ? (
              insurancesLoading ? (
                <ActivityIndicator size="large" color="#3AAF00" />
              ) : (
                <FlatList
                  data={insurances}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={this.renderItem}
                />
              )
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
                {strings('insurance.no_record')}
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }

  _navigateToQRScanner = () => {
    this.props.navigateToPage("QRCodeScanner");
  }
}

const mapStateToProps = state => {
  return state.insurance;
};

const mapDispatchToProps = dispatch => {
  return {
    resetPage,
    loadInsurances: () => {
      dispatch({ type: LOAD_INSURANCES });
    },
    navigateToPage: pageName => dispatch(navigateToPage(pageName))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InsuranceScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
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
  row: {
    flexDirection: "row",
    marginBottom: sizeWidth(3),
    alignItems: "center",
    justifyContent: "space-between"
  },
  resultRow: {
    marginTop: sizeWidth(1),
    marginBottom: sizeWidth(1)
  },
  text: {
    fontSize: sizeFont(3)
  },
  highlight: {
    fontSize: sizeFont(3),
    color: secondary_bg_color
  },
  level: {
    width: sizeWidth(5),
    backgroundColor: secondary_bg_color,
    height: "100%"
  },
  item: {
    flexDirection: "row",
    backgroundColor: "#EEEEEE",
    marginVertical: sizeWidth(2.13),
    borderRadius:sizeWidth(1),
    borderWidth: 1,
    borderColor: "#888888",
    marginTop: sizeHeight(1)
  },
  content: {
    flex: 1,
    padding: sizeWidth(2.13)
  },
  name: {
    fontSize: sizeFont(4),
    color: secondary_bg_color,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: sizeWidth(2.13)
  },
  icon: {
    marginLeft: sizeWidth(1)
  },
  button: {
    width: sizeWidth(40),
    paddingHorizontal: sizeWidth(4),
    height: sizeHeight(5),
    justifyContent:"center",
    alignContent: "center",
    borderRadius:sizeWidth(1),
    backgroundColor: secondary_bg_color,
  }
});

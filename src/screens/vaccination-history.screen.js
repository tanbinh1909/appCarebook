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
import { Button} from 'native-base';
import { navigateToPage } from "../actions/nav.action";
import { connect } from "react-redux";
import { resetPage } from "../actions/nav.action";
import { secondary_bg_color } from "../constants/app.constant";
import { LOAD_VACCINATIONHISTORIES } from "../actions/vaccination-history.action";
import FormatHelper from "../helpers/format.helper";
import { strings } from '../locate/I18n';

class VaccinationHistoryScreen extends Component {
  constructor(props) {
    super(props);
  }

  keyExtractor = (item, index) => `${index}`;

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.item}>
        <View style={styles.content}>
          <Text style={styles.name}>{FormatHelper.text_truncate(item.tenTiemChung,30)}</Text>
          <View style={styles.resultRow}>
            <Text style={styles.highlight}>
              {strings('vaccination_history.amount')} <Text style={styles.text}>{item.lieuLuong}</Text>
            </Text>
            <Text style={styles.highlight}>
              {strings('vaccination_history.date_injection')} <Text style={styles.text}>{item.ngaytiem}</Text>
            </Text>
            <Text style={styles.highlight}>
              {strings('vaccination_history.date_re_injection')} <Text style={styles.text}>{item.ngaytiemlai}</Text>
            </Text>
          </View>
        </View>
        <View style={[styles.level, { backgroundColor: item.color }]} />
      </TouchableOpacity>
    );
  };

  render() {
    const { vaccinationHistories, vaccinationHistoriesLoading, privilege } = this.props;
    return (
      <View style={styles.container}>
        <AppHeader isMain={true}/>
        <Toolbar title={strings('side_menu.vaccination_history')} />
        <ScrollView>
          <View style={styles.body}>
            <View style={styles.actionRow}>
                <Button success
                  style={styles.button}
                  onPress={() => this.props.navigateToPage("AddVaccination")}
                  disabled = {privilege == 1 ? true : false}
                >
                <Text style = {{color: "white"}}>{strings('vaccination_history.create_vacc_list')}</Text>
                </Button>
            </View>
            {vaccinationHistoriesLoading ? (
              <ActivityIndicator size="large" color="#3AAF00" />
            ) : vaccinationHistories && vaccinationHistories.length > 0 ? (
              <FlatList
                data={vaccinationHistories}
                keyExtractor={(item, index) => index.toString()}
                renderItem={this.renderItem}
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
                  {strings('vaccination_history.no_record')}
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }

  componentDidMount = async () => {
    this.props.LoadVaccinationHistories();
  };
}

const mapStateToProps = state => {
  return {...state.vaccinationHistory,...state.userInfo};
};

const mapDispatchToProps = dispatch => {
  return {
    resetPage,
    LoadVaccinationHistories: () => {
      dispatch({ type: LOAD_VACCINATIONHISTORIES });
    },
    navigateToPage: pageName => dispatch(navigateToPage(pageName))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VaccinationHistoryScreen);

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
    height: "100%"
  },
  item: {
    flexDirection: "row",
    backgroundColor: "#EEEEEE",
    marginVertical: sizeWidth(2.13),
    borderRadius:sizeWidth(1),
    borderWidth: 1,
    borderColor: "#888888",
    marginTop:sizeHeight(1),
    height: sizeHeight(15)
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
  button: {
    width: sizeWidth(50),
    paddingHorizontal: sizeWidth(4),
    height: sizeHeight(5),
    justifyContent: "center",
    alignContent: "center",
    borderRadius:sizeWidth(1),
    backgroundColor: secondary_bg_color,
  }
});

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
import { sizeWidth, sizeFont, sizeHeight } from "../helpers/size.helper";
import { navigateToPage } from "../actions/nav.action";
import { connect } from "react-redux";
import { resetPage } from "../actions/nav.action";
import { secondary_bg_color } from "../constants/app.constant";
import { LOAD_FAMILYILLNESSLIST } from "../actions/family-illness-list.action";
import Text from "../components/common/text";
import { Button} from 'native-base';
import { strings } from '../locate/I18n';

class FamilyIllnessListScreen extends Component {
  constructor(props) {
    super(props);
  }

  renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}>
      <View style={styles.content}>
        <Text style={styles.name}>{item.tenBenhNhan}</Text>
        <View style={styles.resultRow}>
          <Text style={styles.highlight}>
            {strings('family_illness_list.relationship')} <Text style={styles.text}>{item.quanHe}</Text>
          </Text>
          <Text style={styles.highlight}>
            {strings('family_illness_list.illness_name')} <Text style={styles.text}>{item.tenBenh}</Text>
          </Text>
          <Text style={styles.highlight}>
            {strings('family_illness_list.status')} <Text style={styles.text}>{this.defineString(item.trangThai)}</Text>
          </Text>
          <Text style={styles.highlight}>
            {strings('family_illness_list.year_illness')} <Text style={styles.text}>{item.namBiBenh}</Text>
          </Text>
        </View>
      </View>
      <View style={[styles.level, this.getColorByStatus(item.trangThai)]} />
    </TouchableOpacity>
  );

  render() {
    const { familyIllnessList, familyIllnessListLoading, privilege } = this.props;
    return (
      <View style={styles.container}>
      <AppHeader isMain={true} />
      <Toolbar title={strings('family_illness_list.family_illness')} />
      <ScrollView>
        <View style={styles.body}>
          <View style={styles.actionRow}>
            <Button success
              style={styles.button}
              onPress={() => this.props.navigateToPage("AddFamilyIllness")}
              disabled = {privilege == 1 ? true : false}
            >
            <Text style = {{color:"white"}}>{strings('family_illness_list.create_sheet')}</Text>
            </Button>
          </View>
          {
            familyIllnessListLoading ? (
              <ActivityIndicator size="large" color="#3AAF00" />
            ) : (
              familyIllnessList && familyIllnessList.length > 0 ? (
                <FlatList
                  data={familyIllnessList}
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
                    {strings('family_illness_list.no_record')}
                  </Text>
                </View>
              )
            )
          }
        </View>
      </ScrollView>
      </View>
    );
  }

  componentDidMount = async () => {
    this.props.LoadFamilyIllnessList();
  };

   defineString(status) {
      var stringStatus = "";
      if (status == "1") {
        stringStatus = strings('family_illness_list.normal');
      } else if (status == "2") {
          stringStatus = strings('family_illness_list.dangerous');
      }
      return stringStatus;
  }

  getColorByStatus = (status) => {
    //Bình thường
    if ("1" === status) {
      return {
        backgroundColor: "green"
      };
      //Nguy hiểm
    } else if ("2" === status) {
      return {
        backgroundColor: "red"
      };
      //Đang theo dõi
    }
  };
}

const mapStateToProps = state => {
  return {...state.familyIllness,...state.userInfo};
};

const mapDispatchToProps = dispatch => {
  return {
    resetPage,
    LoadFamilyIllnessList: () => {
      dispatch({ type: LOAD_FAMILYILLNESSLIST });
    },
    navigateToPage: pageName => dispatch(navigateToPage(pageName))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FamilyIllnessListScreen);

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
    fontSize: sizeFont(3.5)
  },
  highlight: {
    fontSize: sizeFont(3.5),
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
    height: sizeHeight(16)
  },
  content: {
    flex: 1,
    padding: sizeWidth(2.13),
  },
  name: {
    fontSize: sizeFont(4),
    color: secondary_bg_color,
    fontWeight: "bold",
    alignSelf: "center"
  },
  button: {
    paddingHorizontal: sizeWidth(4),
    height: sizeHeight(5),
    justifyContent: "center",
    alignContent: "center",
    borderRadius:sizeWidth(1),
    backgroundColor: secondary_bg_color,
  }
});

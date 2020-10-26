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
// import Toolbar from "../components/common/toolbars";
import Toolbar from "../components/common/toolbar";
import Text from "../components/common/text";
import { sizeWidth, sizeFont, sizeHeight } from "../helpers/size.helper";
import Panel from "../components/common/panel";
import { navigateToPage } from "../actions/nav.action";
import { connect } from "react-redux";
import { resetPage } from "../actions/nav.action";
import { secondary_bg_color } from "../constants/app.constant";
import { LOAD_ALLERGIES } from "../actions/allergy.action";
import { Button} from 'native-base';
import { strings } from '../locate/I18n';

class AllergyScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dbbActivedIndex: 0,
      showImages: false
    };
  }

  _renderItem = ({ item }) => (
    <View style = {styles.wrap}>
      <Panel isHeader={false} contentStyle={{ padding: 0 }}>
      <TouchableOpacity
        onPress={() => {}}
        style={{ flex: 1, flexDirection: "row" }}
      >
        <View style={styles.containerContent}>
          <View style={styles.containerTitle}>
            <Text style={styles.textCaption}>{item.tenDiUng}</Text>
          </View>

          <View style={styles.contentText}>
            <Text style={styles.textTitle}>{strings('allergy.type')} </Text>
            <Text>{item.loai}</Text>
          </View>

          <View style={styles.contentText}>
            <Text>
              <Text style={styles.textTitle}>{strings('allergy.cause')} </Text>{item.nguyenNhan}
            </Text>
          </View>

          <View style={styles.contentText}>
            <Text>
              <Text style={styles.textTitle}>{strings('allergy.symptom')} </Text>{item.trieuchung}
            </Text>
          </View>
           <View style={styles.contentText}>
            <Text>
             <Text style={styles.textTitle}>{strings('allergy.status')} </Text>{this.defineString(item.trangthai)}
             </Text>
           </View>
        </View>

      <View style={[styles.level, this.getColorByStatus(item.trangthai)]} />
      </TouchableOpacity>
    </Panel>
    </View>
  );

  render() {
    const { allergies, allergiesLoading, privilege } = this.props;
    return (
      <View  style={styles.container}>
        <AppHeader isMain={true}/>
        <Toolbar title={strings('side_menu.allergy')} />
          <ScrollView>
            <View style={styles.body}>
              <View style={styles.actionRow}>
                <Button success
                  onPress={() => this.props.navigateToPage("AddAllergy", {
                    handleGoBack: this.props.LoadAllergies.bind(this)
                  })}
                  style = {styles.button}
                  disabled = {privilege == 1 ? true : false}
                >
                  <Text style = {{color:"white"}}>{strings('allergy.create_allergy')}</Text>
                </Button>
              </View>
              {
                allergiesLoading ? (
                  <ActivityIndicator size="large" color="#3AAF00" />
                ) : (
                  allergies && allergies.length > 0 ? (
                    <FlatList
                      data={allergies}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={this._renderItem}
                    />
                  ) : (
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                      <Text style={{fontSize: sizeFont(5), fontWeight:'bold', color: 'gray', marginTop: sizeWidth(5)}}>{strings('allergy.create_allergy')}</Text>
                  </View>
                  )
                )
              }
            </View>
          </ScrollView>
      </View>
    );
  }

  defineString(status) {
     var stringStatus = "";
     if (status == "1") {
       stringStatus = strings('allergy.normal');
     } else if (status == "2") {
         stringStatus = strings('allergy.danger');
     } else if (status == "3") {
         stringStatus = strings('allergy.following');
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
    } else if ("3" === status) {
      return {
        backgroundColor: "yellow"
      };
    }
  };

  componentDidMount = async () => {
    this.props.LoadAllergies();
  };

}

const mapStateToProps = (state) => {
  return {...state.allergy,...state.userInfo};
}

const mapDispatchToProps = dispatch => {
  return {
    resetPage,
    LoadAllergies: () => {
      dispatch({type: LOAD_ALLERGIES})
    },
    navigateToPage: (pageName, params) => dispatch(navigateToPage(pageName, params))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllergyScreen);

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
    marginBottom: 10,
  },
  level: {
    width: sizeWidth(5),
    height: "100%"
  },
  contentText: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: sizeWidth(1)
  },
  textTitle: {
    color: secondary_bg_color
  },
  textCaption: {
    color: secondary_bg_color,
    fontSize: sizeFont(5),
    fontWeight: "bold",
    marginBottom: sizeWidth(2)
  },
  containerContent: {
    flex: 2.8,
    backgroundColor: "#f4f4f4",
    padding: 10,
    paddingRight: sizeWidth(5),
  },
  containerTitle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    height: sizeHeight(5),
    width: sizeWidth(50),
    justifyContent: "center",
    alignContent: "center",
    borderRadius:sizeWidth(1),
    backgroundColor: secondary_bg_color,
  },
  wrap: {
    borderRadius:sizeWidth(1),
    borderWidth: 1,
    borderColor: "#888888",
    marginTop: sizeHeight(1),
    flex:1,
  }
});

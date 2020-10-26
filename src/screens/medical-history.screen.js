import React, { Component } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AppHeader from "../components/app-header";
import Toolbar from "../components/common/toolbar";
import Text from "../components/common/text";
import { sizeWidth, sizeFont,sizeHeight } from "../helpers/size.helper";
import { Button} from 'native-base';
import Panel from "../components/common/panel";
import { navigateBack, navigateToPage } from "../actions/nav.action";
import { connect } from "react-redux";
import { LOAD_MEDICAL } from "../actions/medical-history.action";
import moment from "moment";
import FormatHelper from "../helpers/format.helper";
import { strings } from '../locate/I18n';
import DialogPinCode from '../components/dialog.pincode';
import { LOAD_MEDICAL_DETAIL } from "../actions/medical-history.action";
import Toast from "@remobile/react-native-toast";
import { Icon } from "react-native-elements";
import { secondary_bg_color } from "../constants/app.constant";

class MedicalHistoryScreen extends Component {
  state = {
    // dialogVisible: false,
    medicalID: null
  }

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    this.props.loadMedicals();
    // this.setState({dialogVisible: !this.props.pinCode});
  }

  componentWillReceiveProps(nextProps) {
    const medicalID = this.state.medicalID;

    // Check select an item
    if(medicalID && nextProps.medicalDetail) {
      this.setState({medicalID: null});
      this.props.navigateToPage("MedicalDetail");
    }
  }

  // onClosedDialog = () => {
  //   this.setState({dialogVisible: false});
  // }

  _renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
      <Panel title={item.tenBenhAn} style={styles.panel}>
        <TouchableOpacity onPress={() => this.selectMedicalHistory(item.idbenhan)}>
          <View style={styles.container1}>
            <View style={styles.row}>
              <Text style={[styles.text, styles.date]}>
                {strings('medical_history.date')}{" "}
                <Text style={styles.highlight}>
                  {moment(item.ngaytao).format("DD/MM/YYYY")}
                </Text>
              </Text>
              <Text style={[styles.text, styles.unit]}>
                {strings('medical_history.unit')} <Text style={styles.highlight}>{FormatHelper.text_truncate(item.shopName,13)}</Text>
              </Text>
            </View>
            <View style={styles.resultRow}>
              <View style={styles.adviseWrap}>
                <Text style={styles.text1}>
                  {strings('medical_history.disease_results')}{": "}
                  <Text style={styles.highlight}>{FormatHelper.text_truncate(item.ketquaBenh,40)}</Text>
                </Text>
                <Text style={styles.text2}>
                  {strings('medical_history.content')} <Text style={styles.highlight}>{FormatHelper.text_truncate(item.loidan,45)}</Text>
                </Text>
              </View>
              {/* <<Image resizeMode="contain" source={item.} style={[styles.image]} /> */}
            </View>
          </View>
        </TouchableOpacity>
      </Panel>
      </View>
    );
  };

  render() {
    const { medicals, medicalsLoading, privilege } = this.props;
    return (
      <View style={{flex: 1}}>
        <AppHeader isMain={true}/>
        <View style={styles.containers}>
          <TouchableOpacity
            style={styles.iconWrap}
            onPress={() => this.props.navigateToPage("Document")}
          >
            <Icon
              style={styles.iconBack}
              name="chevron-left"
              type="material-community"
              size={sizeFont(7)}
              color="white"
            />
          </TouchableOpacity>
          <Text style={styles.title}>{strings('medical_history.medical_history').toUpperCase()}</Text>
        </View>
        {/* <Toolbar title={strings('medical_history.medical_history')} /> */}
        <View style={styles.body}>
          <View style={styles.actionRow}>

            <Button success
              style={styles.button}
              onPress={() => this.props.navigateToPage("AddMedical")}
              disabled = {privilege == 1 ? true : false}>
              <Text style = {{color:"white"}}>{strings('medical_history.add_medical')}</Text>
            </Button>
          </View>
          <View style={{ flex: 1 }}>
            {medicalsLoading ? (
              <ActivityIndicator size="large" color="#3AAF00" />
            ) : medicals && medicals.length > 0 ? (
              <FlatList
                data={medicals}
                keyExtractor={(item, index) => index.toString()}
                renderItem={this._renderItem}
              />
            ) : (
              <Text style={styles.empty}>{strings('medical_history.no_record')}</Text>
            )}
          </View>
        </View>
        {/* { this.state.dialogVisible &&
        <DialogPinCode
          visible={this.state.dialogVisible}
          onClosed={this.onClosedDialog}
        />
        } */}
      </View>
    );
  }

  selectMedicalHistory(medicalID) {
    this.setState({medicalID})
    if (this.props.pinCode) {
      this.props.loadMedicalDetail(medicalID);
    } else {
      Toast.show(strings('login.msg_request_pin'));
    }
  }
}

const mapStateToProps = state => {
  return {...state.medicalHistory, ...state.userInfo};
};

const mapDispatchToProps = dispatch => {
  return {
    navigateBack: () => dispatch(navigateBack()),
    navigateToPage: (route, data) => dispatch(navigateToPage(route, data)),
    loadMedicals: () => dispatch({ type: LOAD_MEDICAL }),
    loadMedicalDetail: medicalID => {
      dispatch({ type: LOAD_MEDICAL_DETAIL, medicalID });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MedicalHistoryScreen);

const styles = StyleSheet.create({
  container: {
    marginVertical: sizeWidth(1),
    padding: sizeWidth(2),
    borderRadius:sizeWidth(1),
    borderWidth: 1,
    borderColor: "#888888",
    height:sizeHeight(24)
  },
  container1: {
    marginVertical: sizeWidth(1),
    height:sizeHeight(20)
  },
  panel: {
  fontWeight: "bold",
  },
  body: {
    flex: 1,
    padding: sizeWidth(2),
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginVertical: 10
  },
  row: {
    flexDirection: "row",
    marginBottom: sizeWidth(3),
    alignItems: "center"
  },
  resultRow: {
    borderRadius:sizeWidth(1),
    borderWidth: 0.5,
    flexDirection: "row",
    borderColor: "#rgb(93, 177, 74)",
    marginBottom: sizeWidth(0.5)
  },
  text: {
    fontSize: sizeFont(3)
  },
  text1: {
    fontSize: sizeFont(3),
    marginTop:sizeHeight(2),
    marginLeft:sizeWidth(1)
  },
  text2: {
    fontSize: sizeFont(3),
    marginTop:sizeHeight(1),
    marginBottom:sizeHeight(2),
    marginLeft:sizeWidth(1)
  },
  highlight: {
    fontSize: sizeFont(3),
    fontWeight: "bold",
    marginBottom:sizeWidth(4),
    marginTop:sizeWidth(4),
  },
  empty: {
    fontSize: sizeFont(5),
    fontWeight: "bold",
    color: "gray",
    marginTop: sizeWidth(5),
    textAlign: "center"
  },
  date: {
    marginRight: sizeWidth(2)
  },
  unit: {
    flexDirection: "row",
    paddingHorizontal: sizeWidth(28),
  },
  adviseWrap: {
    flex: 1,
    marginLeft: sizeWidth(1)
  },
  button: {
    // width: sizeWidth(40),
    backgroundColor: secondary_bg_color,
    paddingHorizontal: sizeWidth(4),
    height: sizeHeight(5),
    borderRadius:sizeWidth(1)
  },
  containers: {
    flexDirection: "row",
    backgroundColor: secondary_bg_color,
    paddingVertical: sizeWidth(2.2),
    alignItems: "center",
    justifyContent: "space-between",
    height: sizeHeight(6)
  },
  title: {
    flex: 1,
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  iconWrap: {
    paddingHorizontal: sizeWidth(1)
  }
});

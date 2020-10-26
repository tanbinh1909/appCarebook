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
import { LOAD_PRESCRIPTIONHISTORIES, TOOGLE_BUY_PRESCRIPTION_MODAL } from "../actions/prescription-history.action";
import FormatHelper from "../helpers/format.helper";
import {Button} from "native-base";
import BuyPrescriptionModal from "../screens/buy-prescription.screen";
import Modal from "react-native-modal";
import { strings } from '../locate/I18n';

class PrescriptionHistoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toathuoc: {}
    };
  }
  render() {
    const { prescriptionHistories, prescriptionHistoriesLoading, openingModal } = this.props;
    return (
      <View style={styles.container}>
        <AppHeader isMain={true}/>
        <Toolbar title={strings('prescription_history.pres_history')} />
          <ScrollView>
            <View style={styles.body}>
              {prescriptionHistoriesLoading ? (
                <ActivityIndicator size="large" color="#3AAF00" />
              ) : prescriptionHistories && prescriptionHistories.length > 0 ? (
                <FlatList
                  data={prescriptionHistories}
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
                    {strings('prescription_history.no_record')}
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
          {this.renderBuyPrescriptionModal({ ...this.props })}
      </View>
    );
  }

  renderBuyPrescriptionModal = ({openingModal}) => {
    return(
      <Modal
        onBackdropPress={() => this.props.openModal()}
        backdropOpacity={0.5}
        isVisible={openingModal}
        avoidKeyboard={true}
      >
        <BuyPrescriptionModal toathuoc={this.state.toathuoc}/>
      </Modal>
    )
  }

  _renderItem = ({ item }) => {
    return (
      <View style = {styles.item}>
        <Panel title={item.tenToaThuoc} style={styles.panel}>
          <TouchableOpacity onPress={() => {this.props.navigateToPage("PrescriptionDetail", {prescriptionDetails: item})}}>
            <View style = {styles.container1}>
              <View style={styles.row}>
                <Text style={styles.textTop}>
                {strings('prescription_history.exa_doctor')}{" "}
                {
                  item.doctorName !== null &&
                  <Text style={styles.highlight}>
                  {FormatHelper.text_truncate(item.doctorName,10)}
                  </Text>
                }
                </Text>
                {
                  item.donViKham !== null && <Text style={styles.textTop}>
                  {strings('prescription_history.unit')} <Text style={styles.highlight}>{FormatHelper.text_truncate(item.donViKham,18)}</Text>
                </Text>
                }
              </View>

              <Text style={styles.resultTitle1}>{strings('prescription_history.advice')}</Text>
              <View style={styles.resultRow}>
                <View style={styles.adviseWrap}>
                {
                  item.loiDan !== null &&
                  <Text style={styles.resultTitle}>{FormatHelper.text_truncate(item.loiDan,35)}</Text>
                }
                </View>
              </View>
              <Button small success
                style = {styles.button}
                onPress={() => {
                  this.setState({toathuoc: item});
                  this.props.openModal();
                  }}>
                <Text style = {styles.label}>{strings('prescription_history.buy')}</Text>
              </Button>
              <View style={styles.adviseWrap1}>
                  <Text style={styles.highlight}>{item.ngayChiThi}</Text>
              </View>
            </View>
          </TouchableOpacity>
            
        </Panel>
      </View>
    );
  };
  gotoPrescriptionHistoryImage = (images) => {
    this.props.navigateToPage("PrescriptionHistoryImages", {
      images
    });
  }

  componentDidMount = async () => {
    this.props.LoadPrescriptionHistories();
  };
}

const mapStateToProps = state => {
  return state.prescriptionHistory;
};

const mapDispatchToProps = dispatch => {
  return {
    resetPage,
    LoadPrescriptionHistories: () => {
      dispatch({ type: LOAD_PRESCRIPTIONHISTORIES });
    },
    navigateToPage: (route, data) => dispatch(navigateToPage(route, data)),
    openModal: () => dispatch({ type: TOOGLE_BUY_PRESCRIPTION_MODAL }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrescriptionHistoryScreen);

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
    fontSize: sizeFont(3)
  },
  resultRow: {
    borderRadius:sizeWidth(1),
    borderWidth: 0.5,
    flexDirection: "row",
    borderColor: "#rgb(93, 177, 74)",
    marginVertical: sizeWidth(1),
    height:sizeHeight(6),
  },
  result: {
    fontSize: sizeFont(3),
    marginLeft:sizeWidth(1),
    marginTop:sizeWidth(2),
    marginBottom:sizeWidth(2),
  },
  adviseWrap: {
    flex: 1,
    marginLeft: sizeWidth(1)
  },
  adviseWrap1: {
    flex: 1,
    alignSelf: "flex-end"
  },
  resultTitle: {
    fontSize: sizeFont(3),
    marginTop:sizeHeight(1.5),
    marginLeft:sizeWidth(1),
    color: "red"
  },
  resultTitle1: {
    fontSize: sizeFont(3)
  },
  unit: {
    flex: 0.5,
    fontSize: sizeFont(3)
  },
  orderBy: {
    flex: 0.5,
    fontSize: sizeFont(3)
  },
  drugName: {
    flex: 2,
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
  },
  panel: {
    fontWeight: "bold",
  },
  container1:{
    // height:sizeHeight(11)
    paddingHorizontal: sizeWidth(2)
  },
  label: {
    color: "white",
    fontSize: sizeFont(2.6)
  },
  button: {
    marginTop : 5,
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: sizeHeight(2)
  }
});

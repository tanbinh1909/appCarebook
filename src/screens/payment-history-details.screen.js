import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import AppHeader from "../components/app-header";
import Toolbar from "../components/common/toolbar";
import Text from "../components/common/text";
import { sizeWidth, sizeFont,sizeHeight } from "../helpers/size.helper";
import Panel from "../components/common/panel";
import { navigateToPage } from "../actions/nav.action";
import { connect } from "react-redux";
import FormatHelper from '../helpers/format.helper';
import Moment from "moment";
import {Button} from "native-base";
import {date_format} from "../constants/app.constant";
import PaymentHistoryImagesScreen from "./payment-history-images.screen"
import { strings } from '../locate/I18n';

class PaymentDetailsHistoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showImages: false
    };
  }

  _renderImages = (imageItems) =>{
    return(
      <PaymentHistoryImagesScreen images = {imageItems}/>
    )
  }


  _keyExtractor = (item, index) => `${index}`;

  renderHeader = cells => {
    return (
      <View style={styles.itemRow}>
        <Text style={[styles.header, styles.require]}>{cells[0]}</Text>
        <Text style={[styles.header, styles.resultTest]}>{cells[1]}</Text>
        <Text style={[styles.header, styles.argument]}>{cells[2]}</Text>
        <Text style={[styles.header, styles.unit]}>{cells[3]}</Text>
      </View>
    );
  };

  renderTestDetailItem = (cells, index) => {
    return (
      <View style={styles.itemRow} key={index}>
        <Text style={styles.require}>{index + 1}</Text>
        <Text style={styles.resultTest}>{cells.tendichvu}</Text>
        <Text style={styles.unit}>{FormatHelper.formatNumberCurrency(cells.soluong)}</Text>
        <Text style={styles.argument}>{FormatHelper.formatNumberCurrency(cells.giadichvu)} VNĐ</Text>
      </View>
    );
  };

  renderChiDinhLamSanItem = (cells, index) => {
    return (
      <View style={styles.itemRow} key={index}>
        <Text style={styles.require}>{index + 1}</Text>
        <Text style={styles.resultTest}>{cells.tenchidinh}</Text>
        <Text style={styles.unit}>{FormatHelper.formatNumberCurrency(cells.soluong)}</Text>
        <Text style={styles.argument}>{FormatHelper.formatNumberCurrency(cells.giaDichvu)} VNĐ</Text>
      </View>
    );
  };

  renderThuocsItem = (cells, index) => {
    return (
      <View style={styles.itemRow} key={index}>
        <Text style={styles.require}>{index + 1}</Text>
        <Text style={styles.resultTest}>{cells.tenThuoc}</Text>
        <Text style={styles.unit}>{FormatHelper.formatNumberCurrency(cells.soLuong)}</Text>
        <Text style={styles.argument}>{FormatHelper.formatNumberCurrency(cells.giaDichVu)} VNĐ</Text>
      </View>
    );
  };


  _renderItem = ( paymentDetails ) => (
    <Panel title={paymentDetails.billName}>
        <View>
          <View style={styles.row}>
            <Text style={styles.textTop}>{Moment(paymentDetails.datecreate).format(date_format.dd_mm_yyyy)}</Text>
            <Text style={styles.textTop}>
              {strings('payment_history_detail.unit')} <Text style={styles.highlight}>{paymentDetails.shopName}</Text>
            </Text>
          </View>
          <Text style={styles.target}>{strings('payment_history_detail.object')} {paymentDetails.baohiem}</Text>
          {paymentDetails.khambenh.length > 0 && <View style={styles.group}>
            <Text style={styles.groupHeader}>{strings('payment_history_detail.medical_examination')}</Text>
            <View style={styles.testDetails}>
              {this.renderHeader([strings('payment_history_detail.num'), strings('payment_history_detail.service'), strings('payment_history_detail.amount'), strings('payment_history_detail.sum')])}
              {
                paymentDetails.khambenh && paymentDetails.khambenh.map((paymentDetails, index) => {
                  return this.renderTestDetailItem(paymentDetails, index)
                })
              }
            </View>
            <Text style={styles.rowTotal}>{strings('payment_history_detail.total')} {FormatHelper.formatNumberCurrency(paymentDetails.tienKhamBenh)} VNĐ</Text>
          </View>}

          {paymentDetails.chidinhlamsan.length > 0 && <View style={styles.group}>
            <Text style={styles.groupHeader}>{strings('payment_history_detail.assign_clinical')}</Text>
            <View style={styles.testDetails}>
              {this.renderHeader([strings('payment_history_detail.num'), strings('payment_history_detail.attribution'), strings('payment_history_detail.amount'), strings('payment_history_detail.sum')])}
              {
                 paymentDetails.chidinhlamsan && paymentDetails.chidinhlamsan.map((paymentDetails, index) => {
                  return this.renderChiDinhLamSanItem(paymentDetails, index)
                })
              }
            </View>
            <Text style={styles.rowTotal}>{strings('payment_history_detail.total')} {FormatHelper.formatNumberCurrency(paymentDetails.tienXetNghiem)} VNĐ</Text>
          </View>}

          {paymentDetails.thuoc.length > 0 && <View style={styles.group}>
            <Text style={styles.groupHeader}>{strings('payment_history_detail.prescription')}</Text>
            <View style={styles.testDetails}>
              {this.renderHeader([strings('payment_history_detail.num'), strings('payment_history_detail.medicine_name'), strings('payment_history_detail.amount'), strings('payment_history_detail.sum')])}
              {
                paymentDetails.thuoc && paymentDetails.thuoc.map((paymentDetails, index) => {
                  return this.renderThuocsItem(paymentDetails, index)
                })
              }
            </View>
            <Text style={styles.rowTotal}>{strings('payment_history_detail.total')} {FormatHelper.formatNumberCurrency(paymentDetails.tienThuoc)} VNĐ</Text>
          </View>}

          <View style={styles.resultRow}>
            <View style={styles.adviseWrap}>
              <Text style={styles.resultTitle}>
                {strings('payment_history_detail.total')} <Text style={styles.total}>{FormatHelper.formatNumberCurrency(paymentDetails.tongTien)} VNĐ</Text>
              </Text>
            </View>
            {
                paymentDetails.image && paymentDetails.image.length > 0 &&
                <Button small success
                  onPress={() => this.setState({showImages: !this.state.showImages})}
                  style = {styles.button}
                >
                  <Text style = {styles.label}>{strings('payment_history_detail.image')}</Text>
                </Button>
              }
          </View>
        </View>
    </Panel>
  );

  render() {
    const { paymentDetails } = this.props.navigation.state.params;
    return (
      <ScrollView style={styles.container}>
        <AppHeader isMain={true}/>
        <Toolbar title={strings('payment_history_detail.payment_detail')} />
        <View style={styles.body}>{this._renderItem(paymentDetails)}
        {
          this.state.showImages && this._renderImages(paymentDetails.image)
        }
        </View>
      </ScrollView>
    );
  };

}


const mapDispatchToProps = dispatch => {
  return {
    navigateToPage: (route, data) => dispatch(navigateToPage(route, data))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(PaymentDetailsHistoryScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  target: {
    fontSize: sizeFont(2.6)
  },
  groupHeader: {
    fontSize: sizeFont(2.6),
    color: "black",
    fontWeight: "bold",
    textDecorationLine: "underline"
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
    height: sizeWidth(80),
    marginRight: sizeWidth(1)
  },
  row: {
    flexDirection: "row",
    marginBottom: sizeWidth(1),
    alignItems: "center",
    justifyContent: "space-between"
  },
  date: {
    fontSize: sizeFont(2.6),
    alignSelf: "flex-end"
  },
  textTop: {
    flex: 1,
    fontSize: sizeFont(2.6)
  },
  resultRow: {
    flexDirection: "row",
    marginBottom: sizeWidth(1)
  },
  rowTotal: {
    fontSize: sizeFont(3),
    alignSelf: "flex-end"
  },
  result: {
    fontSize: sizeFont(2.6)
  },
  total: {
    color: "red",
    fontSize: sizeFont(3),
    fontWeight: "bold"
  },
  adviseWrap: {
    flex: 1,
  },
  resultTitle: {
    fontSize: sizeFont(3),
    fontWeight: "bold"
  },
  unit: {
    flex: 0.8,
    fontSize: sizeFont(2.6)
  },
  require: {
    flex: 0.5,
    fontSize: sizeFont(2.6)
  },
  resultTest: {
    flex: 2,
    fontSize: sizeFont(2.6)
  },
  argument: {
    flex: 0.8,
    fontSize: sizeFont(2.6)
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
    fontSize: sizeFont(2.6),
    fontWeight: "bold"
  },
  group: {
    marginVertical: sizeWidth(0.5)
  },
  detail: {
    fontStyle: 'italic',
    fontSize: sizeFont(2.6),
    textDecorationLine: 'underline',
    color: "blue"
  },
  highlight: {
    fontSize: sizeFont(2.6),
    fontWeight: "bold"
  },
  label: {
    color: "white",
    fontSize: sizeFont(2.6)
  },
  button: {
    height: sizeHeight(3),
    width: sizeWidth(14),
    justifyContent: "center",
    alignContent: "center"
  }
});

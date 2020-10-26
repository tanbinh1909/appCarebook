import React, { Component } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from "react-native";
import AppHeader from "../components/app-header";
import Toolbar from "../components/common/toolbar";
import Text from "../components/common/text";
import { sizeWidth, sizeFont, sizeHeight } from "../helpers/size.helper";
import Panel from "../components/common/panel";
import { navigateToPage } from "../actions/nav.action";
import { connect } from "react-redux";
import MedicalDetailImagesScreen from "./medical-detail-images.screen";
import { Button } from "native-base";
import FormatHelper from "../helpers/format.helper";
import { RESET_MEDICAL_DETAIL } from "../actions/medical-history.action";
import { strings } from "../locate/I18n";
import moment from "moment";
import ZoomImage from 'react-native-zoom-image';
import {Easing} from 'react-native';
import {
  date_format
} from "../constants/app.constant";

class MedicalDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dbbActivedIndex: 0,
      showImages: false
    };
  }

  addCommas(nStr) {
    nStr += "";
    c = nStr.split(",");
    nStr = c.join("");
    x = nStr.split(".");
    x1 = x[0];
    x2 = x.length > 1 ? "." + x[1] : "";
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, "$1" + "," + "$2");
    }
    return x1 + x2;
  }

  renderExamHeader = () => {
    return (
      <View style={styles.itemRow}>
        <Text style={[styles.header, styles.orderBy]}>
          {strings("medical_detail.num")}
        </Text>
        <Text style={[styles.header, styles.service]}>
          {strings("medical_detail.service")}
        </Text>
        <Text style={[styles.header, styles.quantity]}>
          {strings("medical_detail.amount")}
        </Text>
        <Text style={[styles.header, styles.cost]}>
          {strings("medical_detail.total")}
        </Text>
      </View>
    );
  };

  renderExamDetailItem = (thanhToan) => {
    return (
      <View style={styles.itemRow}>
        <Text style={styles.orderBy}>1</Text>
        <Text style={styles.service}>{thanhToan.tieude}</Text>
        <Text style={styles.quantity}>1</Text>
        <Text style={styles.cost}>{this.addCommas(thanhToan.tongtien)} VNĐ</Text>
      </View>
    );
  };

  renderClinicalHeader = () => {
    return (
      <View style={styles.itemRow}>
        <Text style={[styles.header, styles.orderBy]}>
          {strings("medical_detail.num")}
        </Text>
        <Text style={[styles.header, styles.service]}>
          {strings("medical_detail.service")}
        </Text>
        <Text style={[styles.header, styles.quantity]}>
          {strings("medical_detail.status")}
        </Text>
        <Text style={[styles.header, styles.cost]}>
          {strings("medical_detail.result")}
        </Text>
      </View>
    );
  };

  renderClinicalDetailItem = (xetNghiem) => {
    return (
      <View style={styles.itemRow}>
        <Text style={styles.orderBy}>1</Text>
        <Text style={styles.service}>{xetNghiem.tenxetnghiem}</Text>
        <Text style={styles.quantity}>{xetNghiem.status}</Text>
        <Text style={styles.cost}>{this.addCommas(xetNghiem.tongtien)} VNĐ</Text>
      </View>
    );
  };

  renderPrescriptionHeader = () => {
    return (
      <View style={styles.itemRow}>
        <Text style={[styles.header, styles.orderBy]}>
          {strings("medical_detail.num")}
        </Text>
        <Text style={[styles.header, styles.indication]}>
          {strings("medical_detail.prescription_name")}
        </Text>
        <Text style={[styles.header, styles.quantity]}>
          {strings("medical_detail.date_supply")}
        </Text>
        <Text style={[styles.header, styles.cost]}>
          {strings("add_medical.content")}
        </Text>
      </View>
    );
  };

  renderPrescriptionDetailItem = (toaThuoc) => {
    return (
      <View style={styles.itemRow}>
        <Text style={styles.orderBy}>1</Text>
        <Text style={styles.indication}>{toaThuoc.toathuoc}</Text>
        <Text style={styles.quantity}>{toaThuoc.ngaykham}</Text>
        <Text style={styles.cost}>{toaThuoc.noidung}</Text>
      </View>
    );
  };

  renderConclusionHeader = () => {
    return (
      <View style={styles.itemRow}>
        <Text style={[styles.header, styles.orderBy]}>
          {strings("medical_detail.conclusion_disease")}
        </Text>
        <Text style={[styles.header, styles.indication]}>
          {strings("medical_detail.re-examination")}
        </Text>
        <Text style={[styles.header, styles.quantity]}>
          {strings("medical_detail.date_specify")}
        </Text>
        <Text style={[styles.header, styles.cost]}>
          {strings("add_medical.content")}
        </Text>
      </View>
    );
  };

  renderConclusionDetailItem = (toaThuoc) => {
    return (
      <View style={styles.itemRow}>
        <Text style={styles.orderBy}>1</Text>
        <Text style={styles.indication}>{toaThuoc.toathuoc}</Text>
        <Text style={styles.quantity}>{toaThuoc.ngaykham}</Text>
        <Text style={styles.cost}>{toaThuoc.noidung}</Text>
      </View>
    );
  };

  renderBodyIndexHeader = () => {
    return (
      <View style={styles.itemRow}>
        <Text style={[styles.header, styles.bodyIndexName]}>
          {strings("medical_detail.name")}
        </Text>
        <Text style={[styles.header, styles.bodyIndexValue]}>
          {strings("medical_detail.value")}
        </Text>
        <Text style={[styles.header, styles.bodyIndexStandard]}>
          {strings("medical_detail.index_tbl")}
        </Text>
      </View>
    );
  };

  renderBodyIndexDetailItem = (label, value, constant) => {
    return (
      <View style={styles.itemRow}>
        <Text style={styles.bodyIndexName}>{label}</Text>
        <Text style={styles.bodyIndexValue}>{value}</Text>
        <Text style={styles.bodyIndexStandard}>{constant}</Text>
      </View>
    );
  };

  renderDiseaseDate = dienBienBenh => {
    return (
      <View style={styles.tabs}>
        {dienBienBenh &&
          dienBienBenh.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => this.changeActivedDienBienBenh(index)}
            >
              <Text
                style={[
                  styles.tab,
                  { textDecorationLine: "underline" },
                  this.state.dbbActivedIndex === index && styles.highlight
                ]}
              >
                {item.ngayTheoDoi.split(" ")[0]}
              </Text>
            </TouchableOpacity>
          ))}
      </View>
    );
  };

  changeActivedDienBienBenh(dbbActivedIndex) {
    this.setState({
      dbbActivedIndex
    });
  }

  renderProcessIndicationHeader = () => {
    return (
      <View style={styles.itemRow}>
        <Text style={[styles.header, styles.indication]}>
          {strings("medical_detail.service_name")}
        </Text>
        <Text style={[styles.header, styles.indication]}>
          {strings("medical_detail.status")}
        </Text>
        <Text style={[styles.header, styles.indication]}>
          {strings("medical_detail.result")}
        </Text>
      </View>
    );
  };

  renderProcessIndicationDetailItem = (item, index) => {
    return (
      <View style={styles.itemRow} key={index}>
        <Text style={styles.indication1}>
          {FormatHelper.text_truncate(item.tenXetNghiem, 10)}
        </Text>
        <Text style={styles.indication1}>
          {item.trangThai === "WAITING"
            ? strings("medical_detail.waiting")
            : strings("medical_detail.complete")}
        </Text>
        <Text style={styles.indication1}>
          {FormatHelper.text_truncate(item.ketLuan, 10)}
        </Text>
        {item.trangThai == "COMPLETED" && (
          <Button
            small
            success
            onPress={() => this.gotoTestDetail(item)}
            style={styles.button}
          >
            <Text style={styles.label}>{strings("medical_detail.detail")}</Text>
          </Button>
        )}
      </View>
    );
  };

  gotoTestDetail = testDetails => {
    this.props.navigateToPage("TestDetail", {
      testDetails
    });
  };

  renderDeseaseResult = item => {
    return (
      <View>
        <View style={styles.row}>
          <View style={styles.adviseWrap}>
            <Text style={styles.resultTitle}>
              {strings("medical_detail.reasoning")}
            </Text>
            {item.danhSachBenh &&
              item.danhSachBenh.map((item, index) => (
                <Text style={styles.result} key={index}>
                  {item}
                </Text>
              ))}
          </View>
          <View style={styles.adviseWrap}>
            <Text style={styles.resultTitle}>
              {strings("medical_detail.treatment_direction")}
            </Text>
            <Text style={styles.result}>{item.huongDieuTri}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.adviseWrap}>
            <Text style={styles.resultTitle}>
              {strings("medical_detail.cue_hospitalization")}
            </Text>
            <Text style={styles.result}>{item.canDan}</Text>
          </View>
        </View>
      </View>
    );
  };

  _renderItem = medicalDetail => {
    if (medicalDetail == null) {
      return null;
    }
    var completeStatus = "";
    if(medicalDetail.trangThai == "1") {
      completeStatus = strings('add_medical.completed');
    } else {
      completeStatus = strings('add_medical.incomplete');
    }
    const { imageMedicalDetails, imagePresDetails, imageTestDetails, imagePaymentDetails} = this.props;
    if (medicalDetail.dienBienBenh) {
      activedDienBienBenh = medicalDetail.dienBienBenh[this.state.dbbActivedIndex];
    }
    return (
      <View>
        <Panel title={medicalDetail.tenbenhan}>
          <View>
            <View style={styles.row2}>
              <Text style={styles.textTop}>
                {strings("medical_detail.status")}{": "}
                <Text style={styles.highlight}>{completeStatus}</Text>
              </Text>
              <Text style={styles.textTop}>
                {strings("medical_detail.unit")}{" "}
                <Text style={styles.highlight}>{medicalDetail.donvikham}</Text>
              </Text>
            </View>
            <View style={styles.row2}>
              <Text style={styles.textTop}>
                {strings("medical_detail.hospitalized_date")}{" "}
                <Text style={styles.highlight}>{moment(medicalDetail.ngaykham).format(date_format.dd_mm_yyyy)}</Text>
              </Text>
              <Text style={styles.textTop}>
                {strings("medical_detail.discharge_date")}{" "}
                <Text style={styles.highlight}>{moment(medicalDetail.ngayketthuc).format(date_format.dd_mm_yyyy)}</Text>
              </Text>
            </View>
            <View style={styles.row2}>
              <Text style={styles.textTop}>
                {strings("medical_detail.content")}{" "}
                <Text style={styles.highlight}>{medicalDetail.noidung}</Text>
              </Text>
            </View>
            <View style={styles.row}>
              {medicalDetail.ngayTaiKham && (
                <Text style={styles.textTop}>
                  {strings("medical_detail.re_examination_day")}{" "}
                  <Text style={styles.highlight}>{medicalDetail.ngayTaiKham}</Text>
                </Text>
              )}
            </View>
          </View>
          {this.renderImages(imageMedicalDetails)}
        </Panel>
        <Panel title={strings("medical_detail.payment_name")}>
          <Text style={[styles.highlight, { textDecorationLine: "underline" }]}>
            {strings("medical_detail.payment_name")}
          </Text>
          <View style={styles.testDetails}>
            {this.renderExamHeader()}
            {medicalDetail.thanhToan &&
              this.renderExamDetailItem(medicalDetail.thanhToan) &&
              this.renderImages(imagePaymentDetails)
            }
          </View>
        </Panel>

        <Panel title={strings("payment_history_detail.assign_clinical")}>
          {this.renderClinicalHeader()}
          {medicalDetail.xetNghiem &&
            this.renderClinicalDetailItem(medicalDetail.xetNghiem) &&
            this.renderImages(imageTestDetails)
          }
        </Panel>

        <Panel title={strings("medical_detail.prescription")}>
          {this.renderPrescriptionHeader()}
          {medicalDetail.toaThuoc &&
            this.renderPrescriptionDetailItem(medicalDetail.toaThuoc) &&
            this.renderImages(imagePresDetails)
          }
        </Panel>
      </View>
    );
  };

  _renderImages = imageItems => {
    return <MedicalDetailImagesScreen images={imageItems} />;
  };

  renderImages = (imageDetails) => {
    if(imageDetails == null || imageDetails.length == 0) return null;
    return (
      <View style={{marginTop: sizeHeight(2)}}>
        <Text style={{fontWeight: 'bold', marginBottom: sizeHeight(1)}}>{strings('medical_detail.image')}</Text>
        <View style={{flex: 1, flexDirection: 'row'}}>
        {
          imageDetails.map(
            (image, index) => {
              if(!image) return null;
              if(image.uri < 50) {
                return (
                  <Text key={index}>{image.uri}</Text>
                )
              }
              else {
                return (
                  <ZoomImage
                    key={index}
                    source={ image }
                    imgStyle={styles.image}
                    style={styles.image}
                    duration={200}
                    enableScaling={true}
                    easingFunc={Easing.ease}
                  />
                )
              }
            }
          )
        }
        </View>
      </View>
    );
  };

  gotoPrescriptionDetail = prescriptionDetails => {
    this.props.navigateToPage("PrescriptionDetail", {
      prescriptionDetails
    });
  };

  render() {
    const { medicalDetail } = this.props;
    return (
      <ScrollView style={styles.container}>
        <AppHeader />
        <Toolbar title={strings("medical_detail.medical_detail")} />
        <View style={styles.body}>{this._renderItem(medicalDetail)}</View>
      </ScrollView>
    );
  }

  componentWillUnmount() {
    this.props.resetMedicalDetail();
  }
}

const mapStateToProps = state => {
  return state.medicalHistory;
};

const mapDispatchToProps = dispatch => {
  return {
    resetMedicalDetail: () => {
      dispatch({ type: RESET_MEDICAL_DETAIL });
    },
    navigateToPage: (route, data) => dispatch(navigateToPage(route, data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MedicalDetailScreen);

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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "green"
  },
  row2: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: sizeWidth(1)
  },
  textTop: {
    width: "48%",
    fontSize: sizeFont(3)
  },
  resultRow: {
    flexDirection: "row",
    marginBottom: sizeWidth(1)
  },
  orderBy: {
    flex: 1.5,
    fontSize: sizeFont(2.6)
  },
  service: {
    flex: 1,
    fontSize: sizeFont(2.6)
  },
  indication: {
    flex: 2,
    fontSize: sizeFont(2.6),
    textAlign: "left"
  },
  indication1: {
    fontSize: sizeFont(2.6),
    textAlign: "left",
    marginLeft: sizeWidth(4)
  },
  quantity: {
    flex: 1,
    fontSize: sizeFont(2.6),
    textAlign: "center"
  },
  cost: {
    flex: 1,
    fontSize: sizeFont(2.6),
    textAlign: "right"
  },
  itemRow: {
    flexDirection: "row",
    marginVertical: sizeWidth(1),
    justifyContent: 'space-between'
  },
  header: {
    fontWeight: "bold"
  },
  testDetails: {
    marginBottom: sizeWidth(1)
  },
  tabs: {
    flexDirection: "row",
    marginBottom: 10
  },
  tab: {
    marginRight: 5,
    fontSize: sizeFont(2.6)
  },
  bodyIndexName: {
    flex: 2,
    fontSize: sizeFont(2.6)
  },
  bodyIndexValue: {
    flex: 1,
    fontSize: sizeFont(2.6)
  },
  bodyIndexStandard: {
    flex: 2,
    fontSize: sizeFont(2.6)
  },
  result: {
    fontSize: sizeFont(2.6),
    color: "red"
  },
  adviseWrap: {
    flex: 1
  },
  resultTitle: {
    fontSize: sizeFont(2.6),
    fontWeight: "bold"
  },
  row: {
    flexDirection: "row",
    marginBottom: sizeWidth(1),
    alignItems: "center",
    justifyContent: "space-between"
  },
  unit: {
    flex: 0.5,
    fontSize: sizeFont(2.6)
  },
  drugName: {
    flex: 1,
    fontSize: sizeFont(2.6),
    textAlign: "left",
    marginLeft: sizeWidth(1)
  },
  drugDate: {
    fontSize: sizeFont(2.6),
    textAlign: "left",
    marginLeft: sizeWidth(23)
  },
  detail: {
    fontStyle: "italic",
    fontSize: sizeFont(2.6),
    textDecorationLine: "underline",
    color: "blue"
  },
  header: {
    fontWeight: "bold",
    textAlign: "left"
  },
  testDetails: {
    marginBottom: sizeWidth(1)
  },
  highlight: {
    fontWeight: "bold",
    fontSize: sizeFont(3)
  },
  label: {
    color: "white",
    fontSize: sizeFont(2.6)
  },
  button: {
    height: sizeHeight(5),
    width: sizeWidth(14),
    justifyContent: "center",
    alignContent: "center"
  },
  image: {
    height: sizeWidth(15),
    marginRight: sizeWidth(1),
    borderColor: '#CCC',
    borderWidth: 0.2,
    width: Dimensions.get('window').width - sizeWidth(5)
  }
});

import React, { Component } from "react";
import {
  View,
  StyleSheet
} from "react-native";
import PropTypes from "prop-types";
import Text from "../common/text";
import { sizeWidth, sizeFont } from "../../helpers/size.helper";
import { strings } from '../../locate/I18n';

export default class PrescriptionList extends Component {

  renderHeader = () => {
    return (
      <View style={styles.itemRow}>
        <Text style={[styles.header, styles.orderBy]}>{strings('prescription_list.num')}</Text>
        <Text style={[styles.header, styles.drugName]}>
          {strings('prescription_list.medicine_name_usage')}
        </Text>
        <Text style={[styles.header, styles.unit]}>{strings('prescription_list.unit')}</Text>
      </View>
    );
  };

  renderTestDetailItem = (item, index) => {
    let _cachDung = `${item.cachDung}`;
    if (item.lieuDungSang !== 0) {
      _cachDung = _cachDung.concat(`, ${strings('prescription_list.morning')} ${item.lieuDungSang}`);
    }
    if (item.lieuDungTrua !== 0) {
      _cachDung = _cachDung.concat(`, ${strings('prescription_list.noon')} ${item.lieuDungTrua}`);
    }
    if (item.lieuDungChieu !== 0) {
      _cachDung = _cachDung.concat(`, ${strings('prescription_list.afternoon')} ${item.lieuDungChieu}`);
    }
    if (item.lieuDungToi !== 0) {
      _cachDung = _cachDung.concat(`, ${strings('prescription_list.night')} ${item.lieuDungToi}`);
    }
    return (
      <View style={styles.itemRow} key={index}>
        <Text style={styles.orderBy}>{index + 1}</Text>
        <View style={{ flex: 2 }}>
          <Text style={[styles.drugName]}>{item.tenThuoc}</Text>
          <Text style={styles.drugName}>
            {_cachDung}
          </Text>
          <Text style={[styles.drugName]}>
          {strings('prescription_list.attribution')} {item.chidan}
          </Text>
        </View>
        <Text style={styles.unit}>{item.soluong} {item.donViTinh}</Text>
      </View>
    );
  };

  render() {
    const {prescriptionItem} = this.props;
    return (
      <View style={styles.testDetails}>
      {
        prescriptionItem
        && this.renderHeader()
        && prescriptionItem.map((item, index) => {
          return this.renderTestDetailItem(item, index)
        })
      }
    </View>
    );
  }
}

const styles = StyleSheet.create({
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
  orderBy: {
    flex: 0.5,
    fontSize: sizeFont(2.6)
  },
  drugName: {
    flex: 2,
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
    fontWeight: "bold"
  }
});

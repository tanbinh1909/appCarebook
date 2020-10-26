import React, { Component } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Text from "../../components/common/text";
import Rate from "../common/rate";
import { sizeWidth, sizeFont, sizeHeight } from "../../helpers/size.helper";
import { secondary_bg_color } from "../../constants/app.constant";
import Button from "../common/button";
import { Icon } from "react-native-elements";
import { TOGGLE_MODAL } from "../../actions/booking-modal.action";
import { connect } from "react-redux";
import CacheImage from "../common/cache-image";
import lodash from "lodash";
import numeral from "numeral";
import { navigateToPage } from "../../actions/nav.action";
import FormatHelper from "../../helpers/format.helper";
import { strings } from '../../locate/I18n';

class DoctorItem extends Component {
  getCertificate = () => {
    const { item } = this.props;
    let certificate;
    switch (item.certificate) {
      case "1":
        certificate = "Gs";
        break;
      case "2":
        certificate = "Ts";
        break;
      case "3":
        certificate = "ThS";
        break;
      case "4":
        certificate = "Bs";
        break;
    }
    return certificate;
  };

  render() {
    const { item } = this.props;
    let imageUrl;
    const idDetail = item.id
    if (lodash.isArray(item.listImage))
      imageUrl = item.domain + item.listImage[0];
    const certificate = this.getCertificate();
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigateToPage("DoctorDetail", { idDetail })
        }}
        style={styles.container}
      >
        <CacheImage style={styles.image} uri={imageUrl} />
        <View style={styles.body}>
          <View style={styles.header}>
            <View style={styles.nameWrap}>
              { (certificate || item.doctorName) && 
                <Text style={styles.name}>
                  {certificate
                    ? `${certificate}. ${item.doctorName}`
                    : item.doctorName
                  }
                </Text>
              }
              <Text style={styles.type}>
                {item.shopname && item.shopname.toUpperCase()} -{" "}
                {item.facultyName && item.facultyName.toUpperCase()}
              </Text>
            </View>
            <Rate rate={item.raiting} maxRate={5} />
          </View>
          <View style={styles.line} />
          <Text style={styles.text}>{FormatHelper.text_truncate(item.contentDetail,45)}</Text>
          <Text style={styles.text}>- {item.shopname}</Text>

          <View style={styles.contact}>
            <Text style={styles.textContact}>{strings('component_search.address')} {item.address}</Text>
            <Text style={styles.textContact}>{strings('component_search.phone')} {item.phone}</Text>
            <Text style={styles.textContact}>
              {strings('email')}: <Text style={styles.textEmail}>{item.email}</Text>
            </Text>
          </View>
          <Text style={styles.warantyText}>
            {strings('component_search.service_price')}
            <Text style={[styles.warantyText, {color: "red"}]}> {numeral(item.price).format("0,0")} </Text>
            VNĐ
          </Text>
          <Button
              leftIcon={
                <Icon
                  name={"calendar"}
                  iconStyle={styles.calendar}
                  type="font-awesome"
                  color="white"
                  size={sizeFont(3.2)}
                />
              }
              textStyle={styles.textButton}
              style={styles.book}
              text={strings('component_search.book_medical')}
              onPress={() => this.props.openBookingModal(item.id)}
            />
        </View>
      </TouchableOpacity>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openBookingModal: (doctorID) => dispatch({ type: TOGGLE_MODAL, forDoctor: false, toID: doctorID }),
    navigateToPage: (pageName, data) => dispatch(navigateToPage(pageName, data))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(DoctorItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#888888",
    borderRadius: sizeWidth(1),
    marginVertical: sizeWidth(1),
    padding: sizeWidth(1),
    alignItems: "flex-start"
  },
  image: {
    width: sizeWidth(33),
    height: sizeWidth(33),
    marginRight: sizeWidth(2)
  },
  body: {
    flex: 1
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start"
  },
  nameWrap: {
    flex: 1
  },
  name: {
    fontSize: sizeFont(3.4),
    fontWeight: "bold",
    color: "red"
  },
  type: {
    color: secondary_bg_color,
    fontSize: sizeFont(2.2),
    fontWeight: "bold"
  },
  line: {
    height: 0.7,
    backgroundColor: "#CCCCCC",
    width: sizeWidth(30),
    marginVertical: sizeWidth(1.5)
  },
  bottom: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: sizeWidth(3.46)
  },
  book: {
    flex: 1
  },
  waranty: {
    flex: 1,
    paddingLeft: sizeWidth(1)
  },
  warantyText: {
    fontSize: sizeFont(2.2),
    fontWeight: "bold",
    marginVertical: sizeHeight(1)
  },
  text: {
    fontSize: sizeFont(2.6)
  },
  contact: {
    marginTop: sizeWidth(1)
  },
  textContact: {
    color: "#333333",
    fontSize: sizeFont(2.8)
  },
  textEmail: {
    color: "red",
    fontSize: sizeFont(2.8)
  },
  phoneWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: sizeWidth(1)
  },
  phone: {
    color: "red",
    fontSize: sizeFont(2.6),
    fontWeight: "bold",
    marginLeft: sizeWidth(1)
  },
  textButton: {
    fontSize: sizeFont(2.2)
  },
  calendar: {
    marginRight: sizeWidth(1)
  }
});

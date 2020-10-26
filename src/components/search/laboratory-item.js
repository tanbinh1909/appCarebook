import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Text from "../../components/common/text";
import Rate from "../common/rate";
import { sizeWidth, sizeFont } from "../../helpers/size.helper";
import { secondary_bg_color } from "../../constants/app.constant";
import Button from "../common/button";
import { Icon } from "react-native-elements";
import { TOGGLE_MODAL } from "../../actions/booking-modal.action";
import { connect } from "react-redux";
import lodash from "lodash";
import CacheImage from "../common/cache-image";
import { navigateToPage } from "../../actions/nav.action";
import FormatHelper from "../../helpers/format.helper";
import { strings } from '../../locate/I18n';

class LaboratoryItem extends Component {
  render() {
    const { item } = this.props;
    const idDetail = item.shopid
    const owned = item.owned && item.owned.toUpperCase();
    const level = item.level && item.level.toUpperCase();
    let imageUrl;
    if (lodash.isArray(item.listImage))
      imageUrl = item.domain + item.listImage[0];
    return (
      <TouchableOpacity
        onPress={() => this.props.navigateToPage("LaboratoryDetail", { idDetail })}
        style={styles.container}
      >
        <CacheImage style={styles.image} uri={imageUrl} />
        <View style={styles.body}>
          <View style={styles.header}>
            <View style={styles.nameWrap}>
              <Text style={styles.name}>{item.shopname}</Text>
              <Text style={styles.type}>
                <Text style={styles.hospitalType}>{strings('component_search.clinic')} {owned}</Text>
              </Text>
            </View>
            <Rate rate={item.raiting} maxRate={5} />
          </View>
          <View style={styles.line} />
          <Text style={styles.text}>{strings('component_search.overview')}</Text>
          <Text style={styles.general}>{FormatHelper.text_truncate(item.contentDetail,45)}</Text>
          <View style={styles.phoneWrap}>
            <Icon
              name={"home"}
              type="font-awesome"
              color="red"
              size={sizeFont(3.46)}
            />
            <Text style={styles.phone}>{item.phone}</Text>
          </View>
          <Text style={styles.text}>{item.shopname}</Text>
          <Text style={styles.textContact}>
            {strings('component_search.email')} <Text style={styles.textEmail}>{item.email}</Text>
          </Text>
          <Text style={styles.text}>{item.address}</Text>
          <View style={styles.bottom}>
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
            <View style={styles.waranty}>
              <Text style={styles.warantyText}>TUYẾN {level}</Text>
              <Text style={styles.warantyText}>
                {strings('component_search.insu')} {item.insurance === "1" ? strings('component_search.yes') : strings('component_search.no')}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openBookingModal: (doctorID) => dispatch({ type: TOGGLE_MODAL, forDoctor: true, toID: doctorID }),
    navigateToPage: (pageName, data) => dispatch(navigateToPage(pageName, data))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(LaboratoryItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#888888",
    borderRadius: sizeWidth(1),
    marginVertical: sizeWidth(1),
    padding: sizeWidth(1),
    alignItems: "center"
  },
  image: {
    width: sizeWidth(33),
    height: sizeWidth(44),
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
    color: "black",
    fontSize: sizeFont(2.2),
    fontWeight: "bold"
  },
  hospitalType: {
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
    flex: 0.9
  },
  waranty: {
    flex: 1,
    paddingLeft: sizeWidth(1)
  },
  warantyText: {
    fontSize: sizeFont(2)
  },
  text: {
    fontSize: sizeFont(2.6),
    fontWeight: 'bold'
  },
  general: {
    marginLeft: sizeWidth(2),
    fontSize: sizeFont(2.6)
  },
  phoneWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: sizeWidth(1)
  },
  textContact: {
    color: "#333333",
    fontSize: sizeFont(2.8)
  },
  textEmail: {
    color: "red",
    fontSize: sizeFont(2.8)
  },
  phone: {
    color: "red",
    fontSize: sizeFont(2.6),
    fontWeight: "bold",
    marginLeft: sizeWidth(1)
  },
  textButton: {
    fontSize: sizeFont(2.4)
  },
  calendar: {
    marginRight: sizeWidth(1)
  }
});

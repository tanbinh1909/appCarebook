import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Text from "../../components/common/text";
import Rate from "../common/rate";
import { sizeWidth, sizeFont } from "../../helpers/size.helper";
import { secondary_bg_color } from "../../constants/app.constant";
import { Icon } from "react-native-elements";
import CacheImage from "../common/cache-image";
import lodash from "lodash";
import { connect } from "react-redux";
import { navigateToPage } from "../../actions/nav.action";
import FormatHelper from "../../helpers/format.helper";
import { strings } from '../../locate/I18n';

class DrugstoreItem extends Component {
  render() {
    const { item } = this.props;
    const idDetail = item.shopid;
    const type = `${item.shopTypeName} ${item.owned}`.toUpperCase();
    let imageUrl;
    if (lodash.isArray(item.listImage))
      imageUrl = item.domain + item.listImage[0];
    return (
      <TouchableOpacity
        onPress={() =>{
           this.props.navigateToPage("DrugstoreDetail", { idDetail })}}
        style={styles.container}
      >
        <CacheImage style={styles.image} uri={imageUrl} />
        <View style={styles.body}>
          <View style={styles.header}>
            <View style={styles.nameWrap}>
              <Text style={styles.name}>{item.shopname}</Text>
              <Text style={styles.type}>{type}</Text>
            </View>
              <Rate rate={item.raiting} maxRate={5} />
          </View>
          <View style={styles.line} />
          <Text style={styles.text}>{strings('component_search.overview')}</Text>
          <Text style={styles.text}>{FormatHelper.text_truncate(item.contentDetail,45)}</Text>
          <View style={styles.phoneWrap}>
            <Icon
              name={"home"}
              type="font-awesome"
              color="red"
              size={sizeFont(3.46)}
            />
            <Text style={styles.phone}>{item.phone}</Text>
          </View>
          <Text style={styles.text}>- {item.shopname}</Text>
          <Text style={styles.textContact}>
            {strings('email')} <Text style={styles.textEmail}>{item.email}</Text>
          </Text>
          <Text style={styles.text}>{strings('component_search.address')} {item.address}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    navigateToPage: (pageName, data) => dispatch(navigateToPage(pageName, data))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(DrugstoreItem);

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
  type: {
    color: secondary_bg_color,
    fontSize: sizeFont(2.2),
    fontWeight: "bold"
  },
  image: {
    width: sizeWidth(33),
    height: sizeWidth(20),
    marginRight: sizeWidth(2)
  },
  body: {
    flex: 1
  },
  header: {
    flexDirection: "row"
  },
  nameWrap: {
    flex: 1
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
  textContact: {
    color: "#333333",
    fontSize: sizeFont(2.8)
  },
  textEmail: {
    color: "red",
    fontSize: sizeFont(2.8)
  },
  name: {
    fontSize: sizeFont(3.4),
    fontWeight: "bold",
    color: "red"
  },
  line: {
    height: 0.7,
    backgroundColor: "#CCCCCC",
    width: sizeWidth(30),
    marginVertical: sizeWidth(1.5)
  },
  text: {
    fontSize: sizeFont(2.6)
  }
});

import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Image,
  Share,
  TouchableOpacity
} from "react-native";
import AppHeader from "../components/app-header";
import Toolbar from "../components/common/toolbar";
import Text from "../components/common/text";
import WrapText from "../components/common/wrap-text";
import { sizeWidth, sizeFont } from "../helpers/size.helper";
import SavedItem from "../components/saved/saved-item";
import { connect } from "react-redux";
import DetailHeader from "../components/detail/detail-header";
import DetailSummary from "../components/detail/detail-summary";
import DetailMap from "../components/detail/detail-map";
import CommentList from "../components/detail/comment-list";
import Reaction from "../components/detail/reaction";
import Button from "../components/common/button";
import Api from "../api/api";
import lodash from "lodash";
import numeral from "numeral";
import { secondary_bg_color } from "../constants/app.constant";
import { getUser } from "../helpers/storage.helper";
import { strings } from '../locate/I18n';
import Images from '../constants/image';
import { TOGGLE_MODAL } from "../actions/booking-modal.action";
import {
  LOAD_SEARCH_DETAIL,
  SEARCH_DETAIL_TOGGLE_BOOKMARK,
} from "../actions/search-detail.action";
import { Icon } from "react-native-elements";

class ClinicDetailScreen extends Component {
  constructor() {
    super();
    // this.state = {
    //   loading: true,
    //   details: {},
    //   comments: []
    // };
  }

  componentDidMount() {
    const { idDetail } = this.props.navigation.state.params;
    this.props.loadSearchDetail(idDetail);
  };

  renderLoadingIndicator = () => {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#3AAF00" />
      </View>
    );
  };

  renderRightComponent = bookmarking => (
    <View style={styles.icons}>
      <TouchableOpacity onPress={this._toggleBookmark.bind(this)}>
        <Icon
          name={bookmarking ? "bookmark" : "bookmark-o"}
          type="font-awesome"
          color={bookmarking ? "red" : "#CCC"}
          size={sizeFont(4.46)}
          iconStyle={{ marginRight: 15 }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={this.shareDoctorShop}>
        <Icon name="share" type="entypo" color="#CCC" size={sizeFont(4.46)} />
      </TouchableOpacity>
    </View>
  );

  shareDoctorShop = async () => {
    const { details } = this.props;
    try {
      const shareContent = await Api.fetchShareDoctorShop(details.shopid);
      Share.share({
        message: shareContent.tieude + "\n" + shareContent.linkpost
      });
    } catch (err) {}
  };

  _toggleBookmark = () => {
    this.props.toggleBookmark(this.props.details.shopid, this.props.bookmarking);
  }

  render() {
    const { details, loading, comments, bookmarking } = this.props;
    let imageUrl;
    if (lodash.isArray(details.listImage))
      imageUrl = details.domain + details.listImage[0];
    const insurance =
      details.insurance === "1"
        ? strings('clinic_detail.accept_insu')
        : strings('clinic_detail.no_accept_insu');
    return (
        <View style={styles.container}>
        <AppHeader />
        <Toolbar
          title={strings('clinic_detail.info')}
          rightComponent={this.renderRightComponent(bookmarking)}
        />
        {loading && this.renderLoadingIndicator()}
        {!loading && (
          <ScrollView bounces={false} contentContainerStyle={{padding: 10}}>
            <DetailSummary
              rating={details.raiting}
              subtitle={insurance}
              summary={details.contentDetail}
              imageUrl={imageUrl}
              title={details.shopname}
            />
            <View style={styles.contact}>
              <Text>{details.shopname}</Text>
              <WrapText>{details.address}</WrapText>
              <Text>{strings('component_search.phone')} {details.phone}</Text>
             <View style={styles.address}>
                <Image
                  style={styles.icon}
                  source={Images.ic_location}
                />
                <Text style={styles.textAddress}>{details.address}</Text>
             </View>
           </View>
           <DetailMap />
            <View style={styles.bottom}>
              <Reaction hideDislike={true} numberLike={details.numberlike} userId={this.props.userId} shopId={details.shopid}/>
              <Button style={styles.book} text={strings('clinic_detail.book_medical')} onPress={() => this.props.openBookingModal(details.id)} />
            </View>
           <CommentList details={details} comments={comments}/>
          </ScrollView>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { ...state.searchDetail, ...state.userInfo} ;
}

const mapDispatchToProps = dispatch => {
  return {
    openBookingModal: (doctorID) => dispatch({ type: TOGGLE_MODAL, forDoctor: true, toID: doctorID }),
    loadSearchDetail: (detailID) => {
      dispatch({ type: LOAD_SEARCH_DETAIL, detailID });
    },
    toggleBookmark: (detailID, bookmarked) => {
      dispatch({ type: SEARCH_DETAIL_TOGGLE_BOOKMARK, detailID, bookmarked });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClinicDetailScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textAddress: {
    flex: 1
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  contact: {
    paddingVertical: sizeWidth(3),
    width: "100%"
  },
  book: {
    marginRight: sizeWidth(3)
  },
  bottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  price: {
    fontSize: sizeFont(4.5),
    fontWeight: "bold"
  },
  highlight: {
    color: "red"
  },
  address: {
    flexDirection: "row",
    alignItems: "center"
  },
  icon: {
    width: sizeWidth(5),
    height: sizeWidth(5)
  },
  icons: {
    flexDirection: "row",
    marginRight: 10
  },
  email: {
    marginVertical: sizeWidth(1)
  }
});

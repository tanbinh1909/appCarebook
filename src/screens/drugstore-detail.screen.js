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
import { connect } from "react-redux";
import DetailSummary from "../components/detail/detail-summary";
import DetailMap from "../components/detail/detail-map";
import CommentList from "../components/detail/comment-list";
import Reaction from "../components/detail/reaction";
import Api from "../api/api";
import lodash from "lodash";
import {
  LOAD_SEARCH_DETAIL,
  SEARCH_DETAIL_TOGGLE_BOOKMARK,
} from "../actions/search-detail.action";
import { Icon } from "react-native-elements";
import { strings } from '../locate/I18n';
import Images from '../constants/image';

class DrugstoreDetailScreen extends Component {
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

  _toggleBookmark = async () => {
    this.props.toggleBookmark(this.props.details.shopid, this.props.bookmarking);
  }

  render() {
    const { details, loading, comments, bookmarking } = this.props;
    let imageUrl;
    if (lodash.isArray(details.listImage))
      imageUrl = details.domain + details.listImage[0];
    const subtitle = `${strings('drugstore_detail.drugstore')} ${details.owned}`;
    return (
      <View style={styles.container}>
        <AppHeader />
        <Toolbar
          title={strings('drugstore_detail.info')}
          rightComponent={this.renderRightComponent(bookmarking)}
        />
        {loading && this.renderLoadingIndicator()}
        {!loading && (
          <ScrollView bounces={false} contentContainerStyle={{padding: sizeWidth(2)}}>
            <DetailSummary
              rating={details.raiting}
              subtitle={subtitle}
              summary={details.contentDetail}
              imageUrl={imageUrl}
              title={details.shopname}
            />
            <View style={styles.contact}>
              <Text>{details.shopname}</Text>
              <WrapText>{details.address}</WrapText>
              <Text>SĐT: {details.phone}</Text>
              <View style={styles.address}>
                <Image
                  style={styles.icon}
                  source={Images.ic_location}
                />
                <Text style={styles.textAddress}>{details.address}</Text>
              </View>
            </View>
            <DetailMap />
            <Reaction hideDislike={true} numberLike={details.numberlike} userId={this.props.userId} shopId={details.shopid}/>
            <CommentList details={details} comments={comments} />
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
)(DrugstoreDetailScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    padding: sizeWidth(3),
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

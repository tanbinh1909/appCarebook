import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Share,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import Toolbar from "../components/common/toolbar";
import AppHeader from "../components/app-header";
import Text from "../components/common/text";
import { sizeWidth, sizeFont, sizeHeight } from "../helpers/size.helper";
import { connect } from "react-redux";
import { Icon } from "react-native-elements";
import { secondary_bg_color, text } from "../constants/app.constant";
import {
  LOAD_NEXTFEED,
  LOAD_DETAIL,
  TOGGLE_BOOKMARK,
  RELOAD_COMMENTS
} from "../actions/feeds.action";
import Button from "../components/common/button";
import moment from "moment";
import { getUser } from "../helpers/storage.helper";
import Api from "../api/api";
import Toast from "@remobile/react-native-toast";
import validator from "validator";
import Moment from "moment";
import { date_format } from "../constants/app.constant";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import Reaction from "../components/detail/reaction";
import HTML from 'react-native-render-html';
import { strings } from '../locate/I18n';
import Images from '../constants/image';

class ArticleDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: null,
      nextFeed: {},
      comment: text.empty_string,
      count: 0,
      gestureName: 'none'
    };
  }
  componentWillReceiveProps(nextProps) {
    const { feed } = nextProps;
    if(feed != null) {
      return true;
    }
    return false;
  }

  renderRightComponent =()=> (
      <View style={styles.icons}>
        <TouchableOpacity onPress={ () => this._toggleBookmark()}>
          <Icon
            name={this.props.navigation.state.params.acticle.bookmarked ? "bookmark" : "bookmark-o"}
            type="font-awesome"
            color={this.props.navigation.state.params.acticle.bookmarked ? "red" : "white"}
            size={sizeFont(4.46)}
            iconStyle={{ marginRight: 15 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() =>this.shareArticle()}>
          <Icon name="share" type="entypo" color="white" size={sizeFont(4.46)} />
        </TouchableOpacity>
    </View>
  )
  shouldComponentUpdate(nextProps) {
    if (this.props.comments.length != nextProps.comments.length) {
      let j = 0;
      for (let i = 0; i < nextProps.comments.length; i++) {
        if (nextProps.comments[i].listComment === null) {
          j += 1;
        } else j += nextProps.comments[i].listComment.length + 1;
        this.setState({
          count: this.state.count + j
        });
      }
    }
    return true;

  }

  render () {
    const { acticle } = this.props.navigation.state.params;
    const {navigation} = this.props;
    const user = getUser();
    const { feed, nextFeed, comments, bookmarked, feedLoading } = this.props;
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
      detectSwipeRight: true,
      detectSwipeLeft: false,
      detectSwipeDown: false,
      detectSwipeUp: false
    };

    // if (feedLoading) {
    //   return (
    //     <View style={styles.loading}>
    //       <ActivityIndicator color={secondary_bg_color} size="large" />
    //     </View>
    //   );
    // }
    return (
      <View style={{flex: 1}}>
        <AppHeader />
        <Toolbar
          title={strings('article_detail.article_detail')}
          navigation={navigation}
          rightComponent={this.renderRightComponent()}
        />
        <ScrollView contentContainerStyle={{padding: 8}} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>{feed.title}</Text>
          <View style={styles.itemBottom}>
            <Text style={styles.note}>
              {Moment(acticle.createdDate).format(
                date_format.dd_mm_yyyy_hh_mm
              )}
            </Text>
          </View>
          <View>
            {acticle.picture ? (
              <Image
                resizeMode="cover"
                style={styles.image}
                source={{ uri: acticle.picture[0] }}
              />
            ) : (
                <Image
                  resizeMode="cover"
                  style={styles.image}
                  source={Images.no_image}
                />
              )}
          </View>
          <Text style={styles.note}>{strings('article_detail.posted_from')} {acticle.createBy}</Text>
          {acticle.content &&
            <HTML html={acticle.content} imagesMaxWidth={Dimensions.get('window').width} />
          }
          <View style={styles.spaceRow}>
            <View style={{ flexDirection: "row" }}>
              <Reaction hideDislike={true} numberLike={feed.like} likePost={true} userId={user && user.userID} shopId={feed.id} />
            </View>
            <TouchableOpacity
              onPress={() =>this.shareArticle()}
              style={{
                paddingLeft: 20,
                paddingRight: 20,
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10
              }}
            >
               <Text>{strings("share")}</Text>
            </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderBottomColor: "#CCC",
                borderBottomWidth: 1
              }}
            >
              <Icon
                name="comments-o"
                type="font-awesome"
                color="#000"
                size={sizeFont(6)}
                containerStyle={{ marginRight: 10 }}
              />
              <Text>{strings('article_detail.comment_count', {comment: this.state.count})} </Text>
            </View>
            {comments.map((item, index) => this._renderComments(item, index))}
            <View style={styles.bottom}>
              <TextInput
                value={this.state.comment}
                onChangeText={text => this.setState({ comment: text })}
                style={styles.commentInput}
                placeholder={strings('article_detail.comment')}
                underlineColorAndroid="transparent"
                placeholderTextColor="#666666"
              />
              <Button onPress={this.sendComment} text={strings('send')} />
            </View>
            {
            nextFeed &&
                // Object.keys(nextFeed).length !== 0 &&
                nextFeed.id !== feed.id &&
                this._renderNextArticle(nextFeed)}
            <Text style={styles.copyright}>
              {strings('article_detail.copyright')}
            </Text>
        </ScrollView>
      </View>
    );
  }

  shareArticle = async () => {
    const { feed } = this.props;
    const shareContent = await Api.fetchShareContent(feed.id);
    try {
        Share.share({
          message: shareContent.tieude + "\n" + shareContent.linkpost
        });
    } catch (err) { }
  };

  sendComment = async () => {
    const { comment } = this.state;
    if (validator.isEmpty(comment))
      return Toast.show(strings('article_detail.msg1'));
    const { feed } = this.props;
    // const user = getUser();
    const user = await getUser();
    const data = {
      contentcomment: comment,
      parentid: user && user.userID,
      date: moment().format("YYYY-MM-DD"),
      shopid: null,
      postid: feed.id
    };
    
    try {
      const res = await Api.sendComment(data);
      this.props.reloadComments(feed.id);
      this.setState({
        comment: text.empty_string
      });
    } catch (err) {
      alert(err.message);
    }
  };

  componentDidMount() {
    const { feedId } = this.props.navigation.state.params;
    this.props.loadFeedDetail(feedId);
    this.props.loadNextFeed(feedId);
  }

  // function swiper to Next feed
  onSwipeLeft(gestureState) {
    const { nextFeed } = this.props;
    if (nextFeed.id) {
      this.props.loadFeedDetail(nextFeed.id);
      this.props.loadNextFeed(nextFeed.id);
    }
  }

  onSwipe(gestureName, gestureState) {
    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    this.setState({ gestureName: gestureName });
  }

  _goToNextFeed() {
    const { nextFeed } = this.props;
    this.props.loadFeedDetail(nextFeed.id);
    this.props.loadNextFeed(nextFeed.id);
  }

  _toggleBookmark() {
    const { acticle } = this.props.navigation.state.params;
    this.props.toggleBookmark(acticle.id, acticle.bookmarked);
  }

  _renderComments = (item, index) => (
    <View key={index} style={{ marginBottom: 10 }}>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
      >
        <Text>{item.username} - </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon
            name="clock"
            type="feather"
            color="#CCC"
            size={sizeFont(4)}
            containerStyle={{ marginRight: 5 }}
          />
          <Text style={{ color: "#CCC" }}>
            {moment(item.commentdate).format("DD/MM/YYYY")}
          </Text>
        </View>
      </View>
      <View>
        <Text style={{ fontSize: sizeFont(3) }}>{item.commentcontent}</Text>
      </View>
    </View>
  );

  _renderNextArticle = item => (
    <View
      style={[
        styles.feedItems,
        { borderTopColor: "#CCC", borderTopWidth: 1, paddingTop: 10 }
      ]}
    >
      <TouchableOpacity
        onPress={this._goToNextFeed.bind(this)}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <Text
          style={{
            color: "red",
            fontWeight: "bold"
          }}
        >
          {strings('article_detail.next_post').toUpperCase()}
        </Text>
        <Icon
          name="navigate-next"
          type="material-icons"
          color="red"
          size={sizeFont(6)}
          containerStyle={{ marginLeft: 0 }}
        />
        <Icon
          name="navigate-next"
          type="material-icons"
          color="red"
          size={sizeFont(6)}
          containerStyle={{ marginLeft: -15 }}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.note}>{strings('article_detail.posted_from')} {item.createBy}</Text>
      <TouchableOpacity onPress={this._goToNextFeed.bind(this)}>
        {item.picture ? (
          <Image
            resizeMode="cover"
            style={styles.image}
            source={{ uri: item.picture[0] }}
          />
        ) : (
            <Image
              resizeMode="stretch"
              style={styles.image}
              source={Images.no_image}
            />
          )}
      </TouchableOpacity>
    </View>
  );
}

const mapStateToProps = state => {
  return {...state.feeds, ...state.home};
};

const mapDispatchToProps = dispatch => {
  return {
    loadNextFeed: id => {
      dispatch({ type: LOAD_NEXTFEED, feedId: id });
    },
    loadFeedDetail: id => {
      dispatch({ type: LOAD_DETAIL, feedId: id });
    },
    toggleBookmark: (id, bookmarked) => {
      dispatch({ type: TOGGLE_BOOKMARK, feedId: id, bookmarked });
    },
    reloadComments: id => {
      dispatch({ type: RELOAD_COMMENTS, feedId: id });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleDetailScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  body: {
    flex: 1,
    padding: sizeWidth(2)
  },
  feedItems: {
    flex: 1,
    marginBottom: 5
  },
  title: {
    fontSize: sizeFont(5),
    fontWeight: "bold",
    textAlign: "justify",
    color:"#3AAF00"
  },
  note: {
    color: "#CCC",
    fontSize: sizeFont(3)
  },
  image: {
    width: sizeWidth(96),
    height: sizeHeight(30)
  },
  itemBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5
  },
  icons: {
    flexDirection: "row",
    marginRight: 10
  },
  htmlContent: {
    flex: 1
  },
  spaceRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10
  },
  copyright: {
    textAlign: "center",
    fontSize: sizeFont(3.2),
    marginTop: sizeWidth(3),
    marginBottom: sizeWidth(1)
  },
  commentInput: {
    flex: 1,
    fontSize: sizeFont(3.3),
    fontStyle: "italic",
    marginRight: 10
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "center",
    // borderBottomWidth: 1,
    borderColor: "#666666",
  }
});

import React, { Component } from "react";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Share,
} from "react-native";
import { Icon } from "react-native-elements";
import { sizeWidth, sizeHeight, sizeFont } from "../../helpers/size.helper";
import Api from "../../api/api";
import {
  TOGGLE_BOOKMARK
} from "../../actions/home.action";
import {
  connect
} from "react-redux";
import Moment from "moment";
import {
  date_format
} from "../../constants/app.constant";
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { View } from "native-base";
import { strings } from '../../locate/I18n';
import Images from '../../constants/image';

class NewFeeds extends Component {
  _renderItem = ({ item }) => {
    return (
      <Card style={styles.card}>
        <TouchableOpacity onPress={() => this.goToDetail(item)}>
          <Card.Content>
            <Title style={styles.title} numberOfLines={2}>{item.title}</Title>
            <Paragraph style={styles.note}>
              {strings('new_feed.posted_from')} {item.createBy}
            </Paragraph>
          </Card.Content>
          {
            item.picture ? (<Card.Cover source={{ uri: item.picture && item.picture[0] }} />)
              : (<Card.Cover source={Images.no_image} />)
          }
        </TouchableOpacity>
        <Card.Actions style={styles.Actions}>
          <Paragraph>{Moment(item.createdDate).format(date_format.dd_mm_yyyy)}</Paragraph>
          <View style = {styles.childActions}>
            <TouchableOpacity onPress={() => this.onToggleBookmark(item.id, item.bookmarked)} style = {{marginRight:sizeWidth(2)}}>
              <Icon
                name={item.bookmarked ? "bookmark" : "bookmark-o"}
                type="font-awesome"
                color={item.bookmarked ? "red" : "black"}
                size={sizeFont(4.46)}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.shareNewFeed(item)}>
              <Icon
                name="share"
                type="entypo"
                color="black"
                size={sizeFont(4.46)}
              />
            </TouchableOpacity>
          </View>
        </Card.Actions>
      </Card>
    );
  }

  shareNewFeed = async item => {
    try {
      const shareContent = await Api.fetchShareContent(item.id);
      Share.share({
        message: shareContent.tieude + "\n" + shareContent.linkpost
      });
    } catch (err) { }
  };
  _keyExtractor = (item, index) => `${item.id}`;
  render() {
    return (
      <FlatList
        data={this.props.list}
        refreshing={this.props.articlesLoading}
        onRefresh={() => this.props.onRefreshArticles()}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }

  goToDetail = _feed => {
    this.props.navigation.navigate("ArticleDetail", {
      feedId: _feed.id,
      acticle: _feed
    });
  };

  onToggleBookmark(feedId, bookmarked) {
    this.props.toggleBookmark(feedId, bookmarked);
  }
}

const mapStateToProps = state => {
  return {...state.feeds, ...state.home};
};

const mapDispatchToProps = dispatch => {
  return {
    toggleBookmark: (id, bookmarked) => {
      dispatch({ type: TOGGLE_BOOKMARK, feedId: id, bookmarked });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewFeeds);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: sizeFont(4.46),
    textAlign: "justify"
  },
  note: {
    fontSize: sizeFont(3)
  },
  image: {
    width: sizeWidth(100),
    height: sizeHeight(30)
  },
  icons: {
    flexDirection: "row",
    marginRight: 20
  },
  card: {
    margin: sizeWidth(2),
  },
  Actions: {
    justifyContent:"space-between",
    flex: 1,
    flexDirection: "row",
  },
  childActions:{
    flexDirection:"row",
  }
});

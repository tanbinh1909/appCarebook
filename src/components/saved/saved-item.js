import React, { Component } from "react";
import { TouchableOpacity, Share, FlatList, StyleSheet } from "react-native";
import { sizeWidth, sizeFont, sizeHeight } from "../../helpers/size.helper";
import { Icon } from "react-native-elements";
import Api from "../../api/api";
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import Moment from "moment";
import {
  date_format
} from "../../constants/app.constant";
import Images from '../../constants/image';

export default class SavedItem extends Component {

  _renderItem = (item, index) => {
    if(item == null) {
       return null;
    }

    return (
      <Card style={styles.Card} key={index}>
        <TouchableOpacity onPress={() => this.goToDetail(item)}>
          <Card.Content>
            <Title style={styles.title} numberOfLines={2}>{item.title}</Title>
          </Card.Content>
          {
            item.picture ? (<Card.Cover source={{ uri: item.picture && item.picture[0] }} />)
              : (<Card.Cover source={Images.no_image} />)
          }
        </TouchableOpacity>
        <Card.Actions style={styles.Actions}>
          <Paragraph style={{ marginRight: sizeWidth(0) }}>{Moment(item.createdDate).format(date_format.dd_mm_yyyy)}</Paragraph>
          <Button icon="share" color='black' size={sizeFont(4.46)} onPress={() => this.shareArticle(item)} />
        </Card.Actions>
      </Card>
    )
  }

  shareArticle = async feed => {
    try {
      const shareContent = await Api.fetchShareContent(feed.item.idPost);
      Share.share({
        message: shareContent.tieude + "\n" + shareContent.linkpost
      });
    } catch (err) { }
  };

  render() {
    return (
      <FlatList
        data={this.props.data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => this._renderItem(item, index)}
      />
    );
  }

  goToDetail = _feed => {
    this.props.navigation.navigate("ArticleDetail", {
      feedId: _feed.idPost,
      acticle: _feed
    });
  };
}

const styles = StyleSheet.create({
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
  Card: {
    margin: sizeWidth(2)
  },
  Actions: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: "center",
    paddingStart: sizeHeight(2.5)
  }
})

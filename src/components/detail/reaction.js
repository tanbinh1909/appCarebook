import React, { Component } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Rate from "../common/rate";
import Text from "../common/text";
import CacheImage from "../common/cache-image";
import { sizeWidth, sizeFont } from "../../helpers/size.helper";
import { strings } from '../../locate/I18n';
import Images from '../../constants/image';

export default class Reaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberLike: this.props.numberLike
    };
  }
  onLikePressed() {
    const userId = this.props.userId;
    const shopId = this.props.shopId;
    const likePost = this.props.likePost;

    if(likePost) {
      return fetch(`https://www.carebook.vn/api/mobile/v1/post/customer/${userId}/like/${shopId}`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({numberLike: responseJson})
      })
      .catch((error) => {
        console.error(error);
      });
    }else {
      return fetch(`https://www.carebook.vn/api/mobile/v1/detailshop/customer/${userId}/like/${shopId}`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({numberLike: responseJson.numberlike})
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }
  render() {
    const { likePost } = this.props;
    const { hideDislike } = this.props;
    const { numberLike } = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.item} onPress={() => this.onLikePressed()}>
          <Image
            source={Images.ic_like}
            style={[styles.icon, styles.likeIcon]}
          />
          <Text style={styles.likeText}>{this.state.numberLike} {strings('like')}</Text>
        </TouchableOpacity>
        {!hideDislike && (
          <TouchableOpacity style={styles.item}>
            <Image
              source={Images.ic_dislike}
              style={styles.icon}
            />
            <Text style={styles.dislikeText}>0 {strings('dislike')}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: sizeWidth(3),
    flexDirection: "row",
    alignItems: "center"
  },
  likeText: {
    color: "#666666",
    fontSize: sizeFont(3.3)
  },
  dislikeText: {
    color: "#666666",
    fontSize: sizeFont(3.3)
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: sizeWidth(2)
  },
  icon: {
    width: sizeWidth(5),
    height: sizeWidth(5),
    marginRight: sizeWidth(2)
  },
  likeIcon: {
    tintColor: "rgb(110, 151, 247)"
  }
});

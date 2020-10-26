import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  TextInput
} from "react-native";
import Text from "../common/text";
import { sizeWidth, sizeFont } from "../../helpers/size.helper";
import CommentItem from "./comment-item";
import { text } from "../../constants/app.constant";
import validator from "validator";
import Toast from "@remobile/react-native-toast";
import { getUser } from "../../helpers/storage.helper";
import moment from "moment";
import Api from "../../api/api";
import Button from "../common/button";
import { strings } from "../../locate/I18n";
import Images from "../../constants/image";

export default class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: text.empty_string,
      comments: props.comments,
      focus: false
    };
  }

  onFocus() {
    this.setState({focus: true});
  }

  sendComment = async () => {
    this.setState({
      focus: false
    });
    const { comment, comments } = this.state;
    const { details } = this.props;
    if (validator.isEmpty(comment))
      return Toast.show(strings("article_detail.msg1"));
    const { feed } = this.props;
    const user = await getUser();
    const data = {
      contentcomment: comment,
      parentid: user && user.userID,
      date: moment().format("YYYY-MM-DD"),
      shopid: details.id,
      postid: details.id
    };
    try {
      const res = await Api.sendComment(data);
      this.setState({
        comment: text.empty_string,
        comments: [...comments, res]
      });
    } catch (err) {
    }
  };

  UNSAFE_componentWillMount = async () => {
    const { comments } = this.state;
    let j = 0;
    for (let i = 0; i < comments.length; i++) {
      if (comments[i].listComment === null) {
        j += 1;
      } else j += comments[i].listComment.length + 1;
    }
  };

  render() {
    const { comments } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={[styles.top, { borderBottomWidth: 1 }]}>
            <Image style={styles.comments} source={Images.ic_comment} />
            <Text style={styles.total}>
              {strings("article_detail.comment_count", {
                comment: comments ? comments.length : 0
              })}
            </Text>
          </View>
          <View style={{ flex: 1 }}></View>
        </View>
        <FlatList
          data={comments}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderCommentItem}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
        <View style={styles.comment}>
          {/* <TextInput
            value={this.state.comment}
            onFocus={() => this.onFocus()}
            onChangeText={text => this.setState({ comment: text })}
            style={styles.commentInput}
            placeholder={strings("article_detail.comment")}
            underlineColorAndroid="transparent"
            placeholderTextColor="#666666"
          /> */}
          <TextInput
            style={styles.commentInput}
            onFocus={() => this.onFocus()}
            placeholder={strings("article_detail.comment")}
            onChangeText={text => this.setState({ comment: text })}
            underlineColorAndroid="transparent"
            value={this.state.comment}
          />
          <Button onPress={this.sendComment} text={strings("send")} />
        </View>
      </View>
    );
  }

  renderCommentItem = ({ item }) => {
    return <CommentItem item={item} />;
  };
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: sizeWidth(3)
  },
  top: {
    flexDirection: "row"
  },
  total: {
    fontWeight: "bold",
    marginLeft: sizeWidth(3)
  },
  comments: {
    width: sizeWidth(5),
    height: sizeWidth(5)
  },
  line: {
    height: 1,
    backgroundColor: "#666666",
    width: sizeWidth(33),
    marginTop: sizeWidth(1)
  },
  commentInput: {
    height: 40,
    flex: 1,
    marginRight: 5,
    borderBottomWidth: 1
  },
  comment: {
    flex: 1,
    flexDirection: "row",
    marginTop: 5
  }
});

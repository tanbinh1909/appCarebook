import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput
} from "react-native";
import Text from "../common/text";
import { sizeWidth, sizeFont } from "../../helpers/size.helper";
import { secondary_bg_color, text } from "../../constants/app.constant";
import Button from "../common/button";
import moment from "moment";
import Api from "../../api/api";
import { getUser } from "../../helpers/storage.helper";
import validator from "validator";
import Toast from "@remobile/react-native-toast";
import Images from "../../constants/image";
import { strings } from "../../locate/I18n";

export default class CommentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showReplies: false,
      replies: (props.item && props.item.listComment) || [],
      reply: text.empty_string,
      focus: false
    };
  }
  onFocus() {
    this.setState({
      focus: true
    });
  }

  render() {
    const { item } = this.props;
    if (item == null) return null;
    const { replies } = this.state;
    const commentDate = moment(item.commentdate).format("DD/MM/YYYY");
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.name}>{item.username} -</Text>
          <View style={styles.time}>
            <Image style={styles.icon} source={Images.ic_alarm_clock} />
            <Text style={styles.timeText}>{commentDate}</Text>
          </View>
        </View>
        <Text style={styles.content}>{item.commentcontent}</Text>
        <TouchableOpacity
          onPress={() =>
            this.setState({ showReplies: !this.state.showReplies })
          }
          style={styles.reply}
        >
          <Image source={Images.ic_reply} style={styles.iconReply} />
          <Image source={Images.ic_three_dots} style={styles.iconDots} />
        </TouchableOpacity>
        {this.state.showReplies && this.renderReplies(replies)}
      </View>
    );
  }

  renderCommentReplyItem = ({ item }) => {
    const commentDate = moment(item.commentdate).format("DD/MM/YYYY");
    return (
      <View>
        <View style={styles.top}>
          <Text style={styles.name}>{item.username} -</Text>
          <View style={styles.time}>
            <Image style={styles.icon} source={Images.ic_alarm_clock} />
            <Text style={styles.timeText}>{commentDate}</Text>
          </View>
        </View>
        <Text style={styles.content}>{item.commentcontent}</Text>
      </View>
    );
  };

  sendReply = async () => {
    this.setState({
      focus: false
    });
    const { reply, replies } = this.state;
    if (validator.isEmpty(reply)) return Toast.show(strings('enter_reply'));
    const { item } = this.props;
    const user = getUser();
    const data = {
      contentcomment: reply,
      parentid: user && user.userID,
      date: moment().format("YYYY-MM-DD"),
      idcommentuser: item.id,
      shopid: item.idshop,
      postid: null
    };
    try {
      const res = await Api.sendComment(data);
      this.setState({
        replies: res.listComment,
        reply: text.empty_string
      });
    } catch (err) {}
  };

  renderReplies = replies => {
    return (
      <View style={styles.replies}>
        <FlatList
          data={replies}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderCommentReplyItem}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
        <View style={styles.comment}>
          <TextInput
            style={styles.replyInput}
            onFocus={() => this.onFocus()}
            placeholder={strings("reply")}
            onChangeText={text => this.setState({ reply: text })}
            underlineColorAndroid="transparent"
            value={this.state.reply}
          />
          {this.state.focus === true ? (
            <Button onPress={this.sendReply} text={strings('send')} />
          ) : null}
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  replies: {
    marginLeft: sizeWidth(8)
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: sizeWidth(2)
  },
  icon: {
    marginRight: sizeWidth(1),
    width: sizeWidth(3),
    height: sizeWidth(3)
  },
  time: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: sizeWidth(2)
  },
  name: {
    fontWeight: "bold"
  },
  timeText: {
    color: "#666666"
  },
  content: {
    fontSize: sizeFont(3.3),
    fontWeight: "bold",
    fontStyle: "italic"
  },
  replyInput: {
    flex: 1,
    height: 40,
    marginRight: 5,
    borderBottomWidth: 1
  },
  iconReply: {
    width: sizeWidth(3),
    height: sizeWidth(3)
  },
  iconDots: {
    marginLeft: sizeWidth(1),
    width: sizeWidth(3),
    height: sizeWidth(3),
    tintColor: secondary_bg_color
  },
  reply: {
    flexDirection: "row",
    marginHorizontal: sizeWidth(2),
    marginVertical: sizeWidth(2)
  },
  comment: {
    flex: 1,
    flexDirection: "row",
    marginTop: 5
  }
});

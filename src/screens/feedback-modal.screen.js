import React, { Component } from "react";
import { Text, View, StyleSheet, KeyboardAvoidingView } from "react-native";
import Modal from "react-native-modal";
import { connect } from "react-redux";
import { TOGGLE_MODAL } from "../actions/feedback-modal.action";
import { sizeWidth, sizeHeight, sizeFont } from "../helpers/size.helper";
import { Icon } from "react-native-elements";
import { secondary_bg_color } from "../constants/app.constant";
import Input from "../components/common/input";
import Button from "../components/common/button";
import { strings } from '../locate/I18n';
import validator from "validator";
import Toast from "@remobile/react-native-toast";

class FeedbackModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noidung: ""
    };
  }

  render() {
    const { isToggle } = this.props;
    return (
      <Modal isVisible={isToggle}
        onBackdropPress={() => this.props.closeModal()}
        backdropOpacity={0.5}
        isVisible={isToggle}
        transparent={true}
        avoidingview = {true}
        moveAboveKeyboard = {true}>
        <KeyboardAvoidingView behavior="padding" style={styles.modalContainer}>
          <Icon
            name="wechat"
            type="font-awesome"
            size={sizeFont(20)}
            color={secondary_bg_color}
          />
          <Text style={styles.title}>{strings('feedback_modal.send_feedback').toUpperCase()}</Text>
          <Input
            multiline={true}
            textStyle={styles.textContent}
            style={styles.content}
            placeholder={strings('feedback_modal.content')}
            onChangeText={noidung => this.setState({ noidung })}
          />
          <View style={styles.action}>
            <Button
              style={styles.cancel}
              text={strings('cancel')}
              onPress={() => this.props.closeModal()}
              // leftIcon={
              //   <Icon
              //     style={styles.icon}
              //     size={sizeWidth(5)}
              //     name="x"
              //     type="feather"
              //     color="white"
              //   />
              // }
            />

            <Button
              style={styles.button}
              text={strings('send')}
              onPress={ this.send }
              // leftIcon={
              //   <Icon
              //     style={styles.icon}
              //     size={sizeWidth(5)}
              //     name="save"
              //     type="feather"
              //     color="white"
              //   />
              // }
            />
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  }

  isValidForm() {
    const { noidung } = this.state;
    if (validator.isEmpty(noidung)) {
      Toast.show(strings('msg_pls_enter_field', {field: strings('feedback_modal.content')}));
      return false;
    }
    return true;
  }

  send = () => {
    if(this.isValidForm()) {
      const feedback = {
        noidung: this.state.noidung
      };
    }
  }
}

const mapStateToProps = state => {
  return {
    ...state.feedbackModal
  }
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch({ type: TOGGLE_MODAL })
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedbackModal);

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#FFF",
    borderRadius: 0,
    alignItems: "center",
    minHeight: 100,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  title: {
    fontSize: sizeFont(4),
    fontWeight: "bold"
  },
  content: {
    height: sizeWidth(30),
    borderWidth: 1,
    // borderBottomWidth: 2,
    // borderBottomColor: secondary_bg_color,
  },
  textContent: {
    height: sizeWidth(20),
    textAlignVertical: "top",
    paddingTop: 5
  },
  action: {
    height: sizeHeight(5),
    marginTop: sizeWidth(4),
    flexDirection: "row",
    // paddingHorizontal: sizeWidth(3),
    justifyContent: "flex-end",
    marginBottom: 10,
  },  
  cancel: {
    paddingHorizontal: sizeWidth(10),
    backgroundColor: "#CCCCCC",
    marginRight: sizeWidth(8)
  },
  button: {
    paddingHorizontal: sizeWidth(10),
    marginLeft: sizeWidth(8)
  }
});

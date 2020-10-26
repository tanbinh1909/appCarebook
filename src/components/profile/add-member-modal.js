import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";
import { sizeWidth, sizeFont } from "../../helpers/size.helper";
import Text from "../../components/common/text";
import Button from "../common/button";
import Input from "../common/input";
import { text, secondary_bg_color, primary_bg_color } from "../../constants/app.constant";
import { ADD_RELATIONSHIP,TOGGLE_ADD_RELATIONSHIP_MODAL } from "../../actions/user-info.action";
import { connect } from "react-redux";
import { strings } from '../../locate/I18n';
import Images from '../../constants/image';
import { CheckBox } from "react-native-elements";
import { isValidName } from "../../helpers/validator.helper";

class AddMemberModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: text.empty_string,
      password: text.empty_string,
      relative: text.empty_string,
      privilege: false,
      addingError: text.empty_string
    };
  }

  render() {
    const { username, password, relative, addingError} = this.state;
    return (
      <View style={styles.container}>
          <View style={styles.body}>
            <Text style={styles.name}>{strings('add_member_modal.add_account')}</Text>
            <Input
              style={styles.input}
              value={username}
              keyboardType="numeric"
              onChangeText={text => this.setState({ username: text })}
              placeholder={strings('add_member_modal.account')}
              rightIcon={
                <Image
                  style={styles.icon}
                  source={Images.ic_user}
                />
              }
            />
            <Input
              value={password}
              style={styles.input}
              secureTextEntry={true}
              onChangeText={text => this.setState({ password: text })}
              placeholder={strings('add_member_modal.pass')}
              rightIcon={
                <Image
                  style={styles.icon}
                  source={Images.ic_key}
                />
              }
            />
            <Input
              style={styles.input}
              value={relative}
              onChangeText={text => this.setState({ relative: text })}
              placeholder={strings('add_member_modal.relationship')}
              rightIcon={
                <Image
                  style={styles.icon}
                  source={Images.ic_family}
                />
              }
            />
            <View style={styles.checkboxWrap}>
              <CheckBox
                title={strings('add_member_modal.allows_edit')}
                // uncheckedColor={primary_bg_color}
                checked={this.state.privilege}
                containerStyle={styles.checkbox}
                textStyle={styles.textCheckbox}
                onPress={() =>
                  this.setState({
                    privilege: !this.state.privilege
                  })
                }
              />
            </View>
            <Text style={styles.message}>{addingError}</Text>
            <Button
              style={styles.button}
              text={strings('add_member_modal.add_account')}
              onPress={() => this.onAddRelationship()}
            />
            <Button text={strings('cancel')}
              onPress={() => this.props.toggleAddRelationshipModal()}
              style={styles.button1} />
          </View>
          <View style={styles.userWrap}>
            <Image
              source={Images.ic_person}
              style={styles.avatar}
            />
          </View>
      </View>
    );
  }

  onAddRelationship() {
    const { currentUser } = this.props;
    const {
      username,
      relative,
      password,
      privilege
    } = this.state;
    if(username.trim() == '' || password.trim() == '' || relative.trim() == '') {
      this.setState({addingError: strings('register.msg_enter_full_registration')});
      return;
    }

    if (username.length > 10) {
      this.setState({addingError: strings('add_member_modal.msg')});
      return;
    }

    if (username.length < 10) {
      this.setState({addingError: strings('add_member_modal.msg')});
      return;
    }

    if (password.length < 6) {
      this.setState({addingError: strings('add_member_modal.msg')});
      return;
    }

    if (!isValidName(relative)) {
      this.setState({addingError: strings('add_member_modal.relative_msg')});
      return;
    }

    var privilegeChecked = "";
    if(privilege == true){
      privilegeChecked = "2";
    } else {
      privilegeChecked = "1";
    }

    this.props.addMember({
      currentcustomerid: currentUser.customerID,
      relationName: relative,
      relationpassword: password,
      relationusername: username,
      privilege: privilegeChecked
    });
  }
}

const mapStateToProps = state => {
  return state.userInfo;
};

const mapDispatchToProps = dispatch => {
  return {
    addMember: member => dispatch({ type: ADD_RELATIONSHIP, member }),
    navigateBack: () => dispatch(navigateBack()),
    toggleAddRelationshipModal: () =>
      dispatch({ type: TOGGLE_ADD_RELATIONSHIP_MODAL }),
    }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMemberModal);

const styles = StyleSheet.create({
  container: {
    width: sizeWidth(90)
  },
  body: {
    backgroundColor: "white",
    paddingBottom: sizeWidth(3),
    paddingHorizontal: sizeWidth(3),
    borderRadius: sizeWidth(2.13),
    paddingTop: sizeWidth(15),
    marginTop: sizeWidth(12.5)
  },
  avatar: {
    width: sizeWidth(13),
    height: sizeWidth(13)
  },
  name: {
    color: "black",
    alignSelf: "center",
    fontSize: sizeFont(5.5),
    fontWeight: "bold"
  },
  relative: {
    fontSize: sizeFont(2.5),
    color: "#CCCCCC"
  },
  input: {
    backgroundColor: "#EEEEEE",
    borderWidth: 0,
    marginVertical: sizeWidth(2),
    borderRadius: sizeWidth(1.03)
  },
  button: {
    height: sizeWidth(11),
    borderRadius: sizeWidth(1.03)
  },
  button1: {
    top:5,
    backgroundColor: "#777777",
    height: sizeWidth(11),
    borderRadius: sizeWidth(1.03)
  },
  forgotPass: {},
  forgotPassWrap: {
    alignSelf: "center",
    marginVertical: sizeWidth(2.13)
  },
  userWrap: {
    width: sizeWidth(25),
    position: "absolute",
    top: 0,
    alignSelf: "center",
    height: sizeWidth(25),
    borderRadius: sizeWidth(12.5),
    backgroundColor: secondary_bg_color,
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    width: sizeWidth(4),
    height: sizeWidth(4),
    tintColor: "#CCCCCC",
    marginLeft: sizeWidth(1.03)
  },
  checkbox: {
    padding: 0,
    margin: 0,
    borderWidth: 0,
  },
  checkboxWrap: {
    flexDirection: "row",
    marginTop: sizeWidth(2),
    marginBottom: sizeWidth(2),
    justifyContent: "flex-start",
    alignItems: "center"
  },
  textCheckbox: {
    color: "black"
  },
  message: {
    color: "red",
    fontStyle: "italic",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center"
  }
});

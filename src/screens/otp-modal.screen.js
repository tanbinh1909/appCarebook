import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { sizeWidth, sizeHeight, sizeFont } from "../helpers/size.helper";
import { Icon } from "react-native-elements";
import { secondary_bg_color } from "../constants/app.constant";
import Label from "../components/common/label";
import { Button} from 'native-base';
import {  TOGGLE_OTP_MODAL } from "../actions/user-info.action";
import ModalDropdown from "react-native-modal-dropdown";
import CheckBox from 'react-native-check-box';
import { strings } from '../locate/I18n';

class OTPScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      optionSelected: 0,
      optionValue: strings('otp_modal.30min'),
      isChecked:true,
      isInprogress: true,
      isPending: true,
    };
  }

  componentWillMount() {
    const options = [
      {"key":1,"value":strings('otp_modal.30min')},
      {"key":2,"value":strings('otp_modal.1h')},
      {"key":3,"value":strings('otp_modal.12h')},
      {"key":4,"value":strings('otp_modal.24h')},
      {"key":5,"value":strings('otp_modal.1week')}
    ];

    this.setState({options});
  }


  render() {

    const {addingError} = this.props;
    return (
      <View style={styles.container}>
          <View style={styles.body}>
            <Text style={styles.name}>{strings('otp_modal.gen_otp')}</Text>
            <View style={{flex: 1, flexDirection: 'column', marginLeft:sizeWidth(5)}}>
            <Label text={strings('otp_modal.eff_time')} />
            <ModalDropdown
              style={styles.filterType}
              onSelect={this.onSelectFilterType}
              dropdownStyle={{ height: (30 + StyleSheet.hairlineWidth) * 5 }}
              renderRow={this.renderFilterRow}
              options={this.state.options}
          >
             <View style={styles.filterWrap}>
             <Text style={styles.typeText}>{this.state.optionValue}</Text>
              <Icon
                  style={{marginTop:sizeWidth(3)}}
                  name={"triangle-down"}
                  type="octicon"
                  color="#888888"
                  size={sizeFont(4.46)}
                />
            </View>
          </ModalDropdown>
          </View>
          <View style={{flex: 1,flexDirection: 'column', marginLeft:sizeWidth(45), marginBottom:sizeHeight(10)}}>
            <CheckBox
                onClick={this.props.toggleCheckedBox}
                isChecked={this.state.isChecked}
                rightText={strings('otp_modal.read_only')}
                leftTextStyle = {
                    {
                        fontSize: sizeFont(3),
                        fontWeight: "bold",
                        color: "black"
                    }
                }
                checkBoxColor = "rgb(93, 177, 74)"
            />
            <CheckBox
                onClick={this.props.toggleIsPendingBox}
                isChecked={this.state.isPending}
                rightText={strings('otp_modal.create_med')}
                leftTextStyle = {
                    {
                        fontSize: sizeFont(3),
                        fontWeight: "bold",
                        color: "black"
                    }
                }
                checkBoxColor = "rgb(93, 177, 74)"
            />
            <CheckBox
                onClick={this.props.toggleInProgressBox}
                isChecked={this.state.isInprogress}
                rightText={strings('otp_modal.msg1')}
                leftTextStyle = {
                    {
                        fontSize: sizeFont(3),
                        fontWeight: "bold",
                        color: "black"
                    }
                }
                checkBoxColor = "rgb(93, 177, 74)"
            />
          </View>
          <View style={{ height: sizeHeight(5),width:sizeWidth(80), backgroundColor:"#dff0d8",marginLeft:sizeWidth(2),marginBottom:sizeHeight(3),marginTop:sizeWidth(5)}}>
            <Text style={{marginTop:sizeWidth(1), textAlign:"center",color:"#3c763d",fontSize: sizeFont(5),fontWeight: "bold" }} >123456</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: "space-around", marginBottom:sizeHeight(5)}}>
              <Button success
                style={styles.button}
              >
                <Icon
                  style={styles.icon}
                  size={sizeWidth(5)}
                  name="pencil"
                  type="material-community"
                  color="white"
                />
              <Text style={{color: "white"}}>{strings('otp_modal.gen_code')}</Text>
              </Button>
             <Button danger
              style={styles.button1}
              onPress={()=> this.props.closeModal()}
            >
                <Icon
                  style={styles.icon}
                  size={sizeWidth(5)}
                  name="x"
                  type="feather"
                  color="white"
                />
            <Text style={{color: "white"}}>{strings('otp_modal.close')}</Text>
              </Button>
            </View>
          </View>
          <View style={styles.userWrap}>
            <Text style={{textAlign:"center",fontWeight: "bold", color:"white", fontSize:sizeFont(7)}}>OTP</Text>
          </View>
      </View>
    );
  }

  toggleCheckedBox = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    })
  }

  toggleInProgressBox = () => {
    this.setState({
      isInprogress: !this.state.isInprogress
    })
  }

  toggleIsPendingBox = () =>{
    this.setState({
      isPending: !this.state.isPending,
    })
  }

  renderFilterRow = (rowData, index, isSelected) => {
    const {key, value} = rowData;
    return (
      <TouchableOpacity>
        <Text style={styles.filterText}>{value}</Text>;
      </TouchableOpacity>
    )
  };

  onSelectFilterType = (index, rowData) => {
    const {key, value} = rowData;
    this.setState({
      optionSelected: key,
      optionValue: value
    });
  };
}

const mapStateToProps = state => {
  return state.userInfo;
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch({ type: TOGGLE_OTP_MODAL }),
    navigateBack: () => dispatch(navigateBack())
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OTPScreen);

const styles = StyleSheet.create({
  container: {
    width: sizeWidth(90),
    height: sizeHeight(40)
  },
  filterRow: {
    marginTop:sizeWidth(4),
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  body: {
    backgroundColor: "white",
    paddingBottom: sizeWidth(3),
    paddingHorizontal: sizeWidth(3),
    borderRadius: sizeWidth(2),
    paddingTop: sizeWidth(15),
    marginTop: sizeWidth(10),
    height: sizeHeight(45)
  },
  avatar: {
    width: sizeWidth(13),
    height: sizeWidth(13),
  },
  name: {
    marginTop: sizeWidth(3),
    marginBottom: sizeWidth(2),
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
    paddingHorizontal: sizeWidth(5),
    height: sizeHeight(5),
    borderRadius:sizeWidth(1)
  },
  button1: {
    paddingHorizontal: sizeWidth(7),
    height: sizeHeight(5),
    borderRadius:sizeWidth(1)
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
  message: {
    color: "red",
    fontStyle: "italic",
    marginBottom: 10
  },
  filterText: {
    fontSize: sizeFont(3),
    color: "black",
    width: sizeWidth(30),
    padding: sizeWidth(1.5)
  },
  filterType: {
    marginTop:sizeWidth(2),
    width: "48%",
    borderColor: "#888888",
    borderRadius: sizeWidth(1),
    borderWidth: 1,
    height: sizeWidth(9),
    fontSize:sizeFont(3)
  },
  typeText: {
    fontSize: sizeFont(3.4),
    color: "black",
    width: sizeWidth(30)
  },
  filterWrap: {
    flexDirection: "row",
    paddingLeft: sizeWidth(2.13),
    paddingTop:sizeWidth(2)
  }
});

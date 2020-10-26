import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  Switch,
  TouchableOpacity,
  Picker
} from "react-native";
import AppHeader from "../components/app-header";
import Toolbar from "../components/common/toolbar";
import Text from "../components/common/text";
import { sizeWidth, sizeFont, sizeHeight } from "../helpers/size.helper";
import { connect } from "react-redux";
import { TOGGLE_MODAL } from "../actions/feedback-modal.action";
import FeedbackModal from "../screens/feedback-modal.screen";
import { strings, switchLanguage } from '../locate/I18n';
import { getLanguage } from "../helpers/storage.helper";
import { RadioButton } from 'react-native-paper';
import { resetPage } from "../actions/nav.action";
import DialogPinCode from '../components/dialog.pincode';
import { Button} from 'native-base';
import RNRestart from 'react-native-restart';

class SettingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationEnable: false,
      language: 'vi',
      dialogVisible: false,
    };
  }
  
  renderFilterRow = (option, index, isSelected) => {
    return <Text style={styles.filterText}>{option}</Text>;
  };

  componentWillMount = () => {
    getLanguage().then(language => {
      if (language) {
        this.setState({language: language})
      }
   });
  }

  switchLanguage = (language) => {
    if(language !== this.state.language) {
      switchLanguage(language, this);
      this.setState({language: language});
      // this.props.resetPage("Document");
      RNRestart.Restart();
    }
  }

  onClosedDialog = () => {
    this.setState({dialogVisible: false});
  }

  render() {
    const { notificationEnable } = this.state;
    return (
      <View style={styles.container}>
        <AppHeader showNotification={true} />
        <Toolbar title={strings('setting.setting')} />
        <View style={styles.body}>
          <View style={styles.row}>
            <Text style={styles.title}>{strings('setting.receive_noti')}</Text>
            <Switch
              value={notificationEnable}
              style={styles.switch}
              onTintColor="#3AAF00"
              thumbTintColor="rgb(93, 177, 74)"
              onValueChange={value =>
                this.setState({ notificationEnable: value })
              }
            />
          </View>
          <View style={styles.row1}>
            <Text style={{fontWeight: "bold"}}>{strings('setting.language')}</Text>
            <RadioButton.Group
              onValueChange={this.switchLanguage}
              value={this.state.language}
            >
              <View style={{flexDirection: 'row', justifyContent: 'space-around', flex: 1}}>
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => this.switchLanguage('vi')}>
                  <RadioButton value="vi" />
                  <Text>Viet Nam</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => this.switchLanguage('en')}>
                  <RadioButton value="en" />
                  <Text>English</Text>
                </TouchableOpacity>
              </View>
            </RadioButton.Group>
          </View>
          <View style={styles.row1}>
            <Button success
              style={styles.button}
              onPress={() => this.setState({dialogVisible: true})} >
              <Text style = {{color: 'white'}}>{strings("enter_pin_code")}</Text>
            </Button>
            <Button success
              style={styles.buttonFeedback}
              onPress={() => this.props.openModal()} >
                <Text style={{color: 'white'}}>{strings('setting.send_feedback')}</Text>
            </Button>
          </View>
        </View>
        <FeedbackModal />
        { this.state.dialogVisible &&
          <DialogPinCode
            visible={this.state.dialogVisible}
            onClosed={this.onClosedDialog}
          />
        }
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openModal: () => dispatch({ type: TOGGLE_MODAL }),
    resetPage: route => dispatch(resetPage(route)),
  }
};

export default connect(
  null,
  mapDispatchToProps
)(SettingScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    flex: 1,
    padding: sizeWidth(8)
  },
  title: {
    fontWeight: "bold"
  },
  row: {
    flexDirection: "row",
    marginBottom: sizeWidth(5),
    alignItems: "center",
    justifyContent: "space-between"
  },
  row1: {
    flexDirection: 'row',
    // marginTop: sizeWidth(3),
    alignItems: 'center'
  },
  buttonSearch: {
    width: sizeWidth(5),
    height: sizeWidth(3),
  },
  filterType: {
    marginLeft: sizeWidth(15),
    width: sizeWidth(47),
    borderColor: "#888888",
    borderRadius: sizeWidth(1),
    borderWidth: 1,
    height: sizeWidth(8),
    justifyContent: "center",
  },
  filterText: {
    fontSize: sizeFont(4),
    color: "black",
    width: sizeWidth(44),
    marginLeft: sizeWidth(2),
  },
  switch: {},
  button: {
    padding: sizeWidth(4),
    marginTop: 10,
  },
  buttonFeedback: {
    padding: sizeWidth(4),
    marginTop: 10,
    marginLeft: 10,
  }
});

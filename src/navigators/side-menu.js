import React, { Component } from "react";
import { AsyncStorage } from 'react-native';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
  Alert
} from "react-native";
import Text from "../components/common/text";
import MenuItem from "../components/profile/menu-item";
import MemberItem from "../components/profile/member-item";
import { sizeWidth, sizeFont } from "../helpers/size.helper";
import { secondary_bg_color } from "../constants/app.constant";
import { navigateToPage, resetPage, toggleDrawer } from "../actions/nav.action";
import { connect } from "react-redux";
import { clearAll, getOldUser, getUser} from "../helpers/storage.helper";
import { SET_CURRENT_USER, CHANGE_ACCOUNT } from "../actions/user-info.action";
import LoadingPopup from "../components/common/loading-popup";
import { strings } from '../locate/I18n';
import Images from '../constants/image';

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      userid_login:'',
    };
  }

  componentWillMount() {
    getUser().then((value) => {
      this.setState({ 'userid_login': value });
    });
  }

  render() {
    const { currentUser, loadingCurrentUser, switchUserID, privilege } = this.props;
    const currentUserImg = currentUser.image;
    const isLogon = currentUser && currentUser.customerID;
    
    return (
      <View style={{flex: 1}}>
        <LoadingPopup loading={loadingCurrentUser} />
        <ScrollView style={styles.wrapper}>
          <View
            source={Images.background}
            style={styles.header}
          >
            {currentUserImg ? (
              <Image style={styles.avatar} source={{uri: currentUserImg}} />
            ) : (
              <Image
                source={Images.ic_user}
                style={styles.avatar}
              />

            )}
            {/* <TouchableOpacity onPress={() => this.changeAccount(this.state.userid_login)}> */}
            <Text style={styles.name}>
              {currentUser.customerName && currentUser.customerName.toUpperCase()}
            </Text>
            {/* </TouchableOpacity> */}
            {this.renderMembers(currentUser)}
          </View>
          <TouchableOpacity style={styles.becomeDoctor}>
            <Text style={styles.becomeDoctorText}>
              {strings('side_menu.become_doctor').toUpperCase()}
            </Text>
          </TouchableOpacity>
          <MenuItem
            onMenuPress={() => !isLogon ? this.navigateToPage("Login") : this.navigateToPage("Profile")}
            menuName={strings('side_menu.account')}
            icon="icon_user"
          />
          <MenuItem
            onMenuPress={() => this.navigateToPage("Article")}
            menuName={strings('side_menu.news')}
            icon="icon8_news"
          />
          <MenuItem
            onMenuPress={() => !isLogon ? this.navigateToPage("Login") : this.navigateToPage("Appointment")}
            menuName={strings('side_menu.appointment')}
            icon="icon8_calendar"
          />
          <MenuItem
            onMenuPress={() => this.navigateToPage("Search")}
            menuName={strings('side_menu.search')}
            icon="icon_tim_kiem"
          />
          <MenuItem
            onMenuPress={() => !isLogon ? this.navigateToPage("Login") : this.navigateToPage("MedicalHistory")}
            menuName={strings('side_menu.medical_record')}
            icon="icon8_medical"
          />
          <MenuItem
            onMenuPress={() => !isLogon ? this.navigateToPage("Login") : this.navigateToPage("PrescriptionHistory")}
            menuName={strings('side_menu.prescription_history')}
            icon="icon_toa_thuoc"
          />
          <MenuItem
            onMenuPress={() => !isLogon ? this.navigateToPage("Login") : this.navigateToPage("TestHistory")}
            menuName={strings('side_menu.test_history')}
            icon="icon8_test"
          />
          <MenuItem
            onMenuPress={() => !isLogon ? this.navigateToPage("Login") : this.navigateToPage("Allergy")}
            menuName={strings('side_menu.allergy')}
            icon="icon_di_ung"
          />
          <MenuItem
            onMenuPress={() => !isLogon ? this.navigateToPage("Login") : this.navigateToPage("FamilyIllnessList")}
            menuName={strings('side_menu.family_illness')}
            icon="icon_benh_gia_dinh"
          />
          <MenuItem
            onMenuPress={() => !isLogon ? this.navigateToPage("Login") : this.navigateToPage("VaccinationHistory")}
            menuName={strings('side_menu.vaccination_history')}
            icon="icon_lS_tiem_chung"
          />
          <MenuItem
            onMenuPress={() => !isLogon ? this.navigateToPage("Login") : this.navigateToPage("Insurance")}
            menuName={strings('side_menu.insurance')}
            icon="icon_bao_hiem"
          />
          <MenuItem
            onMenuPress={() => !isLogon ? this.navigateToPage("Login") : this.navigateToPage("PaymentHistory")}
            menuName={strings('side_menu.payment_history')}
            icon="icon8_payment"
          />
          <MenuItem
            onMenuPress={() => !isLogon ? this.navigateToPage("Login") : this.navigateToPage("Saved")}
            menuName={strings('side_menu.saved')}
            icon="icon8_save"
          />
           <MenuItem
            onMenuPress={() => this.navigateToPage("Setting")}
            menuName={strings('side_menu.setting')}
            icon="icon_setting"
          />
          {isLogon &&
            <MenuItem
              onMenuPress={() => this.onPressLogout()}
              menuName={strings('side_menu.log_out')}
              icon="icon8_logout"
            />
          }
        </ScrollView>
      </View>
    );
  }

  navigateToPage = (page) => {
    // this.props.navigation.goBack();
    this.props.navigateToPage(page);
  }

  onPressLogout = () => {
    clearAll(); // clear local storage
    this.props.clearCurrentUser(); // clear current user in reducer
    this.props.toggleDrawer();
    this.props.resetPage("Article");
  };

  renderMembers = ({ customerFamilyDTO }) => {
    const { currentUser } = this.props;
    const { switchUserID } = this.props;
    if(currentUser && currentUser.customerID) {
      return (
        <View style={styles.memberRow}>
          {customerFamilyDTO ? (
            customerFamilyDTO.map((item, index) => (
              <TouchableOpacity key={index}
                onPress={() => this.openConfirmChangeAccountBox(item.customerFamilyID, item.privilege)}>
                <MemberItem member={item} currentId={switchUserID}/>
              </TouchableOpacity>
            ))
          ) : (
            <Text>{strings('side_menu.no_member')}</Text>
          )}
        </View>
    );
    }else {
      return (
        <View style={styles.memberRow}>
          <TouchableOpacity onPress={() => this.navigateToPage("Login")}>
            <Text style={styles.login}>{strings('side_menu.login')}</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  openConfirmChangeAccountBox (customerID, privilege) {
    Alert.alert(
      strings('side_menu.confirm'),
      strings('side_menu.msg'),
      [
          {
            text: strings('cancel'),
            style: "cancel"
          },
          {
            text: strings('side_menu.change'),
            onPress: () => this.changeAccount(customerID, privilege)
          }
      ],
      { cancelable: true }
    );
  }

  changeAccount (customerID, privilege) {
    this.props.changeAccount(customerID, privilege);
  }
}

const mapStateToProps = state => {
  return state.userInfo;
};

const mapDispatchToProps = dispatch => {
  return {
    navigateToPage: (pageName, data) => dispatch(navigateToPage(pageName, data)),
    resetPage: route => dispatch(resetPage(route)),
    toggleDrawer: () => dispatch(toggleDrawer()),
    clearCurrentUser: () => dispatch({ type: SET_CURRENT_USER, currentUser: {} }),
    changeAccount: (customerID, privilege) => dispatch({ type: CHANGE_ACCOUNT, customerID, privilege })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideMenu);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  avatar: {
    width: sizeWidth(24),
    height: sizeWidth(24),
    borderRadius: sizeWidth(12),
    marginBottom: 10,
    borderWidth: sizeWidth(1),
    borderColor: "white"
  },
  header: {
    width: "100%",
    paddingTop: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:secondary_bg_color
  },
  memberRow: {
    flexDirection: "row",
    marginVertical: sizeWidth(2),
    flexWrap: "wrap",
    marginLeft: 10
  },
  addWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: sizeWidth(2)
  },
  addIcon: {
    width: sizeWidth(8),
    height: sizeWidth(8),
    borderRadius: sizeWidth(4),
    marginRight: sizeWidth(2),
    backgroundColor: secondary_bg_color
  },
  addText: {
    color: "black",
    fontSize: sizeFont(2.5)
  },
  name: {
    fontWeight: "bold",
    color:"white"
  },
  becomeDoctor: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: secondary_bg_color
  },
  becomeDoctorText: {
    color: "red",
    fontWeight: "bold"
  },
  login: {
    fontSize: sizeFont(5),
  }
});

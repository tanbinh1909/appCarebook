import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert
} from "react-native";
import Text from "../components/common/text";
import { Icon } from "react-native-elements";
import { sizeWidth, sizeFont, sizeHeight } from "../helpers/size.helper";
import QRCode from "react-native-qrcode";
import MemberItem from "../components/profile/member-item";
import { connect } from "react-redux";
import { navigateBack } from "../actions/nav.action";
import Modal from "react-native-modal";
import AddMemberModal from "../components/profile/add-member-modal";
import { secondary_bg_color } from "../constants/app.constant";
import { TOGGLE_ADD_RELATIONSHIP_MODAL,TOGGLE_OTP_MODAL, LOAD_CURRENT_USER, CHANGE_ACCOUNT ,REMOVE_ACCOUNT } from "../actions/user-info.action";
import ImagePicker from "react-native-image-picker";
import Api from "../api/api";
import OTPScreen from "../screens/otp-modal.screen";
import { strings } from '../locate/I18n';
import Images from '../constants/image';
import Toast from "@remobile/react-native-toast";
import DialogPinCode from '../components/dialog.pincode';
// const options = {
//   title: strings("image_selector.title"),
//   takePhotoButtonTitle: strings("image_selector.takePhotoButtonTitle"),
//   chooseFromLibraryButtonTitle: strings("image_selector.chooseFromLibraryButtonTitle")
// };

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: this.props.currentUser.image,
      dialogVisible: false,
    };
  }
  // UNSAFE_componentWillMount = () => {
  //   alert('state' + JSON.stringify(this.state.avatarSource))
  // }
  render() {
    const { currentUser } = this.props;
    const { dialogVisible } = this.state;
    return (
      <ScrollView style={styles.container}>
        <View
          style={styles.header}
        >
          <TouchableOpacity
            onPress={this.props.navigateBack}
            style={styles.backWrap}
          >
            <Icon
              name="chevron-left"
              type="material-community"
              size={sizeFont(10)}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.selectPhoto}>
          {this.state.avatarSource ? (
            <Image style={styles.avatar} source={{uri: this.state.avatarSource}} />
          ) : (
            <Image
              style={styles.avatar}
              source={Images.ic_user}
              />
            )}
          </TouchableOpacity>
          <Text style={styles.name}>
            {currentUser.customerName && currentUser.customerName.toUpperCase()}
          </Text>
          {this.renderRelationships(currentUser.customerFamilyDTO)}
        </View>
        {this.renderInformation(currentUser)}
        <View style={styles.line} />
        {this.renderQrCode(currentUser)}
        {this.renderAddMemberModal({ ...this.props })}
        {/* {this.renderGenerateOTP({ ...this.props })} */}
        { this.state.dialogVisible &&
          <DialogPinCode
            visible={this.state.dialogVisible}
            onClosed={this.onClosedDialog}
          />
        }
      </ScrollView>
    );
  }

  onClosedDialog = () => {
    this.setState({dialogVisible: false});
  }

  selectPhoto = () =>{
    var options = {
      title: strings("image_selector.title"),
      takePhotoButtonTitle: strings("image_selector.takePhotoButtonTitle"),
      chooseFromLibraryButtonTitle: strings("image_selector.chooseFromLibraryButtonTitle"),
      cancelButtonTitle: strings("image_selector.cancelButtonTitle"),

    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // const image = { uri: response.uri, fileName: response.fileName };
        // imgList = [];
        // imgList.push(image);
        // const { currentUser } = this.props;
        // const currenUserID = currentUser.customerID;
        // Api.uploadImages(currenUserID, imgList).then((data)=>{
        //   const imgID = data[0];
        //   const img = {id: currenUserID, image: imgID};
        //   Api.uploadAvatar(img).then((res)=>{
        //     this.setState({
        //       avatarSource: res.image
        //     });
        //   });
        // });

        const { currentUser } = this.props;
        const image = response;
        const userID = currentUser.customerID;
        Api.uploadAvatar(userID, image).then((res)=>{
          this.setState({
            avatarSource: res.image
          });
          this.props.loadCurrentUser(userID);
        });
        
        // Api.uploadImage(userID, image).then((data)=>{
        //   const imageUrl = data[0];
        //   this.setState({avatarSource: imageUrl});
        //   const body = {
        //     customerID: this.props.currentUser.customerID,
        //     image: imageUrl
        //   };
        //   Api.uploadAvatar(body).then((res)=>{
        //     this.setState({
        //       avatarSource: res.image
        //     });
        //   });
        // });

      }
    });
  }

  renderAddMemberModal = ({ openingAddMemberModal }) => {
    return (
      <Modal
        onBackdropPress={() => this.props.toggleAddRelationshipModal()}
        backdropOpacity={0.5}
        isVisible={openingAddMemberModal}
        avoidKeyboard={true}
      >
        <AddMemberModal />
      </Modal>
    );
  };

  renderGenerateOTP = ({ openingOTPModal }) => {
    return (
      <Modal
        onBackdropPress={() => this.props.openOTPModal()}
        backdropOpacity={0.5}
        isVisible={openingOTPModal}
        avoidKeyboard={true}
      >
        <OTPScreen />
      </Modal>
    );
  };

  renderRelationships = customerFamilyDTO => {
    return (
      <View style={styles.relationships}>
        {this.renderMembers(customerFamilyDTO)}
      </View>
    );
  };

  renderQrCode = currentUser => {
    return (
      <View style={styles.qrcodeWrap}>
        <Text style={styles.bigLabel}>{strings('profile.qr_code')}</Text>
        <QRCode value={currentUser.qrCode} size={sizeWidth(50)} />
      </View>
    );
  };

  renderMembers = customerFamilyDTO => {
    const { switchUserID } = this.props;
    return (
      <View style={{alignItems: 'center'}}>
        {(!customerFamilyDTO || customerFamilyDTO.length === 0) ? (
          <View>
              <Text style={styles.noRecord}>{strings('profile.no_record')}</Text>
              <TouchableOpacity
                onPress={() => this.props.toggleAddRelationshipModal()}
                style={styles.addWrap}
              >
                <Image
                  source={Images.ic_user_male}
                  style={styles.addIcon}
                />
                <Text style={styles.addText}>{strings('profile.add_member')}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.memberRow}>
            {customerFamilyDTO.map((item, index) => (
              <View style={{flexDirection:'row', marginLeft:5}} key={index}>
                <TouchableOpacity  onPress={() => this.openConfirmChangeAccountBox(item.customerFamilyID, item.privilege)}>
                  <Image
                      source={Images.ic_person}
                      style={styles.addIcon}
                    />
                </TouchableOpacity>
                <MemberItem
                  removeAccount={() => this.openConfirmDeteleAccountBox(item.customerFamilyID, item.relationID)}
                  goback={()=> this.gobackAcount( item.customerFamilyID, item.privilege )} 
                  member={item} 
                  currentId={switchUserID}/>
              </View>
            ))}
            <TouchableOpacity
              onPress={() => this.props.toggleAddRelationshipModal()}
              style={styles.addWrap}
            >
              <Image
                source={Images.ic_user_male}
                style={styles.addIcon}
              />
              <Text style={styles.addText}>{strings('profile.add_member')}</Text>
          </TouchableOpacity>
          </View>
        )}
         
      </View>
    );
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
  openConfirmDeteleAccountBox (customerID, relationID){
    Alert.alert(
      strings('side_menu.confirm'),
      strings('side_menu.msg1'),
      [
          {
            text: strings('cancel'),
            style: "cancel"
          },
          {
            text: strings('side_menu.delete'),
            onPress: () => this.deleteAccount(customerID, relationID)
          }
      ],
      { cancelable: true }
    )
  }
  loadDataAccount(){
    const { currentUser } = this.props;
    const userID = currentUser.customerID;
    this.props.loadCurrentUser(userID);
    this.setState({
      dialogVisible: true,
    })
  }
  changeAccount (customerID, privilege) {
    this.props.changeAccount(customerID, privilege);
    this.loadDataAccount();
  };
  gobackAcount(customerID, privilege){
    this.props.removeAccount(customerID, privilege);
    this.loadDataAccount();
  }
  deleteAccount(customerID, relationID){
    try {
        Api.removeAccount(customerID, relationID).then((res) =>{
          this.loadDataAccount();
          Toast.show(strings('side_menu.remove_success'));
        }).catch((err) =>{
          Toast.show(strings('side_menu.remove_error'));
        });
    } catch (error) {
    }
  }

  renderInformation = currentUser => {
    return (
      <View style={styles.information}>
       {/* <View style={styles.memberRow}>
          <Button success style={styles.button} onPress={() => this.props.openOTPModal()}>
            <Image
              source={Images.ic_warning_shield}
              style={styles.addIcon1}
            />
            <Text style={{color: "white",fontWeight: "bold"}}>{strings('profile.gen_otp')}</Text>
          </Button>
        </View> */}
        <View style={styles.row}>
          <Text style={styles.label}>{strings('profile.birthday')}</Text>
          <Text style={styles.value}>{currentUser.birthday || "-"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>{strings('profile.sex')}</Text>
          <Text style={styles.value}>
            {currentUser.gender === "MALE" ? strings('profile.male') : strings('profile.female')}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>{strings('profile.id_card')}</Text>
          <Text style={styles.value}>{currentUser.identityNo || "-"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>{strings('profile.phone')}</Text>
          <Text style={styles.value}>{currentUser.customerPhone || "-"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>{strings('profile.phone2')}</Text>
          <Text style={styles.value}>{currentUser.customerPhone2 || "-"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>{strings('profile.email')}</Text>
          <Text style={styles.value}>{currentUser.customerEmail || "-"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>{strings('profile.address')}</Text>
          <Text style={styles.value}>{currentUser.customerAddress || "-"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>{strings('profile.insu_num')}</Text>
          <Text style={styles.value}>{currentUser.insurance || "-"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>{strings('profile.hosp_reg')}</Text>
          <Text style={styles.value}>{currentUser.hospitalName || "-"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>{strings('profile.blood_group')}</Text>
          <Text style={styles.value}>{currentUser.bloodGroup || "-"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>{strings('profile.note')}</Text>
          <Text style={styles.value}>{currentUser.note || "-"}</Text>
        </View>
      </View>
    );
  };
}

const mapStateToProps = state => {
  return state.userInfo;
};

const mapDispatchToProps = dispatch => {
  return {
    navigateBack: () => dispatch(navigateBack()),
    toggleAddRelationshipModal: () =>
      dispatch({ type: TOGGLE_ADD_RELATIONSHIP_MODAL }),
    openOTPModal: () => dispatch({ type: TOGGLE_OTP_MODAL }),
    loadCurrentUser: userID => {
      dispatch({ type: LOAD_CURRENT_USER, userID });
    },
    changeAccount: (customerID, privilege) => dispatch({ type: CHANGE_ACCOUNT, customerID, privilege }),
    removeAccount: (customerID, privilege) => dispatch({type: REMOVE_ACCOUNT, customerID, privilege})
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  memberRow: {
    flexDirection: "row",
    marginVertical: sizeWidth(2),
    justifyContent: "flex-start",
    alignContent: "center",
    flexWrap: "wrap",
    padding: sizeWidth(2),
    marginLeft: 40
  },
  backWrap: {
    position: "absolute",
    left: sizeWidth(3),
    top: sizeWidth(3)
  },
  name: {
    marginTop: sizeWidth(2),
    color: "#000",
    fontWeight: "bold",
    color:"white"
  },
  iconBack: {
    fontSize: sizeFont(3.46)
  },
  header: {
    width: "100%",
    height: sizeHeight(45),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:secondary_bg_color,
  },
  avatar: {
    width: sizeWidth(30),
    height: sizeWidth(30),
    borderRadius: sizeWidth(15),
    borderWidth: sizeWidth(1),
    borderColor: "white",
  },
  information: {
    padding: sizeWidth(4)
  },
  row: {
    flexDirection: "row",
    marginVertical: sizeWidth(1)
  },
  label: {
    flex: 1
  },
  value: {
    flex: 2
  },
  button: {
    paddingHorizontal: sizeWidth(3),
    borderRadius:sizeWidth(1),
  },
  line: {
    width: "90%",
    height: 2,
    alignSelf: "center",
    backgroundColor: "#CCCCCC",
    marginBottom: sizeWidth(3)
  },
  relationships: {
    alignItems: "center"
  },
  bigLabel: {
    color: "black",
    fontSize: sizeFont(4),
    fontWeight: "bold",
    marginBottom: sizeWidth(3)
  },
  qrcodeWrap: {
    alignItems: "center",
    marginBottom: 10
  },
  addWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: sizeWidth(2),
    marginBottom: 10
  },
  addIcon: {
    width: sizeWidth(8),
    height: sizeHeight(4),
    borderRadius: sizeWidth(6),
    marginRight: sizeWidth(1),
    borderWidth: 1,
    borderColor: "white"
  },
  addIcon1: {
    marginRight:sizeWidth(2),
    width: sizeWidth(6),
    height: sizeHeight(3),
  },
  addText: {
    color: "white",
    fontSize: sizeFont(2.5)
  },
  noRecord: {
    marginLeft: sizeWidth(3),
    marginTop: sizeWidth(1),
    marginBottom: sizeWidth(1)
  }
});

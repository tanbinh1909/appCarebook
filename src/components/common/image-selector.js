import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  PermissionsAndroid,
  Platform,
  Dimensions
} from "react-native";
import PropTypes from "prop-types";
import Text from "./text";
import { sizeFont, sizeWidth } from "../../helpers/size.helper";
import ImagePicker from "react-native-image-picker";
import { Icon } from "react-native-elements";
import Images from '../../constants/image';
import { strings } from '../../locate/I18n';

export default class ImageSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
  }

  getSelectedImages = () => {
    return this.state.images;
  };

  render() {
    const { style } = this.props;
    const { images } = this.state;
    const hasImages = images.length > 0;
    return (
      <View>
        <View style={styles.containerButton}>
          <TouchableOpacity
            onPress={this.selectPhoto}
          >
            <Icon
              size={sizeWidth(7)}
              name="images"
              type="entypo"
              color="green"
              iconStyle={{
                marginRight: sizeWidth(2),
                marginLeft: sizeWidth(2)
              }}
            />
          </TouchableOpacity>

          {/* <TouchableOpacity
            onPress={() =>
              this.requestStoragePermission(this.pickPictureFromGallery)
            }
          >
            <Icon
              size={sizeWidth(7)}
              name="images"
              type="entypo"
              color="green"
              iconStyle={{
                marginRight: sizeWidth(0),
                marginLeft: sizeWidth(3)
              }}
            />
          </TouchableOpacity> */}
        </View>
        {!hasImages && (
          <Image
            resizeMode="stretch"
            style={styles.image}
            source={Images.no_image}
          />
        )}
        <View>
          {images.map((item, index) => this.renderImageItem(item, index))}
        </View>
      </View>
    );
  }

  selectPhoto = () => {
    var options = {
      title: strings("image_selector.title"),
      takePhotoButtonTitle: strings("image_selector.takePhotoButtonTitle"),
      chooseFromLibraryButtonTitle: strings("image_selector.chooseFromLibraryButtonTitle"),
      cancelButtonTitle: strings("image_selector.cancelButtonTitle")
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setState({
          images: [...this.state.images, {
            fileName: response.fileName,
            uri: response.uri,
            data: response.data,
          }]
        });
      }
    });
  }

  renderImageItem = (item, index) => {
    return (
      <ImageBackground
        key={index}
        style={styles.image}
        source={{ uri: 'data:image/jpeg;base64,' + item.data }}
      >
        <TouchableOpacity
          onPress={() =>
            this.setState({
              images: this.state.images.filter((item, i) => index !== i)
            })
          }
          style={styles.delete}
        >
          <Icon size={sizeWidth(4)} name="cross" type="entypo" color="white" />
        </TouchableOpacity>
      </ImageBackground>
    );
  };

  requestCameraPermission = async callback => {
    if (Platform.OS === "ios") return callback();
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Carebook App Camera Permission",
          message:
            "Carebook App needs access to your camera " +
            "so you can take awesome pictures."
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        callback();
      } else {
      }
    } catch (err) {
      alert(err.message);
    }
  };

  requestStoragePermission = async callback => {
    if (Platform.OS === "ios") return callback();
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: "Carebook App Storage Permission",
          message:
            "Carebook App needs access to your storage " +
            "so you can pick awesome pictures."
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        callback();
      } else {
      }
    } catch (err) {
      alert(err.message);
    }
  };

  capturePicture = () => {
    ImagePicker.launchCamera({}, response => {
      if (response.didCancel) {
        console.log("User cancelled photo picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const { uri, fileName } = response;
        const image = { uri, fileName };
        this.setState({
          images: [...this.state.images, image]
        });
      }
    });
  };

  pickPictureFromGallery = async () => {
    ImagePicker.launchImageLibrary({}, response => {
      if (response.didCancel) {
        console.log("User cancelled photo picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const { uri, fileName } = response;
        const image = { uri, fileName };
        this.setState({
          images: [...this.state.images, image]
        });
      }
    });
  };
}

const styles = StyleSheet.create({
  container: {},
  image: {
    marginTop: sizeWidth(4),
    alignSelf: "center",
    width: Dimensions.get('window').width - sizeWidth(10),
    height: sizeWidth(60),
    marginHorizontal: sizeWidth(1.13),
    borderWidth: 1,
    borderColor: "#888888"
  },
  delete: {
    position: "absolute",
    right: sizeWidth(2),
    top: sizeWidth(2),
    width: sizeWidth(5),
    justifyContent: "center",
    alignItems: "center",
    height: sizeWidth(5),
    borderRadius: sizeWidth(2.5),
    backgroundColor: "rgb(226, 79, 111)"
  },
  containerButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: sizeWidth(1)
  }
});

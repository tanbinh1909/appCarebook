
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView
} from "react-native";
import AppHeader from "../components/app-header";
import Toolbar from "../components/common/toolbar";
import { sizeWidth, sizeHeight } from "../helpers/size.helper";
import { connect } from "react-redux";
import ZoomImage from 'react-native-zoom-image';
import {Easing} from 'react-native';

class MedicalDetailImagesScreen extends Component {

  constructor(props) {
    super(props);
  }

  _renderItem = (url, index) => {
    return(<View key={index} style={{padding: sizeWidth(1)}}><ZoomImage
      source={{uri: url}}
      imgStyle={styles.image}
      style={styles.image}
      duration={200}
      enableScaling={true}
      easingFunc={Easing.ease}
    /></View>);
  }
  render() {
    const { images } = this.props;
    return (

          <View style={styles.body}>
            { images != null && images.length > 0 &&  images.map((item, index) => {
                return this._renderItem(item, index)
            })}
          </View>
    );
  }
}

export default connect(
  null,
  null
)(MedicalDetailImagesScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    flex: 1,
    padding: sizeWidth(1)
  },
  image: {
    flex: 1,
    height: sizeHeight(15),
    width:sizeWidth(30),
    marginRight: sizeWidth(1),
    borderColor: '#CCC',
    borderWidth: 0.1
  }
});

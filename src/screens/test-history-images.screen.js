import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView
} from "react-native";
import AppHeader from "../components/app-header";
import Toolbar from "../components/common/toolbar";
import { sizeWidth } from "../helpers/size.helper";
import { connect } from "react-redux";
import ZoomImage from 'react-native-zoom-image';
import {Easing} from 'react-native';
class TestHistoryImagesScreen extends Component {

  constructor(props) {
    super(props);
  }

  _renderItem = (url, index) => {
    return(<View key={index} style={{padding: sizeWidth(1)}}><ZoomImage
      source={{uri: 'data:image/jpeg;base64,' + url}}
      imgStyle={styles.image}
      style={styles.image}
      duration={200}
      enableScaling={true}
      easingFunc={Easing.ease}
    /></View>);
  }
  render() {
    const { testDetails } = this.props;
    return (
          <View style={styles.body}>
            { testDetails.multipeimage != null && testDetails.multipeimage.length > 0 &&  testDetails.multipeimage.map((item, index) => {
                return this._renderItem(item, index)
            })}
          </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
};

export default connect(
  null,
  mapDispatchToProps
)(TestHistoryImagesScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    flex: 1,
    padding: sizeWidth(2)
  },
  image: {
    flex: 1,
    height: sizeWidth(80),
    marginRight: sizeWidth(1),
    borderColor: '#CCC',
    borderWidth: 0.2
  }
});

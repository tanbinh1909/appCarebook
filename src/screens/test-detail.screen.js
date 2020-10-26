import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions
} from "react-native";
import ZoomImage from 'react-native-zoom-image';
import {Easing} from 'react-native';
import AppHeader from "../components/app-header";
import Toolbar from "../components/common/toolbar";
import Text from "../components/common/text";
import { sizeWidth, sizeFont,sizeHeight } from "../helpers/size.helper";
import { connect } from "react-redux";
import Panel from "../components/common/panel";
import {Button} from "native-base";
import { navigateBack, navigateToPage } from "../actions/nav.action";
import TestHistoryImagesScreen from "./test-history-images.screen";
import { strings } from '../locate/I18n';
import Api from "../api/api";

class TestHistoryDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showImages: false,
      imageDetails: []
    }
  }

  renderHeader = () => {
    return (
      <View style={styles.itemRow}>
        <Text style={[styles.header, styles.require]}>{strings('test_detail.exa_request')}</Text>
        <Text style={[styles.header, styles.resultTest]}>{strings('test_detail.result_exa')}</Text>
        <Text style={[styles.header, styles.argument]}>{strings('test_detail.ref_num')}</Text>
        <Text style={[styles.header, styles.unit]}>{strings('test_detail.unit')}</Text>
      </View>
    );
  };

  renderTestDetailItem = (item, index) => {
    return (
      <View style={styles.itemRow} key={index}>
        <Text style={styles.require}>{item.name}</Text>
        <Text style={styles.resultTest}>{item.value}</Text>
        <Text style={styles.argument}>{item.standardValue}</Text>
        <Text style={styles.unit}>{item.dataType}</Text>
      </View>
    );
  };

  _renderItem = (testDetails) => {
    return (
      <Panel title= {testDetails.tenXetNghiem}>
        <View>
          {this.renderHeader()}
          {testDetails.listKetQuaXetNghiem &&
            testDetails.listKetQuaXetNghiem.map((item, index) => {
              return this.renderTestDetailItem(item, index);
            })}
        </View>
        <View style={styles.resultRow}>
          <View style={styles.adviseWrap}>
            <Text style={styles.resultTitle}>{strings('test_detail.conclusion_disease')}</Text>
            <Text style={styles.result}>{testDetails.ketLuan}</Text>
          </View>
          {
            testDetails.multipeimage && testDetails.multipeimage.length > 0 &&
            <Button small success
              onPress={() => this.getImage()}
              style = {styles.button}
            >
              <Text style = {styles.label}>{strings('test_detail.image')}</Text>
            </Button>
          }
        </View>
        <Text style={styles.date}>{strings('test_detail.test_date')} {testDetails.ngayChiDinh}</Text>
      </Panel>
    );
  }

  getImage = () => {
    const { testDetails } = this.props.navigation.state.params;
    const imageDetails = [...this.state.imageDetails];
    const userID = testDetails.userID;
    const bendAnId = testDetails.benhAnId;
    const listImg = testDetails.multipeimage;
    for(const img of listImg){
      Api.getImages(userID, bendAnId, img).then(response => {
        const image = {uri: 'data:image/jpeg;base64,' + response};
        imageDetails.push(image);
        this.setState({imageDetails})
      })
    }
  }

  renderImages = () => {
    const {imageDetails} = this.state;
    if(imageDetails == null || imageDetails.length == 0) return null;
    return (
      <View style={{marginTop: sizeHeight(2)}}>
        <Text style={{fontWeight: 'bold', marginBottom: sizeHeight(1)}}>{strings('medical_detail.image')}</Text>
        <View style={{flex: 1, flexDirection: 'row'}}>
        {
          imageDetails.map(
            (image, index) => {
              if(!image) return null;
              if(image < 50) {
                return (
                  <Text key={index}>{image.uri}</Text>
                )
              }
              else {
                return (
                  <ZoomImage
                    key={index}
                    source={ image }
                    imgStyle={styles.image}
                    style={styles.image}
                    duration={200}
                    enableScaling={true}
                    easingFunc={Easing.ease}
                  />
                )
              }
            }
          )
        }
        </View>
      </View>
    );
  };

  render() {
    const { testDetails } = this.props.navigation.state.params;
    return (
      <ScrollView style={styles.container}>
        <AppHeader />
        <Toolbar title={strings('test_detail.exa_detail')} />
          <View style={styles.body}>
            {this._renderItem(testDetails)}
            {
              this.renderImages()
            }      
          </View>
      </ScrollView>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    navigateToPage: (route, data) => dispatch(navigateToPage(route, data)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(TestHistoryDetailScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    flex: 1,
    padding: sizeWidth(2)
  },
  image: {
    height: sizeWidth(15),
    marginRight: sizeWidth(1),
    borderColor: '#CCC',
    borderWidth: 0.2,
    width:sizeWidth(15)
  },
  date: {
    fontSize: sizeFont(2.6),
    alignSelf: "flex-end"
  },
  textTop: {
    flex: 1,
    fontSize: sizeFont(2.6)
  },
  resultRow: {
    flexDirection: "row",
    marginBottom: sizeWidth(1)
  },
  result: {
    fontSize: sizeFont(2.6),
    color: "red"
  },
  adviseWrap: {
    flex: 1,
  },
  resultTitle: {
    fontSize: sizeFont(2.6),
    fontWeight: "bold"
  },
  unit: {
    flex: 0.5,
    fontSize: sizeFont(2.6)
  },
  require: {
    flex: 1,
    fontSize: sizeFont(2.6)
  },
  resultTest: {
    flex: 1,
    fontSize: sizeFont(2.6)
  },
  argument: {
    flex: 1,
    fontSize: sizeFont(2.6)
  },
  itemRow: {
    flexDirection: "row",
    marginVertical: sizeWidth(1),
    // padding: sizeWidth(1)
    height: sizeWidth(10)
  },
  header: {
    fontWeight: "bold"
  },
  highlight: {
    fontSize: sizeFont(2.6),
    fontWeight: "bold"
  },
  detail: {
    fontStyle: 'italic',
    fontSize: sizeFont(2.6),
    textDecorationLine: 'underline',
    color: "blue"
  },
  label: {
    color: "white",
    fontSize: sizeFont(2.6)
  },
  button: {
    height: sizeHeight(3),
    width: sizeWidth(14),
    justifyContent: "center",
    alignContent: "center"
  }
});

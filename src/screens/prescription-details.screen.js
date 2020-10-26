import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import AppHeader from "../components/app-header";
import Toolbar from "../components/common/toolbar";
import Text from "../components/common/text";
import { sizeWidth, sizeFont, sizeHeight } from "../helpers/size.helper";
import { connect } from "react-redux";
import PrescriptionList from "../components/prescription/prescription-list"
import { navigateToPage } from "../actions/nav.action";
import Panel from "../components/common/panel";
import PrescriptionHistoryImagesScreen from "./prescription-history-images.screen";
import {Button} from "native-base";
import { strings } from '../locate/I18n';

class PrescriptionDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showImages: false
    }
  }

  render() {
    const { prescriptionDetails } = this.props.navigation.state.params;
    return (
      <ScrollView style={styles.container}>
        <AppHeader />
        <Toolbar title={strings('prescription_detail.pres_detail')} />
          <View style={styles.body}>
            {this._renderItem(prescriptionDetails)}
            {
              this.state.showImages && this._renderImages(prescriptionDetails.image)
            }
          </View>
      </ScrollView>
    );
  }

  _renderImages = (imageItems) =>{
    return(
      <PrescriptionHistoryImagesScreen images = {imageItems}/>
    )
  }

  _renderItem = (prescriptionDetails) => {
    return (
      <Panel title= {prescriptionDetails.tenToaThuoc}>
        <View style={styles.testDetails}>
          <View>
            <Text style={styles.textTop}>
              {strings('prescription_detail.exa_doctor')}{" "}
              <Text style={styles.highlight}>
                  {prescriptionDetails.doctorName}
              </Text>
            </Text>
            <PrescriptionList prescriptionItem={prescriptionDetails.thuocs} />
            <View style={styles.resultRow}>
              <View style={styles.adviseWrap}>
                <Text style={styles.resultTitle}>{strings('prescription_detail.advice')}</Text>
                <Text style={styles.result}>{prescriptionDetails.loiDan}</Text>
              </View>
              {
                prescriptionDetails.image && prescriptionDetails.image.length > 0 &&
                <Button small success
                  onPress={() => this.setState({showImages: !this.state.showImages})}
                  style = {styles.button}
                >
                  <Text style = {styles.label}>{strings('prescription_detail.image')}</Text>
                </Button>
              }
            </View>
          </View>
          <Text style={styles.date}>{prescriptionDetails.ngayChiThi}</Text>
        </View>
      </Panel>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    navigateToPage: (route, data) => dispatch(navigateToPage(route, data))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(PrescriptionDetailScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    flex: 1,
    padding: sizeWidth(2)
  },
  testDetails: {
    marginBottom: sizeWidth(1)
  },
  textTop: {
    flex: 1,
    fontSize: sizeFont(2.6),
    fontWeight: 'bold'
  },
  highlight: {
    fontSize: sizeFont(2.6),
    fontWeight: "bold"
  },
  resultRow: {
    flexDirection: "row",
    marginBottom: sizeWidth(1)
  },
  image: {
    flex: 1,
    height: sizeWidth(30),
    marginRight: sizeWidth(1)
  },
  adviseWrap: {
    flex: 1,
  },
  resultTitle: {
    fontSize: sizeFont(2.6),
    fontWeight: "bold"
  },
  result: {
    fontSize: sizeFont(2.6),
    color: "red"
  },
  date: {
    fontSize: sizeFont(2.6),
    alignSelf: "flex-end"
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

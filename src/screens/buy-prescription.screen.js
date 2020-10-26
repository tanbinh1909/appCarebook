import React, { Component } from "react";
import { Text, View, StyleSheet, Image, FlatList, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { sizeWidth, sizeHeight, sizeFont } from "../helpers/size.helper";
import { Icon } from "react-native-elements";
import { Button} from 'native-base';
import { LOAD_RECENTDRUGSTORE, BUY_PRESCRIPTION, TOOGLE_BUY_PRESCRIPTION_MODAL, FIND_LIST_DRUGSRORE } from "../actions/prescription-history.action";
import Autocomplete from 'react-native-autocomplete-input';
import { strings } from '../locate/I18n';

class BuyPrescriptionModal extends Component {
  constructor(props) {
    super(props);
    this.state={
      shopName: '',
      shopId: '',
      prescriptionId: '',
      shopMail: '',
      benhAnId: '',
      dienBienBenhId: '',
      toaThuocId: '',
      listSearch: [],
      query: '',
      listDrugstore: [],
      listDrugSearch: []
    }
  }
  componentWillMount = async () => {
    const { toathuoc } = this.props;
    this.props.loadRecentDrugstore();
    this.setState({
      prescriptionId: toathuoc.maToaThuoc,
      benhAnId: toathuoc.benhAnId,
      dienBienBenhId: toathuoc.dienBienBenhId,
      toaThuocId: toathuoc.id
    });

    this.props.findDrugStore('');
  };

  componentWillReceiveProps(nextProps) {
    this.setState({listDrugstore: nextProps.listDrugstore});
    this.setState({listDrugSearch: nextProps.listDrugSearch});
  }

  findDrugStore= (keyword) => {
    this.setState({query: keyword});
    listDrugSearch = [];
    this.state.listDrugstore.forEach(function(item, index) {
      console.log(item, index);
      if(item.shopname.includes(keyword)) {
        listDrugSearch.push(item);
      }
    });

    this.setState({listDrugSearch});
  };

  renderItem = ({ item, key }) => {
    return (
      <View style={{flex:1, flexDirection: 'row', marginVertical: 5, alignItems: 'center'}} key={key}>
        <View style={{flex:1}}>
          <Text>+{item.shopName}</Text>
        </View>
        <View style={{}}>
          <Button success
            onPress={() => {this.setState({
              shopName: item.shopName,
              shopId: item.shopId,
              shopMail: item.shopMail,
              query: item.shopName
            });}}
            style={styles.button}
          ><Text style={{color: "white"}}>{strings('buy_prescription.choose')}</Text></Button>
        </View>
      </View>

    );
  };

  buyPrescription = () => {
      const shopName= this.state.shopName;
      const shopId= this.state.shopId;
      const prescriptionId= this.state.prescriptionId;
      const shopMail= this.state.shopMail;
      const benhAnId= this.state.benhAnId;
      const dienBienBenhId= this.state.dienBienBenhId;
      const toaThuocId= this.state.toaThuocId;
    this.props.buyPrescription(shopName, shopId, prescriptionId, shopMail, benhAnId, dienBienBenhId, toaThuocId);
  }

  selectDrugstore(item) {
      this.setState({
        shopName: item.shopname,
        shopId: item.shopid,
        shopMail: item.email,
        query: item.shopname
      });
  }

  render() {
    const { recentDrugstore, listDrugstore } = this.props;
    const query =  this.state.query;
    // this.props.findDrugStore(query);
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <View style={styles.header}>
            <Text style={styles.title}>{strings('buy_prescription.buy_medicine')}</Text>
          </View>
          <Autocomplete
            autoCapitalize="none"
            data={this.state.listDrugSearch}
            containerStyle={styles.autocompleteContainer}
            defaultValue={query}
            onChangeText={text => this.findDrugStore(text)}
            placeholder={strings('buy_prescription.auto_pla')}
            renderItem={item => (
              <TouchableOpacity onPress={() => this.selectDrugstore(item)} style={{backgroundColor: '#DDDDDD', height: sizeHeight(3.5)}}>
                <Text>{item.shopname}</Text>
              </TouchableOpacity>
            )}
          />
          <View style={{ marginVertical: 5}}>
            <Text style={styles.itemText}>{strings('buy_prescription.recent_drugstore')}</Text>
            {recentDrugstore.length == 0 ? (<Text>{strings('buy_prescription.no_drugstore')}</Text>) :
            (<FlatList style={{marginTop: 10}}
              data= {recentDrugstore}
              keyExtractor={(item, index) => index.toString()}
              renderItem={this.renderItem}
            />)}
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Button danger
            style={styles.button1}
            onPress={() => {
              this.props.closeModal();
            }}
          >
            <Icon
              style={styles.icon}
              size={sizeWidth(5)}
              name="x"
              type="feather"
              color="white"
            />
            <Text style={{color: "white"}}>{strings('buy_prescription.close')}</Text>
          </Button>
          <Button success
            style={styles.button}
            onPress={this.buyPrescription}
          >
            <Icon
              style={styles.icon}
              size={sizeWidth(5)}
              name="pencil"
              type="material-community"
              color="white"
            />
            <Text style={{color: "white"}}>{strings('buy_prescription.buy_medicine')}</Text>
          </Button>
        </View>
      </View>
    );
  }
}


const mapStateToProps = state => {
  return state.prescriptionHistory;
};

const mapDispatchToProps = dispatch => {
  return {
    loadRecentDrugstore: () => {
      dispatch({ type: LOAD_RECENTDRUGSTORE });
    },
    buyPrescription: (shopName, shopId, prescriptionId, shopMail, benhAnId, dienBienBenhId, toaThuocId) => {
      dispatch({ type: BUY_PRESCRIPTION, shopName, shopId, prescriptionId, shopMail, benhAnId, dienBienBenhId, toaThuocId});
    },
    closeModal: () => {
      dispatch({ type: TOOGLE_BUY_PRESCRIPTION_MODAL });
    },
    findDrugStore: (query) => {
      dispatch({ type: FIND_LIST_DRUGSRORE, query});
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyPrescriptionModal);
const styles = StyleSheet.create({
  container: {
    width: sizeWidth(90),
    height: sizeHeight(70),
    backgroundColor: "white",
    padding: sizeWidth(3)
  },
  body: {
    flex: 1
  },
  header: {
    backgroundColor: "rgb(93, 177, 74)",
    paddingVertical: sizeWidth(2.2),
  },
  title: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
    height:sizeHeight(3)
  },
  button: {
    paddingHorizontal: sizeWidth(5),
    height: sizeHeight(5),
    borderRadius:sizeWidth(1),
  },
  button1: {
    paddingHorizontal: sizeWidth(5),
    height: sizeHeight(5),
    borderRadius:sizeWidth(1),
    width: sizeWidth(30)
  },
  icon1: {
    width: sizeWidth(4),
    height: sizeWidth(4),
    tintColor: "#CCCCCC",
    marginLeft: sizeWidth(1.03)
  },
  button2: {
    paddingHorizontal: sizeWidth(5),
    height: sizeHeight(5),
    borderRadius:sizeWidth(1),
    marginVertical: 5,
  },
  autocompleteContainer: {
   marginTop: 10,
   zIndex: 1000,
   backgroundColor: "#DDD"
 },
 itemText: {
    fontSize: 15,
    marginTop: 14
  },
  autocomplete:{
    backgroundColor: '#F5FCFF',
    flex: 1,
    marginTop: 5
  }
});

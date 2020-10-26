import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, ActivityIndicator, FlatList } from "react-native";
import { connect } from "react-redux";
import AppHeader from "../components/app-header";
import Toolbar from "../components/common/toolbar";
import { sizeWidth, sizeHeight, sizeFont } from "../helpers/size.helper";
import CheckBox from 'react-native-check-box'
import Text from "../components/common/text";
import { navigateToPage } from "../actions/nav.action";
import { strings } from '../locate/I18n';
import Images from '../constants/image';
import ProgressCircle from 'react-native-progress-circle';
import { LOAD_SYMPTOM } from "../actions/symptom.action";
import FormatHelper from "../helpers/format.helper";
import RelatedDiseaseItem from '../components/symptom/relatedDiseaseItem';
import SearchHospitalItem from '../components/symptom/searchHospitalItem';
const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

class SymptomScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idSymptomChecked: [],
      medicalAttribute: [],
      postContentAndCompatibles : [],
      hospitalAndDoctorConfic: [],
      keywords : [],
      loading: true,
      isInitCheckbox: true,
      loadingSearch: false,
      loadingSearchHospital: false,
      listSymptomChecked: [],
    };
  } 
  UNSAFE_componentWillMount = async() => {
    this.searchMedicalAttributeAndPostContent();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { symptom } = nextProps;
    const {data, loading } = symptom;
    const { isInitCheckbox } = this.state;
    
    if(JSON.stringify(data) && JSON.stringify(data) !== JSON.stringify(this.props.symptom.data) && JSON.stringify(this.props.symptom.data)) {
      let idSymptomChecked = [];
      const { hospitalAndDoctorConfic, postContentAndCompatibles, medicalAttribute } = symptom.data;
      
      if (isInitCheckbox && symptom.data && symptom.data.medicalAttribute && symptom.data.medicalAttribute.length > 0) {
        idSymptomChecked = symptom.data.medicalAttribute.map(item => item.id);
        this.setState({isInitCheckbox : false});
      }
      
      if(idSymptomChecked.length > 0){//Init
        this.setState({ medicalAttribute, loading, idSymptomChecked, postContentAndCompatibles, hospitalAndDoctorConfic });
      }else{
        this.setState({ loading: false, postContentAndCompatibles, hospitalAndDoctorConfic });
      }
    }
  }
  searchFunction = (hospital, idSymptomChecked, keywords) => {
    const { location } = this.props;
    let address = '';
    if (location !== null) {
      address = `lat:${location.latitude ? location.latitude : ''}, long:${location.longitude ? location.longitude : ''}`;
    }
    const { params } = this.props.navigation.state;
    let dataRequest = {
      medicalCategory: [params],
      searchType: hospital, //set default only search hospital(4) and medicine(1)
      medicalAttributeId: idSymptomChecked,
      maxResult: 10,
      keywords : keywords,
      firstResult: 0,
      address
    }
    this.props.loadSymptom(dataRequest);
    setTimeout(() => {
      this.setState({
        loadingSearch: false,
        loadingSearchHospital: false,
      })
    }, 2000);
  }
  searchMedicalAttributeAndPostContent = () => {
    this.setState({
      loadingSearch: true,
    });
    this.searchFunction(["1","4"], this.state.listSymptomChecked, []);
  }
  searchKeywords = () => {
    this.setState({
      loadingSearch: true,
      loadingSearchHospital: true
    });
    const { listSymptomChecked,  keywords} = this.state;
    this.searchFunction(["1","4"], listSymptomChecked, keywords);
  }
  searchHospital = () => {
    this.setState({
      loadingSearchHospital: true
    });
    const hospital = ["1","4"];
    this.searchFunction(hospital, this.state.listSymptomChecked, []);
  }
  
  handleClickCheckBox = id => {
    const {listSymptomChecked, idSymptomChecked,  keywords} = this.state;
    const isInclude = listSymptomChecked.includes(id);
    if (!isInclude) {
      this.setState(state => ({
        listSymptomChecked: [...state.listSymptomChecked, ...[id]],
      }),() => {
        this.searchMedicalAttributeAndPostContent();
      });
    } else {
      this.setState(state => ({
        listSymptomChecked: listSymptomChecked.filter(item => item !== id),
      }),() => {
        this.searchMedicalAttributeAndPostContent();
      });
    }
  }
  renderMedicalAttribute = () => {
    const { idSymptomChecked,  medicalAttribute , listSymptomChecked} = this.state;
    let htmlSymptomCheckbox = [];
    if (medicalAttribute && medicalAttribute.length > 0) {
      const tempDataMedicalAttribute = chunk(medicalAttribute, 2);
      for (let i = 0; i < tempDataMedicalAttribute.length; i++) {
        const dataRow = tempDataMedicalAttribute[i];
        let htmlItemRow = [];
        for (let j = 0; j < dataRow.length; j++) {
          const dataItem = dataRow[j];
          const htmlItem = (<CheckBox
            style={styles.checkBox}
            checkedCheckBoxColor='#3AAF00'
            rightTextStyle={styles.textCheckBox}
            onClick={()=> this.handleClickCheckBox(dataItem.id)}
            key={dataItem.id}
            isChecked={listSymptomChecked.includes(dataItem.id)}
            rightText={dataItem.evidence}
          />)
          htmlItemRow.push(htmlItem);
        }
        const htmlRow = (
          <View key={i} style={styles.rowSymptom}>
             {htmlItemRow}
          </View>
        );
        htmlSymptomCheckbox.push(htmlRow);
      }
    }
    return (
      <View>
        {htmlSymptomCheckbox}
        <View>
          <TextInput 
            onSubmitEditing={this.searchKeywords}
            underlineColorAndroid="transparent"
            style={styles.describeInput}
            onChangeText={keywords => this.setState({ keywords : [keywords]})}
            placeholder={strings("symptom_search.descipInput") +  " ..."}
            isNormal = {true}
          />
        </View>
      </View>
    );
  };
  renderSearchHospital = () => {
    const { hospitalAndDoctorConfic, loadingSearchHospital} = this.state; 
    return (
      <View>
        <Text style={styles.titleRelatedDisease}>{strings("symptom_search.medicalFacility")}</Text>
        { loadingSearchHospital ? (
          <ActivityIndicator size="large" color="#3AAF00"/>
        ): (hospitalAndDoctorConfic && hospitalAndDoctorConfic.length > 0) ? (
          <FlatList
            data={hospitalAndDoctorConfic}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderSearchHospitalItem}
          />
        ): (
          <Text></Text>
        )}
      </View>
      
    )
  }
  renderSearchHospitalItem = ({item, index}) => {
    return (
      <SearchHospitalItem item={item} navigation={this.props.navigation}/>
    )
  } 
  renderRelatedDisease = () => {
    const { postContentAndCompatibles, isInitCheckbox, idSymptomChecked, loadingSearch, listSymptomChecked } = this.state;
    return (
      <View>
        <Text style={styles.titleRelatedDisease}>{strings("symptom_search.relatedDisease")}</Text>
          {listSymptomChecked && listSymptomChecked.length > 0 ? (
            loadingSearch ? (
              <ActivityIndicator size="large" color="#3AAF00"/>
            ): ( postContentAndCompatibles && postContentAndCompatibles.length > 0) ? (
              <FlatList
                data={postContentAndCompatibles}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={this.renderRelatedDiseaseItem}
              />
            ): (
              <Text></Text>
            )
          ) : (
            <Text></Text>
          )}
      </View>
    )
  }
  renderRelatedDiseaseItem = ({ index, item }) => {
    return (
      <RelatedDiseaseItem item={item} navigation={this.props.navigation}/>
    )
  }
  symptomTitle = (params) => {
    let title = "";
    switch(params){
      case "TIMMACH":
        return title = strings('home.cardiovasculars').toUpperCase();
      case "HOHAP":
        return title = strings('home.breathes').toUpperCase();
      case "TIEUHOA":
        return title = strings('home.digests').toUpperCase();
      case "UNGTHU":
        return title = strings('home.cancers').toUpperCase();
      case "TIETNIEU-SINHDUC":
        return title = strings('home.urinary_genitals').toUpperCase();
      case "NHIEMTRUNGTIEUHOA":
        return title = strings('home.bacterial_digestive_infectionss').toUpperCase();
      case "DA":
        return title = strings('home.skins').toUpperCase();
      case "THANKINH":
        return title = strings('home.nerves').toUpperCase();
      case "MAT":
        return title = strings('home.eyes').toUpperCase();
      case "TAI":
        return title = strings('home.ears').toUpperCase();
      case "CO-XUONG-KHOP":
        return title = strings('home.muscle_bone_joints').toUpperCase();
      case "NHIEMSIEUVI":
        return title = strings('home.viral_infections').toUpperCase();
      case "NOITIET-CHUYENHOA":
        return title = strings('home.endocrinology_metabolisms').toUpperCase();
      case "KHAC":
        return title = strings('home.differents').toUpperCase();
      default:
        return title;
    }
  }
  renderTitle = () => { 
    const { params } = this.props.navigation.state;
    return (
      <View style={{alignItems:'center', marginBottom:10, marginTop:10}}>
        <Text style={{fontWeight:'bold'}}>{this.symptomTitle(params)}</Text>
      </View>
    )
  }
  render() {
    const { loading } = this.state;
    return (
      <View style={styles.container} >
        <AppHeader isMain={false}/>
        <Toolbar title={strings("symptom_search.symptom")} />
        { loading ? (
          <View style={styles.loading}>
            <ActivityIndicator animating={loading}  size="large" color="#3AAF00" />
          </View>
        ) : (
          <ScrollView>
            <View style={styles.mainContainer}>
              {this.renderTitle()}
              {this.renderMedicalAttribute()}
              <TouchableOpacity onPress={() => this.searchHospital()}>
                <View style={styles.searchHospital}>
                  <Image
                    style={styles.img_icon_search}
                    source={Images.icon_symptom_search_hospital}
                  />
                  <Text style={styles.text_search}>{strings("symptom_search.searchButton")}</Text>
                </View>
              </TouchableOpacity>
              {this.renderSearchHospital()}
              {this.renderRelatedDisease()}
            </View>
          </ScrollView>
        )}
        
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { 
    ...state.home,
    symptom: state.symptom,
    location : state.userInfo.location,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    navigateToPage: (route, data) => dispatch(navigateToPage(route, data)),
    loadSymptom: (data) => dispatch({ type: LOAD_SYMPTOM, data }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SymptomScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer : {
    padding: sizeWidth(4),
  },
  rowSymptom: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemSymptom: {
    width: '50%',
  },
  checkBox: {
    width: '50%',
    padding: sizeWidth(2),
  },
  textCheckBox: {
    color: '#000'
  },
  describeInput: {
    flex: 1,
    fontStyle: 'italic',
    borderColor: '#3AAF00',
    borderWidth: 1,
    height: sizeWidth(15),
    justifyContent: "flex-start",
    paddingLeft: sizeWidth(2),
  },
  searchHospital: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center',
    backgroundColor: '#3AAF00',
    padding: sizeWidth(2),
    marginLeft: sizeWidth(8),
    marginRight: sizeWidth(8),
  },
  img_icon_search: {
    height: sizeWidth(10),
    width: sizeWidth(10),
    borderRadius: sizeWidth(10)/2
  },
  text_search: {
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 5
  },
  titleRelatedDisease: {
    backgroundColor: '#3AAF00',
    marginTop: 20,
    textAlign: "center",
    padding: sizeWidth(2),
    fontSize: sizeFont(6),
    fontWeight: 'bold',
    color: 'white'
  },
  relatedDisease: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    borderColor: '#3AAF00',
    borderWidth: 1
  },
  relatedDiseaseContainer: {
    width: '75%',
    padding: sizeWidth(2)
  },
  titleDiseaseContainer: {
    fontSize: sizeFont(4),
    fontWeight: 'bold',
    color: '#000',
  },
  desDiseaseContainer: {
    fontSize: sizeFont(3),
  },
  relatedPercent: {
    width: '25%',
    padding: sizeWidth(2)
  },
  textPercent: {
    fontSize: sizeFont(3),
    color: '#69b52e',
    fontWeight: 'bold'
  },
  loading: {
    marginTop: 10,
    alignSelf: "center"
  },

  hospitalContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    borderColor: '#3AAF00',
    borderWidth: 1
  },
  icon: {
    width: sizeWidth(20),
    height: sizeWidth(20)
  },
  hospitalImage: {
    width: '25%',
    padding: sizeWidth(2)
  },
  desHospitalContainer: {
    width: '75%',
    padding: sizeWidth(2)
  },
  titleHospital: {
    fontSize: sizeFont(4),
    fontWeight: 'bold',
    color: '#000',
  },
  desHospital: {
    fontSize: sizeFont(3),
  },
});

import React from "react";
import {View, Text} from 'react-native';
import { StackNavigator, TabNavigator } from "react-navigation";
import SplashScreen from "../screens/splash.screen";
import { strings } from '../locate/I18n';
import { Icon } from "react-native-elements";
import {
  tab_font_size,
  primary_color,
  actived_tab_color
} from "../constants/app.constant";
// import { MainNavigator, MainsNavigators, MainNavigators } from "./main.navigator";
import ProfileScreen from "../screens/profile.screen";
import SettingScreen from "../screens/setting.screen";
import AddPrescriptionScreen from "../screens/add-prescription.screen";

import AddMedicalScreen from "../screens/add-medical.screen";
import AddTestScreen from "../screens/add-test.screen";
import MedicalDetailScreen from "../screens/medical-detail.screen";
import AddPaymentScreen from "../screens/add-payment.screen";
import RegisterScreen from "../screens/register.screen";
import LoginScreen from "../screens/login.screen";
import AddAllergyScreen from "../screens/add-allergy.screen";

import AddFamilyIllnessScreen from "../screens/add-family-illness.screen";
import RegisterSuccessScreen from "../screens/register-success.screen";
import AddVaccinationScreen from "../screens/add-vaccination.screen";

import DoctorAppointmentScreen from "../screens/doctor-appointment.screen";
import ArticleDetailScreen from "../screens/article-detail.screen";
import DoctorDetailScreen from "../screens/doctor-detail.screen";
import HospitalDetailScreen from "../screens/hospital-detail.screen";
import MedicalCenterDetailScreen from "../screens/medical-center-detail.screen";
import ClinicDetailScreen from "../screens/clinic-detail.screen";
import DrugstoreDetailScreen from "../screens/drugstore-detail.screen";
import LaboratoryDetailScreen from "../screens/laboratory-detail.screen";
import QRCodeScannerScreen from "../screens/qrcode-scanner.screen";
import PrescriptionDetailScreen from "../screens/prescription-details.screen";
import PaymentDetailsHistoryScreen from "../screens/payment-history-details.screen"
import TestDetailScreen from "../screens/test-detail.screen"
import MedicalDetailImagesScreen from "../screens/medical-detail-images.screen"
import TestHistoryImagesScreen from "../screens/test-history-images.screen"
import PaymentHistoryImagesScreen from "../screens/payment-history-images.screen"
import AppointmentEditScreen from "../screens/appointment-edit.screen"
import ActivateScreen from '../screens/activate.screen';
import ChatDetailScreen from '../screens/chat.detail.screen';
import SymptomScreen from '../screens/symptom.screen';
//import Language from "../screens/languageSelection.screen"
import MedicalHistoryScreen from "../screens/medical-history.screen";
import PrescriptionHistoryScreen from "../screens/prescription-history.screen";
import SavedScreen from "../screens/saved.screen";
import TestHistoryScreen from "../screens/test-history.screen";
import PaymentHistoryScreen from "../screens/payment-history.screen";
import AllergyScreen from "../screens/allergy.screen";
import FamilyIllnessListScreen from "../screens/family-illness-list.screen";
import VaccinationHistoryScreen from "../screens/vaccination-history.screen";
import InsuranceScreen from "../screens/insurance.screen";
import HomeScreen from "../screens/home.screen";
import SearchScreen from "../screens/search.screen";
import AppointmentScreen from "../screens/appointment.screen"
import DocumentScreen from "../screens/document.screen";
import ChatScreen from "../screens/chat.screen";
import TabbarComponent from "../components/common/tabbar-component";
import NewsScreen from '../screens/news.screen';
import AddAppointmentScreen from '../screens/add-appointment.screen';
import RelatedDiseaseDetailScreen from  '../screens/relatedDiseaseDetail.screen';
import BloodBankScreen from '../screens/bloodBank.screen';
export const DocumentStack = StackNavigator(
  {
    Document: { screen: DocumentScreen },
    PaymentDetail:{ screen: PaymentDetailsHistoryScreen},
    DoctorAppointment: { screen: DoctorAppointmentScreen },
    Profile: { screen: ProfileScreen },
    Setting: { screen: SettingScreen },
    MedicalHistory: { screen: MedicalHistoryScreen },
    PrescriptionHistory: { screen: PrescriptionHistoryScreen },
    TestHistory: { screen: TestHistoryScreen },
    Saved: { screen: SavedScreen },
    AddMedical: { screen: AddMedicalScreen },
    AddPrescription: { screen: AddPrescriptionScreen },
    AddTest: { screen: AddTestScreen },
    MedicalDetail: { screen: MedicalDetailScreen },
    PaymentHistory: { screen: PaymentHistoryScreen },
    AddPayment: { screen: AddPaymentScreen },
    MedicalDetail: { screen: MedicalDetailScreen },
    Register: { screen: RegisterScreen },
    Login: { screen: LoginScreen },
    AddFamilyIllness: { screen: AddFamilyIllnessScreen },
    Allergy: { screen: AllergyScreen },
    AddAllergy: { screen: AddAllergyScreen },
    FamilyIllnessList: { screen: FamilyIllnessListScreen },
    RegisterSuccess: { screen: RegisterSuccessScreen },
    AddVaccination: { screen: AddVaccinationScreen },
    VaccinationHistory: { screen: VaccinationHistoryScreen },
    Insurance: { screen: InsuranceScreen },
    QRCodeScanner: { screen: QRCodeScannerScreen },
    PrescriptionDetail: {screen: PrescriptionDetailScreen},
    TestDetail: {screen: TestDetailScreen},
    MedicalDetailImages: {screen: MedicalDetailImagesScreen},
    TestHistoryImages: {screen: TestHistoryImagesScreen},
    PaymentHistoryImages: {screen: PaymentHistoryImagesScreen},
    Activate: {screen: ActivateScreen},
    BloodBank: {screen: BloodBankScreen}
    
  },
  {
    headerMode: "none",
    cardStyle: {
      backgroundColor: "white"
    }
  }
);

export const MainStack = StackNavigator({
  Home: {screen: HomeScreen},
  Symptom: {screen: SymptomScreen},
  HospitalDetailDocument: { screen: HospitalDetailScreen },
  RelatedDiseaseDetail: {screen: RelatedDiseaseDetailScreen}
},
{
  headerMode: "none",
  cardStyle: {
    backgroundColor: "white"
  }
});

export const SearchStack = StackNavigator({
  Search: { screen: SearchScreen},
  ClinicDetail: { screen: ClinicDetailScreen },
  DoctorDetail: { screen: DoctorDetailScreen },
  DrugstoreDetail: { screen: DrugstoreDetailScreen },
  HospitalDetail: { screen: HospitalDetailScreen },
  LaboratoryDetail: { screen: LaboratoryDetailScreen },
  MedicalCenterDetail: { screen: MedicalCenterDetailScreen },
},
{
  headerMode: "none",
  cardStyle: {
    backgroundColor: "white"
  }
});

export const AppointmentStack = StackNavigator({
  Appointment: { screen: AppointmentScreen},
  AppointmentEdit: {screen: AppointmentEditScreen},
  AddAppointment: {screen: AddAppointmentScreen}
},
{
  headerMode: "none",
  cardStyle: {
    backgroundColor: "white"
  }
});

export const NewsStack = StackNavigator({
  NewsScreen: {screen: NewsScreen},
  ArticleDetail: {screen: ArticleDetailScreen}
}, {
  headerMode:"none",
  cardStyle: {
    backgroundColor:'white'
  }
})

export const ChatStack = StackNavigator({
  Chat: { screen: ChatScreen},
  ChatDetail: {screen: ChatDetailScreen},
},
{
  headerMode: "none",
  cardStyle: {
    backgroundColor: "white"
  }
});

export const MainNavigator = TabNavigator(
  {
    Main: {
      screen: MainStack,
      navigationOptions: {
        title: strings('navigator.home'),
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" type="entypo" color={tintColor} />
        )
      }
    },
    Document: {
      screen: DocumentStack,
      navigationOptions: {
        title: strings('navigator.document'),
        tabBarIcon: ({ tintColor }) => (
          <Icon name="address-book" type="font-awesome" color={tintColor} />
        )
      }
    },
    Search: {
      screen: SearchStack,
      navigationOptions: {
        title: strings('navigator.search'),
        tabBarIcon: ({ tintColor }) => (
          <Icon name="search" type="font-awesome" color={tintColor} />
        )
      }
    },
    Appointment: {
      screen: AppointmentStack,
      navigationOptions: {
        title: strings('navigator.appointment'),
        tabBarIcon: ({ tintColor }) => (
          <Icon name="clock" type="feather" color={tintColor} />
        )
      }
    },
    News: {
      screen: NewsStack,
      navigationOptions: {
        title: strings('side_menu.news'),
        tabBarIcon: ({tintColor}) => (
          <Icon name="newspaper-o" type="font-awesome" color={tintColor} />
        )
      }
    },
    ChatScreen: {
      screen: ChatStack,
      navigationOptions: {
        title: strings('chat'),
        tabBarIcon: ({ tintColor }) => (
          <View style={{flex: 1, justifyContent: 'space-around', paddingHorizontal: 10}}>
            <Icon name="comment" type="font-awesome" color={tintColor} />
            <View style={{width:20, height:20, borderRadius:10, backgroundColor: 'red', position: 'absolute', top: 0, right: 0, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: 'white', fontSize: 12}}>3</Text>
            </View>
          </View>
        )
      }
    }
  },
  {
    tabBarPosition: "bottom",
    tabBarComponent: TabbarComponent,
    initialRouteName: "Main",
    backBehavior: "none",
    tabBarOptions: {
      indicatorStyle: {
        backgroundColor: "transparent"
      },
      showIcon: true,
      showLabel: true,
      upperCaseLabel: false,
      labelStyle: {
        fontSize: tab_font_size,
        marginBottom: 5
      },
      activeTintColor: actived_tab_color,
      inactiveTintColor: primary_color,
      iconStyle: {
        marginBottom: -5
      }
    }
  }
);

export const AppNavigator = StackNavigator(
  {
    Home: { screen: MainNavigator },
    Document: { screen: DocumentStack }
  },
  {
    headerMode: "none",
    cardStyle: {
      backgroundColor: "white"
    }
  }
);

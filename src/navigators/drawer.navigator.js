import React from "react";
import { DrawerNavigator } from "react-navigation";
import { MainNavigator,MainNavigators,MainsNavigators } from "./main.navigator";
import DoctorAppointment from "../screens/doctor-appointment.screen";
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

import SideMenu from "./side-menu";
import DoctorSideMenu from "./doctor-side-menu";

export const AppDrawerNavigator = DrawerNavigator({
  Main: {
    screen: MainNavigator
  }
},
  {
    contentComponent: SideMenu
  });

export const DoctorDrawerNavigator = DrawerNavigator({
  Main: {
    screen: DoctorAppointment
  }
},
  {
    contentComponent: DoctorSideMenu
  });

export const MedicalDrawerNavigator = DrawerNavigator({
  Main: {
    screen: MedicalHistoryScreen
  }
},
  {
  contentComponent: SideMenu
});

export const PrescriptionDrawerNavigator = DrawerNavigator({
  Main: {
    screen: PrescriptionHistoryScreen
  }
},
  {
    contentComponent: SideMenu
});

export const TestDrawerNavigator = DrawerNavigator({
  Main: {
    screen: TestHistoryScreen
  }
},
{
  contentComponent: SideMenu
});
export const AllergyDrawerNavigator = DrawerNavigator({
  Main: {
    screen: AllergyScreen
  }
},
{
  contentComponent: SideMenu
});

export const FamilyIllnessDrawerNavigator = DrawerNavigator({
  Main: {
    screen: FamilyIllnessListScreen
  }
  
},
{
  contentComponent: SideMenu
});

export const VaccinDrawerNavigator = DrawerNavigator({
  Main: {
    screen: VaccinationHistoryScreen
  }
},
{
  contentComponent: SideMenu
});

export const PaymentDrawerNavigator = DrawerNavigator({
  Main: {
    screen: PaymentHistoryScreen
  }
},
{
  contentComponent: SideMenu
});

export const InsuranceDrawerNavigator = DrawerNavigator({
  Main: {
    screen: InsuranceScreen
  }
},
{
  contentComponent: SideMenu
});

export const SavedDrawerNavigator = DrawerNavigator({
  Main: {
    screen: SavedScreen
  }
},
{
  contentComponent: SideMenu
});

export const ArticleDrawerNavigator = DrawerNavigator({
  Main: {
    screen: HomeScreen
  },
  Main: {
    screen: MainNavigator
  }
},
{
  contentComponent: SideMenu
});

export const SearchDrawerNavigator = DrawerNavigator({
  Main: {
    screen: SearchScreen
  },
  Mains: {
    screen: MainNavigators
  }
},
{
  contentComponent: SideMenu
});

export const AppointmentDrawerNavigator = DrawerNavigator({
  Main: {
    screen: AppointmentScreen
  },
  IsMains: {
    screen: MainsNavigators
  }
},
{
  contentComponent: SideMenu
});

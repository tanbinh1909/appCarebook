import React, { Component } from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator, Text } from "react-native";
import AppHeader from "../components/app-header";
import Toolbar from "../components/common/toolbar";
import { sizeWidth, sizeFont,sizeHeight } from "../helpers/size.helper";
import SavedItem from "../components/saved/saved-item";
import { connect } from "react-redux";
import { LOAD_SAVED } from "../actions/saved.action";
import { strings } from '../locate/I18n';

class SavedScreen extends React.Component {
  render() {
    const {savedList, loading} = this.props;
    return (
      <ScrollView style={styles.container}>
        <AppHeader isMain={true}/>
        <Toolbar title={strings('side_menu.saved')} />
        <View style={styles.body}>
        {
          loading
          ? <ActivityIndicator size="large" color="#3AAF00" />
          : savedList.length > 0 ? (
            <SavedItem {...this.props} data={savedList} />
          )
          : (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text
                style={{
                  fontSize: sizeFont(5),
                  fontWeight: "bold",
                  color: "gray",
                  marginTop: sizeWidth(5)
                }}
              >
                {strings('saved.no_record')}
              </Text>
            </View>
          )
        }
        </View>
      </ScrollView>
    );
  }

  componentDidMount() {
    this.props.loadList();
  }
}

const mapStateToProps = state => {
  return state.saved;
};

const mapDispatchToProps = dispatch => {
  return {
    loadList: () => {
      dispatch({ type: LOAD_SAVED });
    },
    navigateToPage: pageName => dispatch(navigateToPage(pageName))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SavedScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  empty: {
    fontSize: sizeFont(5),
    fontWeight: "bold",
    color: "gray",
    marginTop: sizeWidth(5),
    textAlign: "center"
  },
  body: {
    flex: 1,
    padding: sizeWidth(3)
  }
});

import React, { Component } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";
import { sizeFont, sizeWidth, sizeHeight } from "../../helpers/size.helper";
import { connect } from "react-redux";
class LoadingPopup extends Component {
  render() {
    return this.props.loading && (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }
}

LoadingPopup.propTypes = {
  loading: PropTypes.bool.isRequired
};

LoadingPopup.defaultProps = {
  loading: false
};

export default connect(
  null
)(LoadingPopup);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "#FFF",
    opacity: 0.5,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999
  }
});

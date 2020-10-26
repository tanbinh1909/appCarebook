import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import ReactNativeDatePicker from "react-native-datepicker";
import { sizeWidth } from "../../helpers/size.helper";
import { Icon } from "react-native-elements";
import {date_format} from "../../constants/app.constant";
import { strings } from '../../locate/I18n';

export default class TimePicker extends Component {
  state = {

  }

  render() {
    const { style, mode, format } = this.props;
    return (
      <View style={[styles.container, style]}>
        <ReactNativeDatePicker
          ref={ref => (this.datePicker = ref)}
          style={styles.date}
          mode={mode || "date"}
          showIcon={false}
          placeholder={strings('component_common.choose_hour')}
          format={format || date_format.hh_mm_ss}
          confirmBtnText={strings('component_common.choose')}
          cancelBtnText={strings('cancel')}
          customStyles={{
            dateInput: {
              borderWidth: 0,
              alignItems: "flex-start",
              justifyContent: "center",
              paddingHorizontal: sizeWidth(2.13),
              height: sizeWidth(9.06)
            },
            dateTouchBody: {
              height: sizeWidth(9.06)
            },
            dateText: {
              fontSize: sizeWidth(3),
              textAlign: "left",
              color: "black",
              fontWeight: "bold"
            },
            placeholderText: {
              fontSize: sizeWidth(3),
              textAlign: "left",
              color: "#888888",
              fontWeight: "bold"
            }
          }}
          {...this.props}
        />
        <Icon
          size={sizeWidth(4)}
          name="clock"
          type="entypo"
          color="#888888"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: sizeWidth(1),
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#888888",
    alignItems: "center",
    paddingRight: 5,
    borderRadius: sizeWidth(1),
    width: sizeWidth(25),
    marginLeft:sizeWidth(3)
  },
  date: {
    flex: 1,
    height: sizeWidth(9.06),
    marginRight: sizeWidth(2)
  }
});

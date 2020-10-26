import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import Text from "./text";
import { sizeWidth, sizeFont } from "../../helpers/size.helper";
import FormatHelper from "../../helpers/format.helper";
import { month_names } from "../../constants/app.constant";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: new Date()
    };
  }

  componentDidMount = () => {
    setInterval(() => {
      this.setState({
        currentTime: new Date()
      });
    }, 1000);
  };

  render() {
    const { currentTime } = this.state;
    const day = FormatHelper.twoIntegerDigits(currentTime.getDate());
    const month = month_names[currentTime.getMonth()];
    const year = FormatHelper.fourIntegerDigits(currentTime.getFullYear());
    const hour = FormatHelper.twoIntegerDigits(currentTime.getHours());
    const minute = FormatHelper.twoIntegerDigits(currentTime.getMinutes());
    const second = FormatHelper.twoIntegerDigits(currentTime.getSeconds());
    return (
      <View style={styles.container}>
        <View style={styles.left}>
          <Text style={styles.title}>Visitor Registration</Text>
        </View>
        <View style={styles.date}>
          <Text style={styles.day}>{day}</Text>
          <View style={styles.monthAndYear}>
            <Text style={styles.month}>{month}</Text>
            <Text style={styles.year}>{year}</Text>
          </View>
        </View>
        <View style={styles.time}>
          <Text style={styles.hourAndMinute}>
            {hour}:{minute}
          </Text>
          <Text style={styles.second}>:{second}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "black"
  },
  left: {
    flex: 1.5,
    paddingVertical: sizeWidth(2.13),
    borderRightWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black"
  },
  title: {
    color: "rgb(104, 108, 110)",
    fontSize: sizeWidth(3.6),
    paddingHorizontal: sizeWidth(6)
  },
  date: {
    flex: 1,
    flexDirection: "row",
    padding: sizeWidth(2.13),
    borderRightWidth: 1,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center"
  },
  day: {
    color: "white",
    fontSize: sizeWidth(8),
    fontWeight: "bold",
    marginRight: sizeWidth(0.88)
  },
  monthAndYear: {},
  month: {
    color: "rgb(104, 108, 110)",
    fontWeight: "bold"
  },
  year: {
    fontSize: sizeFont(2.5),
    color: "rgb(104, 108, 110)"
  },
  time: {
    flex: 1.5,
    flexDirection: "row",
    padding: sizeWidth(2.13)
  },
  hourAndMinute: {
    color: "white",
    fontWeight: "bold",
    fontSize: sizeWidth(8)
  },
  second: {
    color: "white",
    fontWeight: "normal",
    fontSize: sizeWidth(8)
  }
});

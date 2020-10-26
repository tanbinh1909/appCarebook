import React, { Component } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Rate from "../common/rate";
import Text from "../common/text";
import CacheImage from "../common/cache-image";
import { sizeWidth, sizeFont, sizeHeight } from "../../helpers/size.helper";
import { strings } from '../../locate/I18n';

export default class DetailSummary extends Component {
  render() {
    const { title, rating, subtitle, summary, imageUrl } = this.props;
    return (
      <View>
        <View style={styles.header}>
          <View style={styles.top}>
            <Text style={styles.title}>{title}</Text>
            <Rate rate={rating} maxRate={5} />
          </View>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <CacheImage uri={imageUrl} resizeMode="contain" style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.summary}>{strings('component_search.overview')}</Text>
          <Text style={styles.summaryContent}>{summary}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "black",
    paddingVertical: sizeWidth(2.2),
    alignItems: "center",
    justifyContent: "space-between"
  },
  top: {
    flexDirection: "row"
  },
  header: {
    backgroundColor: "white"
  },
  title: {
    color: "black",
    fontWeight: "bold",
    flex: 1,
    fontSize: sizeFont(5)
  },
  subtitle: {
    color: "black",
    marginTop: sizeWidth(1),
    fontSize: sizeFont(3.3),
    fontStyle: "italic"
  },
  summary: {
    marginBottom: sizeWidth(2),
    fontWeight: 'bold',
    fontSize: sizeFont(4),
  },
  summaryContent: {},
  content: {
    // padding: sizeWidth(2)
  },
  image: {
    width: '100%',
    // height: sizeWidth(100),
    marginVertical: sizeHeight(2),
    // backgroundColor: 'red'
  }
});

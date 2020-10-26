import React, { Component } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import PropTypes from "prop-types";
import { sizeWidth, sizeHeight, sizeFont } from "../../helpers/size.helper";
import Text from "../../components/common/text";
import {secondary_bg_color, secondary_color} from "../../constants/app.constant";
import Images from '../../constants/image';

export default class FeaturesCarousel extends Component {
  constructor() {
    super();
    this.state = {
      activeSlide: 0
    };
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          data={this.props.categories}
          renderItem={this._renderItem.bind(this)}
          sliderWidth={sizeWidth(100)}
          itemWidth={sizeWidth(60)}
          loop={true} // happen a issue
          onSnapToItem={(index) => this.setState({ activeSlide: index }) }
        />
      </View>
    );
  }

  _renderItem({ item, index }) {
    return (
      <TouchableOpacity style={styles.slide} onPress={() => this.props.loadArticles(item.id)}>
        {
          item.picture ? (
            <Image
                resizeMode="stretch"
                style={styles.image}
                source={{ uri: item.picture[0] }} />
            ) : (
              <Image
                resizeMode="stretch"
                style={styles.image}
                source={Images.no_image}
              />
            )
        }
        <Text style={styles.title}>{item.categoryName.toUpperCase()}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 5,
  },
  slide: {
    flex: 1,
    alignItems: "center",
    backgroundColor: secondary_bg_color,
    borderRadius: sizeWidth(1)
  },
  image: {
    width: "100%",
    height: "60%",
    borderTopLeftRadius: sizeWidth(1),
    borderTopRightRadius:  sizeWidth(1),
  },
  title: {
    fontSize: sizeFont(3.46),
    color: secondary_color,
    paddingTop: 5,
    fontWeight: "500"
  },
  description: {
    fontSize: sizeFont(2.46),
    color: secondary_color,
    textAlign: "center",
    padding: 5
  }
});

import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import AppHeader from "../components/app-header";
import FeaturesCarousel from "../components/home/features-carousel";
import NewFeeds from "../components/home/new-feeds";
import { sizeWidth, sizeHeight, sizeFont } from "../helpers/size.helper";
import { LOAD_CATEGORIES, LOAD_ARTICLES, TOGGLE_TABBAR } from "../actions/home.action";
import {strings} from '../locate/I18n';
class NewsScreen extends Component {
    UNSAFE_componentWillMount = async() => {
        this.props.loadCategories();
    }
    render() {
        const {
            categories,
            categoriesLoading,
            articles,
            articlesLoading,
            articlesLoaded,
            navigation
          } = this.props;
        return (
            <View style={{flex:1}}>
                <AppHeader isMain={true} />
                <ScrollView
                    style={styles.container}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.featuresWrap}>
                        {(categories && categories.length > 0)? (
                            <FeaturesCarousel
                                categories={categories}
                                loadArticles={this.props.loadArticles.bind(this)}
                                articles={articles}
                            />
                        ) : (
                            <Text style={{ fontSize: sizeFont(6), textAlign: "center" }}>
                            {strings('article_detail.msg')}
                            </Text>
                        )}

                    </View>
                    <View style={styles.newFeedsWrap}>
                        {articlesLoading ? (
                            <ActivityIndicator size="large" color="#3AAF00" />
                        ) : (articles && articles.length > 0) ? (
                        <NewFeeds
                            list={articles}
                            articlesLoading={articlesLoading}
                            onRefreshArticles={()=>this._onRefreshArticles()}
                            navigation={navigation}
                            {...this.props}
                        /> 
                        ) : (
                        <Text style={{ fontSize: sizeFont(6), textAlign: "center" }}>
                            {strings('article_detail.msg')}
                        </Text>
                        )} 
                    </View>
                </ScrollView>
            </View>
        )
    }
    _onRefreshArticles () {
        const {currentCategoryID} = this.props;
        if (currentCategoryID) {
          this.props.loadArticles(currentCategoryID);
        }
    }
    componentDidMount = async () => {
        // this.offsetY = 0;
        this.props.loadCategories();
    };
}
const mapStatetoProps = state => {
    return {...state.home}
};
const mapDispatchtoProps = dispatch => {
    return {
        loadCategories: () => {
            dispatch({ type: LOAD_CATEGORIES });
        },
        loadArticles: categoryId => {
        dispatch({ type: LOAD_ARTICLES, categoryId });
        },
        toggleTabBar: (hideTabBar) => dispatch({type: TOGGLE_TABBAR, hideTabBar})
    }
}
export default connect(mapStatetoProps, mapDispatchtoProps)(NewsScreen)
const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    featuresWrap: {
      width: sizeWidth(100),
      height: sizeHeight(35),
      justifyContent: "center",
      backgroundColor:'#A5D6A7',
      alignItems: "center"
    },
    newFeedsWrap: {
      padding: 10,
      minHeight: sizeHeight(50),
      justifyContent: "center",
      alignItems: "center"
    }
  });

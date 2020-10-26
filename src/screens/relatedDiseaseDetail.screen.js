import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, ScrollView, Dimensions } from 'react-native'
import Toolbar from '../components/common/toolbar';
import AppHeader from '../components/app-header';
import {sizeHeight, sizeWidth, sizeFont} from '../helpers/size.helper';
import { strings } from '../locate/I18n';
import Moment from 'moment';
import {date_format} from '../constants/app.constant';
import HTML from 'react-native-render-html';
import Images from '../constants/image';
class RelatedDiseaseDetailScreen extends Component {
    render() {
        const {related} = this.props.navigation.state.params;
        return (
            <View style={{flex:1}}>
                <AppHeader/>
                <Toolbar
                    title={strings('article_detail.article_detail')}
                />
                <ScrollView contentContainerStyle={{padding: 8}} showsHorizontalScrollIndicator={false}>
                    <Text style={styles.title}>{related.title}</Text>
                    <View style={styles.itemBottom}>
                        <Text style={styles.note}>
                            {Moment(related.createDate).format(date_format.dd_mm_yyyy_hh_mm)}
                        </Text>
                    </View>
                    <View>
                        {related.picture ? (
                            <Image
                                resizeMode="cover"
                                style={styles.image}
                                source={{uri: related.picture[0]}}
                            />
                        ): (
                            <Image
                                resizeMode="cover"
                                style={styles.image}
                                source={Images.no_image}
                            />
                        )}
                    </View>
                    <Text style={styles.note}>{strings('article_detail.posted_from')} {related.createBy}</Text>
                   
                    {related.content && <HTML html={related.content} imagesMaxWidth={Dimensions.get('window').width} />}
                    <Text style={styles.copyright}>
                        {strings('article_detail.copyright')}
                    </Text>
                </ScrollView>
            </View>
        )
    }
}

export default RelatedDiseaseDetailScreen

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    loading: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    body: {
      flex: 1,
      padding: sizeWidth(2)
    },
    feedItems: {
      flex: 1,
      marginBottom: 5
    },
    title: {
      fontSize: sizeFont(4.46),
      fontWeight: "300",
      textAlign: "justify"
    },
    note: {
      color: "#CCC",
      fontSize: sizeFont(3)
    },
    image: {
      width: sizeWidth(96),
      height: sizeHeight(30)
    },
    itemBottom: {
      flexDirection:"row",
      justifyContent: "space-between",
      marginTop: 5
    },
    htmlContent: {
      flex: 1
    },
    copyright: {
        textAlign: "center",
        fontSize: sizeFont(3.2),
        marginTop: sizeWidth(3),
        marginBottom: sizeWidth(1)
    },
});
import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet} from 'react-native'
import ProgressCircle from 'react-native-progress-circle';
import FormatHelper from "../../helpers/format.helper";
import { sizeWidth, sizeHeight, sizeFont } from "../../helpers/size.helper";
class RelatedDiseaseItem extends Component {
    render() {
        const { item } = this.props;
        const percent = parseInt(item.compatible,10);
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('RelatedDiseaseDetail', {relatedID: item.postContent.id, related: item.postContent})}>
                <View style={styles.relatedDisease}>
                <View style={styles.relatedDiseaseContainer}>
                    <Text style={styles.titleDiseaseContainer}>{item.postContent.title? item.postContent.title : ''}</Text>
                    <Text style={styles.desDiseaseContainer}>{FormatHelper.text_truncate(item.postContent.summary? item.postContent.summary : '',200)}</Text>
                </View>
                <View style={styles.relatedPercent}>
                    <ProgressCircle
                    percent={percent ? percent: 0}
                    radius={sizeWidth(9)}
                    borderWidth={8}
                    color="#69b52e"
                    shadowColor="#CCC"
                    bgColor="#fff"
                    >
                    <Text style={styles.textPercent}>{percent ? `${percent}%` : ''}</Text>
                    </ProgressCircle>
                </View>
                </View>
            </TouchableOpacity>
        )
    }
}

export default RelatedDiseaseItem;
const styles = StyleSheet.create({
    relatedDisease: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    borderColor: '#3AAF00',
    borderWidth: 1
    },
    relatedDiseaseContainer: {
    width: '75%',
    padding: sizeWidth(2)
    },
    titleDiseaseContainer: {
    fontSize: sizeFont(4),
    fontWeight: 'bold',
    color: '#000',
    },
    desDiseaseContainer: {
    fontSize: sizeFont(3),
    },
    relatedPercent: {
    width: '25%',
    padding: sizeWidth(2)
    },
    textPercent: {
    fontSize: sizeFont(3),
    color: '#69b52e',
    fontWeight: 'bold'
    },
})

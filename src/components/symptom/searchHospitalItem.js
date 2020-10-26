import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Images from '../../constants/image';
import FormatHelper from "../../helpers/format.helper";
import { sizeWidth, sizeHeight, sizeFont } from "../../helpers/size.helper";
class SearchHospitalItem extends Component {  
    render() {
        const { item } = this.props;
        return (
            <View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('HospitalDetailDocument', {idDetail: item.id})}>
                    <View style={styles.hospitalContainer}>
                    <View style={styles.hospitalImage}>
                        <Image source={Images.icon_symptom_hospital} style={styles.icon}/>
                    </View>
                    <View style={styles.desHospitalContainer}>
                        <Text style={styles.titleHospital}>{item.shopname}</Text>
                        <Text style={styles.desHospital}>Phone: {item.phone}</Text>
                        <Text style={styles.desHospital}>Email: {item.email}</Text>
                        <Text style={styles.desHospital}>Address: {FormatHelper.text_truncate(item.address,30)}</Text>
                    </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}
export default SearchHospitalItem;
const styles = StyleSheet.create({
    hospitalContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
        borderColor: '#3AAF00',
        borderWidth: 1
    },
    icon: {
        width: sizeWidth(20),
        height: sizeWidth(20)
    },
    hospitalImage: {
        width: '25%',
        padding: sizeWidth(2)
    },
    desHospitalContainer: {
        width: '75%',
        padding: sizeWidth(2)
    },
    titleHospital: {
        fontSize: sizeFont(4),
        fontWeight: 'bold',
        color: '#000',
    },
    desHospital: {
        fontSize: sizeFont(3),
    },
})
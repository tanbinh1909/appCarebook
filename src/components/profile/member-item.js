import React, { Component } from "react";
import { View, StyleSheet, Image , TouchableOpacity} from "react-native";
import { sizeWidth, sizeFont } from "../../helpers/size.helper";
import Text from "../../components/common/text";
import Images from '../../constants/image';
import { strings } from "../../locate/I18n";

export default class MemberItem extends Component {
  render() {
    const {customername, relationName, changeCSS, customerFamilyID, privilege} = this.props.member;
    const currentId = this.props.currentId;
    let setPrivilege = "";
    if (customerFamilyID == currentId) {
       setPrivilege = strings('side_menu.watching');
    }else if (privilege == 1) {
       setPrivilege = strings('side_menu.read');
    }else if (privilege == 2) {
       setPrivilege = strings('side_menu.governor');
    }
    return (
      <View style={styles.container}>
        {customerFamilyID == currentId ? (
          <View style={styles.body}>
            <Text style={styles.name1}>{customername}</Text>
            <Text style={styles.relative1}>{relationName} - {setPrivilege}</Text>
            <TouchableOpacity style={{marginTop: 5}} onPress={this.props.goback}>
                <Text style={styles.name}>{strings('side_menu.goback')}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.body}>
            <Text style={styles.name}>{customername}</Text>
            <View style={styles.removeAccount}>
              <Text style={styles.relative}>{relationName} - {setPrivilege}</Text>
              <TouchableOpacity style={{marginLeft:5}} onPress={this.props.removeAccount}>
                 <Text style={{fontSize: sizeFont(2.5)}}>{strings('side_menu.delete')}</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={styles.name}></Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: sizeWidth(2),
    marginBottom: 10,
    justifyContent: 'center',
  },
  avatar: {
    width: sizeWidth(8),
    height: sizeWidth(8),
    borderRadius: sizeWidth(4),
    marginRight: sizeWidth(2),
    borderWidth: 1,
    borderColor: "white",
  },
  removeAccount: {
    flexDirection:'row'
  },
  name: {
    color: "white",
    width:sizeWidth(26),
    fontSize: sizeFont(2.5)
  },
  name1: {
    color: "red",
    width:sizeWidth(26),
    fontSize: sizeFont(2.5)
  },
  relative: {
    fontSize: sizeFont(2.5),
    color: "white"
  },
  relative1: {
    fontSize: sizeFont(2.5),
    color: "red"
  }
});

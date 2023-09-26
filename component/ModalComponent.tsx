import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, View,Modal,Button,Text} from 'react-native';
import IconComponent from './assets/icons/IconComponent';


const ModalComponent = ({visible,onClose,id_modal,children}:any) => {
    return <View key={id_modal+'_md'} style={styles.container}>
            <Modal visible={visible} animationType='slide' transparent>
            <View style={styles.modalContainer}>
            
                <View style={styles.modalContent}>
                <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
                    <IconComponent nameIcon='fondoCard' data={{ color_1: "#BBEEAA", color_2: "#334477" }}></IconComponent>
                </View>
                    {children}
                    <TouchableOpacity key={id_modal+'_md_btn'}  onPress={onClose} style={{margin:5, padding:5, borderRadius:5, height:45, backgroundColor:'brown', justifyContent:'center',shadowColor:'black',shadowOffset:{width:0,height:2}, shadowRadius:5,shadowOpacity:0.3 }}>
                        <Text style={{textAlign:"center", color:'white', fontWeight:'bold'}}>CERRAR</Text>
                    </TouchableOpacity>
                </View>
            </View>
          </Modal>
          </View>

};

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    modalContainer:{
        flex:1,
        justifyContent:'center',
        alignContent:'center',
        backgroundColor:'rgba(0,0,0,0.5)'
    },
    modalContent:{
        padding:16,
        borderRadius:8,
        position:'relative'
    }
})
export default ModalComponent;
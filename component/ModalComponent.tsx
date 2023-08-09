import React, { useEffect, useState } from 'react';
import { StyleSheet, View,Modal,Button} from 'react-native';


const ModalComponent = ({visible,onClose,id_modal,children}) => {
    return <View key={id_modal+'_md'} style={styles.container}>
            <Modal visible={visible} animationType='slide' transparent>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    {children}
                    <Button key={id_modal+'_md_btn'} title='Cerrar' onPress={onClose}></Button>
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
        backgroundColor:'white',
        padding:16,
        borderRadius:8
    }
})
export default ModalComponent;
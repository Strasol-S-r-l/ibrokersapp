import React, { useEffect, useState } from 'react';
import { TouchableOpacity, ScrollView, Text, View } from 'react-native';
import ModalComponent from './ModalComponent';


const ButtonModal = ({ list_seg, id_key }) => {

    //modal
    const [modalVisible, setModalVisible] = useState(false);
    const openModal = () => {
        setModalVisible(true);
    }
    const closeModal = () => {
        setModalVisible(false);
    }
    const pintarSeguimiento = (seguimientos: any) => {
        if (seguimientos === null) {
            return <Text>No tiene Seguimientos</Text>
        }
        if (!seguimientos) {
            return <Text>No tiene Seguimientos</Text>
        }
        if (seguimientos.length === 0) {
            return <Text>No tiene Seguimientos</Text>
        }
        let array = [];
        for (var i = 0; i < seguimientos.length; i++) {
            let seguimiento = seguimientos[i];
            array.push(
                <View key={id_key + '_modal_content_item' + i} style={{ borderBottomWidth: 1, paddingTop: 5, paddingBottom: 5 }}>
                <View>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'black' }}> SEGUIMIENTO {' ' + (i + 1)} </Text>
                </View>
                <View>
                    <Text style={{ fontWeight: 'bold', color: 'black' }}>NOMBRE :</Text>
                    <Text style={{ color: 'black' }}>{seguimiento.USUARIO || ''}</Text>
                </View>
                <View>
                    <Text style={{ fontWeight: 'bold', color: 'black' }}>ESTADO :</Text>
                    <Text style={{ color: 'black' }}>{seguimiento.ESTADOS_CERRADOS || ''}</Text>
                </View>
                <View>
                    <Text style={{ fontWeight: 'bold', color: 'black' }}>FECHA :</Text>
                    <Text style={{ color: 'black' }}>{getFechaLiteral(seguimiento.FECHA)}</Text>
                </View>
                <View>
                    <Text style={{ fontWeight: 'bold', color: 'black' }}>OBSERVACION :</Text>
                    <Text style={{ color: 'black' }}>{seguimiento.OBSERVACION || ''}</Text>
                </View>
            </View>
            )
        }
        return array

    }

    const abrirModalSeguros = (modalVisible: any, closeModal: any, seguimiento: any) => {
        return <View key={id_key + '_modal_container'} >
            <ModalComponent key={id_key + '_modal_body'} visible={modalVisible} onClose={closeModal} id_modal={id_key} >
                <ScrollView style={{ maxHeight: 400 }}>
                    {pintarSeguimiento(seguimiento)}
                </ScrollView>
            </ModalComponent>
        </View>
    }
    return (list_seg && <View>
        {
            <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', borderWidth: 1, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }} onPress={() => openModal()}>
                <Text style={{ color: 'white' }}>Ver Detalle</Text>
            </TouchableOpacity>
        }
        {
            abrirModalSeguros(modalVisible, closeModal, list_seg)
        }
    </View>)

};

const getFechaLiteral = (fecha: any) => {
    if (!fecha || fecha == '') {
        return ''
    }
    var fechaLit = new Date(fecha).toLocaleDateString("en-GB")
    var array = fechaLit.split('/');
    switch (array[1]) {
        case '01':
            array[1] = 'Enero';
            break;
        case '02':
            array[1] = 'Febrero';
            break;
        case '03':
            array[1] = 'Marzo';
            break;
        case '04':
            array[1] = 'Abril';
            break;
        case '05':
            array[1] = 'Mayo';
            break;
        case '06':
            array[1] = 'Junio';
            break;
        case '07':
            array[1] = 'Julio';
            break;
        case '08':
            array[1] = 'Agosto';
            break;
        case '09':
            array[1] = 'Septiembre';
            break;
        case '10':
            array[1] = 'Octubre';
            break;
        case '11':
            array[1] = 'Noviembre';
            break;
        case '12':
            array[1] = 'Diciembre';
            break;
    }
    return array[0] + ' de ' + array[1] + ' ' + array[2]
}
export default ButtonModal;
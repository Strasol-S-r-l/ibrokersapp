import React, { useEffect, useState } from 'react';
import { TouchableOpacity,TextInput, StyleSheet, Text, View} from 'react-native';
import ModalComponent from './ModalComponent';
import  SvgUri  from 'react-native-svg-uri';
import { useNavigation } from '@react-navigation/native';
const BarFooter = () => {
    //navegacion
    const navegation = useNavigation();
    const action = (nav:String) =>{
        navegation.navigate(nav);
    }
    const actionSiniestro = (nav:String,obj:any) =>{
        navegation.navigate(nav,obj);
        closeModal();
    }

    const [modalVisible, setModalVisible] = useState(false);
    const openModal = () => {
        setModalVisible(true);
    }
    const closeModal = () => {
        setModalVisible(false);
    }

    const abrirModal = (modalVisible: any, closeModal: any) => {
        return <View>

            <ModalComponent id_modal={'modal_siniestro_buscar'} visible={modalVisible} onClose={closeModal}>
                <View style={{width:'100%'}}>
                    <TouchableOpacity style={{margin:5, padding:5, borderRadius:5, height:55, backgroundColor:'#0000FF33', borderColor:'#0000ffaa', borderWidth:1, justifyContent:'center' }}  onPress={() => actionSiniestro('Siniestros',{tipo:'Abierto'})}>
                        <Text style={{textAlign:"center", color:'black', textShadowColor:'#0000', textShadowRadius:2, textShadowOffset:{height:4, width:0}, fontWeight:'bold'}}>ABIERTOS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{margin:5, padding:5, borderRadius:5, height:55, backgroundColor:'#0000FF33', borderColor:'#0000ffaa', borderWidth:1, justifyContent:'center' }}  onPress={() => actionSiniestro('Siniestros',{tipo:'Cerrado'})}>
                        <Text style={{textAlign:"center", color:'black', textShadowColor:'#0000', textShadowRadius:2, textShadowOffset:{height:4, width:0}, fontWeight:'bold'}}>CERRADOS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{margin:5, padding:5, borderRadius:5, height:55, backgroundColor:'#0000FF33', borderColor:'#0000ffaa', borderWidth:1, justifyContent:'center' }}  onPress={() => actionSiniestro('Siniestros',{tipo:'All'})}>
                        <Text style={{textAlign:"center", color:'black', textShadowColor:'#0000', textShadowRadius:2, textShadowOffset:{height:4, width:0}, fontWeight:'bold'}}>TODOS</Text>
                    </TouchableOpacity>
                </View>
            </ModalComponent>
        </View>
    }

    return <View style={styles.footer}>
            <TouchableOpacity key={"btn_footer_ppl"} style={styles.item_footer}  onPress={() => action('Ppl')}>
                <SvgUri  width={35} height={35}  fill='gray' source={require('./assets/icons/compass.svg')}></SvgUri>
                <Text style={styles.text_footer}>Seguros</Text>
            </TouchableOpacity>
            <TouchableOpacity key={"btn_footer_siniestro"} style={styles.item_footer} onPress={()=>openModal()}>
                <SvgUri  width={35} height={35}  fill='gray' source={require('./assets/icons/btnSiniestro.svg')}></SvgUri>
                <Text style={styles.text_footer}>Siniestro</Text>
            </TouchableOpacity>
            <TouchableOpacity key={"btn_footer_menu"} style={styles.item_footer} onPress={()=>action('Menu')}>
                <SvgUri  width={35} height={35}  fill='gray' source={require('./assets/icons/house.svg')}></SvgUri>
                <Text style={styles.text_footer}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity key={"btn_footer_mapa"} style={styles.item_footer} onPress={() => action('Mapa')}>
                <SvgUri  width={35} height={35}  fill='gray' source={require('./assets/icons/marca.svg')}></SvgUri>
                <Text style={styles.text_footer}>Oficinas</Text>
            </TouchableOpacity>
            <TouchableOpacity key={"btn_footer_contacto"} style={styles.item_footer } onPress={() => action('Usuarios')}>
                <SvgUri width={35} height={35} fill='gray' source={require('./assets/icons/contactos.svg')}></SvgUri>
                <Text style={styles.text_footer}>Contacto</Text>
            </TouchableOpacity>
            {abrirModal(modalVisible, closeModal)}
    </View>
};

const styles = StyleSheet.create({
    footer:{
        backgroundColor:'#DFD7D5',
        height: '10%',
        display:'flex', 
        flexDirection:'row', 
        justifyContent:'space-between',
        width:'100%'
    },
    item_footer:{
        display:'flex', 
        flexDirection:'column', 
        justifyContent:'center',
        alignItems:'center',
        width:'20%'
    },
    text_footer:{
        color:'#5E5E5E',
        textAlign:'center',
        fontWeight:'bold'
    },
    icon_footer:{
        textAlign:'center'
    },
    modalContainer:{
        flex:1,
        justifyContent:'center',
        alignContent:'center',
        backgroundColor:'rgb(0,0,0,0.5)'
    },
    modalContent:{
        backgroundColor:'white',
        padding:16,
        borderRadius:8
    },
    inputBuscador:{
        height:40,
        width: 300,
        backgroundColor:'gray',
        borderColor:'black',
        borderTopLeftRadius:8,
        borderBottomLeftRadius:8,
        color:'white',
        borderWidth:1,
        fontSize:20,
        padding:5,
    },
    buttonBuscador:{
        height:40,
        width:40,
        backgroundColor:'gray',
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
        borderColor:'black',
        borderEndWidth:1,
        borderTopWidth:1,
        borderRightWidth:1,
        borderBottomWidth:1,
        display:'flex',
        flexDirection:'column', 
        justifyContent:'center',
        alignItems:'center',
        color:'white'
    }
})
export default BarFooter;
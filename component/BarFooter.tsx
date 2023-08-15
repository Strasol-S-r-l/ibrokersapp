import React, { useEffect, useState } from 'react';
import { TouchableOpacity,TextInput, StyleSheet, Text, View} from 'react-native';
import ModalComponent from './ModalComponent';
import { useNavigation } from '@react-navigation/native';
import IconComponent from './assets/icons/IconComponent';
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
                    <TouchableOpacity style={{margin:5, padding:5, borderRadius:5, height:45, backgroundColor:'#17594A', justifyContent:'center',shadowColor:'black',shadowOffset:{width:0,height:2}, shadowRadius:5,shadowOpacity:0.3}}  onPress={() => actionSiniestro('Siniestros',{tipo:'Abierto'})}>
                        <Text style={{textAlign:"center", color:'white', fontWeight:'bold'}}>ABIERTOS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{margin:5, padding:5, borderRadius:5, height:45, backgroundColor:'#17594A', justifyContent:'center',shadowColor:'black',shadowOffset:{width:0,height:2}, shadowRadius:5,shadowOpacity:0.3}}  onPress={() => actionSiniestro('Siniestros',{tipo:'Cerrado'})}>
                        <Text style={{textAlign:"center", color:'white', fontWeight:'bold'}}>CERRADOS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{margin:5, padding:5, borderRadius:5, height:45, backgroundColor:'#17594A', justifyContent:'center',shadowColor:'black',shadowOffset:{width:0,height:2}, shadowRadius:5,shadowOpacity:0.3 }}  onPress={() => actionSiniestro('Siniestros',{tipo:'All'})}>
                        <Text style={{textAlign:"center", color:'white', fontWeight:'bold'}}>TODOS</Text>
                    </TouchableOpacity>
                </View>
            </ModalComponent>
        </View>
    }
    return <View style={styles.footer}>
            <TouchableOpacity key={"btn_footer_ppl"} style={styles.item_footer}  onPress={() => action('Ppl')}>
                <IconComponent nameIcon="iconPolizaFot" alto="35px" ancho="35px" color="gray"></IconComponent>
                <Text style={styles.text_footer}>Seguros</Text>
            </TouchableOpacity>
            <TouchableOpacity key={"btn_footer_siniestro"} style={styles.item_footer} onPress={()=>openModal()}>
                <IconComponent nameIcon="iconSiniestroFot" alto="35px" ancho="35px" color="gray"></IconComponent>
                <Text style={styles.text_footer}>Siniestro</Text>
            </TouchableOpacity>
           
            <TouchableOpacity key={"btn_footer_mapa"} style={styles.item_footer} onPress={() => action('Mapa')}>
                <IconComponent nameIcon="iconOficinaFot" alto="35px" ancho="35px" color="gray"></IconComponent>
                <Text style={styles.text_footer}>Oficinas</Text>
            </TouchableOpacity>
            <TouchableOpacity key={"btn_footer_contacto"} style={styles.item_footer } onPress={() => action('Usuarios')}>
                <IconComponent nameIcon="iconContactoFot" alto="35px" ancho="35px" color="gray"></IconComponent>
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
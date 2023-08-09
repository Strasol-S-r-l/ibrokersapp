import React, { useEffect, useState } from 'react';
import { ScrollView, View, Dimensions, Text, StyleSheet, Image, TouchableOpacity, ToastAndroid, Platform, Alert } from 'react-native';
import api from '../enviroments/api.json'
import TextNotifier from './TextNotifier';
import SvgUri from 'react-native-svg-uri';
import ButtonModal from './ButtonModal';
import  RNFetchBlob  from 'rn-fetch-blob';
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';
import ModalComponent from './ModalComponent';

const SiniestroView = ({ item }: any) => {
    var siniestro = item;
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = (Dimensions.get('window').height);

    const [urlImage, setUrlImage] = useState(String);
    const [modalVisible, setModalVisible] = useState(false);
    const openModal = () => {
        setModalVisible(true);
    }
    const closeModal = () => {
        setModalVisible(false);
    }
    ////////////////////////////////////////
    const showToast = (messenge:string) => {
        ToastAndroid.show(messenge, ToastAndroid.SHORT);
    };
    const handleDownloadAndroid = async (doc: string) => {
        try {
            showToast('Descargando');
            const url = api.url + '/app?evento=abrirDocumento&doc1=' + doc;
            const response = await RNFetchBlob.config({
                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: true,
                    mediaScannable: true,
                    title: doc,
                    mime: getFileContentType(doc),
                    path: `${RNFetchBlob.fs.dirs.DownloadDir}/${doc}`,
                },
            }).fetch('POST', url);
                showToast('Archivo descargado con éxito.');
        } catch (error) {
            console.log(error)
            /*Alert.alert(
                'Error de Red',
                'No se pudo conectar con el Servidor porfavor intentelo mas tarde',
                [
                    {
                        text: 'Aceptar',
                    }
                ]
            );*/
        }
    };
    const handleDownloadIOS = async (doc: string) => {
        try {
            const url = api.url + '/app?evento=abrirDocumento&doc1=' + doc;
            const response = await RNFetchBlob.config({
                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: true,
                    title: doc,
                    mime: getFileContentType(doc),
                    path: `${RNFetchBlob.fs.dirs.DownloadDir}/${doc}`,
                },
            }).fetch('GET', url).then((res)=>{
                console.log(`${RNFetchBlob.fs.dirs.DownloadDir}/${doc}`)
                console.log('Documento descargado con éxito.');
            })

            
        } catch (error) {
            console.log('Error al descargar el documento:', error);
        }
    };
    const getFileContentType = (fileName) => {
        const ext = fileName.split('.').pop();
        switch (ext) {
            case 'pdf':
                return 'application/pdf';
            case 'docx':
                return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
            case 'xlsx':
                return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            default:
                return 'application/octet-stream';
        }
    };
    const isImages = (fileName) => {
        const ext = fileName.split('.').pop();
        switch (ext) {
            case 'png':
                return true;
            case 'jpg':
                return true;
            case 'gif':
                return true;
            case 'jpge':
                return true;    
        }
        return false;
    }
    const openDownloadedFile = async (doc) => {
        if (Platform.OS === 'android') {
            handleDownloadAndroid(doc);
        }
        if (Platform.OS === 'ios') {
            handleDownloadIOS(doc);
        }
    };
    const abrirModalSinistroImages = (modalVisible: any, closeModal: any, key: any) => {
        return <View>
            <ModalComponent id_modal={key}  key={key + '_modal_images'} visible={modalVisible} onClose={closeModal}  >
                <View>
                    <Image source={{ uri: api.url + "/imagesKardex/" +urlImage }} style={{ width: (screenWidth*0.9), height: (screenWidth*0.9), margin: 5 }} resizeMode='stretch'/>
                    <TouchableOpacity onPress={()=>openDownloadedFile(urlImage) }  style={{backgroundColor:'skyblue',height:40,display:'flex',justifyContent:'center',alignItems:'center',marginBottom:5}}>
                        <Text style={{color:'white'}}>DESCARGAR IMAGEN</Text>
                    </TouchableOpacity>
                </View>
            </ModalComponent>
        </View>
    }

    ////////////////////////////////////////

    const painDocumentos = (docs: any) => {
        if (!docs) {
            return <Text style={{ color: 'white' }}>No hay Documentos</Text>
        }
        if (docs === null) {
            return <Text style={{ color: 'white' }}>No hay Documentos</Text>
        }
        if (docs.length === 0) {
            return <Text style={{ color: 'white' }}>No hay Documentos</Text>
        }
        return docs.map((doc: any, i: Int32) => {
            return <View key={doc.ID + '_section_doc_download_' + i} style={{ width: '100%', flexDirection: 'row', borderBottomWidth: 1, borderColor: 'white', paddingBottom: 5, paddingTop: 5 }}>
                <Text style={{ ...styles.text, width: '90%' }}>
                    {doc.DATO}
                </Text>
                <TouchableOpacity key={doc.ID + "_doc_siniestro"} onPress={() => identificarOS(doc.DATO)}>
                    <SvgUri key={doc.ID + "_doc_icon_download"} width={20} height={20} fill='skyblue' source={require('../images/icons/download-cloud.svg')}></SvgUri>
                </TouchableOpacity>
            </View>
        })
    }

    const identificarOS = async (doc: String) => {
        if(isImages(doc)){
            setUrlImage(doc);
            openModal();
            return;
        }
        if (Platform.OS === 'android') {
            console.log('android');
            handleDownloadAndroid(doc);
        }
        if (Platform.OS === 'ios') {
            console.log('IOS');
            handleDownloadIOS(doc);
        }
    }

    const getUltimoDetalle = (obj: any) => {
        if (obj == null) {
            return 'a'
        }
        if (obj.length == 0) {
            return 'b'
        }
        const position = obj.length - 1;
        return obj[position].OBSERVACION

    }

    const pintar = () => {
        if (!siniestro) return <TextNotifier obj={{ text: 'Todavia no tiene siniestros registrados.', color: '#000' }} />

        return <View style={{ ...styles.container, width: screenWidth }}>
            <View style={{ height: "60%" }}>
                <View style={{ height: "15%" }}>
                    <Image
                        style={{ width: "100%", height: "100%" }}
                        source={{ uri: api.url + "/perfilCia/" + siniestro.NIT_COMPANIA + '_bar' }}
                        resizeMode='stretch'
                    />
                </View>
                <View style={{ height: "85%" }}>
                    <Image
                        style={{ height: '100%', width: "100%" }}
                        //source={require('../images/prub_riesgo.jpg')}
                        source={{ uri: api.url + "/imagesRiesgo/" + siniestro.ID_RIESGO }}
                        resizeMode='stretch'
                    />
                </View>
            </View>
            <View style={{ height: "40%" }}>
                <ScrollView key={siniestro.ID + "_datos_seg"}>
                    <View style={styles.container_line}>
                        <Text style={styles.sub_title}>SINIESTRO</Text>
                        <Text style={styles.text}>{siniestro.NUMERO}</Text>
                    </View>
                    <View style={styles.container_line}>
                        <Text style={styles.sub_title}>ESTADO</Text>
                        <Text style={styles.text}>{siniestro.ESTADO_SINIESTRO}</Text>
                    </View>
                    <View style={styles.container_line}>
                        <Text style={styles.sub_title}>EJECUTIVO</Text>

                        <Text style={styles.text}>{(siniestro.EJECUTIVOS_ATIENDEN && siniestro.EJECUTIVOS_ATIENDEN[0].NOMBRE_COMPLETO)}</Text>
                    </View>
                    <View style={styles.container_line}>
                        <Text style={styles.sub_title}>EMAIL</Text>
                        <Text style={styles.text}>{(siniestro.EJECUTIVOS_ATIENDEN && siniestro.EJECUTIVOS_ATIENDEN[0].EMAIL)}</Text>
                    </View>
                    <View style={styles.container_line}>
                        <Text style={styles.sub_title}>TELEFONO</Text>
                        <Text style={styles.text}>{(siniestro.EJECUTIVOS_ATIENDEN && siniestro.EJECUTIVOS_ATIENDEN[0].TELEFONO)}</Text>
                    </View>
                    <View style={styles.container_line}>
                        <Text style={styles.sub_title}>DESCRIPCION</Text>
                        <Text style={styles.text_descrip}>{siniestro.DESCRIPCION}</Text>
                    </View>
                    <View style={styles.container_line}>
                        <Text style={styles.sub_title}>SEGUIMIENTO</Text>
                        <View style={{ display: 'flex', width: '65%' }}>
                            <Text style={{ color: 'white' }}>
                                {getUltimoDetalle(siniestro.SEGUIMIENTO)}
                            </Text>
                            <ButtonModal id_key={siniestro.ID + '_modal'} list_seg={siniestro.SEGUIMIENTO}></ButtonModal>
                        </View>
                    </View>
                    <View key={siniestro.ID + '_container_doc_download'} style={styles.container_line}>
                        <Text style={{ ...styles.sub_title, width: '100%', textAlign: 'center' }}>DOCUMENTOS</Text>

                    </View>
                    <View style={{ width: '100%' }}>
                        {painDocumentos(siniestro.DOCUMENTOS)}
                    </View>
                </ScrollView>
                {abrirModalSinistroImages(modalVisible, closeModal, siniestro.ID)}
            </View>
        </View>
    };

    return pintar()
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000000aa',
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5
    },
    sub_title: {
        color: 'white',
        fontWeight: 'bold'
    },
    text: {
        color: 'white',
        textAlign: 'left',
        width: '65%'
    },
    container_line: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: 'white',
        padding: 5
    },
    text_descrip: {
        color: 'white',
        textAlign: 'left',
        width: '65%'
    }
})
export default SiniestroView;
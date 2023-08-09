import React, { useEffect, useState } from 'react';
import { Text,ScrollView, View, StyleSheet, Image, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import api from '../enviroments/api.json'
import { useNavigation } from '@react-navigation/native';

const PplView = ({tipo,item}:any) => {
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    const navegation = useNavigation();
    const action = (url:string,json:any)=>{
        navegation.navigate(url,json);
    }

    const pintarProductos=(producto:any, tipo:String)=>{
        return  <View key={tipo+'_'+producto.ID} style={{...styles.container,width:screenWidth}}>
                        <View style={{height:'10%'}}>
                            <Image key={'images_'+producto.NIT_COMPANIA+'_bar_'+producto.ID}
                                style={{width:'100%',height:'100%'}}
                                source={{uri: api.url+"/perfilCia/"+producto.NIT_COMPANIA+'_bar'}}
                                resizeMode='stretch'
                            />
                        </View>
                        <View key={'images_'+producto.ID_RIESGO+"_riesgo_"+producto.ID} style={{height:'45%',marginTop:5}}>
                            <Image
                                style={{height:'100%',width:'100%'}}    
                               // source={require('../images/prub_riesgo.jpg')}
                                source={{ uri: api.url + "/imagesRiesgo/" + producto.ID_RIESGO }}
                                resizeMode='stretch'
                            />
                        </View>
                        
                        <ScrollView style={styles.producto}>
                            <Text style={{...styles.titulo, textAlign:'center'}}>{producto.RIESGO}</Text>
                            <View style={styles.line}>
                                <Text style={{...styles.titulo,width:'49%'}}>Vigencia Inicialas</Text>
                                <Text style={{color:'white',fontWeight:'bold'}}>:</Text>
                                <Text style={{...styles.texto,width:'49%',textAlign:'right'}}>{getFechaLiteral(producto.VIGENCIA_INICIAL)}</Text>
                            </View>
                            <View style={styles.line}>
                                <Text style={{...styles.titulo,width:'49%'}}>Vigencia Final</Text>
                                <Text style={{color:'white',fontWeight:'bold'}}>:</Text>
                                <Text style={{...styles.texto,width:'49%',textAlign:'right'}}>{getFechaLiteral(producto.VIGENCIA_FINAL)}</Text>
                            </View>
                            <View style={styles.line}>
                                <Text style={{...styles.titulo,width:'49%'}}>Proxima Cuota:</Text>
                                <Text style={{color:'white',fontWeight:'bold'}}>:</Text>
                                <Text style={{...styles.texto,width:'49%',textAlign:'right'}}>
                                    {' '}
                                    <TouchableOpacity style={{display:'flex',justifyContent:'center', alignItems:'center'}} onPress={() => action('PerfilProducto',{tipo:tipo, ...producto})}>
                                        <Image
                                            style={{height:18,width:18}}    
                                            source={require('../images/icons/calendario.png')}
                                            resizeMode='stretch'
                                            />
                                    </TouchableOpacity>
                                    {compararFecha(producto.DATOS_PROX_PAGO,producto.FECHA_ACTUAL)}
                                </Text>
                            </View>
                            <View style={styles.line}>
                                <Text style={{...styles.titulo,width:'49%'}}>Poliza Madre:</Text>
                                <Text style={{color:'white',fontWeight:'bold'}}>:</Text>
                                <Text style={{...styles.texto,width:'49%',textAlign:'right'}}>{producto.NUMERO_POLIZA}</Text>
                            </View>
                            {
                                producto.NUMERO_CERTIFICADO?(
                                    <View style={styles.line}>
                                        <Text style={{...styles.titulo,width:'49%'}}># Certificado:</Text>
                                        <Text style={{color:'white',fontWeight:'bold'}}>:</Text>
                                        <Text style={{...styles.texto,width:'49%',textAlign:'right'}}>{producto.NUMERO_CERTIFICADO||'Sin Numero'}</Text>
                                    </View>
                                ):(
                                    <View></View>
                                )
                            }
                            {
                                producto.NUMERO_APLICACION?(
                                    <View style={styles.line}>
                                        <Text style={{...styles.titulo,width:'49%'}}># Aplicacion:</Text>
                                        <Text style={{color:'white',fontWeight:'bold'}}>:</Text>
                                        <Text style={{...styles.texto,width:'49%',textAlign:'right'}}>{producto.NUMERO_APLICACION||'Sin Numero'}</Text>
                                    </View>
                                ):(
                                    <View></View>
                                )
                            }
                            {pintarBloqueSniestro(tipo,producto)}
                            {pinterBloqueDocumentos(tipo,producto)}
                        </ScrollView>
                </View>
    };
    const pinterBloqueDocumentos=(tipo:any,producto:any)=>{
        if(producto.CARTAS == null){
            return <View></View>
        }
        var array = [];
        for (let index = 0; index < producto.CARTAS.length; index++) {
            array.push(<Text key={producto.CARTAS[index].ID+'_carta'} style={{...styles.texto}}>{producto.CARTAS[index].DOCUMENTO}</Text>)
        }
        return <View style={styles.line}>
                <Text style={{...styles.titulo,width:'49%'}}>Documentos</Text>   
                <Text style={{color:'white',fontWeight:'bold'}}>:</Text>
                <View>
                    {
                        array
                    }
                </View>
                <Text style={{...styles.texto,width:'49%',textAlign:'right'}}></Text>
            </View>
    }
    const pintarBloqueSniestro =(tipo,producto)=>{
        if(producto.COUNT_ABIERTO == 0 && producto.COUNT_CERRADO == 0){
            return <View></View>
        }
        return <View style={styles.line}>
                <Text style={{...styles.titulo,width:'49%'}}>Siniestro:</Text>
                <Text style={{color:'white'}}>:</Text>
                <Text style={{...styles.texto,width:'49%',textAlign:'right'}}>
                {'ABIERTO:'+producto.COUNT_ABIERTO + ' CERRADO:' + producto.COUNT_CERRADO}
                    <TouchableOpacity style={{display:'flex',justifyContent:'center', alignItems:'center'}} onPress={() => action('Siniestros',{tipo:tipo,...producto})}>
                        <Image
                            style={{height:20,width:20}}    
                            source={require('../images/icons/Notepad_open.png')}
                            resizeMode='stretch'
                            />
                    </TouchableOpacity>
                </Text>
            </View>
    }

    return pintarProductos(item,tipo)
    
};
const compararFecha =(fechaProx:any,fechaActual:any)=>{
    if(!fechaProx || fechaProx == ''){
        return ''
    }
    if(!fechaActual || fechaActual == ''){
        return ''
    }
    var aux_fechaProx = fechaProx.split('/');
    var aux_fechaActual = fechaActual.split('/');
    
    var date_prox = new Date(fechaProx);
    var date_actual = new Date(fechaActual);

    date_prox = new Date(aux_fechaProx[0], aux_fechaProx[1],aux_fechaProx[2])
    date_actual = new Date(aux_fechaProx[0], aux_fechaProx[1],aux_fechaProx[2])

    if(date_prox <= date_actual){
        return <Text style={{color:'red'}}>{'   '+getFechaLiteral(fechaProx)}</Text>
    }else{
        return <Text style={{color:'green'}}>{'   '+getFechaLiteral(fechaProx)}</Text>
    }
}
const getFechaLiteral =(fecha:any) =>{
    if(!fecha || fecha == ''){
        return ''
    }
    var array = fecha.split('/');
    switch(array[1]){
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
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#000000aa', 
        paddingBottom:5,
        paddingLeft:5,
        paddingRight:5
    },
    producto: {
        fontSize:18,
        fontWeight:'bold',
        color:'#fff',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '90%',
        textShadowColor:'#000',
        textShadowOffset: {width: 1, height: 3},
        textShadowRadius: 10
    },
    titulo:{
        fontWeight:'bold',
        marginTop:5,
        lineHeight: 24,
        color:'#fff'
    },
    texto:{
        marginTop:5,
        lineHeight: 24,
        color:'#fff'
    },
    enlace:{
        fontWeight:'bold',
        marginTop:5,
        lineHeight: 24,
        color:'skyblue'
    },
    line:{
        display:'flex', 
        flexDirection:'row', 
        justifyContent:'space-between',
        width:'100%',
        alignItems:'center'
    }
});

export default PplView;
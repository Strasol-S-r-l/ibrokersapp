import React, { useEffect, useState } from 'react';
import {View} from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
const IconComponent = ({nameIcon,alto,ancho,color}:any) => {
    const paintIcon=()=>{
        if(nameIcon === "iconPolizaFot"){
            return <Svg key={"iconPolizaFot"} fill={color} width={ancho} height={alto} viewBox="0 0 32 32">
                <Path
                    d="M0 16q0 3.264 1.28 6.208t3.392 5.12 5.12 3.424 6.208 1.248 6.208-1.248 5.12-3.424 3.392-5.12 1.28-6.208-1.28-6.208-3.392-5.12-5.088-3.392-6.24-1.28-6.24 1.28-5.088 3.392-3.392 5.12-1.28 6.208zM4 16q0-3.264 1.6-6.016t4.384-4.352 6.016-1.632 6.016 1.632 4.384 4.352 1.6 6.016-1.6 6.048-4.384 4.352-6.016 1.6-6.016-1.6-4.384-4.352-1.6-6.048zM10.048 19.136q-0.448 1.664 0.288 2.528 0.864 0.736 2.56 0.32t3.392-1.376 2.528-1.76 1.792-2.56 1.344-3.392-0.288-2.528q-0.864-0.736-2.56-0.32t-3.392 1.376-2.528 1.76-1.792 2.56-1.344 3.392zM14.592 14.592q0.864-0.864 3.008-2.112t2.656-0.704-0.736 2.656-2.112 2.976z"
                />
            </Svg>
        }
        if(nameIcon === "iconSiniestroFot"){
            return <Svg key={"iconSiniestroFot"} fill={color} width={ancho} height={alto} viewBox="0 0 32 32">
                <Path
                    d="M0 26.016v-20q0-2.496 1.76-4.256t4.256-1.76h20q2.464 0 4.224 1.76t1.76 4.256v20q0 2.496-1.76 4.224t-4.224 1.76h-20q-2.496 0-4.256-1.76t-1.76-4.224zM4 26.016q0 0.832 0.576 1.408t1.44 0.576h20q0.8 0 1.408-0.576t0.576-1.408v-20q0-0.832-0.576-1.408t-1.408-0.608h-20q-0.832 0-1.44 0.608t-0.576 1.408v20zM6.016 24v-1.984h1.984v-2.016q0-0.832 0.576-1.408t1.44-0.576h12q0.8 0 1.408 0.576t0.576 1.408v2.016h2.016v1.984h-20zM6.016 14.016v-2.016h5.984v-1.984q0-0.832 0.576-1.408t1.44-0.608h4q0.8 0 1.408 0.608t0.576 1.408v1.984h6.016v2.016h-20zM10.016 22.016h12v-2.016h-12v2.016zM14.016 12h4v-1.984h-4v1.984z"
                />
            </Svg>
        }
        if(nameIcon === "iconHomeFot"){
            return <Svg key={"iconHomeFot"} fill={color} width={ancho} height={alto} viewBox="0 0 23 23">
                <Path
                    fill='none' 
                    d="M2 20.0001H4M4 20.0001H10M4 20.0001V11.4522C4 10.9179 4 10.6506 4.06497 10.4019C4.12255 10.1816 4.21779 9.97307 4.3457 9.78464C4.49004 9.57201 4.69064 9.39569 5.09277 9.04383L9.89436 4.84244C10.6398 4.19014 11.0126 3.86397 11.4324 3.73982C11.8026 3.63035 12.1972 3.63035 12.5674 3.73982C12.9875 3.86406 13.3608 4.19054 14.1074 4.84383L18.9074 9.04383C19.3095 9.39568 19.5102 9.57202 19.6546 9.78464C19.7825 9.97307 19.877 10.1816 19.9346 10.4019C19.9995 10.6506 20 10.9179 20 11.4522V20.0001M10 20.0001H14M10 20.0001V16.0001C10 14.8955 10.8954 14.0001 12 14.0001C13.1046 14.0001 14 14.8955 14 16.0001V20.0001M14 20.0001H20M20 20.0001H22" 
                    stroke={color} 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                />                
            </Svg>
        }
        if(nameIcon === "iconOficinaFot"){
            return <Svg key={"iconOficinaFot"} fill={color} width={ancho} height={alto} viewBox="0 0 25 25">
                <Path
                    d="M17,4v14.967l-4.212-1.805L12,16.824l-0.788,0.338L7,18.967V4H17 M17,2H7C5.9,2,5,2.9,5,4v18l7-3l7,3V4C19,2.9,18.1,2,17,2 L17,2z"
                />
            </Svg>
        }
        if(nameIcon === "iconContactoFot"){
            return <Svg key={"iconContactoFot"} fill={color} width={ancho} height={alto} viewBox="0 0 23 23">
                <Path
                    d="M18,2H6C4.895,2,4,2.895,4,4v16c0,1.105,0.895,2,2,2h12c1.105,0,2-0.895,2-2V4C20,2.895,19.105,2,18,2z M12,6 c1.7,0,3,1.3,3,3s-1.3,3-3,3s-3-1.3-3-3S10.3,6,12,6z M17,18H7c0,0,0-0.585,0-1c0-1.571,2.512-3,5-3s5,1.429,5,3 C17,17.415,17,18,17,18z"                
                    />
            </Svg>
        }
        if(nameIcon === "iconLeftCircle"){
            return <Svg key={"iconLeftCircle"} fill={color} width={ancho} height={alto} viewBox="0 0 23 23">
                <G id="SVGRepo_bgCarrier" strokeWidth="0" transform="translate(0,0), scale(1)"/>
                <G id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#ff8647" strokeWidth="0.048"/>
                <G id="SVGRepo_iconCarrier"> 
                <G id="Arrow / Caret_Circle_Left"> 
                <Path id="Vector" d="M13 15L10 12L13 9M21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12Z" 
                stroke="#ffffff" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"/> 
                </G> 
                </G>
            </Svg>
        }
        if(nameIcon === "iconCheckTrue"){
            return <Svg key={"iconCheckTrue"} fill={color} width={ancho} height={alto} viewBox="0 0 23 23">
                <Path
                    fill='none' d="M8 12L11 15L16 9M4 16.8002V7.2002C4 6.08009 4 5.51962 4.21799 5.0918C4.40973 4.71547 4.71547 4.40973 5.0918 4.21799C5.51962 4 6.08009 4 7.2002 4H16.8002C17.9203 4 18.4796 4 18.9074 4.21799C19.2837 4.40973 19.5905 4.71547 19.7822 5.0918C20 5.5192 20 6.07899 20 7.19691V16.8036C20 17.9215 20 18.4805 19.7822 18.9079C19.5905 19.2842 19.2837 19.5905 18.9074 19.7822C18.48 20 17.921 20 16.8031 20H7.19691C6.07899 20 5.5192 20 5.0918 19.7822C4.71547 19.5905 4.40973 19.2842 4.21799 18.9079C4 18.4801 4 17.9203 4 16.8002Z" 
                    stroke="white" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    />
            </Svg>
        }
        if(nameIcon === "iconCheckFalse"){
            return <Svg key={"iconCheckFalse"} fill={color} width={ancho} height={alto} viewBox="0 0 23 23">
                <Path
                    fill='none' d="M4 7.2002V16.8002C4 17.9203 4 18.4801 4.21799 18.9079C4.40973 19.2842 4.71547 19.5905 5.0918 19.7822C5.5192 20 6.07899 20 7.19691 20H16.8031C17.921 20 18.48 20 18.9074 19.7822C19.2837 19.5905 19.5905 19.2842 19.7822 18.9079C20 18.4805 20 17.9215 20 16.8036V7.19691C20 6.07899 20 5.5192 19.7822 5.0918C19.5905 4.71547 19.2837 4.40973 18.9074 4.21799C18.4796 4 17.9203 4 16.8002 4H7.2002C6.08009 4 5.51962 4 5.0918 4.21799C4.71547 4.40973 4.40973 4.71547 4.21799 5.0918C4 5.51962 4 6.08009 4 7.2002Z" 
                    stroke="white" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"            
                    />
            </Svg>
        }
        if(nameIcon === "iconCloudDownload"){
            return <Svg key={"iconContactoFot"} fill={color} width={ancho} height={alto} viewBox="0 0 34 34">
                <G id="SVGRepo_bgCarrier" strokeWidth="0"/>
                <G id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.0"/>
                <G id="SVGRepo_iconCarrier"> 
                <Path 
                    d="M0 16q0 2.912 1.824 5.088t4.576 2.752q0.032 0 0.032-0.032v-0.064t0.032-0.032q0.544-1.344 1.344-2.176t2.208-1.184v-2.336q0-2.496 1.728-4.256t4.256-1.76 4.256 1.76 1.76 4.256v2.336q1.376 0.384 2.176 1.216t1.344 2.144l0.096 0.288h0.384q2.464 0 4.224-1.76t1.76-4.224v-2.016q0-2.464-1.76-4.224t-4.224-1.76q-0.096 0-0.32 0.032 0.32-1.152 0.32-2.048 0-3.296-2.368-5.632t-5.632-2.368q-2.88 0-5.056 1.824t-2.784 4.544q-1.152-0.352-2.176-0.352-3.296 0-5.664 2.336t-2.336 5.664v1.984zM10.016 25.824q-0.096 0.928 0.576 1.6l4 4q0.576 0.576 1.408 0.576t1.408-0.576l4-4q0.672-0.672 0.608-1.6-0.064-0.32-0.16-0.576-0.224-0.576-0.736-0.896t-1.12-0.352h-1.984v-5.984q0-0.832-0.608-1.408t-1.408-0.608-1.408 0.608-0.576 1.408v5.984h-2.016q-0.608 0-1.12 0.352t-0.736 0.896q-0.096 0.288-0.128 0.576z"/> 
                </G>
            </Svg>
        }
        if(nameIcon === "iconLupa"){
            return <Svg key={"iconLupas"} fill={color} width={ancho} height={alto} viewBox="0 0 23 23">
                <Path
                    d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"/>
            </Svg>
        }
        if(nameIcon === "iconCalendar"){
            return <Svg key={"iconCalendar"} fill={color} width={ancho} height={alto} viewBox="0 0 32 32">
                <Path
                    d="M0 26.016q0 2.496 1.76 4.224t4.256 1.76h20q2.464 0 4.224-1.76t1.76-4.224v-20q0-1.952-1.12-3.488t-2.88-2.144v2.624q0 1.248-0.864 2.144t-2.144 0.864-2.112-0.864-0.864-2.144v-3.008h-12v3.008q0 1.248-0.896 2.144t-2.112 0.864-2.144-0.864-0.864-2.144v-2.624q-1.76 0.64-2.88 2.144t-1.12 3.488v20zM4 26.016v-16h24v16q0 0.832-0.576 1.408t-1.408 0.576h-20q-0.832 0-1.44-0.576t-0.576-1.408zM6.016 3.008q0 0.416 0.288 0.704t0.704 0.288 0.704-0.288 0.288-0.704v-3.008h-1.984v3.008zM8 24h4v-4h-4v4zM8 18.016h4v-4h-4v4zM14.016 24h4v-4h-4v4zM14.016 18.016h4v-4h-4v4zM20 24h4v-4h-4v4zM20 18.016h4v-4h-4v4zM24 3.008q0 0.416 0.288 0.704t0.704 0.288 0.704-0.288 0.32-0.704v-3.008h-2.016v3.008z"/>
            </Svg>
        }
    }
    return <View>
        {paintIcon()}
    </View>
};
export default IconComponent;
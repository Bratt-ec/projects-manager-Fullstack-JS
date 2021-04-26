import React, { useReducer} from 'react';
import { CERRAR_SESION, LOGIN_ERROR, LOGIN_EXITOSO, OBTENER_USUARIO, REGISTRO_ERROR, REGISTRO_EXITOSO } from '../../types';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import  cliAxios  from "../../config/axios";
import  AuthToken  from "../../config/tokenAuth";

const AuthState = props =>{
    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: true,
    }

    const[state, dispatch] = useReducer(AuthReducer, initialState);

    const registrarUsuario = async (datos) =>{
        try {
            const respuesta = await cliAxios.post('/api/usuarios', datos);
            dispatch({
                type: REGISTRO_EXITOSO, 
                payload: respuesta.data               
            })
            // Obtenemos el usuario
            usuarioAutenticado()
        } catch (error) {
            const alerta = {
                msg: error.response.data.msg,
                categoria:'alerta-error'
            }
            dispatch({
                type: REGISTRO_ERROR,  
                payload: alerta
            })
        }
    }

    // Retorna el usuario autenticado
    const usuarioAutenticado = async ()=>{
        const token = localStorage.getItem('token');
        if(token){
            // TODO: Enva el token por headers
            AuthToken(token); 
        }

        try {
            const respuesta = await cliAxios.get('/api/auth');
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.usuario
            })
        } catch (error) {
            // console.log(error);
            dispatch({
                type: LOGIN_ERROR,
            })
        }
    }

    // Cuando el usuario inicia sesion
    const iniciarSesion = async (datos) =>{
        try {
            const respuesta = await cliAxios.post('/api/auth',datos);
        
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            })
            // Obtener el usuario
            usuarioAutenticado();
        } catch (error) {
         
            const alerta = {
                msg: error.response.data.msg,
                categoria:'alerta-error'
            }
            dispatch({
                type: LOGIN_ERROR,  
                payload: alerta
            })
        }
    }

    // Cierra la sesion y borra los token
    const cerrarSesion = ()=>{
        dispatch({
            type: CERRAR_SESION,
        })
    }
    return(
        <AuthContext.Provider
            value={{
                // State
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                // Funciones
                registrarUsuario: registrarUsuario,
                iniciarSesion: iniciarSesion,
                usuarioAutenticado:usuarioAutenticado,
                cerrarSesion:cerrarSesion
            }}    
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;
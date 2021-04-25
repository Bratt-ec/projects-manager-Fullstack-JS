import React, { useReducer} from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

const AuthState = props =>{
    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null,

    }

    const[state, dispatch] = useReducer(AuthReducer, initialState);

    return(
        <AuthContext.Provider
            value={{
                // State
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                // Funciones
            }}    
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;
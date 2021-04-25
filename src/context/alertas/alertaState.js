import React, {useReducer} from 'react';
import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../../types";
import AlertaContext from './alertaContext';
import alertaReducer from './alertaReducer';
 
const AlertaState = props =>{
    const initialState = {
        alerta: null
    };

    const [state, dispatch] = useReducer(alertaReducer, initialState);

    const mostrarAlerta = (msg, categoria) =>{
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: {
                msg,
                categoria
            }
        });
        // Despues de 4 segundos limpia el error
        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA,
            })
        }, 4000);
    }


    return(
        <AlertaContext.Provider
            value={{
                // States
                alerta: state.alerta,
                // Funciones
                mostrarAlerta: mostrarAlerta,
            }}
        >
            {props.children}
        </AlertaContext.Provider>
    )
}


export default AlertaState;
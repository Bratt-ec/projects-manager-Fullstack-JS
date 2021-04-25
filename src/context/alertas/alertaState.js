import React, {useReducer} from 'react';
import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../../types";
import AlertaContext from './alertaContext';
import alertaReducer from './alertaReducer';
 
const AlertaState = props =>{
    const initialState = {
        alerta: null
    };

    const [state, dispatch] = useReducer(alertaReducer, initialState);

    const mostratAlerta = (msg, categoria) =>{
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: {
                msg,
                categoria
            }
        });
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
                mostratAlerta: mostratAlerta,
            }}
        >
            {props.children}
        </AlertaContext.Provider>
    )
}


export default AlertaState;
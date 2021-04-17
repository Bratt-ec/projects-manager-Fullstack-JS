import React, { useReducer } from 'react';
import ProyectoContext from './ProyectoContext';
import ProyectoReducer from './ProyectoReducer';
import { FORMULARIO_PROYECTO, OBTENER_PROYECTOS, AGREGAR_PROYECTO, VALIDAR_FORMULARIO, PROYECTO_ACTUAL, ELIMINAR_PROYECTO } from '../../types';
import * as uuid from "uuid";

const ProyectoState = props =>{

    const proyectos = [
        {id:1, nombre: 'Tienda Virtual'},
        {id:2,  nombre: 'Intranet'},
        {id:3, nombre: 'App Movil'},
        {id:4, nombre: 'Delivery App Flutter'},
   ]

    const initialState = {
        formulario: false,
        proyectos: [],
        errorformulario : false,
        proyecto: null

    }
    // Dispatch para ejecutar las acciones
    const [ state, dispatch] = useReducer(ProyectoReducer, initialState);

    // Serie de funciones para el CRUD
    const mostrarFormulario = () =>{
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }
    // Obtener los proyectos
    const obtenerProyectos = ()=>{
        dispatch({
            type: OBTENER_PROYECTOS,
            payload: proyectos
        })
    }

    // Agregar un nuevo Proyecto
    const agregarProyecto = (proyecto) =>{
        proyecto.id = uuid.v4();
        // Insertar el proyecto en el state

        dispatch({
            type: AGREGAR_PROYECTO,
            payload: proyecto
        })
    }

    // Valida el formulario por errores
    const mostrarError = ()=>{
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    // Selecciona el proyecto que el usuario dio clic
    const proyectoActual = (proyectoId)=>{
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId,
        })
    }

    // Eliminar el proyecto por su ID
    const eliminarProyecto = (proyectoId)=>{
        dispatch({
            type: ELIMINAR_PROYECTO,
            payload: proyectoId
        })
    }
    return(
        <ProyectoContext.Provider
            value={{
                // Estados
                formulario: state.formulario,
                proyectos: state.proyectos,
                errorformulario: state.errorformulario,
                proyecto: state.proyecto,
                // Funciones
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </ProyectoContext.Provider>
    )
}

export default ProyectoState;
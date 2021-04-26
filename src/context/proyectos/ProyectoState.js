import React, { useReducer } from 'react';
import ProyectoContext from './ProyectoContext';
import ProyectoReducer from './ProyectoReducer';
import { FORMULARIO_PROYECTO, OBTENER_PROYECTOS, AGREGAR_PROYECTO, VALIDAR_FORMULARIO, PROYECTO_ACTUAL, ELIMINAR_PROYECTO, PROYECTO_ERROR } from '../../types';
import  cliAxios  from "../../config/axios";


const ProyectoState = props =>{

    const initialState = {
        formulario: false,
        proyectos: [],
        errorformulario : false,
        proyecto: null,
        mensaje: null,
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
    const obtenerProyectos =async ()=>{
        try {
            const resultado = await cliAxios.get('/api/proyectos');            
            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data.proyectos
            })
        } catch (error) {
            const alerta = {
                msg: 'Ups! Ha ocurrido un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
               payload: alerta
            })
        }
    }

    // Agregar un nuevo Proyecto
    const agregarProyecto = async (proyecto) =>{
       try {
           const resultado = await cliAxios.post('api/proyectos', proyecto)
                   // Insertar el proyecto en el state

        dispatch({
            type: AGREGAR_PROYECTO,
            payload: resultado.data
        })
       } catch (error) {
        const alerta = {
            msg: 'Ups! Ha ocurrido un error',
            categoria: 'alerta-error'
        }
        dispatch({
            type: PROYECTO_ERROR,
           payload: alerta
        })
       }

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
    const eliminarProyecto = async (proyectoId)=>{

        try {
            await cliAxios.delete(`/api/proyectos/${proyectoId}`);
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            })
        } catch (error) {
            const alerta = {
                msg: 'Ups! Ha ocurrido un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
               payload: alerta
            })
        }

    }
    return(
        <ProyectoContext.Provider
            value={{
                // Estados
                formulario: state.formulario,
                proyectos: state.proyectos,
                errorformulario: state.errorformulario,
                proyecto: state.proyecto,
                mensaje: state.mensaje,
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
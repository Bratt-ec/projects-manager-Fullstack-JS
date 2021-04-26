import React, { useReducer} from 'react';
import TareaContext from './TareaContext';
import TareaReducer from './TareaReducer';
import { TAREAS_PROYECTO, AGREGAR_TAREA, VALIDAR_TAREA, ELIMINAR_TAREA, ESTADO_TAREA,TAREA_ACTUAL, ACTUALIZAR_TAREA, LIMPIAR_TAREA } from '../../types';
import  cliAxios  from "../../config/axios";

const TareaState = props =>{
    const initialState = {
        tareasProyecto: [],
        errortarea: false,
        tareaSeleccionada: null,
    }

    // Crear dispatch
    const[state, dispatch] = useReducer(TareaReducer, initialState);

    // Obtener las tareas de un proyecto
    const obtenerTareas = async proyecto =>{
        
        try {
            const resultado = await cliAxios.get('/api/tareas', {params: {proyecto}});
            
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data
            })
        } catch (error) {
            console.log(error);
        }
    
    }
    // Agregar tareaa al proyecto seleccionado
    const agregarTarea = async tarea =>{
      
        try {
            const resultado = await cliAxios.post('/api/tareas', tarea);
           
            dispatch({
                type: AGREGAR_TAREA,
                payload: resultado.data
            })
        } catch (error) {
            console.log(error.response)
        }     

    }
    //Valida y muestra un error en caso de que sea necesario
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA,
        })
    }
    // Eliminar una tarea por su ID
    const eliminarTarea =  async (id,proyecto)=>{
        try {
            await cliAxios.delete(`/api/tareas/${id}`, { params: { proyecto }});
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
        } catch (error) {
            console.log(error.response)
        }
    }
    // cAMBIA EL ESTADO DE CADA TAREA
    const cambiarEstadoTarea = (tarea) =>{
        console.log(tarea);
        dispatch({
            type: ESTADO_TAREA,
            payload: tarea
        })
    }
    // Extrae una tarea para edicion
    const guardarTareaActual = tarea =>{
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }
    // Modificar una tarea
    const actualizarTarea = async tarea =>{
        try {
            const resultado = await cliAxios.put(`/api/tareas/${tarea._id}`, tarea);
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data
            })
        } catch (error) {
            console.log(error);
        }
    }

        // Elimina la tareaseleccionada
        const limpiarTarea = () => {
            dispatch({
                type: LIMPIAR_TAREA
            })
        }

    return(
        <TareaContext.Provider
        value={{
            // Estados
            tareasProyecto: state.tareasProyecto, 
            errortarea: state.errortarea,  
            tareaSeleccionada: state.tareaSeleccionada,        
            // Funciones
            obtenerTareas,
            agregarTarea,
            validarTarea,
            eliminarTarea,
            cambiarEstadoTarea,
            guardarTareaActual,
            actualizarTarea,
            limpiarTarea,
        }}>
            {props.children}
        </TareaContext.Provider>
    )
}


export default TareaState;
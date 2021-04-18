import React, { useReducer} from 'react';
import TareaContext from './TareaContext';
import TareaReducer from './TareaReducer';
import { TAREAS_PROYECTO, AGREGAR_TAREA, VALIDAR_TAREA, ELIMINAR_TAREA, ESTADO_TAREA,TAREA_ACTUAL, ACTUALIZAR_TAREA } from '../../types';

const TareaState = props =>{
    const initialState = {
        tareas: [
            {id: 1,nombre: 'Elegir plataforma', estado: true, proyectoId: 1},
            {id: 2,nombre: 'Diseñar el logo', estado: false, proyectoId: 2},
            {id: 3,nombre: 'Diseñar las screen', estado: false, proyectoId: 3},
            {id: 4,nombre: 'Comprar Dominio', estado: false, proyectoId: 4},
            {id: 5,nombre: 'Elegir plataforma', estado: true, proyectoId: 4},
            {id: 6,nombre: 'Diseñar el logo', estado: false, proyectoId: 3},
            {id: 7,nombre: 'Diseñar las screen', estado: false, proyectoId: 2},
            {id: 8,nombre: 'Comprar Dominio', estado: false, proyectoId: 1},
        ],
        tareasProyecto: null,
        errortarea: false,
        tareaSeleccionada: null,
    }

    // Crear dispatch
    const[state, dispatch] = useReducer(TareaReducer, initialState);

    // Obtener las tareas de un proyecto
    const obtenerTareas = proyectoId =>{
        dispatch({
            type: TAREAS_PROYECTO,
            payload: proyectoId
        })
    }
    // Agregar tareaa al proyecto seleccionado
    const agregarTarea = tarea =>{
        dispatch({
            type: AGREGAR_TAREA,
            payload: tarea
        })
    }
    //Valida y muestra un error en caso de que sea necesario
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA,
        })
    }
    // Eliminar una tarea por su ID
    const eliminarTarea = (id)=>{
        dispatch({
            type: ELIMINAR_TAREA,
            payload: id
        })
    }
    // cAMBIA EL ESTADO DE CADA TAREA
    const cambiarEstadoTarea = (tarea) =>{
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
    const actualizarTarea = tarea =>{
        dispatch({
            type: ACTUALIZAR_TAREA,
            payload: tarea,
        })
    }
    return(
        <TareaContext.Provider
        value={{
            // Estados
            tareas: state.tareas, 
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
        }}>
            {props.children}
        </TareaContext.Provider>
    )
}


export default TareaState;
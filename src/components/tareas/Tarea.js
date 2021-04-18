import React, {useContext} from 'react';
import TareaContext from '../../context/tareas/TareaContext';

const Tarea = ({tarea}) => {
    const { eliminarTarea, obtenerTareas, cambiarEstadoTarea, guardarTareaActual } = useContext(TareaContext);

    // Funcion para eliminar tarea 
    const onEliminarTarea= (id)=>{
        eliminarTarea(id)
        obtenerTareas(tarea.proyectoId)
    }
    // Modificar el estado de las tareas
    const cambiaEstado = tarea =>{
        if(tarea.estado){
            tarea.estado = false
        }else{
            tarea.estado = true
        }
        cambiarEstadoTarea(tarea);
    }

    // Agrega una tarea actual al estado para editarla
    const seleccionarTarea = tarea =>{
        guardarTareaActual(tarea);
    }
    return ( 
        <li className='tarea sombra'>
            {tarea.nombre}
            <div className='estado'>
            {
            tarea.estado
                ? <button type='button' className='completo' onClick={()=> cambiaEstado(tarea)}>Completo</button>                
                : <button type='button' className='incompleto' onClick={()=> cambiaEstado(tarea)}>Incompleto</button>
            }
            </div>
            <div className='acciones'>
                <button type='button' className='btn btn-primario' onClick={()=> seleccionarTarea(tarea)} >Editar</button>
                <button type='button' className='btn btn-secundario' onClick={  ()=> onEliminarTarea(tarea.id)}>Eliminar</button>
            </div>
        </li>
     );
}
 
export default Tarea;
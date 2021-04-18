import React, {useContext} from 'react';
import TareaContext from '../../context/tareas/TareaContext';

const Tarea = ({tarea}) => {
    const { eliminarTarea, obtenerTareas } = useContext(TareaContext);

    // Funcion para eliminar tarea 
    const onEliminarTarea= (id)=>{
        eliminarTarea(id)
        obtenerTareas(tarea.proyectoId)
    }
    
    return ( 
        <li className='tarea sombra'>
            {tarea.nombre}
            <div className='estado'>
            {
            tarea.estado
                ? <button type='button' className='completo'>Completo</button>                
                : <button type='button' className='incompleto'>Incompleto</button>
            }
            </div>
            <div className='acciones'>
                <button type='button' className='btn btn-primario'>Editar</button>
                <button type='button' className='btn btn-secundario' onClick={  ()=> onEliminarTarea(tarea.id)}>Eliminar</button>
            </div>
        </li>
     );
}
 
export default Tarea;
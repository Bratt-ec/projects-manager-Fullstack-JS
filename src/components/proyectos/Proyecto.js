import React, { useContext} from 'react';
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import TareaContext from '../../context/tareas/TareaContext';

const Proyecto = ({proyecto}) => {
     // Obtener el state del Proyecto y Tareas
     const { proyectoActual } = useContext(ProyectoContext);
     const { obtenerTareas} = useContext(TareaContext);
    //  Funcion para agregar el proyecto actual
    const seleccionarProyecto = id=>{
        proyectoActual(id);
        // Obtenemos las tareas
        obtenerTareas(id)
    }
    return ( 
        <li>
            <button type='button' className='btn btn-blank' onClick={()=> seleccionarProyecto(proyecto.id)}>{proyecto.nombre}</button>
        </li>
     );
}
 
export default Proyecto;
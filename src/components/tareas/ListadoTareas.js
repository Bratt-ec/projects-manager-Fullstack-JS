import React, { Fragment, useContext } from 'react';
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import Tarea from './Tarea';

const ListadoTareas = () => {
    const tareas = [
        {nombre: 'Elegir plataforma', estado: true},
        {nombre: 'Diseñar el logo', estado: false},
        {nombre: 'Diseñar las screen', estado: false},
        {nombre: 'Comprar Dominio', estado: false},
    ]
         // Obtener el state del proyecto
         const { proyecto, eliminarProyecto } = useContext(ProyectoContext);
        // Si no hay proyecto seleccionado 
        if(!proyecto)return <h2>Selecciona un proyecto</h2>
        //  Array destructuring para extraer el proyecto actual
        const [proyectoActual] = proyecto;

        //Elimar el proyecto actual
        const onEliminarProyecto = ()=>{
            eliminarProyecto(proyectoActual.id)
        }
    return ( 
        <Fragment>
              <h2>Proyecto: {proyectoActual.nombre}</h2>
              <ul className='listado-tareas'>
                    {
                        (tareas.length === 0)
                        ? (<li className='tarea'><p>No hay tareas</p></li>)
                        : tareas.map(tarea => (
                            <Tarea 
                                tarea={tarea}
                            />
                        ))
                    }
              </ul>
              <button type='button' className='btn btn-eliminar' onClick={onEliminarProyecto}>Eliminar Proyecto &times;</button>
        </Fragment>
      
     );
}
 
export default ListadoTareas;
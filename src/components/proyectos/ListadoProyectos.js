import React, { useContext, useEffect } from 'react';
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import Proyecto from './Proyecto';

const ListadoProyectos = () => {
    // Extraemos los proyectos del state inicial
    const { proyectos, obtenerProyectos } = useContext(ProyectoContext);
   
    // Obtener proyectos cuando carga el componente
    useEffect(() => {
        obtenerProyectos()
    }, []);
    // Verificamos si existen proyectos
    if(proyectos.length === 0 ) return null;

    return ( 
        <ul className='listado-proyectos'>
            {
                proyectos.map(proyecto => (
                    <Proyecto key={proyecto.id} proyecto={proyecto} />
                ))
            }
        </ul>
     );
}
 
export default ListadoProyectos;
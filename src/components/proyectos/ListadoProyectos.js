import React, { useContext, useEffect } from 'react';
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import Proyecto from './Proyecto';
import { CSSTransition, TransitionGroup } from "react-transition-group";

const ListadoProyectos = () => {
    // Extraemos los proyectos del state inicial
    const { proyectos, obtenerProyectos } = useContext(ProyectoContext);
   
    // Obtener proyectos cuando carga el componente
    useEffect(() => {
        obtenerProyectos();
        // eslint-disable-next-line
    }, []);
    // Verificamos si existen proyectos
    if(proyectos.length === 0 ) return <p>No hay proyectos, comienza creando uno!</p>;

    return ( 
        <ul className='listado-proyectos'>
            {
                 <TransitionGroup>
                {proyectos.map(proyecto => (
                    <CSSTransition key={proyecto.id} timeout={2000} classNames='tarea'>
                        <Proyecto proyecto={proyecto} />
                    </CSSTransition>                    
                ))}
                 </TransitionGroup>
               
            }
        </ul>
     );
}
 
export default ListadoProyectos;
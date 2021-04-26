import React, { useContext, useEffect } from 'react';
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import Proyecto from './Proyecto';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import AlertaContext from "../../context/alertas/alertaContext";

const ListadoProyectos = () => {
    // Extraemos los proyectos del state inicial
    const { proyectos,mensaje, obtenerProyectos } = useContext(ProyectoContext);
    const { alerta, mostrarAlerta } = useContext(AlertaContext);
   
    // Obtener proyectos cuando carga el componente
    useEffect(() => {
        // S existe algun error
        if(mensaje) mostrarAlerta(mensaje.msg, mensaje.categoria);
        obtenerProyectos();
        // eslint-disable-next-line
    }, [mensaje]);
    // Verificamos si existen proyectos
    if(proyectos.length === 0 ) return <p>No hay proyectos, comienza creando uno!</p>;

    return ( 
        <ul className='listado-proyectos'>
            { alerta ? <div className={`alerta ${alerta.categoria}`} >{alerta.msg}</div> : null
                }
                 <TransitionGroup>
                {proyectos.map(proyecto => (
                    <CSSTransition key={proyecto._id} timeout={2000} classNames='tarea'>
                        <Proyecto proyecto={proyecto} />
                    </CSSTransition>                    
                ))}
                 </TransitionGroup>
        </ul>
     );
}
 
export default ListadoProyectos;
import React, { Fragment, useContext } from "react";
import ProyectoContext from "../../context/proyectos/ProyectoContext";
import TareaContext from "../../context/tareas/TareaContext";
import Tarea from "./Tarea";
import { CSSTransition, TransitionGroup } from "react-transition-group";
const ListadoTareas = () => {
  // Obtener el state del proyecto
  const { proyecto, eliminarProyecto } = useContext(ProyectoContext);
  const { tareasProyecto } = useContext(TareaContext);
  // Si no hay proyecto seleccionado
  if (!proyecto) return <h2>Selecciona un proyecto</h2>;
  //  Array destructuring para extraer el proyecto actual
  const [proyectoActual] = proyecto;
  //Elimar el proyecto actual
  const onEliminarProyecto = () => {
    eliminarProyecto(proyectoActual._id);
  };

  return (
    <Fragment>
      <h2>Proyecto: {proyectoActual.nombre}</h2>
      <ul className="listado-tareas">
        {tareasProyecto.length === 0 ? (
          <li className="tarea">
            <p>No hay tareas</p>
          </li>
        ) : 
        <TransitionGroup>
         {tareasProyecto.map((tarea) => (
             <CSSTransition key={tarea._id} timeout={300} classNames='tarea'>
                 <Tarea tarea={tarea} />
             </CSSTransition>
         ))}
        </TransitionGroup>
        }
      </ul>
      <button
        type="button"
        className="btn btn-eliminar"
        onClick={onEliminarProyecto}
      >
        Eliminar Proyecto &times;
      </button>
    </Fragment>
  );
};

export default ListadoTareas;

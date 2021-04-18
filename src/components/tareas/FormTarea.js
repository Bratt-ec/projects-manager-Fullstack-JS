import React, { useContext, useState } from "react";
import ProyectoContext from "../../context/proyectos/ProyectoContext";
import TareaContext from "../../context/tareas/TareaContext";

const FormTareas = () => {
  // Obtener el state del proyecto
  const { proyecto } = useContext(ProyectoContext);
  const { agregarTarea, validarTarea, errortarea, obtenerTareas}= useContext(TareaContext);
  // State del formulario
  const[tarea, setTarea] = useState({
    nombre: ''
  })
  // Si no hay proyecto seleccionado
  if (!proyecto) return null;
  //  Array destructuring para extraer el proyecto actual
  const [proyectoActual] = proyecto;


// leer los valores del formulario
const handleChange = e =>{
  setTarea({
    ...tarea,
    [e.target.name] : e.target.value
  })
}
  const onSubmit = e =>{
    e.preventDefault();

    // Validar
    if(tarea.nombre.trim() === '') {
      validarTarea();
      return;
    }

    // agregar la nueva tarea al state de tareas
    tarea.proyectoId = proyectoActual.id;
    tarea.estado = false;
    agregarTarea(tarea);
    // Obtener y filtrar las tareas del proyecto
    obtenerTareas(proyectoActual.id)
    // reiniciar el form
    setTarea({
      nombre: ''
    })
  }
  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Tarea..."
            name="nombre"
            value={tarea.nombre}
            onChange={handleChange}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value="Agregra Tarea"
          />
        </div>
      </form>
      {errortarea ? <p className='mensaje error'>El nombre de la tarea es obligatorio</p> :null}
    </div>
  );
};

export default FormTareas;

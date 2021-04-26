import React, { useContext, useState, useEffect } from "react";
import ProyectoContext from "../../context/proyectos/ProyectoContext";
import TareaContext from "../../context/tareas/TareaContext";

const FormTareas = () => {
  // Obtener el state del proyecto
  const { proyecto } = useContext(ProyectoContext);
  const {
    agregarTarea,
    validarTarea,
    errortarea,
    obtenerTareas,
    tareaSeleccionada,
    actualizarTarea,
    limpiarTarea
  } = useContext(TareaContext);
  // State del formulario
  const [tarea, setTarea] = useState({
    nombre: "",
  });

  useEffect(() => {
    // Effect que detecta si hay una tarea seleccionada 
   if(tareaSeleccionada !== null){
     setTarea(tareaSeleccionada);
   }else{
     setTarea({
       nombre: ''
     })
   }
  }, [tareaSeleccionada])
  // Si no hay proyecto seleccionado
  if (!proyecto) return null;
  //  Array destructuring para extraer el proyecto actual
  const [proyectoActual] = proyecto;

  // leer los valores del formulario
  const handleChange = (e) => {
    setTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();

    // Validar
    if (tarea.nombre.trim() === "") {
      validarTarea();
      return;
    }

    // Revisar si es edición o es nueva tarea
    if(tareaSeleccionada == null){
    // agregar la nueva tarea al state de tareas
    tarea.proyecto = proyectoActual._id;

    agregarTarea(tarea);
    // Obtener y filtrar las tareas del proyecto
    obtenerTareas(proyectoActual._id);
    }else{
      // Actualizar tarea existente
      actualizarTarea(tarea)
      obtenerTareas(proyectoActual._id);
      limpiarTarea()
    }
    obtenerTareas(proyectoActual._id);
    // reiniciar el form
    setTarea({
      nombre: "", 
    });

  };

 

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
            value={tareaSeleccionada ? "Editar Tarea" : "Agregar Tarea"}
          />
        </div>
      </form>
      {errortarea ? (
        <p className="mensaje error">El nombre de la tarea es obligatorio</p>
      ) : null}
    </div>
  );
};

export default FormTareas;

import React, { useContext } from "react";
import ProyectoContext from "../../context/proyectos/ProyectoContext";

const FormTareas = () => {
  // Obtener el state del proyecto
  const { proyecto } = useContext(ProyectoContext);
  // Si no hay proyecto seleccionado
  if (!proyecto) return null;
  //  Array destructuring para extraer el proyecto actual
  const [proyectoActual] = proyecto;
  return (
    <div className="formulario">
      <form>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Tarea..."
            name="nombre"
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
    </div>
  );
};

export default FormTareas;

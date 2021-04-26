import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/autentintacion/authContext";

const RutaPrivada = ({ component: Component, ...props }) => {
  /*
        Higher order components
        Así protegemos las rutas/componentes de nuestra APP
        Esta función toma un componente y valida si el usuario esta autenticado
        para mostrar el componente
    */
  const { autenticado, cargando, usuarioAutenticado } = useContext(AuthContext);

  useEffect(() => {
    usuarioAutenticado();
    // eslint-disable-next-line
  }, []);
  return (
    <Route
      {...props}
      render={(props) =>
        !autenticado && !cargando ? (<Redirect to="/" />) : (<Component {...props} />)
      }
    />
  );
};

export default RutaPrivada;

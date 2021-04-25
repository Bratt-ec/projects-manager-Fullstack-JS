import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/auth/Login";
import NuevaCuenta from "./components/auth/NuevaCuenta";
import Proyectos from "./components/proyectos/Proyectos";
import RutaPrivada from "./components/rutas/RutaPrivada";
import AuthToken from "./config/tokenAuth";
import AlertaState from "./context/alertas/alertaState";
import AuthState from "./context/autentintacion/authState";
import ProyectoState from "./context/proyectos/ProyectoState";
import TareaState from "./context/tareas/TareaState";

// Revisar si tenemos un token
const token = localStorage.getItem('token');

if(token){
  AuthToken(token);
}
function App() {
  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
                <RutaPrivada exact path="/proyectos" component={Proyectos} />
              </Switch>
            </Router>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;

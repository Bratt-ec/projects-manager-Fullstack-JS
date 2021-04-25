import React, {useContext, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autentintacion/authContext";


const Login = (props) => {
     // Alerta Context
  const { alerta, mostrarAlerta } = useContext(AlertaContext);
  const { iniciarSesion, mensaje, autenticado } = useContext(AuthContext)
    // State para iniciar sesión
    const [usuario, guardarUsuario] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        // En caso de que el usuario se haya autenticado o registrado acceda al dashboard
            if(autenticado) props.history.push('/proyectos');
        // Muestra los errores que envie el servidor
            if(mensaje) mostrarAlerta(mensaje.msg, mensaje.categoria);
        
          }, [mensaje,autenticado, props.history])

    const {email, password } = usuario;
    const onChange = (e)=>{
        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e)=>{
        e.preventDefault();

        // Validar que no haya campos vacios
        if(email.trim() == '' || password.trim() == ''){
            return mostrarAlerta('Todos los campos son obligatorios','alerta-error')
        }
        // Pasar a action
        iniciarSesion({email,password})
    }
    return ( 
        <div className="form-usuario">
             {alerta ? (
                <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
            ) : null}
            <div className="contenedor-form sombra-dark">
            <h1>Iniciar Sesión</h1>
                <form onSubmit={onSubmit}>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Tu Email"
                        value={email}
                        onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">Contraseña</label>
                        <input 
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Tu Password"
                        value={password}
                        onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block" value="Iniciar Sesión" />
                    </div>
                </form>
                <Link to={'/nueva-cuenta'} className="enlace-cuenta">
                    Obtener Cuenta
                </Link>
            </div>
        </div>
        );
}
 
export default Login;